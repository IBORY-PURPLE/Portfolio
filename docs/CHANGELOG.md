# CHANGELOG

이 문서는 포트폴리오 사이트의 자료 반영, UI/UX 개선, 리팩토링 이력을 기록합니다.

## Git Version Map

| Version | Commit | Use when | Safe rollback |
| --- | --- | --- | --- |
| 0.8.2 | `pending` | Identity-oriented hero, full-visibility project covers, faster project scan | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.8.1 | `pending` | Clean project covers without image-overlay cover-type marks | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.8.0 | `pending` | Footstep verified contribution, safer evidence-backed covers, mobile detail readability | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.7.2 | `bcf9748d5989bbc651f13694939e8340ca5b88ea` | Vercel Git integration auto deployment with GitHub Actions validation | Disconnect the Vercel Git repository and restore the token-based workflow only if custom CI deployment is required |
| 0.7.1 | `pending` | WindMill actual product-interface cover | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.7.0 | `pending` | Representative project rank 1-4, AgenticLinkedIn/고립된 바다 분리, Deep Dive accordion | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.6.0 | `pending` | Baseframe-inspired editorial redesign, contextual project cover images, image-first home/index/detail | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.5.0 | `pending` | Toss recruiter/UI reviewer feedback loop, verified core case hierarchy, value-first hero, AGENTS.md operating rules | Keep local diff or commit, then replace `pending` with the commit SHA |
| 0.4.0 | `1b7116d4e848fafbc791931fbd784684f9560f25` | Evidence 영역에서 PDF/Markdown 선택과 미리보기를 명확하게 보여주는 버전 | `git revert 1b7116d` |
| 0.3.0 | `a855a7f08a17132c03a8782b77d29106b9a59129` | 공개 Evidence 자산 내장, PDF/Markdown 뷰어, 다크/라이트 토글이 반영된 기준 버전 | `git revert a855a7f` |
| 0.2.0 | `7dd3b42` 이후 자료 확장 기준 | Drive 자료 기반 프로젝트 확장과 초기 포트폴리오 구조 확인용 | 이후 커밋을 선택적으로 `git revert` |

> 특정 시점의 파일 상태를 보기만 하려면 `git switch --detach <commit>`을 사용할 수 있습니다. 작업을 되돌릴 때는 기존 기록을 보존하는 `git revert <commit>`을 우선 사용하세요.

## [0.8.2] - 2026-06-14

Git commit: `pending`

### Summary

- 홈 히어로를 공사 기성청구 콘셉트 UI에서 송채우가 팀과 함께 제품 경험을 만드는 Oishifood 협업 이미지로 교체했습니다.
- 텍스트와 인물이 포함된 가로형 커버를 화면마다 강제 확대하지 않고, 필요한 프로젝트만 축소해 전체 구도가 보이도록 변경했습니다.
- 프로젝트 소개 영역과 첫 섹션 간격을 압축해 대표 사례가 첫 스크롤 안에 보이도록 채용 스캔 속도를 개선했습니다.

### Agent Feedback Incorporated

- Toss recruiter reviewer:
  - P0: 기성청구 콘셉트 UI가 실제 완성 제품처럼 보일 수 있습니다. Acceptance: 히어로에서 제거하고, 검증된 기성청구 사례는 Selected Work 1순위와 `Team Result` 표현으로 유지했습니다.
  - P1: 프로젝트명·인물·핵심 오브젝트가 강제 크롭되고 첫 사례 접근이 늦습니다. Acceptance: 텍스트/인물 커버는 `contain`, 프로젝트 인덱스는 `16:9`, 첫 이미지와 제목은 데스크톱·모바일 첫 스크롤 안에 배치했습니다.
- UI/UX lead reviewer:
  - P1: 홈·Selected Work·인덱스·상세가 하나의 중앙 `cover` 규칙을 공유해 화면별 가시성이 불안정합니다. Acceptance: 프로젝트별 `selectedWork / index / detail / mobile` fit·position 설정을 지원하고 첨부 화면의 핵심 콘텐츠를 전체 노출했습니다.
  - P1: 모바일 4:3 강제 크롭과 큰 커버 높이가 탐색 밀도를 낮춥니다. Acceptance: 프로젝트 인덱스와 상세 커버를 모바일 포함 `16:9`로 통일했습니다.
- Post-check:
  - 이미지 가시성, 과장 위험, 역할/팀 결과 구분, 다크/라이트 모드, 주요 이미지 성능은 통과했습니다.
  - 프로젝트 접근 속도 P1은 소개 영역 압축 후 첫 스크롤 기준을 충족하도록 보완했습니다.
  - 1440×900 CTA 경계값 P1은 짧은 데스크톱 압축 범위를 확장해 해결했으며, Toss recruiter와 UI/UX lead 최종 재검토에서 남은 actionable P0/P1이 없습니다.

### Added

- `Profile.heroImage` 데이터와 72,738 byte WebP 히어로 자산 `public/assets/portfolio-identity.webp`를 추가했습니다.
- `ProjectCover.placements`에 화면별 `fit`, `position`, 모바일 override 설정을 추가했습니다.

### Changed

