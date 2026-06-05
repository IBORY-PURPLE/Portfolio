# Portfolio

송채우 인턴 지원용 정적 포트폴리오 웹사이트입니다.

## Evidence Architecture

### Before

- 증빙 카드가 Google Drive 원본 링크에 의존했습니다.
- 방문자가 Drive 권한이나 로그인 상태에 막히면 프로젝트 근거를 바로 확인하기 어려웠습니다.
- Markdown과 PDF가 새 탭 또는 다운로드 흐름으로 빠져 포트폴리오 안의 전환 흐름이 끊겼습니다.

### After

- 공개 가능한 증빙 파일을 `public/evidence/`에 내재화했습니다.
- Vercel 정적 배포에서 `/evidence/<file>` 경로로 PDF, Markdown, 이미지를 즉시 제공합니다.
- 프로젝트 상세 화면에서 Markdown은 Notion 스타일 문서 뷰어로, PDF는 페이지 이동이 있는 인라인 뷰어로 확인합니다.
- 민감정보가 포함된 기본정보 파일은 `private` 상태로 남겨 사이트에 직접 렌더링하지 않습니다.

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
- `public/assets/portfolio-hero-dark.png`: imagegen으로 생성한 다크모드 hero bitmap
- `public/evidence/`: 배포 방문자가 로그인 없이 볼 수 있는 PDF, Markdown, 이미지 Evidence 공개 사본
- `scripts/sync-evidence-assets.ps1`: 공개 증빙을 `public/evidence/`로 다시 동기화하는 운영용 스크립트
- `docs/EVIDENCE_ASSETS.md`: 증빙 자산 manifest와 QA gate
- `docs/DEVELOPMENT_PLAN.md`: 개발 계획

## QA Feedback Loop

- 발견: QA 점검에서 `public/evidence` 폴더에 안내 파일만 있고 실제 PDF/MD 자산이 없어, 데이터의 `assetUrl`이 배포에서 깨질 수 있음을 확인했습니다.
- 대응: Drive에서 공개 가능한 증빙을 내려받아 `public/evidence`에 배치하고, 데이터의 근거 URL을 내부 정적 경로로 교체했습니다.
- 추가 보정: Markdown 기여 문서에 노출된 개인 이메일 문자열을 제거하고, 예시 토큰은 `{TOKEN}` 형태의 플레이스홀더만 남겼습니다.
- 발견: QA 에이전트가 여러 PDF를 오가면 이전 문서의 페이지 번호가 다음 문서에 남을 수 있는 리스크를 잡았습니다.
- 대응: PDF 파일이 바뀌면 미리보기를 1페이지로 리셋하고, Evidence 선택 패널을 PDF/Markdown 탭 구조로 정리했으며, 확대/축소와 다운로드 fallback을 추가했습니다.
- 검증: `npm run check`, `npm run build`, Evidence 자산 검증, 주요 화면 데스크톱/모바일 확인을 완료 기준으로 둡니다.
