import { useEffect, useMemo, useState, type ReactNode, type SyntheticEvent } from "react";
import { portfolioData } from "./data";
import type { Evidence, Project, ProjectStatus, StatusLabel, Visibility } from "./data";

const data = portfolioData;
const THEME_STORAGE_KEY = "portfolio-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return "light";
}

function getCurrentRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function evidenceVisibilityLabel(visibility: Visibility) {
  if (visibility === "public") return "공개";
  return "비공개";
}

function evidenceAccessLabel(item: Evidence) {
  if (item.assetUrl && item.visibility === "public") return "내부 공개 사본";
  return evidenceVisibilityLabel(item.visibility);
}

function evidenceHref(item: Evidence) {
  return item.assetUrl || item.url;
}

function evidenceKind(item: Evidence) {
  const href = evidenceHref(item).toLowerCase();
  if (item.visibility === "private") return "private";
  if (href.endsWith(".md")) return "markdown";
  if (href.endsWith(".pdf")) return "pdf";
  if (/\.(png|jpe?g|webp|gif|avif)$/.test(href)) return "image";
  return "link";
}

function getStatus(status: ProjectStatus): StatusLabel {
  return data.statusLabels[status] ?? data.statusLabels.needs_user_confirmation;
}

function getEvidence(id: string): Evidence | undefined {
  return data.evidence.find((item) => item.id === id);
}

