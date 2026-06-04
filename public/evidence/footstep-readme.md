# Footstep Portfolio Source

이 폴더는 Footstep 프로젝트를 포트폴리오 웹사이트의 원천 자료로 쓰기 위한 AI 친화 source입니다.

## How To Read

1. `AI_CONTEXT.md`를 먼저 읽습니다.
2. `project.target.yml`에서 포트폴리오 목표값을 확인합니다.
3. `project.facts.yml`과 `github.evidence.yml`에서 레포 기반 확인 사실을 확인합니다.
4. `contribution-profile.md`에서 본인 기여 후보와 확인 필요 항목을 구분합니다.
5. `website-generation-brief.yml`과 `prompts/portfolio-site-prompt.md`를 사용해 포트폴리오 웹사이트를 생성합니다.

## Important Rule

이 source는 `verified`, `target`, `hypothesis`, `needs_user_confirmation`을 분리합니다.

- `verified`: 공개 GitHub 레포에서 확인한 사실
- `target`: 포트폴리오에서 보여주고 싶은 목표 이미지
- `hypothesis`: 커밋/PR 기록상 사용자와 관련 있어 보이지만 본인 확인이 필요한 항목
- `needs_user_confirmation`: Notion, Figma 세부 화면, 실제 담당 범위처럼 추가 확인이 필요한 항목

AI가 포트폴리오 문장을 만들 때는 확인되지 않은 내용을 사실처럼 단정하지 않아야 합니다.

