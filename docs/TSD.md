# Internship Portfolio Website TSD

작성일: 2026-06-03
작성자: Codex
대상 프로젝트: 송채우 인턴 지원용 포트폴리오 웹사이트

## 1. 기술 목표

현재 프로젝트 루트는 구현 파일이 없는 초기 상태로 보인다. 우선 `docs/PRD.md`를 기준으로, 기획/세일즈/고객 인터뷰 같은 정성적 역량을 앞에 세우고 기술 실행력을 뒤에서 받쳐주는 정적 포트폴리오 웹사이트를 구축한다.

권장 방향:

- Vite + React + TypeScript 기반 SPA
- 콘텐츠는 TypeScript 데이터 파일로 관리하며, 정성 역량과 기술 실행 범위를 분리해서 기록
- 프로젝트 상세는 고객 맥락, 기획 판단, 세일즈 메시지, 구현 내용을 라우팅 기반 페이지로 분리
- Google Drive 원본 자료는 로컬 asset/data registry로 옮겨 관리
- Vercel 정적 배포를 기본 대상으로 설계

## 2. 권장 스택

- Build: Vite
- UI: React, TypeScript
- Routing: React Router
- Styling: CSS Modules 또는 Tailwind CSS
- State: 로컬 상태 중심, 필요 시 URL query로 필터 상태 관리
- Data: `src/data/*.ts`
- Charts/diagrams: 프로젝트 상세에 필요한 경우 Mermaid 또는 가벼운 SVG/HTML 구조
- Deployment: Vercel

Tailwind CSS는 빠른 구현에는 유리하지만, 프로젝트가 작고 포트폴리오의 정교한 톤이 중요하므로 CSS Modules도 적합하다. 구현 시점에 선택하되, 한 가지 스타일 체계만 사용한다.

## 3. 시스템 구조

```text
.
|-- docs/
|   |-- PRD.md
|   `-- TSD.md
|-- public/
|   |-- assets/
|   |   |-- certificates/
|   |   |-- projects/
|   |   `-- activity/
|   `-- resume/
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   `-- router.tsx
|   |-- components/
|   |   |-- layout/
|   |   |-- navigation/
|   |   |-- project/
|   |   |-- evidence/
|   |   `-- ui/
|   |-- data/
|   |   |-- profile.ts
|   |   |-- projects.ts
|   |   |-- credentials.ts
|   |   `-- evidence.ts
|   |-- pages/
|   |   |-- HomePage.tsx
|   |   |-- ProjectsPage.tsx
|   |   |-- ProjectDetailPage.tsx
|   |   `-- NotFoundPage.tsx
|   |-- styles/
|   |   |-- globals.css
|   |   `-- tokens.css
|   `-- main.tsx
|-- index.html
|-- package.json
|-- tsconfig.json
`-- vite.config.ts
```

## 4. 라우팅

```text
/                    Home
/projects            Project list
/projects/:slug      Project detail
/credentials         Certificates and evidence
/contact             Contact section or anchored page
```

Home에서도 주요 섹션을 모두 볼 수 있게 만들고, 상세 탐색이 필요한 경우 개별 라우트로 이동한다.

## 5. 데이터 모델

### 5.1 Profile

```ts
export interface Profile {
  name: string;
  email: string;
  headline: string;
  positioning: string;
  coreStrengths: string[];
  education: {
    school: string;
    major: string;
    gpa?: string;
    scholarship?: string;
  };
  experience: Experience[];
  links: Link[];
}
```

### 5.2 Project

```ts
export type EvidenceStatus =
  | "verified"
  | "strong_but_needs_confirmation"
  | "needs_user_confirmation";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period?: string;
  category:
    | "planning"
    | "customer-discovery"
    | "sales"
    | "product"
    | "frontend"
    | "ai-api"
    | "backend"
    | "automation"
    | "collaboration";
  tags: string[];
  priority: number;
  summary: string;
  problem: string;
  customerContext?: string;
  planningNarrative?: string;
  salesNarrative?: string;
  role: string;
  qualitativeHighlights: string[];
  executionScope: string[];
  technicalHighlights: string[];
  architectureNotes?: string[];
  evidenceIds: string[];
  lessons: string[];
  improvements: string[];
  status: EvidenceStatus;
}
```

### 5.3 Evidence

```ts
export interface Evidence {
  id: string;
  title: string;
  sourceType: "markdown" | "pdf" | "image" | "github" | "deployment" | "drive-folder";
  sourcePathOrUrl: string;
  projectSlug?: string;
  visibility: "public" | "private" | "needs_review";
  notes?: string;
}
```

## 6. 초기 콘텐츠 매핑

### 6.1 Profile

자료: `기본정보/기본정보.md`

- 이름: 송채우
- 이메일: `songchaewoo0@gmail.com`
- 학교: 가천대학교 인공지능학과
- 학점: 전체 4.24, 직전학기 4.5
- 장학: 국가우수장학금 이공계
- 활동: UMC 웹 프론트 파트원
- 경력: 국방정보본부 정보사령부 육군 정보체계운용병

초기 headline 방향:

```text
고객의 문제를 듣고, 설득 가능한 제품 흐름으로 정리한 뒤, 필요한 기술까지 직접 연결하는 예비 PM/사업개발형 빌더
```

전화번호는 웹사이트 기본 노출 대상에서 제외한다.

### 6.2 Project Slugs

```text
windmill
gcs-llm-api-automation
footstep
oishifood-landing
notion-daily-snippet
kanban-backend-cli
```

### 6.3 Evidence Registry 초안

