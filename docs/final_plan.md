# 배포 전 최종 코드 리뷰 및 릴리스 계획

## Summary

현재 릴리스 목표는 새 기능 추가가 아니라 공개 포트폴리오를 안전하게 배포할 수 있는지 판정하는 것이다. 기준은 P0 개인정보 노출 제거, 채용 서사 검증, P1 UI 회귀 수정, 정적 검증과 브라우저 QA 통과다.

민감 자격증 원본과 내부 회고 원문은 공개 GitHub와 배포 자산에 남아 있으면 안 된다. 자격증은 이름, 자격명, 발급기관, 취득일, 직인은 유지하되 생년월일, 자격번호, 관리번호, 사진, QR/바코드, 검증 URL을 불투명 마스킹한 공개 사본만 사용한다. 내부 회고는 검증 수치와 학습만 남긴 익명 외부용 요약본으로 대체한다.

## Execution Order

1. P0 개인정보 제거
   - 마스킹 자격증 공개 사본 생성
   - 익명 외부용 회고 요약본 생성
   - `src/data.ts` Evidence 경로를 안전 사본으로 교체
   - `EvidenceList`가 `visibility === "public"` 항목만 렌더링하도록 보강
   - `sync-evidence-assets.ps1`에서 민감 원본 재다운로드를 제거하고 금지 파일 존재 시 실패

2. 채용 서사 및 주장 검증
   - 히어로 역할을 `PM/Product Builder`로 고정
   - 대표 프로젝트 순서를 `공사 기성청구 -> 1인 창작자 -> Daily Snippet -> AgenticLinkedIn`으로 정리
   - `Project.resultLabel`로 `Result`, `Team Result`, `Evidence`, `Planned Experiment`를 구분
   - 완료되지 않은 실험은 완료형 결과가 아니라 계획/다음 실험으로 표현
   - 내부 산출물 성격의 지표는 `Impact` 대신 `Output` 또는 `Evidence`로 분류

3. P1 UI/UX 회귀 수정
   - 히어로, 페이지, 상세 다중 행 제목의 최종 `line-height`를 `1.02`로 통일
   - sticky 필터 offset을 헤더 높이 CSS 변수로 관리
   - 주요 내비게이션, 테마, 필터, 상세 내비게이션 버튼의 터치 영역을 최소 `44px`로 확보
   - 가로 스크롤 영역에 다음 항목이 있음을 알리는 마스크 단서를 제공
   - 라이트/다크 활성 스타일을 편집형 underline 언어로 통일
   - 미디어가 없는 프로젝트는 `Artifacts` 내비게이션을 표시하지 않음

4. 릴리스 범위 정리
   - `.gitignore`에 `tmp-*`, `tmp-qa-screenshots/`, `references/`, `docs/Memo.md` 추가
   - React/Vite 구조, 해시 라우팅, 테마, 필터, Evidence viewer 유지
   - XSS sanitizer, App 분할, 카드 중복 리팩터링, `React.memo`, CSS 전면 통합은 이번 배포에서 보류
   - 현재 Markdown 렌더러는 HTML 삽입 없이 React 노드로 렌더링하므로 기존 계획의 XSS 위험 전제 제거

## Public Interfaces

- `Project` 타입에 선택적 `resultLabel` 필드를 추가한다.
- 공개 Evidence URL은 마스킹 자격증과 익명 회고 요약의 새 경로로 변경한다.
- 기존 민감 Evidence 경로는 공개 렌더링과 동기화 스크립트에서 제거한다.
- 새로운 의존성, 라우터, CMS는 추가하지 않는다.

## Test Plan

- 정적 검증: `npm run lint`, `npm run check`, `npm run build`, `npm audit --omit=dev --audit-level=high`, `git diff --check`
- Evidence 검증: `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`, 금지 파일 검사, 모든 로컬 자산 존재 여부, 공개 파일 민감정보 재검사
- 브라우저 QA: 홈, 프로젝트, 대표 상세, Credentials, Contact, 404를 라이트/다크 x 1440/820/390/320px에서 확인
- 기능 QA: 필터, 테마 저장, 상세 펼침, Evidence 직접 이동, PDF/Markdown/이미지 미리보기, 외부 링크, 콘솔/네트워크 오류 확인
- 채용 QA: 5초 안에 PM/Product Builder 역할과 가치가 읽히고, 30초 안에 대표 사례의 Problem/Role/Team Result/Evidence를 확인할 수 있어야 함
- 개인정보 QA: 이전 민감 URL, GitHub 커밋 이력, 기존 Vercel 배포에서 원본 자격증과 내부 회고가 접근되지 않아야 함
- 성능 기준: 초기 JS gzip 150kB 이하, CSS gzip 15kB 이하, 커버 이미지 개별 300kB 이하 유지
- Toss 채용담당자와 UI/UX 리드 역할로 사후 재검토하고 P0/P1이 0건일 때만 완료

## Documentation And Release

- `docs/CHANGELOG.md`에 사전/사후 리뷰, 실제 명령 결과, 시각 QA 결과, Git 이력/Vercel 정리 결과를 기록한다.
- 안전한 릴리스 후보를 검토 가능한 단위로 커밋한다.
- 민감 원본을 포함한 공개 Git 이력과 기존 배포는 안전한 새 배포 후 정리한다.
- 브라우저 QA, Git 이력 정리, 기존 Vercel 배포 삭제가 환경 권한으로 불가능하면 완료로 판정하지 않고 blocker로 기록한다.

## Current Blocker Policy

금지 원본 파일이 `public/evidence/`에 남아 있으면 배포하지 않는다. 검증 스크립트가 실패하는 상태는 의도된 안전 장치이며, 해당 파일 삭제와 Git 이력 정리, 기존 배포 삭제가 끝나야 release-ready로 전환할 수 있다.