- 홈 히어로 이미지는 프로젝트 링크가 아닌 본인의 협업 방식을 설명하는 이미지와 짧은 캡션으로 변경했습니다.
- 기성청구, 1인 창작자, Daily Snippet, 고립된 바다, Oishifood 커버를 관련 화면에서 `contain`으로 표시합니다.
- 프로젝트 인덱스와 모바일 상세 이미지 프레임을 `16:9`로 변경했습니다.
- 높이 920px 이하의 데스크톱에서는 히어로 여백과 제목 크기를 압축해 CTA가 첫 화면에 남도록 했습니다.
- 프로젝트 페이지 소개와 첫 섹션 상단 간격을 줄여 첫 사례 접근 시간을 단축했습니다.
- 다섯 커버 WebP를 구도 변경 없이 재압축해 각각 약 49~113KB로 줄였습니다.

### Verification

- `npm run check`: passed (`tsc --noEmit`).
- `npm run lint`: passed (`eslint .`).
- `npm run build`: passed. Output: `dist/index.html` 1.60 kB (gzip 0.86 kB), CSS 71.12 kB (gzip 12.59 kB), JS 747.56 kB (gzip 137.32 kB).
- `git diff --check`: passed with CRLF conversion warnings only.
- Referenced home hero + Selected Work image total: 296,162 bytes (289.2KB).
- Image QA: optimized hero and five referenced covers visually inspected; project text and people remained readable.
- Browser QA:
  - 1280×720 home: identity hero uses `contain`, CTA bottom 692px, hero height 658px, no horizontal overflow.
  - 1440×900 home: CTA bottom 872px, no horizontal overflow.
  - 375×812 home: identity hero uses `contain`, CTA bottom 664px, no horizontal overflow.
  - Projects at 375, 768, 1280, and 1440px: designated covers use `contain`, project frames use `16:9`, no horizontal overflow.
  - Project detail at 375×812: designated cover uses `contain` in a 332×187 frame, no horizontal overflow.
  - Projects scan speed after compression: first image/title top 1061/1112px at 1280×720 and 881/1133px at 375×812, within the first scroll.
  - Dark mode: designated detail cover remained `contain`; theme toggle and no-overflow state preserved.

### Residual Risks

- 히어로의 팀 이미지는 본인의 협업 방식을 보여주지만, 처음 보는 채용 담당자가 사진 속 송채우를 즉시 식별하기는 어려울 수 있습니다.
- `contain` 커버는 핵심 콘텐츠를 보존하는 대신 원본 비율과 프레임 비율 차이에 따라 얇은 여백이 보일 수 있습니다.
- Oishifood 협업 이미지는 기존 공개 커버를 기반으로 사용했으며, 향후 실제 고객 인터뷰·발표 장면이 확보되면 더 직접적인 개인 서사 이미지로 교체하는 편이 좋습니다.
- 초기 JS 번들 747.56 kB와 이번 범위 밖의 일부 상세 이미지 용량은 추후 코드 분할·추가 WebP 최적화 대상입니다.

## [0.8.1] - 2026-06-13

Git commit: `pending`

### Summary

- 홈 히어로, Selected Works, 프로젝트 목록의 커버 이미지 위에 표시되던 `Concept visual · AI-generated` 등 커버 유형 마크를 제거했습니다.
- 커버 유형 데이터와 상세 페이지 이미지 아래 출처 설명은 유지해 생성형 콘셉트와 실제 제품·근거 이미지를 구분할 수 있게 했습니다.

### Agent Feedback Incorporated

- Toss recruiter reviewer:
  - P1: 이미지 위 마크가 Role과 Result보다 먼저 눈에 들어오고, 제거 범위가 홈 히어로·Selected Works·프로젝트 목록 중 일부만 누락될 수 있습니다. Acceptance: 세 표면의 모든 커버 유형 오버레이를 제거하고 검증 상태, 프로젝트 순서, Role, Result는 유지했습니다.
  - Post-check: 남은 P0/P1 없음. 상세 페이지 커버 유형 설명과 Actual Evidence CTA가 유지되어 과장·오인 방지 장치가 보존됐습니다.
- UI/UX lead reviewer:
  - P1: 작은 대문자 오버레이가 이미지 초점을 가리고 모바일에서 읽기 어렵습니다. Acceptance: 오버레이 요소와 전용 스타일을 제거하고 카드 링크, CTA, 호버, 상세 캡션은 유지했습니다.
  - Post-check: 남은 P0/P1 없음. 모바일에서도 잔여 스타일이나 빈 여백이 없습니다.

### Added

- 새 UI 요소나 자산은 추가하지 않았습니다.

### Changed

- 홈 히어로의 `Featured case · ... · cover type` 하단 오버레이를 제거했습니다.
- Selected Works와 프로젝트 목록의 이미지 우측 하단 커버 유형 `figcaption` 오버레이를 제거했습니다.
- 제거된 오버레이 전용 CSS를 정리하고, 상세 페이지의 이미지 아래 커버 유형 캡션은 유지했습니다.

### Verification

- `npm run check`: passed (`tsc --noEmit`).
- `npm run lint`: passed (`eslint .`).
- `npm run build`: passed; generated `dist/index.html` 1.60 kB (gzip 0.86 kB), CSS 69.32 kB (gzip 12.28 kB), and JS 746.09 kB (gzip 137.04 kB).
- `git diff --check`: passed with CRLF conversion warnings only.
- Browser QA:
  - Desktop 1280×720 home: hero cover overlay count `0`; no horizontal overflow.
  - Desktop projects: 11 project covers, overlay count `0`, visible cover-type overlay text count `0`; no horizontal overflow.
  - Mobile 375×812 home and projects: overlay count `0`; no horizontal overflow.
  - Light and dark themes: cover overlay count `0`.
  - Mobile project detail: image-overlay count `0`; image-below detail label `Concept visual · AI-generated` preserved; no horizontal overflow.
