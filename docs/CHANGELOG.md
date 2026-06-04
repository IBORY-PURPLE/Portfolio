# CHANGELOG

이 문서는 포트폴리오 사이트의 자료 반영, UI/UX 개선, 리팩토링 이력을 기록합니다.

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
