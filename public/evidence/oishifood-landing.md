# 🍜 Oishifood Landing Page

![Oishifood Team](public/images/Team.jpeg)

Oishifood 팀의 팀 소개형 랜딩 페이지입니다.  
"추구미_테토" 콘셉트를 중심으로 팀 비전, 스토리, 멤버 캐릭터, 뉴스레터 구독 기능까지 한 화면 흐름으로 구성했습니다.

## 1) 프로젝트 개요

- 프로젝트명: **Oishifood Team Landing Page**
- 목적: 팀 정체성과 멤버별 미식 스토리를 직관적으로 보여주는 인터랙티브 웹 페이지 제작
- 개발 기간: **2026.03.10 ~ 2026.03.13 (4일)**
- 핵심 포인트:
  - 스크롤 기반 스토리텔링
  - 멤버 카드 → 상세 모달 인터랙션
  - Supabase 기반 이메일 구독/뉴스레터 발송 구조

## 2) 현재 랜딩 페이지 구성

### Hero 섹션
- 팀 대표 이미지 + 팀 콘셉트(추구미_테토) + 비전/결성 이유 표시
- `Reveal` 컴포넌트로 순차 등장 애니메이션 적용
- 스크롤 값 기반 배경 데코 이동(parallax-like) 효과 적용

### Scroll Journey 섹션
- `STEP 1~3` 카드로 팀의 미식 여정을 스토리 형태로 전달
- 섹션 스크롤 진행도(progress)에 따라 카드 opacity/translate/rotate/scale이 변화

### Members 섹션
- 멤버 카드 그리드(반응형)
- 카드 클릭 시 상세 모달 오픈
- 모달에서 다음 멤버로 순환 이동 가능

### 각 팀원 소개 상세 모달 커스텀
- 멤버 소개 문구를 다중 줄(개행 유지)로 노출
- 음식 카드 (제목/이미지/네이버지도 링크) 구성
- 음식 카드 제목 중앙 정렬 + 크게 강조
- 주소 버튼은 카드 전체 폭(full width)으로 클릭 가능
- 레이아웃은 우측에 프로필 이미지, 좌측에 음식 카드 목록으로 재배치

### Footer + 뉴스레터
- 이메일 구독 폼 제공
- 환경변수 `VITE_ENABLE_NEWS_PUBLISHER=true`일 때 관리자 발송 패널 노출

## 3) 기술 스택

- Frontend: **React 19**, **Vite 7**
- Styling: **Tailwind CSS 4**
- Lint: **ESLint 9**
- Backend 연동: **Supabase REST RPC + Edge Function(Deno)**
- 메일 발송: **Resend API** (Supabase Edge Function 내부)

## 4) 개발 과정 요약

### Day 1 — 기획 & 기반 세팅
- React + Vite + Tailwind 환경 구성
- 기본 레이아웃(헤더/히어로/푸터)과 데이터 구조(`src/content/ko.json`) 정리

### Day 2 — 인터랙션 구현
- 멤버 카드 그리드와 상세 모달 구현
- `Reveal` + IntersectionObserver 기반 진입 애니메이션 적용
- 스크롤 여정 섹션(progress 기반 카드 애니메이션) 구현

### Day 3 — 고도화 & 데이터 연결
- 배고픈청년 모달 UI/카피/음식 카드 커스터마이징
- 뉴스레터 구독 RPC 및 발송 Edge Function 연동
- 에러 메시지/디버깅 로그 보강 및 문서 정리

## 5) 프로젝트 구조

```text
.
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  ├─ EmailSignup.jsx
│  │  ├─ MemberCard.jsx
│  │  ├─ MemberModal.jsx
│  │  └─ Reveal.jsx
│  ├─ sections/
│  │  ├─ HeroSection.jsx
│  │  ├─ ScrollJourneySection.jsx
│  │  └─ MembersSection.jsx
│  ├─ services/
│  │  └─ newsletterService.js
│  ├─ lib/
│  │  └─ supabaseRest.js
│  ├─ content/
│  │  └─ ko.json
│  └─ App.jsx
├─ public/images/
├─ supabase/
│  ├─ newsletter_schema.sql
│  └─ functions/send-newsletter/index.ts
└─ README.md
```

## 6) 사이트 접속 주소

- 배포 사이트: https://oishifood-chi.vercel.app/

## 7) 환경변수

루트 `.env`에 아래 값을 설정합니다.

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ENABLE_NEWS_PUBLISHER=false
```

## 8) Supabase 뉴스레터 연동 순서

1. `supabase/newsletter_schema.sql` 실행
2. `supabase/functions/send-newsletter/index.ts` 배포
3. Supabase Function Secrets 설정
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `NEWSLETTER_FROM_EMAIL`
   - `NEWSLETTER_ADMIN_TOKEN`

세부 내용은 `supabase/README.md` 참고.

## 9) 참고 링크

- Repository: https://github.com/1000AIStartupTeam/Oishifood
- Landing Page(배포본): https://oishifood-chi.vercel.app/