- Toss recruiter and UI/UX lead final re-review: no remaining P0/P1.

### Residual Risks

- 히어로 이미지는 전체가 프로젝트 링크이지만, 마크 제거 후 클릭 가능성을 알리는 시각적 단서는 데스크톱 호버 확대와 링크 커서뿐입니다. 모바일에서는 발견성이 낮을 수 있어 추후 이미지 밖 프로젝트명 링크를 검토할 수 있습니다.

## [0.8.0] - 2026-06-12

Git commit: `pending`

### Summary

- 사용자 확인과 공개 GitHub 기록을 바탕으로 Footstep을 확인 필요 사례에서 검증된 React 프론트엔드 협업 사례로 전환했습니다.
- 프로젝트 필터와 모바일 상세 요약 레이아웃을 다듬고, 새 커버 이미지를 근거 안전성과 로딩 성능 기준으로 재검토했습니다.

### Agent Feedback Incorporated

- Toss recruiter reviewer:
  - P1: AgenticLinkedIn 생성형 커버의 `98.2%`, `156 tasks`, `24 teams`는 공개 근거로 확인되지 않은 성과처럼 보일 수 있습니다. Acceptance: 실제 발표자료 표지를 사용하고 `Presentation evidence`로 표시했습니다.
  - P1: Footstep의 검증 상태 상향은 본인 계정 확인 범위를 넘지 않아야 합니다. Acceptance: `IBORY-PURPLE` 공개 기록에서 확인되는 Footer, ProfileSetting/API, 댓글 UI만 주장하고 `CHAEWOOSONG`, Figma, Notion 범위는 확인 필요로 유지했습니다.
- UI/UX lead reviewer:
  - P1: 새로 참조되는 WebP 커버 4장의 합계가 약 7.4MB로 첫 화면과 프로젝트 목록 로딩에 부담을 줍니다. Acceptance: 참조 커버를 WebP 재압축하거나 기존 최적화본으로 복원해 합계를 약 357KB로 줄였습니다.
  - P1: 모바일 상세 상단의 2열 Brief 카드가 좁고 읽기 어렵습니다. Acceptance: 모바일에서는 1열로 쌓이고 마지막 카드 하단선이 중복되지 않습니다.

### Added

- `ProjectCover.kind`에 실제 발표자료 기반 커버를 구분하는 `evidence` 유형과 `Presentation evidence` 라벨을 추가했습니다.

### Changed

- Footstep을 `verified` 보조 사례로 이동하고 공개 GitHub 기록에서 확인된 구현·협업 범위로 서술을 갱신했습니다.
- `보조 사례` 필터가 Growth 태그만이 아니라 우선순위 5 이후의 모든 Additional Evidence를 보여주도록 변경했습니다.
- AgenticLinkedIn 커버를 확인되지 않은 수치가 포함된 생성형 대시보드에서 실제 발표자료 표지로 교체했습니다.
- Footstep, AgenticLinkedIn, Daily Snippet 커버를 WebP로 재압축하고, 1인 창작자 커버는 개인정보처럼 보이는 숫자 문자열이 없는 기존 최적화본을 유지했습니다.

### Verification

- `npm run check`: passed (`tsc --noEmit`).
- `npm run lint`: passed (`eslint .`).
- `npm run build`: passed; generated `dist/index.html` 1.60 kB (gzip 0.86 kB), CSS 69.85 kB (gzip 12.34 kB), and JS 746.54 kB (gzip 137.09 kB).
- `npm audit --audit-level=high`: passed with `found 0 vulnerabilities`.
- `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`: passed; all evidence assets were present.
- `git diff --check`: passed with CRLF conversion warnings only.
- Referenced project-cover total: 356,844 bytes; optimized WebP covers visually inspected successfully.
- Toss recruiter final re-review: no remaining P0/P1 after replacing unsupported AgenticLinkedIn visual metrics and keeping Footstep verification within the confirmed `IBORY-PURPLE` contribution scope.
- UI/UX lead final re-review: no remaining P0/P1 after cover optimization and the mobile Brief grid change.
- Local browser QA was interrupted before the preview server persisted; GitHub Actions, Vercel Production deployment, and production browser QA will be confirmed after push.

### Residual Risks

- Footstep 외부 사용자 반응과 배포 성과는 확인 근거가 없어 주장하지 않습니다.
- Footstep의 `CHAEWOOSONG`, Figma frame, Notion 문서 담당 범위는 추가 확인이 필요합니다.
- 참조되지 않는 로컬 커버 백업 파일 3개와 QA 임시 폴더는 정확한 경로를 `.gitignore`에 추가해 이번 커밋에서 제외합니다.

## [0.7.2] - 2026-06-12

Git commit: `bcf9748d5989bbc651f13694939e8340ca5b88ea`

### Summary

