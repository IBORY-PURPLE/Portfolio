# Portfolio

송채우 인턴 지원용 정적 포트폴리오 웹사이트입니다.

## 실행

```powershell
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 확인합니다.

## 배포

```powershell
npm run build
```

Vercel은 `vercel.json`의 설정에 따라 `dist` 폴더를 배포합니다.

## 구성

- `index.html`: Vite HTML entry
- `vite.config.ts`: Vite + React 설정
- `tsconfig.json`: TypeScript strict 설정
- `styles.css`: 반응형 UI와 디자인 토큰
- `src/main.tsx`: React 앱 mount entry
- `src/App.tsx`: hash routing, project filter, page rendering
- `src/data.ts`: profile, projects, credentials, evidence registry와 타입
- `public/assets/portfolio-hero-minimal.png`: 미니멀 hero bitmap
- `public/evidence/`: 배포 방문자가 로그인 없이 볼 수 있는 Evidence 공개 사본
- `docs/DEVELOPMENT_PLAN.md`: 개발 계획