function TagList({ tags, strong = false }: { tags: string[]; strong?: boolean }) {
  return (
    <div className={`tag-row${strong ? " tag-row-strong" : ""}`}>
      {tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function normalizePdfSrc(href: string, page: number, zoom: number) {
  return `${href}#toolbar=0&navpanes=0&scrollbar=0&page=${page}&zoom=${zoom}`;
}

function safeLink(href: string) {
  return href.startsWith("http") || href.startsWith("/") || href.startsWith("#") ? href : "#";
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={`${token}-${match.index}`}>{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        nodes.push(
          <a href={safeLink(linkMatch[2])} key={`${token}-${match.index}`} rel="noreferrer" target="_blank">
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderCodeLine(line: string, index: number) {
  const parts = line.split(/(\b(?:const|let|var|function|return|if|else|for|while|await|async|import|export|from|type|interface|class|new|try|catch)\b|".*?"|'.*?'|`.*?`|#[^\n]*|\/\/[^\n]*)/g);

  return (
    <span key={index}>
      {parts.map((part, partIndex) => {
        const key = `${index}-${partIndex}`;
        if (/^(const|let|var|function|return|if|else|for|while|await|async|import|export|from|type|interface|class|new|try|catch)$/.test(part)) {
          return (
            <span className="code-token-keyword" key={key}>
              {part}
            </span>
          );
        }
        if (/^["'`]/.test(part)) {
          return (
            <span className="code-token-string" key={key}>
              {part}
            </span>
          );
        }
        if (/^(#|\/\/)/.test(part)) {
          return (
            <span className="code-token-comment" key={key}>
              {part}
            </span>
          );
        }
        return part;
      })}
      {"\n"}
    </span>
  );
}

function isUnorderedListLine(line: string) {
  return /^[-*]\s+/.test(line);
}

function isOrderedListLine(line: string) {
  return /^\d+\.\s+/.test(line);
}

function isChecklistLine(line: string) {
  return /^[-*]\s+\[[ xX]\]\s+/.test(line);
}

function renderMarkdown(markdown: string): ReactNode[] {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.replace(/^```/, "").trim() || "text";
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      nodes.push(
        <div className="markdown-code-block" key={`code-${index}`}>
          <div className="markdown-code-label">{language}</div>
          <pre>
            <code>{codeLines.map(renderCodeLine)}</code>
          </pre>
        </div>
      );
      continue;
    }

    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      nodes.push(<hr key={`hr-${index}`} />);
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      const firstLine = quoteLines[0] || "Note";
      const calloutMatch = firstLine.match(/^\[!([A-Za-z]+)\]\s*(.*)$/);
      const label = calloutMatch ? calloutMatch[1] : "Note";
      const title = calloutMatch && calloutMatch[2] ? calloutMatch[2] : firstLine;
      const body = calloutMatch ? quoteLines.slice(1) : quoteLines.slice(1);
      nodes.push(
        <aside className="markdown-callout" key={`callout-${index}`}>
          <strong>{title || label}</strong>
          {body.length > 0 && <p>{renderInline(body.join(" "))}</p>}
        </aside>
      );
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const content = renderInline(heading[2]);
      if (level === 1) nodes.push(<h1 key={`h1-${index}`}>{content}</h1>);
      if (level === 2) nodes.push(<h2 key={`h2-${index}`}>{content}</h2>);
      if (level === 3) nodes.push(<h3 key={`h3-${index}`}>{content}</h3>);
      index += 1;
      continue;
    }

    if (isChecklistLine(trimmed)) {
      const items: Array<{ checked: boolean; text: string }> = [];
      while (index < lines.length && isChecklistLine(lines[index].trim())) {
        const item = lines[index].trim();
        items.push({
          checked: /^[-*]\s+\[[xX]\]/.test(item),
          text: item.replace(/^[-*]\s+\[[ xX]\]\s+/, ""),
        });
        index += 1;
      }
      nodes.push(
        <ul className="markdown-checklist" key={`check-${index}`}>
          {items.map((item) => (
            <li key={item.text}>
              <input checked={item.checked} readOnly type="checkbox" />
              <span>{renderInline(item.text)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (isUnorderedListLine(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && isUnorderedListLine(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      nodes.push(
        <ul key={`ul-${index}`}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (isOrderedListLine(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && isOrderedListLine(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      nodes.push(
        <ol key={`ol-${index}`}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("```") &&
      !lines[index].trim().startsWith(">") &&
      !lines[index].trim().startsWith("#") &&
      !isChecklistLine(lines[index].trim()) &&
      !isUnorderedListLine(lines[index].trim()) &&
      !isOrderedListLine(lines[index].trim()) &&
      !/^---+$/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    nodes.push(<p key={`p-${index}`}>{renderInline(paragraph.join(" "))}</p>);
  }

  return nodes;
}

function MarkdownPreview({ item }: { item: Evidence }) {
  const href = evidenceHref(item);
  const [content, setContent] = useState("");
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let alive = true;
    setState("loading");

    fetch(href)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (!alive) return;
        setContent(text);
        setState("ready");
      })
      .catch(() => {
        if (!alive) return;
        setState("error");
      });

    return () => {
      alive = false;
    };
  }, [href]);

  return (
    <div className="markdown-viewer">
      <details className="markdown-toggle">
        <summary>문서 정보</summary>
        <p>{item.note}</p>
      </details>
      {state === "loading" && <div className="viewer-skeleton">Markdown을 불러오는 중입니다.</div>}
      {state === "error" && (
        <p className="viewer-error">
          문서를 불러오지 못했습니다. <a href={href}>파일로 열기</a>
        </p>
      )}
      {state === "ready" && <div className="markdown-body">{renderMarkdown(content)}</div>}
    </div>
  );
}

function PdfPreview({ item }: { item: Evidence }) {
  const href = evidenceHref(item);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(110);
  const [loaded, setLoaded] = useState(false);
  const pageCount = item.pages || 1;
  const safePage = Math.min(page, pageCount);

  useEffect(() => {
    setPage(1);
    setZoom(110);
    setLoaded(false);
  }, [href]);

  function movePage(nextPage: number) {
    const safePage = Math.min(Math.max(nextPage, 1), pageCount);
    setLoaded(false);
    setPage(safePage);
  }

  function moveZoom(nextZoom: number) {
    const safeZoom = Math.min(Math.max(nextZoom, 90), 150);
    setLoaded(false);
    setZoom(safeZoom);
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div>
          <span className="evidence-type">PDF</span>
          <strong>
            {safePage} / {pageCount}
          </strong>
        </div>
        <div className="pdf-actions">
          <button disabled={safePage <= 1} onClick={() => movePage(safePage - 1)} type="button">
            이전
          </button>
          <button disabled={safePage >= pageCount} onClick={() => movePage(safePage + 1)} type="button">
            다음
          </button>
          <button disabled={zoom <= 90} onClick={() => moveZoom(zoom - 20)} type="button">
            축소
          </button>
          <button disabled={zoom >= 150} onClick={() => moveZoom(zoom + 20)} type="button">
            확대
          </button>
          <a href={href} rel="noreferrer" target="_blank">
            파일 열기
          </a>
          <a download href={href}>
            다운로드
          </a>
        </div>
      </div>
      <div className="pdf-frame-wrap">
        {!loaded && <div className="pdf-loader">PDF 미리보기를 준비하는 중입니다.</div>}
        <iframe
          key={`${href}-${safePage}-${zoom}`}
          className="pdf-frame"
          src={normalizePdfSrc(href, safePage, zoom)}
          title={`${item.title} PDF preview`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

function ImagePreview({ item }: { item: Evidence }) {
  const href = evidenceHref(item);
  return (
    <figure className="evidence-image-viewer">
      <img src={href} alt={`${item.title} 미리보기`} loading="lazy" />
      <figcaption>{item.note}</figcaption>
    </figure>
  );
}

function EvidencePreview({ item }: { item: Evidence }) {
  const kind = evidenceKind(item);

  if (kind === "markdown") return <MarkdownPreview item={item} />;
  if (kind === "pdf") return <PdfPreview item={item} />;
  if (kind === "image") return <ImagePreview item={item} />;
  if (kind === "link") {
    return (
      <p className="external-evidence">
        <a href={evidenceHref(item)} rel="noreferrer" target="_blank">
          공개 링크 열기
        </a>
      </p>
    );
  }
  return <p className="muted">민감정보 보호를 위해 사이트에는 직접 노출하지 않습니다.</p>;
}

function EvidenceDisclosure({ item }: { item: Evidence }) {
  const [open, setOpen] = useState(false);

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(event.currentTarget.open);
  }

  return (
    <details className="evidence-compact-preview" onToggle={handleToggle}>
      <summary>사이트에서 미리보기</summary>
      {open && <EvidencePreview item={item} />}
    </details>
  );
}

function EvidenceBrowser({ items }: { items: Evidence[] }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id || "");
  const selectedItem = items.find((item) => item.id === selectedId) || items[0];

  useEffect(() => {
    if (!items.some((item) => item.id === selectedId)) {
      setSelectedId(items[0]?.id || "");
    }
  }, [items, selectedId]);

  if (!selectedItem) {
    return <p className="muted">등록된 증빙이 없습니다.</p>;
  }

  return (
    <div className="evidence-browser">
      <div className="evidence-browser-head">
        <div>
          <p className="eyebrow">Evidence Files</p>
          <h3>PDF와 Markdown 근거를 사이트 안에서 바로 확인합니다</h3>
        </div>
        <span className="evidence-count">{items.length}개 공개 사본</span>
      </div>
      <div className="evidence-picker" role="tablist" aria-label="근거 자료 선택">
        {items.map((item) => {
          const selected = item.id === selectedItem.id;
          return (
            <button
              className={`evidence-tab${selected ? " selected" : ""}`}
              type="button"
              role="tab"
              aria-selected={selected}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
            >
              <span className="evidence-type">{item.type}</span>
              <strong>{item.title}</strong>
              <small>{evidenceAccessLabel(item)}</small>
            </button>
          );
        })}
      </div>
      <article className="evidence-preview-panel">
        <div className="evidence-preview-heading">
          <div>
            <span className="evidence-type">{selectedItem.type}</span>
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.note}</p>
          </div>
          <a href={evidenceHref(selectedItem)} rel="noreferrer" target="_blank">
            원본 파일 열기
          </a>
        </div>
        <EvidencePreview item={selectedItem} key={selectedItem.id} />
      </article>
    </div>
  );
}

function EvidenceList({ ids, compact = false }: { ids: string[]; compact?: boolean }) {
  const items = ids.map(getEvidence).filter((item): item is Evidence => Boolean(item));

  if (!items.length) {
    return <p className="muted">등록된 증빙이 없습니다.</p>;
  }

  if (!compact) {
    return <EvidenceBrowser items={items} />;
  }

  return (
    <div className="evidence-list evidence-list-compact">
      {items.map((item) => {
        return (
          <article className="evidence-item" key={item.id}>
            <div className="evidence-summary">
              <div>
                <span className="evidence-type">{item.type}</span>
                <strong>{item.title}</strong>
                <small>{item.note}</small>
              </div>
              <span className="evidence-visibility">{evidenceAccessLabel(item)}</span>
            </div>
            {compact ? (
              <EvidenceDisclosure item={item} />
            ) : (
              <EvidencePreview item={item} />
            )}
          </article>
        );
      })}
    </div>
  );
}

function Header({
  route,
  theme,
  onToggleTheme,
}: {
  route: string;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const links = [
    ["/", "Home"],
    ["/projects", "Projects"],
    ["/credentials", "Credentials"],
    ["/contact", "Contact"],
  ] as const;

  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="홈으로 이동">
        <span className="brand-mark">SCW</span>
        <span>송채우 Portfolio</span>
      </a>
      <div className="header-actions">
        <nav className="site-nav" aria-label="주요 탐색">
          {links.map(([href, label]) => {
            const active = href === "/" ? route === "/" : route.startsWith(href);
            return (
              <a className={active ? "active" : ""} href={`#${href}`} key={href}>
                {label}
              </a>
            );
          })}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === "dark" ? "라이트 모드로 전환" : "나이트 모드로 전환"}
          aria-pressed={theme === "dark"}
          onClick={onToggleTheme}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-knob" />
          </span>
          <span>{theme === "dark" ? "Light" : "Night"}</span>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{data.profile.name}</strong>
        <p>문제 정의, 제품 기획, 기술 실행을 근거와 함께 정리한 포트폴리오입니다.</p>
      </div>
      <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
    </footer>
  );
}

function Hero({ theme }: { theme: Theme }) {
  const heroImage =
    theme === "dark" ? "/assets/portfolio-hero-dark.png" : "/assets/portfolio-hero-minimal.png";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">PM, Developer, SW Salesman, problem definer</p>
        <h1 id="hero-title">{data.profile.name}</h1>
        <p className="hero-headline">{data.profile.headline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#/projects">
            대표 프로젝트와 근거 보기
          </a>
          <a className="button button-secondary" href={`mailto:${data.profile.email}`}>
            이메일로 연락하기
          </a>
        </div>
      </div>
      <figure className="hero-visual">
        <img
          className="hero-image"
          src={heroImage}
          alt={
            theme === "dark"
              ? "어두운 배경 위에 라임 포인트가 있는 포트폴리오 인터페이스 모형"
              : "흰 배경 위에 절제된 포트폴리오 인터페이스 모형이 떠 있는 미니멀 비주얼"
          }
        />
      </figure>
    </section>
  );
}

function ProjectMiniCard({ project }: { project: Project }) {
  const status = getStatus(project.status);

  return (
    <a className="mini-card" href={`#/projects/${project.slug}`}>
      <span>{project.period}</span>
      <strong>{project.title}</strong>
      <small>{status.label}</small>
    </a>
  );
}

function SignalBoard() {
  const featured = data.projects
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  return (
    <section className="section signal-section" aria-labelledby="signal-title">
      <div className="section-heading">
        <p className="eyebrow">30초 안에 보여줄 신호</p>
        <h2 id="signal-title">고객 문제를 제품 흐름으로 바꾸는 사람</h2>
        <p>{data.profile.shortPitch}</p>
      </div>
      <div className="featured-strip">
        {featured.map((project) => (
          <ProjectMiniCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="bento-grid">
        <article className="bento-card bento-card-large accent-lime">
          <span className="metric">4.24</span>
          <h3>학업 지속성</h3>
          <p>가천대학교 인공지능학과, 전체 GPA 4.24와 직전학기 4.5. 국가우수장학금 이공계 수혜.</p>
        </article>
        <article className="bento-card accent-coral">
          <span className="metric">PM</span>
          <h3>문제 정의</h3>
          <p>사용자 관찰과 회고 자료를 기반으로 문제, 가치, 실행 범위를 분리합니다.</p>
        </article>
        <article className="bento-card accent-cobalt">
          <span className="metric">API</span>
          <h3>실행 연결</h3>
          <p>React, FastAPI, Supabase, LLM API, 자동화 스크립트를 제품 흐름으로 묶습니다.</p>
        </article>
        <article className="bento-card accent-mint">
          <span className="metric">Trust</span>
          <h3>근거 기반 문장</h3>
          <p>확인된 내용과 확인 필요한 기여를 나눠 과장 없는 포트폴리오 문장을 만듭니다.</p>
        </article>
      </div>
    </section>
  );
}

function CapabilityMatrix() {
  return (
    <section className="section section-contrast" aria-labelledby="capability-title">
      <div className="section-heading">
        <p className="eyebrow">Capability Matrix</p>
        <h2 id="capability-title">정성 역량과 기술 실행을 같이 보여줍니다</h2>
      </div>
      <div className="matrix">
        <div className="matrix-column">
          <h3>Discovery & Narrative</h3>
          <ul>
            <li>고객 인터뷰와 회고에서 문제 신호 추출</li>
            <li>문제, 사용자 맥락, 세일즈 메시지를 분리</li>
            <li>지원서에 바로 쓸 수 있는 근거 기반 문장화</li>
          </ul>
        </div>
        <div className="matrix-column">
          <h3>Build & Integrate</h3>
          <ul>
            <li>React/Vite, Next.js, Tailwind, CSS Module 화면 구현</li>
            <li>FastAPI, Supabase, Google OAuth, CLI 백엔드 흐름</li>
            <li>Claude, EXA, Telegram, GCS API 기반 자동화</li>
          </ul>
        </div>
        <div className="matrix-column">
          <h3>Operate & Verify</h3>
          <ul>
            <li>PR, issue, branch, README, 배포 문서 기반 협업</li>
            <li>피드백 점수, retry, rollback이 있는 자동화 루프</li>
            <li>민감정보와 미확인 기여를 분리하는 공개 원칙</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section" aria-labelledby="timeline-title">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2 id="timeline-title">배경과 기본 정보</h2>
      </div>
      <div className="profile-grid">
        <article className="profile-panel">
          <h3>Education</h3>
          <p>
            <strong>{data.profile.education.school}</strong> {data.profile.education.major}
          </p>
          <p>{data.profile.education.gpa}</p>
          <p>{data.profile.education.scholarship}</p>
        </article>
        <article className="profile-panel">
          <h3>Experience</h3>
          {data.profile.experience.map((item) => (
            <div className="timeline-item" key={`${item.period}-${item.title}`}>
              <span>{item.period}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </article>
        <article className="profile-panel">
          <h3>Strengths</h3>
          <ul className="clean-list">
            {data.profile.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function HomePage({ theme }: { theme: Theme }) {
  return (
    <>
      <Hero theme={theme} />
      <SignalBoard />
      <CapabilityMatrix />
      <Timeline />
      <ContactBand />
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = getStatus(project.status);

  return (
    <a
      className="project-card"
      href={`#/projects/${project.slug}`}
      aria-label={`${project.title} 문제와 근거 보기`}
    >
      <div className="project-card-top">
        <span className="period">{project.period}</span>
        <span className={`status-badge status-${project.status}`}>{status.label}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p>{project.summary}</p>
      <TagList tags={project.tags} />
      <span className="text-link">문제·근거 보기</span>
    </a>
  );
}

function ProjectsPage({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) {
  const projects = useMemo(() => {
    const sorted = data.projects.slice().sort((a, b) => a.priority - b.priority);
    if (selectedFilter === "전체") return sorted;
    return sorted.filter((project) => project.tags.includes(selectedFilter));
  }, [selectedFilter]);

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Projects</p>
        <h1>문제, 고객 맥락, 기술 실행을 함께 보여주는 프로젝트</h1>
        <p>카드는 빠르게 스캔하고, 상세 페이지에서는 문제 정의와 근거 상태를 확인할 수 있습니다.</p>
      </section>
      <section className="section section-tight">
        <div className="filter-bar" role="toolbar" aria-label="프로젝트 필터">
          {data.filters.map((filter) => (
            <button
              className={`filter-button${filter === selectedFilter ? " selected" : ""}`}
              type="button"
              aria-pressed={filter === selectedFilter}
              data-filter={filter}
              key={filter}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

function DetailSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function DetailList({ items }: { items?: string[] }) {
  if (!items || !items.length) {
    return <p className="muted">추가 확인 필요</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function RoiBoard({ project }: { project: Project }) {
  const inputMetrics = project.roiMetrics.filter((metric) => metric.kind === "input");
  const outputMetrics = project.roiMetrics.filter((metric) => metric.kind !== "input");

  return (
    <section id="roi" className="roi-section" aria-labelledby="roi-title">
      <div className="detail-section-heading">
        <div>
          <p className="eyebrow">Efficiency & ROI</p>
          <h2 id="roi-title">투입한 노력은 어떤 결과로 이어졌나</h2>
        </div>
        <p>수치의 근거 상태와 역할 범위를 함께 표시했습니다.</p>
      </div>
      <div className="roi-flow">
        <div className="roi-lane roi-lane-input">
          <div className="roi-lane-heading">
            <span>Input</span>
            <strong>내가 통제한 시간과 행동</strong>
          </div>
          <div className="roi-grid">
            {inputMetrics.map((metric) => (
              <article className={`roi-card roi-${metric.kind}`} key={`${metric.label}-${metric.value}`}>
                <span className="roi-card-badge">{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="roi-flow-arrow" aria-hidden="true">
          <span>→</span>
          <small>전환</small>
        </div>
        <div className="roi-lane roi-lane-output">
          <div className="roi-lane-heading">
            <span>Output</span>
            <strong>만들어낸 결과와 변화</strong>
          </div>
          <div className="roi-grid">
            {outputMetrics.map((metric) => (
              <article className={`roi-card roi-${metric.kind}`} key={`${metric.label}-${metric.value}`}>
                <span className="roi-card-badge">{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributionBoard({ project, status }: { project: Project; status: StatusLabel }) {
  const contribution = project.contribution;

  return (
    <DetailSection id="role" title="My Role & Contribution">
      <div className="contribution-grid">
        <div className="contribution-summary">
          <p className="contribution-kicker">Contribution Level</p>
          <strong>{contribution.level}</strong>
          <span>{contribution.ownership}</span>
          {typeof contribution.percentage === "number" && (
            <div className="contribution-meter">
              <div className="contribution-meter-label">
                <span>역할 오너십</span>
                <strong>{contribution.percentage}%</strong>
              </div>
              <div
                className="contribution-meter-track"
                role="progressbar"
                aria-label={`${project.title} 역할 오너십`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={contribution.percentage}
              >
                <span style={{ width: `${contribution.percentage}%` }} />
              </div>
              {contribution.percentageBasis && <small>{contribution.percentageBasis}</small>}
            </div>
          )}
          {typeof contribution.percentage !== "number" && contribution.percentageBasis && (
            <div className="contribution-unknown">
              <span>기여율</span>
              <strong>임의 산정하지 않음</strong>
              <small>{contribution.percentageBasis}</small>
            </div>
          )}
          <div className="contribution-verification">
            <span className={`status-badge status-${project.status}`}>{status.label}</span>
            <p>{status.description}</p>
          </div>
        </div>
        <div className="contribution-detail">
          <div>
            <p className="contribution-kicker">내가 맡은 범위</p>
            <DetailList items={contribution.scope} />
          </div>
          <div>
            <p className="contribution-kicker">역할 근거</p>
            <p>{project.role}</p>
          </div>
        </div>
      </div>
    </DetailSection>
  );
}

function DeepDiveSection({ project }: { project: Project }) {
  const story = [
    {
      step: "01",
      label: "Problem",
      title: "문제 직면",
      description: project.problem,
    },
    {
      step: "02",
      label: "Qualitative Effort",
      title: "정성적 노력",
      description: project.customerContext,
    },
    {
      step: "03",
      label: "Solution",
      title: "해결 방식",
      description: project.planningNarrative,
    },
    {
      step: "04",
      label: "Outcome",
      title: "성과와 설득 포인트",
      description: project.salesNarrative,
    },
  ];

  return (
    <DetailSection id="deep-dive" title="Deep Dive & Qualitative Highlight">
      <div className="story-flow">
        {story.map((item) => (
          <article className="story-step" key={item.step}>
            <div className="story-index">{item.step}</div>
            <div>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="highlight-board">
        {project.qualitativeHighlights.map((highlight) => {
          const [label, ...body] = highlight.split(":");
          const hasLabel = body.length > 0;
          return (
            <article key={highlight}>
              <span>{hasLabel ? label : "Highlight"}</span>
              <p>{hasLabel ? body.join(":").trim() : highlight}</p>
            </article>
          );
        })}
      </div>
    </DetailSection>
  );
}

function Retrospective({ project }: { project: Project }) {
  return (
    <DetailSection id="retrospective" title="Retrospective">
      <div className="retrospective-grid">
        <article>
          <span>Learned</span>
          <h3>이번 경험이 바꾼 기준</h3>
          <DetailList items={project.lessons} />
        </article>
        <article>
          <span>Next Iteration</span>
          <h3>다시 한다면 더 검증할 것</h3>
          <DetailList items={project.improvements} />
        </article>
      </div>
    </DetailSection>
  );
}

function ProjectMediaGallery({ media }: { media?: Project["media"] }) {
  if (!media || !media.length) {
    return null;
  }

  return (
    <DetailSection title="Project Images">
      <div className="media-grid">
        {media.map((item) => (
          <figure className="media-card" key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </DetailSection>
  );
}

function DetailNav() {
  const links = [
    ["roi", "ROI"],
    ["role", "기여도"],
    ["deep-dive", "Deep Dive"],
    ["execution", "실행"],
    ["retrospective", "회고"],
    ["evidence", "근거"],
  ] as const;

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="detail-nav" aria-label="프로젝트 상세 섹션">
      {links.map(([id, label]) => (
        <button key={id} type="button" onClick={() => scrollToSection(id)}>
          {label}
        </button>
      ))}
    </nav>
  );
}

function ProjectDetailPage({ slug }: { slug: string }) {
  const project = data.projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  const status = getStatus(project.status);

  return (
    <article className="detail-page">
      <a className="back-link" href="#/projects">
        프로젝트 목록으로 돌아가기
      </a>
      <header className="detail-hero">
        <div className="detail-hero-copy">
          <p className="eyebrow">
            {project.period} · {status.label}
          </p>
          <h1>{project.title}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>
          <p className="detail-summary">{project.summary}</p>
          <TagList tags={project.tags} />
        </div>
        <aside className="detail-status">
          <span>My Contribution</span>
          <strong>{project.contribution.level}</strong>
          <p>{project.contribution.ownership}</p>
          <span className={`status-badge status-${project.status}`}>{status.label}</span>
        </aside>
      </header>
      <RoiBoard project={project} />
      <div className="detail-layout">
        <DetailNav />
        <div className="detail-content">
          <ContributionBoard project={project} status={status} />
          <DeepDiveSection project={project} />
          <DetailSection id="execution" title="Execution & Technical Decisions">
            <div className="execution-grid">
              <div>
                <p className="contribution-kicker">실행 범위</p>
                <DetailList items={project.executionScope} />
              </div>
              <div>
                <p className="contribution-kicker">작업 흐름</p>
                <DetailList items={project.architectureNotes} />
              </div>
            </div>
            <div className="technical-band">
              <span>Technical Highlights</span>
              <TagList tags={project.technicalHighlights} strong />
            </div>
          </DetailSection>
          <ProjectMediaGallery media={project.media} />
          <Retrospective project={project} />
          <DetailSection id="evidence" title="근거 자료">
            <EvidenceList ids={project.evidenceIds} />
          </DetailSection>
        </div>
      </div>
    </article>
  );
}

function CredentialsPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Credentials</p>
        <h1>자격증과 증빙 상태</h1>
        <p>자격 사항과 공개 사본으로 확인 가능한 증빙을 함께 정리했습니다.</p>
      </section>
      <section className="section section-tight">
        <div className="credential-grid">
          {data.credentials.map((credential) => {
            const evidence = getEvidence(credential.evidenceId);
            return (
              <article className="credential-card" key={credential.evidenceId}>
                <span>{credential.date}</span>
                <h2>{credential.title}</h2>
                <p>{credential.issuer}</p>
                <EvidenceList ids={evidence ? [evidence.id] : []} compact />
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ContactBand() {
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <p className="eyebrow">Contact</p>
      <h2 id="contact-band-title">채용 담당자가 바로 연락할 수 있게</h2>
      <p>프로젝트 맥락과 근거 자료를 확인한 뒤 바로 대화를 이어갈 수 있도록 이메일 연락 동선을 남겼습니다.</p>
      <a className="button button-primary" href={`mailto:${data.profile.email}`}>
        {data.profile.email}
      </a>
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1>프로젝트를 확인한 뒤 바로 연락할 수 있습니다</h1>
        <p>지원 직무와 맞는 프로젝트 맥락을 함께 확인하고 이메일로 대화를 이어갈 수 있습니다.</p>
      </section>
      <section className="section section-tight">
        <div className="contact-grid">
          <article className="contact-card">
            <h2>Email</h2>
            <p>{data.profile.email}</p>
            <a className="button button-primary" href={`mailto:${data.profile.email}`}>
              이메일로 연락하기
            </a>
          </article>
          <article className="contact-card">
            <h2>함께 보면 좋은 자료</h2>
            <ul>
              <li>
                <a href="#/projects">대표 프로젝트와 근거</a>
              </li>
              <li>
                <a href="#/projects/windmill">WindMill 상세 사례</a>
              </li>
              <li>
                <a href="#/credentials">자격증 증빙</a>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="page-intro">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>프로젝트 목록에서 다시 선택해 주세요.</p>
      <a className="button button-primary" href="#/projects">
        프로젝트 목록
      </a>
    </section>
  );
}

function Page({
  route,
  theme,
  selectedFilter,
  setSelectedFilter,
}: {
  route: string;
  theme: Theme;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) {
  if (route === "/" || route === "") return <HomePage theme={theme} />;
  if (route === "/projects") {
    return <ProjectsPage selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />;
  }
  if (route.startsWith("/projects/")) {
    return <ProjectDetailPage slug={route.replace("/projects/", "")} />;
  }
  if (route === "/credentials") return <CredentialsPage />;
  if (route === "/contact") return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  const [route, setRoute] = useState(getCurrentRoute);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    function handleHashChange() {
      setRoute(getCurrentRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = route.startsWith("/projects/") ? "프로젝트 상세 · 송채우 Portfolio" : "송채우 Portfolio";
  }, [route]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <>
      <Header route={route} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Page route={route} theme={theme} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      </main>
      <Footer />
    </>
  );
}