- Vercel 프로젝트를 `IBORY-PURPLE/Portfolio` GitHub 저장소에 직접 연결해 `main` 푸시가 토큰 없이 Production 배포를 자동 생성하도록 변경했습니다.
- GitHub Actions는 배포 토큰을 사용하는 대신 pull request와 `main` 푸시에서 품질 검증만 수행하도록 정리했습니다.

### Agent Feedback Incorporated

- 배포 운영 검토:
  - P1: 만료되거나 잘못 저장된 `VERCEL_TOKEN` 하나가 자동 배포 전체를 중단시키고 있었습니다. Acceptance: Vercel Git integration을 연결하고 Actions에서 토큰 기반 배포 단계를 제거했습니다.
  - P1: 기존 Actions는 Production 배포만 검증해 pull request 단계에서 회귀를 잡지 못했습니다. Acceptance: `main` 대상 pull request에서도 동일한 린트, 타입 검사, 보안 감사, 빌드를 실행합니다.

### Added

- Vercel 프로젝트의 Connected Git Repository에 `IBORY-PURPLE/Portfolio`를 연결했습니다.
- `vercel-production.yml`에 `pull_request` 검증 트리거를 추가했습니다.

### Changed

- GitHub Actions 워크플로 이름을 `Validate portfolio`로 변경했습니다.
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`에 의존하던 Vercel CLI 배포 단계를 제거했습니다.
- 기존 `vercel-production.yml`은 배포가 아닌 품질 검증 워크플로로 전환했습니다.

### Verification

- `npm run check`: pass (`tsc --noEmit`)
- `npm run lint`: pass (`eslint .`)
- `npm audit --audit-level=high`: pass (`found 0 vulnerabilities`)
- `npm run build`: pass. Output: `dist/index.html` 1.60 kB gzip 0.85 kB, `dist/assets/index-CHXkza4V.css` 69.85 kB gzip 12.34 kB, `dist/assets/index-CiO0ioNw.js` 746.48 kB gzip 137.08 kB.
- `git diff --check -- .github/workflows/vercel-production.yml docs/CHANGELOG.md`: pass with CRLF conversion warnings only.
- GitHub Actions `Validate portfolio #3`: pass in 31 seconds for commit `bcf9748`.
- Vercel Git integration: pass. Commit `bcf9748` created a Production deployment in 12 seconds and reached `Ready`.
- Production smoke test: pass. `https://portfolio-eight-pied-37.vercel.app/` loaded the portfolio home page after the deployment.

### Residual Risks

- Vercel GitHub App 연결 권한이나 Vercel 프로젝트의 Production Branch 설정이 이후 변경되면 자동 배포가 중단될 수 있습니다.
- 기존 GitHub 저장소의 `VERCEL_TOKEN` secret과 Vercel 관련 variables는 더 이상 워크플로에서 사용하지 않지만 저장소 설정에 남아 있을 수 있습니다.
- 로컬 환경의 `.git` 쓰기 권한이 차단되어 커밋은 GitHub 연결을 통해 원격 `main`에 생성했습니다. 로컬 브랜치는 원격 커밋을 아직 가리키지 않습니다.

## [0.7.1] - 2026-06-11

Git commit: `pending`

### Summary

- WindMill 생성형 3D 커버 대신 사용자가 제공한 실제 모바일 홈, 아바타 기반 포트폴리오, 뉴스 화면을 재구성한 에디토리얼 커버로 교체했습니다.
- GPT Image 2.0은 배경 질감과 조명 생성에만 사용하고, 실제 WindMill UI는 원본 픽셀을 그대로 합성한 고해상도 `v4` 커버로 업그레이드했습니다.

### Agent Feedback Incorporated

- Toss recruiter reviewer:
  - P1: 실제 구현 화면임이 즉시 보여야 하고 확인되지 않은 수익률이나 AI 성과를 새로 암시하면 안 됩니다. Acceptance: 제공된 실제 화면만 사용하고 별도 성과 문구나 생성형 금융 그래픽을 추가하지 않았습니다.
  - Post-check: P0/P1 추가 이슈 없음. 실제 제품 범위와 공개 근거의 연결이 기존 생성형 커버보다 명확합니다.
- UI/UX lead reviewer:
  - P1: 아이보리·검정·버건디 팔레트와 편집형 이미지 위계를 유지하고, 16:10/4:3/16:9 크롭에서 핵심 UI가 남아야 합니다. Acceptance: 실제 크롭 미리보기에서 모바일 홈, 포트폴리오 아바타, 뉴스 화면이 모두 식별됩니다.
  - Post-check: P0/P1 추가 이슈 없음. 모바일 목록의 4:3 크롭에서는 오른쪽 뉴스 카드 일부가 잘리지만 핵심 기능 범위는 유지됩니다.

### Added

- `public/assets/projects/covers/windmill-v3.webp`: 실제 WindMill 화면 2장을 결정론적으로 합성한 1600x1000 WebP 커버를 추가했습니다.
- `public/assets/projects/covers/windmill-v4.webp`: GPT Image 2.0 배경 플레이트 위에 실제 UI를 그대로 합성한 1920x1200 WebP 커버를 추가했습니다.
- `ProjectCover.kind`에 실제 제품 화면용 `product` 유형과 `Actual product interface` 라벨을 추가했습니다.

### Changed