```text
basic-info-md
windmill-readme
windmill-case-study-source
windmill-contribution-profile
windmill-summary-pdf
footstep-readme
footstep-case-study-source
footstep-contribution-profile
gcs-oishifood-md
gcs-notion-daily-snippet-md
gcs-kanban-md
gcs-llm-api-md
cert-history-pdf
cert-linuxmaster-png
cert-info-processing-jpg
theater-arum-pdf
```

## 7. 주요 컴포넌트

### 7.1 Layout

- `SiteHeader`: 로고/이름, 주요 섹션 링크, 모바일 메뉴
- `SiteFooter`: 이메일, GitHub, 업데이트 날짜
- `Section`: full-width section wrapper

### 7.2 Home

- `HeroIntro`: 이름, 한 줄 소개, CTA
- `StrengthStrip`: 기획, 세일즈, 고객 인터뷰, 실행력 중심의 핵심 역량 키워드
- `CapabilityMatrix`: 정성 역량과 기술 실행 범위를 나란히 보여주는 요약
- `FeaturedProjects`: priority 상위 프로젝트 카드
- `ExperienceTimeline`: 교육/활동/경력 타임라인

### 7.3 Projects

- `ProjectFilterBar`: 기획/고객/세일즈/기술 태그 필터
- `ProjectCard`: 제목, 고객 문제 요약, 핵심 실행 태그, 근거 상태
- `ProjectDetail`: 고객 맥락, 기획 판단, 세일즈 포인트, 기술 실행, Evidence 목록
- `EvidenceList`: PDF/이미지/문서 링크와 visibility 표시

### 7.4 Credentials

- `CredentialCard`: 자격증명, 발급처, 취득일, 증빙 링크

## 8. 콘텐츠 로딩 방식

MVP에서는 외부 API를 호출하지 않는다. Drive 자료는 구현 전에 필요한 파일만 로컬에 복사하거나, 공개 가능한 Drive 링크를 evidence URL로 등록한다.

권장 흐름:

1. Google Drive에서 Markdown/PDF/이미지 자료 확인
2. 공개 가능한 자료와 비공개 자료를 구분
3. `src/data/evidence.ts`에 registry 작성
4. 이미지/PDF는 필요 시 `public/assets/`로 복사
5. 개인정보, 토큰, 내부 계정 정보는 제외

## 9. 보안 및 개인정보

- 전화번호는 기본 비노출
- API token, `.env`, 내부 설정 값은 절대 포함하지 않음
- LLM/API 프로젝트 문서에 나온 토큰 노출 경고는 웹사이트에도 반영
- `needs_user_confirmation` 상태의 기여는 확정 표현으로 렌더링하지 않음
- 외부 Drive 링크가 공개 권한인지 배포 전 확인

## 10. 반응형 및 접근성

- 모바일 우선 레이아웃
- 모든 버튼과 링크는 키보드로 접근 가능
- 프로젝트 카드의 필터 상태는 시각적 표시와 텍스트를 함께 제공
- 이미지에는 프로젝트 맥락을 설명하는 `alt` 작성
- 색 대비는 WCAG AA 수준을 목표로 함
- 긴 상세 페이지는 anchor navigation 또는 sticky local nav 제공

## 11. 성능 기준

- Home initial JS bundle은 가능한 작게 유지
- PDF/이미지 증빙은 lazy loading
- 프로젝트 상세 페이지는 route-level code splitting 고려
- Lighthouse 기준 Performance, Accessibility, Best Practices 각 90점 이상 목표

## 12. 구현 단계

### Phase 1: Scaffold

- Vite React TypeScript 프로젝트 생성
- 라우터, 글로벌 스타일, 기본 레이아웃 구성
- `src/data`에 profile/project/evidence 데이터 초안 작성
- 각 프로젝트에 `customerContext`, `planningNarrative`, `salesNarrative`, `executionScope` 필드 입력

### Phase 2: Home and Project List

- Hero, Featured Projects, Project list 구현
- 태그 필터와 responsive grid 구현
- 근거 상태 badge 구현

### Phase 3: Project Detail

- `ProjectDetailPage` 구현
- WindMill, Footstep, GCS 프로젝트 상세 데이터 입력
- 기술 설명보다 고객 문제, 기획 의도, 설득 포인트가 먼저 보이도록 상세 섹션 순서 확인
- Evidence list 연결

### Phase 4: Assets and Credentials

- 자격증 이미지/PDF, 활동 이미지 등록
- Credentials 섹션 구현
- 이미지 최적화와 alt 작성

### Phase 5: QA and Deploy

- 모바일/데스크톱 브라우저 확인
- 링크, 개인정보, 미확인 기여 문장 점검
- Vercel 배포

## 13. 테스트 계획

- 라우트 테스트
  - `/`, `/projects`, `/projects/windmill`, 없는 slug 접근
- 데이터 테스트
  - 모든 project의 slug unique
  - 모든 evidenceIds가 evidence registry에 존재
  - private evidence가 외부 링크로 노출되지 않음
- UI 테스트
  - 모바일 375px, 태블릿 768px, 데스크톱 1440px
  - 프로젝트 카드 텍스트 overflow 없음
  - 필터 상태 변경 시 목록 정상 갱신
- 접근성 테스트
  - 키보드 탐색
  - focus visible
  - 이미지 alt
  - 링크 label

## 14. 미정 사항

- 최종 스타일 체계: CSS Modules 또는 Tailwind CSS
- GitHub/배포 URL 공개 범위
- Drive 증빙 자료를 로컬로 복사할지, Drive 링크로 유지할지
- 전화번호 노출 여부
- 프로젝트별 최종 기여 문장 확정
- 고객 인터뷰, 세일즈 경험, 사용자 피드백을 증명할 수 있는 자료 범위
