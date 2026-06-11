const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const host = process.env.HOST || "127.0.0.1";
const preferredPort = Number(process.env.PORT || 4173);
const emptyCssId = "__empty_css__";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function moduleId(absPath) {
  return toPosix(path.relative(root, absPath));
}

function readText(absPath) {
  return fs.readFileSync(absPath, "utf8");
}

function resolveFile(basePath) {
  const candidates = [];

  if (path.extname(basePath)) {
    candidates.push(basePath);
  } else {
    candidates.push(
      `${basePath}.tsx`,
      `${basePath}.ts`,
      `${basePath}.jsx`,
      `${basePath}.js`,
      `${basePath}.mjs`,
      `${basePath}.cjs`,
      `${basePath}.json`,
      path.join(basePath, "index.tsx"),
      path.join(basePath, "index.ts"),
      path.join(basePath, "index.jsx"),
      path.join(basePath, "index.js"),
      path.join(basePath, "index.mjs"),
      path.join(basePath, "index.cjs"),
    );
  }

  const match = candidates.find((candidate) => fs.existsSync(candidate));

  if (!match) {
    throw new Error(`Could not resolve ${basePath}`);
  }

  return match;
}

function splitPackageRequest(request) {
  const parts = request.split("/");

  if (request.startsWith("@")) {
    return {
      packageName: parts.slice(0, 2).join("/"),
      subpath: parts.slice(2).join("/"),
    };
  }

  return {
    packageName: parts[0],
    subpath: parts.slice(1).join("/"),
  };
}

function resolvePackage(request) {
  const { packageName, subpath } = splitPackageRequest(request);
  const packageDir = path.join(root, "node_modules", ...packageName.split("/"));

  if (subpath) {
    return resolveFile(path.join(packageDir, subpath));
  }

  const packageJsonPath = path.join(packageDir, "package.json");
  const packageJson = JSON.parse(readText(packageJsonPath));
  const entry =
    typeof packageJson.browser === "string"
      ? packageJson.browser
      : packageJson.main || "index.js";

  return resolveFile(path.join(packageDir, entry));
}

function resolveModule(request, fromAbsPath) {
  if (request.endsWith(".css")) {
    return emptyCssId;
  }

  if (request.startsWith(".") || request.startsWith("/")) {
    const basePath = request.startsWith("/")
      ? path.join(root, request)
      : path.resolve(path.dirname(fromAbsPath), request);

    return moduleId(resolveFile(basePath));
  }

  return moduleId(resolvePackage(request));
}

function transformSource(absPath) {
  const ext = path.extname(absPath);

  if (ext === ".json") {
    return `module.exports = ${readText(absPath)};`;
  }

  const source = readText(absPath);

  if ([".ts", ".tsx", ".jsx"].includes(ext)) {
    return ts.transpileModule(source, {
      compilerOptions: {
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        useDefineForClassFields: true,
      },
      fileName: absPath,
    }).outputText;
  }

  return source;
}

function collectModules(entryAbsPath) {
  const modules = new Map();

  modules.set(emptyCssId, {
    code: "module.exports = {};",
    deps: {},
  });

  function visit(absPath) {
    const id = moduleId(absPath);

    if (modules.has(id)) {
      return id;
    }

    const code = transformSource(absPath);
    const deps = {};
    modules.set(id, { code, deps });

    for (const match of code.matchAll(/\brequire\s*\(\s*["']([^"']+)["']\s*\)/g)) {
      const request = match[1];
      const resolvedId = resolveModule(request, absPath);
      deps[request] = resolvedId;

      if (resolvedId !== emptyCssId) {
        visit(path.join(root, ...resolvedId.split("/")));
      }
    }

    return id;
  }

  const entryId = visit(entryAbsPath);
  return { entryId, modules };
}

function buildBundle() {
  const { entryId, modules } = collectModules(path.join(root, "src", "main.tsx"));
  const moduleEntries = [...modules.entries()]
    .map(([id, record]) => {
      return `${JSON.stringify(id)}: [function(require, module, exports, process) {\n${record.code}\n}, ${JSON.stringify(record.deps)}]`;
    })
    .join(",\n");

  return `
(function() {
  const modules = {
${moduleEntries}
  };
  const cache = {};
  const process = { env: { NODE_ENV: "development" } };

  function load(id) {
    if (cache[id]) return cache[id].exports;

    const record = modules[id];
    if (!record) throw new Error("Module not found: " + id);

    const module = { exports: {} };
    cache[id] = module;

    const localRequire = (request) => load(record[1][request] || request);
    record[0](localRequire, module, module.exports, process);

    return module.exports;
  }

  load(${JSON.stringify(entryId)});
})();
`;
}

function send(res, statusCode, body, type) {
  res.writeHead(statusCode, { "Content-Type": type });
  res.end(body);
}

function sendFile(res, absPath) {
  const ext = path.extname(absPath).toLowerCase();
  const type = contentTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  fs.createReadStream(absPath).pipe(res);
}

function htmlResponse() {
  const styleMtime = fs.statSync(path.join(root, "styles.css")).mtimeMs.toString(36);
  return readText(path.join(root, "index.html")).replace(
    '<script type="module" src="/src/main.tsx"></script>',
    `<link rel="stylesheet" href="/styles.css?v=${styleMtime}" />\n    <script src="/bundle.js"></script>`,
  );
}

function publicFilePath(pathname) {
  const publicRoot = path.join(root, "public");
  const normalizedPathname = pathname.replace(/^\/+/, "");
  const candidate = path.resolve(publicRoot, normalizedPathname);

  if (!candidate.startsWith(publicRoot + path.sep) && candidate !== publicRoot) {
    return null;
  }

  return fs.existsSync(candidate) && fs.statSync(candidate).isFile() ? candidate : null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    if (pathname === "/" || pathname === "/index.html") {
      send(res, 200, htmlResponse(), contentTypes[".html"]);
      return;
    }

    if (pathname === "/bundle.js") {
      send(res, 200, buildBundle(), contentTypes[".js"]);
      return;
    }

    if (pathname === "/styles.css") {
      sendFile(res, path.join(root, "styles.css"));
      return;
    }

    const publicPath = publicFilePath(pathname);
    if (publicPath) {
      sendFile(res, publicPath);
      return;
    }

    send(res, 200, htmlResponse(), contentTypes[".html"]);
  } catch (error) {
    send(res, 500, String(error.stack || error), "text/plain; charset=utf-8");
  }
});

function listen(port, attemptsLeft = 20) {
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
      return;
    }

    throw error;
  });

  server.listen(port, host, () => {
    console.log(`Portfolio server listening on http://${host}:${port}`);
  });
}

listen(preferredPort);
