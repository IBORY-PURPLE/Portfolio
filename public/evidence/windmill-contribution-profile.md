# Contribution Profile

## Status

이 프로젝트는 Footstep보다 사용자 기여 후보가 훨씬 강하게 보입니다.

프론트엔드 레포에서 `채우` author가 가장 많은 커밋을 남겼고, `chaewoo` 브랜치에서 `dev`/`main`으로 병합된 PR이 다수 확인됩니다. 공개 포트폴리오 사본에서는 개인 이메일 문자열을 제외했습니다.

그래도 source 문서에서는 최종 확인 전까지 `strong_but_needs_user_confirmation`으로 둡니다.

## Candidate Contribution If Confirmed

확인 후 포트폴리오에 강하게 넣을 수 있는 기여:

- React/Vite 기반 프론트엔드 주요 화면 구현
- CRA에서 Vite로 전환
- React Query 도입 및 fetch 흐름 개선
- 주식 상세 페이지와 차트 UI 구현
- 관심 종목/보유 종목/거래 로그 UI 구현
- 포트폴리오 추천 페이지, 아바타 생성/삭제 UI 구현
- AI 예측 API와 예측 그래프 연결
- Vercel 배포 및 `/api/*` 프록시 문서화
- README 실행/배포/트러블슈팅 문서 작성

## Strong Evidence

대표 PR:

- #13 `CRA->Vite`
- #17 `react-query starting`
- #19 `changed fetch function to react-query`
- #26 `added home design + log function + transaction`
- #27 `edit mystock detailpage + log window`
- #35 `added portfolio api`
- #37 `created avatar function`
- #38 `created avatar`
- #39 `recommend page`
- #45 `created portfolio`
- #50 `edited AddAvatarModal with React bits`
- #53 `created footer + deleteAvatar`
- #55 `added current price + addavatarmodal style`
- #58 `stockdetail Chart`
- #72 `vercel`

대표 파일:

```txt
frontend/src/App.jsx
frontend/src/pages/StockDetail.jsx
frontend/src/pages/MyStock.jsx
frontend/src/pages/InterestStock.jsx
frontend/src/pages/Portfolio/Portfolio.jsx
frontend/src/pages/Portfolio/RcommendPortfolio.jsx
frontend/src/components/Portfoilo/AddAvatarModalWithStepper.jsx
frontend/src/components/Portfoilo/AvatarList.jsx
frontend/src/api/predict.jsx
frontend/src/api/portfolio.jsx
frontend/src/api/mystock.jsx
frontend/vercel.json
README.md
```

## Safe Portfolio Sentence Before Final Confirmation

> 공개 GitHub 기록 기준으로 WindMill 프론트엔드에서 `채우` author와 `chaewoo` 브랜치의 PR이 다수 확인되며, 주식 상세/보유 종목/포트폴리오/예측 API 연동/배포 문서화 영역에 집중된 기여 흔적이 남아 있습니다.

## Stronger Portfolio Sentence After Confirmation

> WindMill 프로젝트에서 React/Vite 프론트엔드 구현을 중심으로 주식 상세 페이지, 관심/보유 종목, 거래 로그, AI 예측 그래프, 아바타 기반 포트폴리오 추천 화면을 구현했고, TanStack Query 도입과 Vercel 배포 설정까지 담당했습니다.

## Questions To Confirm With User

1. `채우`, `IBORY-PURPLE`, `chaewoo`가 모두 본인 계정/브랜치가 맞는가?
2. 백엔드와 AI 서버는 직접 구현했는가, 아니면 연동/협업 중심이었는가?
3. 프로젝트의 공식 기간과 팀 규모는 무엇인가?
4. 이 프로젝트가 수업/캠프/해커톤/개인 팀 프로젝트 중 무엇이었는가?
5. 발표, 데모, 수상, 배포 URL 공개 등 외부 성과가 있었는가?