- WindMill 커버 참조와 대체 텍스트를 실제 제품 인터페이스 기준으로 변경했습니다.
- WindMill 커버의 우측 원형 장식을 제거하고, 모바일 홈 캡처 좌상단의 포인터/깨진 패치를 깨끗한 실제 제품 로고로 복원했습니다.
- 직접 GPT Image 편집 시안은 제품 UI와 텍스트를 재구성해 폐기하고, 실제 UI를 보존하는 하이브리드 `windmill-v4.webp`로 커버 참조를 변경했습니다.

### Verification

- `npm run check`: pass (`tsc --noEmit`)
- `npm run lint`: pass (`eslint .`)
- `npm run build`: pass. Output: `dist/index.html` 1.58 kB gzip 0.87 kB, `dist/assets/index-DexwtO4X.css` 67.58 kB gzip 12.01 kB, `dist/assets/index-Ba2wdBg0.js` 744.59 kB gzip 136.60 kB.
- `git diff --check -- src\data.ts src\App.tsx docs\CHANGELOG.md`: pass with CRLF conversion warnings only.
- Generated cover validation: `windmill-v3.webp` is 1600x1000, 49,192 bytes, and uses only the two provided product screenshots plus deterministic layout decoration.
- Visual crop QA: 16:10, 4:3, and 16:9 crops show no top-right circular mark, broken white patch, or leftover capture border.
- GPT Image 2.0 hybrid cover validation: `windmill-v4.webp` is 1920x1200, 73,590 bytes. GPT Image was used only for the paper-texture/light background plate; the product UI layers remain the provided screenshots.
- Browser QA, upgraded desktop detail page: `windmill-v4.webp` loaded at natural size 1920x1200, displayed at 1217x684.5625, with no horizontal overflow.
- Browser QA, desktop detail page: cover loaded at natural size 1600x1000, displayed at 1217x684.5625, and showed `Actual product interface`.
- Browser QA, mobile 375x812 detail page: cover displayed at 332x249 with no horizontal overflow and retained the mobile home, portfolio avatar, and news UI.

### Residual Risks

- 원본 화면 캡처 해상도와 선명도가 제한적이므로 대형 고해상도 디스플레이에서는 일부 UI 텍스트가 부드럽게 보일 수 있습니다.
- 커버는 제공된 화면을 편집형으로 재구성한 이미지이며, 제품의 모든 화면과 기능을 대표하지는 않습니다.

## [0.7.0] - 2026-06-08

Git commit: `pending`

### Summary

- 대표 프로젝트 순위를 사용자 지정 기준으로 재정렬했습니다: 1위 공사 기성청구, 2위 1인 창작자, 3위 AgenticLinkedIn, 4위 GCS Pulse Daily Snippet.
- Google Drive에서 별도 폴더와 산출물이 확인된 AgenticLinkedIn을 독립 프로젝트로 추가하고, 기존 1차 피투미 항목은 고립된 바다/선원 문제 검증 사례로 분리했습니다.
- Deep Dive 섹션을 Appendix와 같은 펼침 패널로 변경하고, 상세 내비게이션의 Case 탭이 섹션을 열고 스크롤하도록 연결했습니다.

### Agent Feedback Incorporated

- Toss recruiter reviewer:
  - P1: 대표 1-4위는 모두 verified 프로젝트여야 하며, 확인 전 프로젝트가 Core Case Studies에 올라오면 안 됩니다. Acceptance: `priority` 1-4가 공사 기성청구, 1인 창작자, AgenticLinkedIn, Daily Snippet 순서이고 모두 `status: "verified"`입니다.
  - P1: 고립된 바다/선원 고객검증과 AgenticLinkedIn AI Native 데모가 한 카드에 섞이면 역할과 성과가 흐려집니다. Acceptance: `gcs-agentic-linkedin`과 `gcs-isolated-sea`가 별도 slug, 별도 evidenceIds, 별도 narrative를 갖습니다.
  - Post-check: P0/P1 추가 이슈 없음. AgenticLinkedIn의 개인별 구현 범위는 공개 Drive 근거만으로 단정하지 않도록 role 문장을 제한했습니다.
- UI/UX lead reviewer:
  - P1: Deep Dive가 접혀 있어도 상세 페이지 흐름을 끊지 않아야 합니다. Acceptance: `Case` 탭 클릭 시 Deep Dive가 열리고 `#deep-dive`로 스크롤합니다.
  - P1: Appendix와 같은 상호작용을 쓰되 모바일에서 버튼 텍스트가 겹치면 안 됩니다. Acceptance: `.detail-deep-dive > button`에 Appendix와 같은 responsive column rule을 적용했습니다.
  - Post-check: P0/P1 추가 이슈 없음. Headless screenshot QA는 Windows Chrome 권한 문제로 차단되어 서버 응답 검증으로 대체했습니다.

### Added

- `gcs-agentic-linkedin`: AgenticLinkedIn 독립 프로젝트 데이터와 Drive 기반 evidence 3개를 추가했습니다.
- `public/evidence/gcs-agentic-linkedin-slides.pdf`: 기존 피투미 파일명으로 섞여 있던 AgenticLinkedIn 발표 PDF를 분리했습니다.
- `public/assets/projects/covers/gcs-agentic-linkedin.webp`, `public/assets/projects/covers/gcs-isolated-sea.webp`: 두 프로젝트가 같은 파일명을 공유하지 않도록 WebP 커버 참조를 분리했습니다.
- Deep Dive accordion UI와 `DetailNav`의 Case 탭 open-and-scroll 동작을 추가했습니다.

