# CHANGELOG

이 문서는 포트폴리오 사이트의 자료 반영, UI/UX 개선, 리팩토링 이력을 기록합니다.

## Git Version Map

| Version | Commit | Use when | Safe rollback |
| --- | --- | --- | --- |
| 0.4.0 | `1b7116d4e848fafbc791931fbd784684f9560f25` | Evidence 영역에서 PDF/Markdown 선택과 미리보기를 명확하게 보여주는 버전 | `git revert 1b7116d` |
| 0.3.0 | `a855a7f08a17132c03a8782b77d29106b9a59129` | 공개 Evidence 자산 내장, PDF/Markdown 뷰어, 다크/라이트 토글이 반영된 기준 버전 | `git revert a855a7f` |
| 0.2.0 | `7dd3b42` 이후 자료 확장 기준 | Drive 자료 기반 프로젝트 확장과 초기 포트폴리오 구조 확인용 | 이후 커밋을 선택적으로 `git revert` |

> 특정 시점의 파일 상태를 보기만 하려면 `git switch --detach <commit>`을 사용할 수 있습니다. 작업을 되돌릴 때는 기존 기록을 보존하는 `git revert <commit>`을 우선 사용하세요.

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
