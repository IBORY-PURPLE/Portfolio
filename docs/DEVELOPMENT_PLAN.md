# Internship Portfolio Website Development Plan

작성일: 2026-06-03

## 1. 목표

`docs/PRD.md`, `docs/TSD.md`, Google Drive `개인포트폴리오` 폴더 자료를 기반으로, 기업 인턴 지원에 바로 사용할 수 있는 송채우 포트폴리오 웹사이트 MVP를 만든다.

핵심 메시지는 다음 한 문장으로 정리한다.

> 고객의 문제를 듣고, 설득 가능한 제품 흐름으로 정리한 뒤, 필요한 기술까지 직접 연결하는 예비 PM/사업개발형 빌더

## 2. 자료 근거

- 로컬 문서: `docs/PRD.md`, `docs/TSD.md`
- Drive 폴더: `개인포트폴리오`
- 기본 정보: 이름, 이메일, 가천대학교 인공지능학과, GPA, 장학, UMC, 국방정보본부 정보체계운용병
- 대표 프로젝트: WindMill, GCS Pulse Daily Snippet Automation, GCS8 LLM/API 자동화, Oishifood Landing Page, Kanban Backend/CLI, Footstep
- 자격증: 한국사능력검정 1급, 리눅스마스터 2급, 정보처리기능사

전화번호는 Drive 기본정보에 있지만, PRD 원칙에 따라 사이트 기본 노출에서 제외한다.

## 3. 디자인 방향

최근 포트폴리오/커뮤니티형 웹 디자인 흐름은 다음 요소를 채택한다.

- Bento grid: 프로젝트, 역량, 증빙을 작은 정보 단위로 빠르게 스캔하게 한다. 참고: [Line25 2026 trends](https://line25.com/articles/web-design-trends-2026/), [Codly 2026 trends](https://codly.fr/en/blog/tendances-webdesign-2026)
- Bold editorial typography: 이름과 포지셔닝을 첫 화면에서 강하게 보이게 한다. 참고: [Creative Bloq typography trends](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026)
- Micro-interactions: 카드 hover, 필터 전환, 링크 focus를 가볍게 적용한다.
- Performance-first: Reddit 디자인 커뮤니티에서 과한 scroll hijacking과 무거운 애니메이션에 대한 피로감이 확인되므로, 빠른 로딩과 명확한 정보 구조를 우선한다.
- Visual asset: 실제 개인정보나 비공개 화면 대신, 미니멀한 포트폴리오 인터페이스 모형 hero bitmap을 사용한다.

## 4. 구현 전략

MVP는 Vite + React + TypeScript 기반 정적 SPA로 구현한다.

이유:

- `docs/TSD.md`의 목표 구조와 실제 프로젝트 구조를 일치시킨다.
- 데이터 registry와 화면 컴포넌트를 타입으로 묶어 프로젝트/증빙 상태를 안전하게 관리한다.
- Vercel 배포 시 `npm run build` 결과물인 `dist/`를 정적 사이트로 제공한다.

## 5. 화면 범위

- Home: 이름, 한 줄 포지셔닝, 강점, 대표 프로젝트, 경력/교육 요약
- Projects: 태그 필터, 프로젝트 카드 목록
- Project Detail: 문제, 사용자/고객 맥락, 기획/세일즈 포인트, 역할, 기술 실행, 근거 자료, 확인 필요 항목
- Credentials: 자격증과 증빙 링크 상태
- Contact: 이메일, GitHub/배포 링크 입력 전 확인 안내

## 6. 데이터 원칙

- `verified`: 자료에서 확인된 내용
- `strong_but_needs_confirmation`: 근거가 강하지만 본인 확인 필요
- `needs_user_confirmation`: 단정 금지

Drive 링크는 권한이 공개인지 확인되지 않았으므로, 사이트에는 `권한 확인 필요` 문구를 같이 표시한다.

## 7. 개발 단계

1. Vite + React + TypeScript scaffold 작성
2. profile/project/evidence 데이터를 TypeScript data registry로 분리
3. Home, Projects, Detail, Credentials, Contact 컴포넌트 렌더링
4. 반응형 CSS와 접근성 focus 상태 구현
5. 로컬 Vite 서버 실행 및 브라우저 QA
6. 확인 필요 항목을 README와 UI에 남김

## 8. 이후 개선

- GitHub, 배포 URL, 이력서 PDF 확정 후 Contact/CTA에 추가
- Drive 증빙 파일 공개 권한 확인
- WindMill, Footstep의 GitHub 계정/브랜치 본인 확인
- Lighthouse 접근성/성능 점검 후 배포
