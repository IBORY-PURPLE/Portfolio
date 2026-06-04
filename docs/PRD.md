# Internship Portfolio Website PRD

작성일: 2026-06-03
작성자: Codex
대상 프로젝트: 송채우 인턴 지원용 포트폴리오 웹사이트

## 1. 목적

Google Drive `SongChaeWoo/개인포트폴리오` 하위 자료를 기반으로, 인턴 채용 담당자와 기술 면접관이 송채우의 역량을 빠르게 이해할 수 있는 포트폴리오 웹사이트를 만든다.

이 웹사이트는 단순 이력 나열이 아니라, 고객/사용자 관찰, 문제 정의, 기획 판단, 세일즈형 커뮤니케이션, 실행력, 결과물 근거를 함께 보여주는 인터랙티브 포트폴리오여야 한다.

## 2. 핵심 포지셔닝

기획, 세일즈, 고객 인터뷰 같은 정성적 역량을 중심으로 문제를 발견하고 설득 가능한 제품 흐름으로 정리하며, 필요하면 프론트엔드 구현, API 연동, AI/LLM 자동화, 백엔드와 배포 흐름까지 직접 연결할 수 있는 실행형 인재.

강하게 보여줄 축:

- 고객 인터뷰, 사용자 관찰, 회고 자료를 바탕으로 문제를 정의하는 능력
- 기획 의도, 고객 가치, 세일즈 메시지를 명확한 스토리로 정리하는 능력
- 모호한 아이디어를 화면, 자동화, API 흐름이 있는 결과물로 바꾸는 실행력
- React/Vite 프론트엔드, FastAPI/Supabase/Notion/Google Workspace, 외부 API 연동 경험
- LLM API, 검색 API, 자동화 워크플로를 업무나 제품 흐름으로 엮은 경험
- GitHub PR, 브랜치, 이슈 기반 팀 협업 경험
- 자료를 근거로 검증 가능한 포트폴리오 문장을 만드는 태도

## 3. 근거 자료

Drive 경로: `SongChaeWoo/개인포트폴리오`

주요 하위 폴더와 활용 방향:

- `기본정보`
  - 이름, 이메일, 학과, 학점, 장학, UMC 활동, 국방정보본부 정보체계운용병 경력
  - 웹사이트의 About, Contact, Education, Experience 섹션에 사용
- `250822_가천세종학술제_윈드밀프로젝트`
  - WindMill 주가/포트폴리오 웹 서비스
  - 투자 판단 보조라는 사용자 문제, 포트폴리오 추천 흐름, React/Vite, FastAPI, AI 서버, TanStack Query, Vercel 배포를 함께 보여주는 대표 프로젝트로 사용
- `260301_GCS8기`
  - Oishifood 랜딩 페이지, Notion to Daily Snippet, Kanban backend/CLI, LLM/API communication, GCS automation, 발표자료/회고
  - 기획, 발표, 회고, 자동화, API 연결을 묶은 최신 실무형 프로젝트군으로 사용
- `220621_UMC_풋스텝프로젝트`
  - Footstep React 팀 프로젝트
  - 팀 협업, 사용자 흐름 이해, 화면 구현, GitHub 기반 협업을 보강하는 사례로 사용
- `자격증`
  - 한국사능력검정 1급, 리눅스마스터 2급, 정보처리기능사
  - Credentials 섹션에 사용
- `230222_연극동아리"아름"`
  - 발표, 무대, 협업, 커뮤니케이션 성향을 보여주는 보조 자료로 사용

## 4. 사용자

- 1차 채용 담당자
  - 짧은 시간 안에 지원자의 핵심 역량, 학력, 프로젝트, 연락처를 확인한다.
- 기술 면접관
  - 프로젝트별 기술 스택, 역할, 문제 해결 방식, 검증 가능한 근거를 확인한다.
- 사용자 본인
  - 인턴 공고별로 프로젝트 강조 순서와 카피를 빠르게 조정한다.

## 5. MVP 범위

필수 화면:

- Home
  - 이름, 한 줄 소개, 핵심 정성 역량, 기술 실행 범위, 대표 프로젝트 2-3개
- About
  - 교육, 학점, 장학, 군 경력, 관심 분야
- Projects
  - 프로젝트 카드 목록, 필터, 고객/기획/세일즈/기술 태그
- Project Detail
  - 문제, 고객/사용자 맥락, 기획 판단, 세일즈 포인트, 기술 실행, 역할, 결과, 근거 자료
- Credentials
  - 자격증과 증빙 이미지/PDF 링크
- Contact
  - 이메일, GitHub, 배포 링크, 필요 시 이력서 다운로드

우선순위가 높은 프로젝트:

1. WindMill
2. GCS8기 LLM/API/자동화 프로젝트 묶음
3. Footstep
4. Oishifood Landing Page
5. Kanban Backend/CLI

## 6. 기능 요구사항

### 6.1 콘텐츠 탐색

- 사용자는 대표 프로젝트를 첫 화면에서 바로 확인할 수 있어야 한다.
- 프로젝트는 `Planning`, `Customer Discovery`, `Sales`, `Frontend`, `AI/API`, `Backend`, `Automation`, `Collaboration` 같은 태그로 필터링할 수 있어야 한다.
- 프로젝트 상세에는 근거 자료 상태를 표시해야 한다.
  - `verified`: 자료에서 확인됨
  - `strong_but_needs_confirmation`: 근거는 강하지만 본인 확인 필요
  - `needs_user_confirmation`: 포트폴리오 문장화 전 확인 필요