### Changed

- `gcs-daily-snippet` priority를 4로 내리고, `gcs-llm-api-automation` 이하 Additional Evidence 순서를 한 칸씩 조정했습니다.
- 기존 `gcs-pitumi-ai-native` 프로젝트를 `gcs-isolated-sea`로 정리하고, 선원/고립된 바다 문제 검증 서사와 근거만 남겼습니다.
- `scripts/sync-evidence-assets.ps1`에서 AgenticLinkedIn PDF ID가 `gcs-agentic-linkedin-slides.pdf`로 저장되도록 수정했습니다.
- 고립된 바다 evidenceIds에서 AgenticLinkedIn PDF를 제거했습니다.

### Verification

- `npm run check`: pass (`tsc --noEmit`)
- `npm run lint`: pass (`eslint .`)
- `npm run build`: blocked after `tsc --noEmit`; Vite config loading failed with `Error: spawn EPERM`.
- `npm exec vite -- build --configLoader runner`: blocked with `Error: spawn EPERM`.
- `npm exec vite -- build --configLoader native`: blocked in Vite commonjs resolver with `spawn EPERM`.
- `npm exec vite -- --host 127.0.0.1 --port 4173 --strictPort --configLoader native`: dev server started at `http://127.0.0.1:4173/`; dependency pre-bundling logged `spawn EPERM`.
- `Invoke-WebRequest http://127.0.0.1:4173/`: 200 OK, length 1300.
- `Invoke-WebRequest http://127.0.0.1:4173/src/App.tsx`: 200 OK, length 188921.
- `Invoke-WebRequest -Method Head http://127.0.0.1:4173/evidence/gcs-agentic-linkedin-slides.pdf`: 200 OK, `application/pdf`, length 1056353.
- `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`: pass; `gcs-agentic-linkedin-slides.pdf` present, 1056353 bytes, 9 pages.
- `git diff --check`: pass with CRLF conversion warnings only.
- Chrome headless screenshot QA: blocked by Windows `CreateFile: 액세스가 거부되었습니다. (0x5)` and Chrome mojo/crashpad permission errors.

### Residual Risks

- AgenticLinkedIn의 Drive 메인 이미지는 shell download 인증 오류로 로컬 WebP 최적화까지 완료하지 못했습니다. 현재는 분리된 WebP 파일명을 사용하지만, 원본 이미지 접근 권한이 열리면 실제 Drive 메인 이미지를 WebP로 교체해야 합니다.
- Vite production build와 screenshot QA는 현재 Windows 실행 권한의 `spawn EPERM`/Chrome 권한 문제로 완전 검증하지 못했습니다.

## [0.6.0] - 2026-06-06

Git commit: `pending`

### Summary

- 공식 무료 Framer Marketplace 템플릿 `Baseframe`을 주 레퍼런스로 선정하고, 기존 개발자 대시보드형 UI를 이미지 중심 에디토리얼 포트폴리오로 전면 리팩토링했습니다.
- `Presenta`의 상세 페이지 흐름과 `Memento`의 다크/라임 감각을 보조 레퍼런스로 사용했습니다.
- 템플릿 소스나 브랜드 자산을 복제하지 않고, 대형 타이포·교차형 프로젝트 피드·얇은 구분선·넓은 여백이라는 이전 가능한 시각 문법을 기존 React/CSS에 재현했습니다.

### Agent Feedback Incorporated

- Framer research agent:
  - Winner로 공식 무료 `Baseframe`을 선정했습니다.
  - 프로젝트 이미지를 화면의 50% 이상 사용하는 피드, 대형 타이포, 상세 케이스 스터디 흐름을 적용했습니다.
- Project art-direction agent:
  - 10개 프로젝트별 대표 이미지 방향과 alt text를 설계했습니다.
  - `areum-stage-project`는 실제 공연 사진을 사용하고, 나머지 9개 프로젝트는 블랙·아이보리·라임의 종이 콜라주/3D 스타일로 생성했습니다.
- Frontend design lead:
  - bento/card/dashboard 요소를 제거하거나 시각적으로 낮추고, 이미지 우선 홈·목록·상세 구조로 전환했습니다.

### Added

- `Project.cover` 데이터 구조와 10개 프로젝트의 대표 이미지/alt text를 추가했습니다.
- `public/assets/projects/covers/`에 9개 생성형 프로젝트 커버 WebP를 추가했습니다.
- 홈에 교차형 Selected Work 피드와 한 줄 proof strip을 추가했습니다.
- 상세 페이지에 풀블리드 프로젝트 커버와 간결한 Role / Period / Outcome / Evidence 메타 스트립을 추가했습니다.

### Changed

