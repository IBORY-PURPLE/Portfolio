# WindMill Portfolio Source

이 폴더는 `gachonsejongwindmill` GitHub 조직의 공개 레포를 기반으로 WindMill 프로젝트를 포트폴리오 웹사이트 source로 쓰기 위해 전처리한 AI 친화 자료입니다.

## How To Read

1. `AI_CONTEXT.md`를 먼저 읽습니다.
2. `project.target.yml`에서 포트폴리오 목표값을 확인합니다.
3. `project.facts.yml`과 `architecture-map.md`에서 프로젝트 구조를 파악합니다.
4. `feature-map.yml`에서 화면, API, AI 서버 기능 연결을 확인합니다.
5. `github.evidence.yml`과 `contribution-profile.md`에서 협업 및 기여 근거를 확인합니다.
6. `prompts/portfolio-site-prompt.md`를 웹 포트폴리오 생성 AI에게 전달합니다.

## Important Rule

이 source는 `verified`, `target`, `hypothesis`, `needs_user_confirmation`을 분리합니다.

- `verified`: 공개 GitHub 레포에서 확인한 사실
- `target`: 포트폴리오에서 보여주고 싶은 목표 이미지
- `hypothesis`: 레포 기록상 사용자와 관련 있어 보이지만 최종 확인이 필요한 항목
- `needs_user_confirmation`: 프로젝트 기간, 정확한 팀 역할, 발표/수상/성과처럼 사용자의 확인이 필요한 항목

AI가 포트폴리오 문장을 만들 때는 확인되지 않은 내용을 사실처럼 단정하지 않아야 합니다.