### 6.2 프로젝트 상세

각 상세 페이지는 다음 구조를 따른다.

- Overview
- Problem
- Customer or Stakeholder Context
- Planning and Sales Narrative
- My Role
- Execution Scope
- Technical Highlights
- Architecture or Workflow
- Evidence
- What I Learned
- What I Would Improve Now

WindMill 상세는 다음 내용을 포함한다.

- 흩어진 주식 정보, 투자 판단 보조 데이터, 관심/보유 종목 관리 문제
- 사용자가 종목을 찾고, 비교하고, 예측 결과를 확인하는 흐름
- 포트폴리오 추천과 AI 예측 그래프가 주는 고객 가치
- React/Vite 프론트엔드
- 주식 상세, 관심/보유 종목, 거래 로그 UI
- AI 예측 그래프와 포트폴리오 추천 화면
- TanStack Query 도입 및 API 호출 흐름 개선
- Vercel 배포 및 `/api/*` 프록시 문서화

Footstep 상세는 다음 내용을 포함한다.

- 기록형 웹 서비스의 사용자 흐름과 상호작용 구조
- Figma, GitHub, Notion에 흩어진 협업 자료를 제품 개발 흐름으로 재구성한 과정
- React Router 기반 화면 라우팅
- CSS Module 기반 화면별 스타일
- ProfileSetting, Footer, 댓글 UI 등 후보 기여
- Figma, GitHub, Notion 협업 흐름
- 확인되지 않은 담당 범위는 단정하지 않는 안전한 문장 사용

GCS8기 상세는 다음 내용을 포함한다.

- 팀 발표, 회고, 문제 정의, 사용 시나리오를 정리한 과정
- Oishifood 랜딩 페이지: React 19, Vite 7, Tailwind CSS 4, Supabase, Resend
- Notion to Daily Snippet: Next.js 15, TypeScript, Notion API, Vercel
- Kanban Backend/CLI: FastAPI, SQLAlchemy, Click CLI, Google OAuth
- LLM/API communication: Claude API, EXA API, Telegram Bot, GCS room/calendar automation

### 6.3 근거 표시

- 프로젝트 카드 또는 상세 페이지에 증빙 자료 링크를 제공한다.
- PDF, 이미지, Markdown 자료는 별도 `Evidence` 영역에서 확인할 수 있게 한다.
- 개인정보나 토큰처럼 노출 위험이 있는 자료는 웹사이트에 직접 표시하지 않는다.

### 6.4 연락

- 이메일은 표시한다.
- 전화번호는 명시적 요청 전까지 웹사이트에 노출하지 않는다.
- GitHub, 배포 링크, 이력서 파일은 확정 후 추가한다.

## 7. 비기능 요구사항

- 모바일과 데스크톱 모두에서 읽기 좋아야 한다.
- 첫 화면은 2초 안에 주요 정보가 보이도록 가볍게 구성한다.
- 프로젝트 상세는 긴 글이지만 스캔하기 쉬운 구조여야 한다.
- 모든 이미지에는 대체 텍스트를 둔다.
- 외부 링크는 새 탭으로 열고, 문서/PDF는 용량을 고려해 lazy loading한다.
- 확인되지 않은 기여는 확정 표현으로 쓰지 않는다.

## 8. 콘텐츠 원칙

- “했다”라고 쓰는 문장은 자료 또는 사용자 확인이 있어야 한다.
- 기여가 후보 단계라면 “공개 GitHub 기록 기준으로 확인되는 기여 후보”처럼 표현한다.
- 고객 인터뷰, 세일즈, 기획 판단처럼 정성적 역량을 말할 때도 근거가 되는 발표, 회고, 문서, 사용자 반응을 함께 붙인다.
- 기술 스택은 주인공이 아니라 문제를 해결하기 위해 선택한 실행 도구로 설명한다.
- 인턴 지원용이므로 과장된 자기소개보다, 문제를 발견하고 설득하고 끝까지 구현한 흐름을 보여준다.

## 9. 성공 기준

- 채용 담당자가 30초 안에 “고객/문제 관점이 있고 실행까지 가능한 사람”이라는 강점을 이해한다.
- 기술 면접관이 프로젝트별 기술 스택과 역할을 근거 기반으로 확인하되, 기술이 어떤 고객 가치로 이어졌는지도 볼 수 있다.
- 사용자가 인턴 공고별로 대표 프로젝트 순서를 쉽게 조정할 수 있다.
- 포트폴리오 문장에 확인되지 않은 기여가 사실처럼 섞이지 않는다.

## 10. 확인 필요 항목

- `채우`, `IBORY-PURPLE`, `CHAEWOOSONG`, `chaewoo`가 모두 본인 계정/브랜치인지 확인
- WindMill에서 백엔드와 AI 서버를 직접 구현했는지, 연동/협업 중심이었는지 확인
- 고객 인터뷰, 세일즈, 사용자 피드백, 발표 반응으로 직접 말할 수 있는 근거 자료 확인
- 각 프로젝트의 공식 기간, 팀 규모, 수상/발표/데모 여부 확인
- 공개 가능한 GitHub URL, 배포 URL, Figma/Notion 링크 확인
- 전화번호를 웹사이트에 노출할지 여부 확인