- 히어로를 중앙 정렬 텍스트/작은 목업에서 비대칭 대형 타이포 + 대표 프로젝트 이미지 구조로 변경했습니다.
- 프로젝트 목록을 글자 중심 카드에서 이미지 우선 Core Case Study 행과 Additional Project 매거진 그리드로 변경했습니다.
- Capability/About/Contact 영역을 박스형 대시보드에서 borderless editorial section으로 변경했습니다.
- 상세 페이지의 상태 패널과 카드형 요약을 제거하고, 큰 이미지와 서사형 콘텐츠 흐름으로 변경했습니다.
- 생성 원본 PNG를 WebP로 최적화해 대표 이미지 합계 용량을 약 22MB에서 약 1.5MB로 줄였습니다.
- OG 이미지를 대표 공사 기성청구 프로젝트 커버로 변경했습니다.
- `npm run dev`를 Vite 개발 서버 대신 TypeScript 기반 로컬 QA 서버로 전환해, Windows 권한 환경에서 `esbuild spawn EPERM`과 `5173` 포트 권한 문제를 피하도록 했습니다.
- Vite production build는 native config loader, TypeScript transform plugin, React production alias, esbuild minify off 조합으로 조정했습니다.
- Node `.cjs` 스크립트가 앱 코드 린트 규칙과 충돌하지 않도록 ESLint의 `scripts/**/*.cjs` 범위를 추가했습니다.

### Verification

- `npm run check`: pass
- `npm run lint`: pass
- `git diff --check`: pass, line-ending warnings only
- `npm run build`: pass. Output: `dist/index.html` 1.58 kB gzip 0.87 kB, `dist/assets/index-DexwtO4X.css` 67.58 kB gzip 12.01 kB, `dist/assets/index-nsl07VtI.js` 744.47 kB gzip 136.54 kB.
- Local QA server probe: pass. In-process check returned HTTP 200 for `/`, `/bundle.js`, and `/evidence/gcs-daily-snippet-agent.md` on `http://127.0.0.1:4275`.
- Browser QA:
  - Desktop home: large editorial hero and project image split verified
  - Mobile 375×812 home: 51px single-row header, primary CTA visible, no horizontal overflow
  - Mobile projects: image-first cards and text-tab filter verified
  - Mobile project detail: full-width cover and metadata verified; horizontal overflow found and fixed
  - Dark mode: editorial palette and image cards verified
- Toss recruiter/UI lead final re-review: pending

### Residual Risks

- Generated cover images are contextual editorial artwork, not screenshots of the actual product. Detail evidence remains the source of factual verification.
- `npm run dev` now uses a lightweight local QA server without Vite HMR; reload manually after edits.
- Vite build disables esbuild minification in this environment to avoid `spawn EPERM`; current JS output is 744.47 kB before gzip and 136.54 kB after gzip.
- Final reviewer feedback must be recorded before release.

## [0.5.0] - 2026-06-06

Git commit: `pending`

### Summary

- Toss 채용 담당자 관점과 UI/UX 리드 관점의 1차 리뷰를 반영해, 포트폴리오를 "넓은 자기소개"가 아니라 "검증된 고객 문제 해결 사례" 중심으로 재정렬했습니다.
- Framer Marketplace 레퍼런스에서 가져온 카드형/케이스 스터디형 흐름은 유지하되, 현재 React/Vite 구조와 기존 evidence viewer, 필터, 다크/라이트 모드는 보존했습니다.

### Agent Feedback Incorporated

- Toss recruiter reviewer:
  - 히어로의 `PM, Developer, SW Salesman...` 식 넓은 정체성 표현을 제거하고 `PM/BD형 product builder` 포지셔닝으로 좁혔습니다.
  - 확인 전인 WindMill을 대표 슬롯에서 내리고, 공사 기성청구/1인 창작자/Daily Snippet/LLM API 자동화처럼 검증 근거가 있는 프로젝트를 Core Case Studies로 올렸습니다.
  - 카드 결과는 단순 evidence count보다 고객 문제, 행동, 외부 수요 신호 중심으로 다시 작성했습니다.
- UI/UX lead reviewer:
  - 홈 히어로를 이름 중심에서 가치 제안 중심으로 바꾸고, 이름은 보조 정보로 내렸습니다.
  - 프로젝트 카드를 긴 요약문 대신 Problem / Action / Result로 스캔 가능하게 정리했습니다.
  - 상세 페이지 상단에 Brief / Role / Outcome / Evidence 요약을 두고, 내비게이션 순서를 `Overview -> Problem -> Role -> Result -> Evidence -> Review`로 맞췄습니다.

### Added

- `AGENTS.md`: 향후 Codex 작업 시 Toss recruiter/UI reviewer 루프, 근거 기반 대표 사례 배치, CHANGELOG 기록 규칙을 명시했습니다.
- `Project` 데이터에 `headlineImpact`, `cardProblem`, `cardAction`, `cardResult`, `productSignal` 선택 필드를 추가했습니다.
- Projects 페이지의 `Core Case Studies`와 `Additional Evidence` 구분을 추가했습니다.

### Changed

- 히어로 카피를 `고객 문제를 검증하고 웹/API 프로토타입까지 만드는 PM/BD형 product builder`로 변경했습니다.
- 필터를 `전체 / PM·기획 / 고객검증 / 개발·자동화 / 협업·발표 / 보조 사례`로 줄이고, 내부 태그 그룹 매핑으로 동작하게 했습니다.
- 대표 사례 순서를 검증 상태와 채용 명확성 기준으로 재정렬했습니다.
- Project card, Selected work card, Project detail hero가 압축된 impact와 Problem / Action / Result를 우선 보여주도록 변경했습니다.
- 상세 ROI 보드를 `Role` 다음 `Result` 위치로 옮겨 내비게이션 흐름과 맞췄습니다.

### Verification

- Pending in current workspace. Update this section after `npm run check`, `npm run lint`, `npm run build`, and reviewer re-check finish.

### Residual Risks

- Pending reviewer re-check.
- Browser/mobile visual QA availability depends on the current Codex tool environment.

## [0.4.0] - 2026-06-05

Git commit: `1b7116d4e848fafbc791931fbd784684f9560f25`

### Added

- 프로젝트 상세 Evidence 영역에 PDF/Markdown 파일 선택 탭과 선택된 파일 미리보기 패널을 추가했습니다.
- Evidence 헤더에서 공개 사본 개수를 바로 보여주도록 했습니다.

### Changed

- 프로젝트 Evidence는 여러 파일을 세로로 모두 펼치지 않고, 채용 담당자가 PDF와 Markdown 근거를 직접 선택해 확인하는 흐름으로 정리했습니다.
- 모바일 Evidence 선택 영역을 가로 스크롤 가능한 파일 선택 줄로 바꿔 미리보기 본문이 더 빨리 보이게 했습니다.
- PDF 파일이 바뀔 때 페이지 상태를 1페이지 기준으로 안전하게 리셋하고, 페이지 범위를 벗어난 표시가 나오지 않게 했습니다.

### Verification

- `npm run check`
- `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`
- `npm run build`
- Browser QA: WindMill desktop/mobile PDF, WindMill desktop/mobile Markdown, Footstep Markdown, horizontal overflow 확인

## [0.3.0] - 2026-06-05

Git commit: `a855a7f08a17132c03a8782b77d29106b9a59129`

### Added

- 공개 가능한 Evidence PDF, Markdown, 이미지 파일을 `public/evidence/`와 `public/assets/`에 로컬 배포 자산으로 포함했습니다.
- PDF 미리보기, Markdown 인라인 렌더러, 이미지 미리보기 흐름을 추가했습니다.
- 다크/라이트 모드 토글을 추가하고, 다크 모드용 히어로 이미지를 `public/assets/portfolio-hero-dark.png`에 추가했습니다.
- Evidence 자산 동기화/검증 스크립트 `scripts/sync-evidence-assets.ps1`와 문서 `docs/EVIDENCE_ASSETS.md`를 추가했습니다.

### Changed

- 앱에서 Google Drive 권한 문구 대신 배포본에 포함된 공개 사본 기준으로 Evidence를 노출하도록 정리했습니다.
- Contact, Credentials, Footer의 공개 전/검수 전 느낌을 주는 문구를 채용 담당자용 표현으로 정리했습니다.
- README에 Evidence Architecture Before/After와 QA Feedback Loop를 추가했습니다.

### Verification

- `npm run check`
- `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`
- `npm run build`
- Browser QA: Home, theme toggle desktop/mobile, Evidence asset path 확인

## [0.2.0] - 2026-06-04

### Added

- Google Drive `SongChaeWoo/개인포트폴리오` 자료를 확인하고, 제목 앞 `!` 표시가 있는 `GCS8기 1조피투미 AI Native` 자료를 필수 프로젝트로 추가했습니다.
- GCS 1차, 2차, 3차 팀 발표 자료를 각각 프로젝트 상세 사례로 추가했습니다.
- 연극동아리 아름 활동을 발표 공포 극복, 협업, 성장 사례 프로젝트로 추가했습니다.
- Drive의 아름 활동 이미지 3장을 `public/assets/projects/areum/`에 저장하고, 상세 페이지 이미지 갤러리로 노출했습니다.

### Changed

- 프로젝트 데이터에 선택적 `media` 필드를 추가해 로컬 배포 이미지 자산을 프로젝트 상세에서 보여줄 수 있게 했습니다.
- 프로젝트 필터에 `Research`, `Presentation`, `Growth`를 추가했습니다.
- 공개 로컬 자산이 아닌 근거 파일은 깨진 배포 링크 대신 Drive 원본 링크로 연결되도록 정리했습니다.

### Research Notes

- Toss 프롬프트 기준: Simplicity, Clear CTA, Value First, Low-cost Action을 유지했습니다.
- 최신 포트폴리오 벤치마킹 기준은 공개적으로 검증 가능한 “채용 성공률” 수치가 아니라, 채용 담당자/커뮤니티 조언에서 반복되는 패턴을 반영했습니다.
- 반복 패턴: 첫 화면에서 전문성과 대표 사례가 바로 보여야 하고, 프로젝트는 문제-과정-결과 흐름으로 스캔 가능해야 하며, 역할과 근거, 수치, 배운 점이 분명해야 합니다.

### Benchmarked Sources

- [Nielsen Norman Group, User Experience Careers 2nd Edition](https://media.nngroup.com/media/reports/free/UserExperienceCareers_2nd_Edition.pdf?ref=uxdesignweekly)
- [UX Design Institute, What hiring managers look for in a UX portfolio](https://www.uxdesigninstitute.com/blog/hiring-managers-ux-portfolio/)
- [Boundev, UX Portfolio Tips: What Recruiters Actually Notice](https://www.boundev.ai/blog/ux-portfolio-tips-that-recruiters-notice)
- [CraftUp, Product Manager Portfolio: Projects That Get You Hired](https://craftuplearn.com/blog/product-manager-portfolio-projects-get-hired)
- [r/UXDesign community discussion, staff-level portfolios in the current job market](https://www.reddit.com/r/UXDesign/comments/1smjx20/what_do_staff_level_portfolios_look_like_in_the/)
