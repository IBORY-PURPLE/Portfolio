# LLM CLI / API Communication Experience Summary

created_at: 2026-05-31
workspace: `local LLM workspace`
purpose: 하위 폴더에서 발견된 LLM CLI 사용 경험 및 API 통신 프로젝트를 AI가 빠르게 이해할 수 있도록 정리

## Executive Summary

이 워크스페이스에는 LLM API와 외부 API를 직접 호출한 경험이 크게 3개 축으로 남아 있다.

1. `daily_snippet_claude`: Claude Messages API로 일일 기록을 요약하고 `daily_snippet` 서버에 업로드하는 Node.js CLI.
2. `EXA`: Telegram 봇이 사용자 메시지를 받아 EXA 검색 API를 호출하고 Claude로 한국어 요약을 생성하는 로컬 봇.
3. `daily_snippet_codex/gcs-room-calendar-sync`: Codex Skill 형태로 GCS 회의실 API와 Google Workspace Calendar CLI를 엮은 자동 예약 워크플로.

`vibe`는 FastAPI 기반 Todo 백엔드 프로젝트로, Claude Code 작업 규칙은 포함되어 있지만 LLM API 통신 구현 프로젝트는 아니다.
`gcs-pulso-mcp`는 `.vscode/settings.json`만 있어 실질 구현은 확인되지 않았다.

## Project Inventory

| Path | Type | LLM/API relevance | Main runtime |
|---|---|---:|---|
| `daily_snippet_claude` | CLI app | High | Node.js / TypeScript / tsx |
| `EXA` | Telegram bot | High | Node.js / TypeScript / tsx |
| `daily_snippet_codex/gcs-room-calendar-sync` | Codex Skill + PowerShell wrappers | High for API orchestration | PowerShell |
| `vibe` | Backend API | Medium, no LLM API call | Python / FastAPI / uv |
| `gcs-pulso-mcp` | Skeleton | Low | N/A |

## 1. `daily_snippet_claude`

### What it does

일일 Markdown 기록에서 오늘 날짜 섹션을 읽고 Claude API에 요약을 요청한 뒤, 생성된 결과를 `daily_snippet` API 서버로 업로드한다.

### Flow

1. CLI entrypoint: `src/cli/index.ts`
2. 기준 날짜 계산: `Intl.DateTimeFormat` with `TIMEZONE`, 기본값 `Asia/Seoul`
3. 입력 파일 읽기: `src/app/read-daily-entry.ts`
4. Claude 호출: `src/infra/claude/claude-client.ts`
5. JSON 응답 정규화: `title`, `summary`, `highlights`, `tomorrow`, `mood`
6. 업로드용 Markdown payload 생성: `src/app/run-daily-snippet.ts`
7. daily snippet API 업로드: `src/infra/daily-snippet-api/client.ts`

### Claude API pattern

Endpoint:

```text
POST {ANTHROPIC_BASE_URL}/v1/messages
```

Headers:

```text
content-type: application/json
x-api-key: {ANTHROPIC_AUTH_TOKEN}
anthropic-version: 2023-06-01
```

Body shape:

```json
{
  "model": "claude-sonnet-4-5",
  "max_tokens": 900,
  "system": "...system prompt markdown...",
  "messages": [
    {
      "role": "user",
      "content": "날짜와 원본 기록"
    }
  ]
}
```

Response handling:

- `content[]` 중 `type === "text"`인 항목의 `text`를 추출한다.
- Claude 응답은 JSON 문자열이어야 한다.
- 파싱 실패 시 원본 응답을 포함해 에러 처리한다.
- Claude 호출 실패 시 fallback 요약 생성기로 계속 진행한다.

### Upload API pattern

Endpoint:

```text
POST {DAILY_SNIPPET_API_URL}{DAILY_SNIPPET_UPLOAD_PATH}
```

Supported auth modes:

- `Authorization: Bearer {DAILY_SNIPPET_API_TOKEN}`
- `x-api-key: {DAILY_SNIPPET_API_TOKEN}`
- no auth

Current request body:

```json
{
  "content": "# 제목\n\nDate: YYYY-MM-DD\n\n요약 본문..."
}
```

### CLI commands

```bash
npm install
npm run daily
npm run dev -- "오늘의 데일리 스니펫 작성해서 업로드 해줘"
npm run check
```

### Important env vars

```text
ANTHROPIC_BASE_URL
ANTHROPIC_AUTH_TOKEN
ANTHROPIC_MODEL
DAILY_SNIPPET_API_URL
DAILY_SNIPPET_API_TOKEN
DAILY_SNIPPET_UPLOAD_PATH
DAILY_SNIPPET_AUTH_SCHEME
DAILY_SNIPPET_SOURCE
DAILY_SOURCE_FILE
TIMEZONE
```

### Notable implementation choices

- `dotenv` + `zod`로 환경변수 검증.
- 시스템 프롬프트를 `prompts/daily-snippet.system.md`로 분리.
- Claude 응답을 자유 텍스트가 아니라 엄격한 JSON으로 요구.
- 업로드 payload는 실제 Swagger/OpenAPI 스펙에 맞게 `client.ts`에서 조정 가능하도록 분리.

## 2. `EXA`

### What it does

Telegram long polling 봇이다. 사용자가 검색이 필요한 메시지를 보내면 EXA 검색 API로 웹/뉴스 결과를 가져오고, Claude API로 한국어 요약과 출처 목록을 생성해 Telegram으로 답장한다.

### Flow

1. App entrypoint: `src/index.ts`
2. 환경변수 로드: `src/config/env.ts`
3. Telegram polling 시작: `src/telegram/client.ts`
4. 메시지 핸들링: `src/telegram/handler.ts`
5. 검색 필요 여부 판단: `src/prompts/summary.ts`
6. EXA 검색: `src/search/exa.ts`
7. Claude 요약: `src/llm/claude.ts`
8. Telegram `sendMessage`로 응답

### Search trigger heuristic

`검색`, `찾아`, `최신`, `뉴스`, `웹`, `링크`, `출처` 중 하나가 메시지에 포함될 때만 검색을 수행한다.

### EXA API pattern

Endpoint:

```text
POST {EXA_BASE_URL}/search
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer {EXA_API_KEY}
```

Body shape:

```json
{
  "query": "user question",
  "num_results": 6,
  "use_autoprompt": true,
  "type": "auto",
  "category": "web | news"
}
```

Search modes:

- `web`: web category only
- `news`: news category only
- `both`: news and web requests in parallel, URL dedupe, then slice to max results

### Claude API pattern

Endpoint:

```text
POST {CLAUDE_BASE_URL}/v1/messages
```

Headers:

```text
Content-Type: application/json
x-api-key: {CLAUDE_API_KEY}
anthropic-version: 2023-06-01
```

Body shape:

```json
{
  "model": "claude-3-5-sonnet-latest",
  "max_tokens": 700,
  "messages": [
    {
      "role": "user",
      "content": "Korean summary prompt with sources"
    }
  ]
}
```

Prompt output contract:

```text
- 요약: 3~6문장
- 출처: 3~6개
- 원문 링크: 3~6개
```

### Telegram API pattern

Base:

```text
https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}
```

Methods used:

- `getUpdates`
- `sendMessage`

`getUpdates` uses long polling with `timeout: 30` and local `offset` tracking.

### CLI commands

```bash
npm install
npm run dev
npm run build
npm run start
npm run health:claude
```

### Important env vars

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_POLL_INTERVAL_MS
EXA_API_KEY
EXA_BASE_URL
EXA_MAX_RESULTS
EXA_SEARCH_MODE
CLAUDE_API_KEY
CLAUDE_BASE_URL
CLAUDE_MODEL
CLAUDE_MAX_TOKENS
```

### Notable implementation choices

- 외부 SDK 없이 native `fetch`로 API 호출.
- Claude health check script가 별도로 있어 API 인증/모델/프록시 상태를 빠르게 검증 가능.
- Claude 오류 메시지에 `cf-ray`, `x-request-id`, `content-type`, body snippet을 포함해 디버깅 정보가 좋다.
- EXA `both` 모드는 `Promise.all`로 news/web을 병렬 호출한다.

## 3. `daily_snippet_codex/gcs-room-calendar-sync`

### What it does

Codex Skill로 작성된 회의실 예약 자동화다. GCS 회의실 API로 예약을 만들고, Google Workspace CLI로 Calendar 이벤트를 만든다. Calendar 생성 실패 시 GCS 예약을 취소하는 rollback 흐름이 있다.

### Flow

1. 요청에서 title/date/start/end/timezone/attendees/room/purpose 정규화
2. `scripts/gcs-pulse.ps1 rooms list`로 회의실 조회
3. `reservations list`로 해당 날짜 예약 조회
4. 시간 겹침 여부 검사
5. `reservations create`로 GCS 예약 생성
6. `scripts/gws-calendar.ps1 events create`로 Google Calendar 이벤트 생성
7. Calendar 실패 시 `reservations cancel`로 rollback

### GCS API pattern

Base:

```text
https://api.1000.school
```

Auth:

```text
Authorization: Bearer {GCS_API_TOKEN}
```

Endpoints:

```text
GET    /meeting-rooms
GET    /meeting-rooms/{room_id}/reservations?date=YYYY-MM-DD
POST   /meeting-rooms/{room_id}/reservations
DELETE /meeting-rooms/reservations/{reservation_id}
```

Reservation body:

```json
{
  "start_at": "2026-04-01T14:00:00+09:00",
  "end_at": "2026-04-01T15:00:00+09:00",
  "purpose": "Sprint planning"
}
```

### CLI commands

```powershell
.\scripts\gcs-pulse.ps1 rooms list
.\scripts\gcs-pulse.ps1 reservations list -RoomId 1 -Date 2026-04-01
.\scripts\gcs-pulse.ps1 reservations create -RoomId 1 -StartAt 2026-04-01T14:00:00+09:00 -EndAt 2026-04-01T15:00:00+09:00 -Purpose "Sprint planning"
.\scripts\gcs-pulse.ps1 reservations cancel -ReservationId 123
```

One-command orchestration:

```powershell
.\scripts\reserve-and-invite.ps1 -Title "Sprint planning" -Date 2026-04-01 -StartTime 14:00 -EndTime 15:00 -Attendees dev1@example.com,dev2@example.com -RoomKeyword "Room A" -Purpose "Sprint planning"
```

### Important env vars

```text
GCS_API_URL
GCS_API_TOKEN
GCS_TIMEZONE
GCS_DEFAULT_ROOM_KEYWORD
GCS_DEFAULT_PURPOSE
GWS_CLI_COMMAND
GWS_CALENDAR_ID
GWS_SEND_UPDATES
GWS_ACCOUNT
```

### Notable implementation choices

- `Invoke-RestMethod`를 감싼 PowerShell wrapper로 API 호출을 표준화.
- Calendar 이벤트 생성 실패 시 예약 rollback을 시도한다.
- 날짜/시간은 `Asia/Seoul` 기준 ISO-8601 `+09:00` 문자열로 변환한다.
- OpenAPI spec 기반으로 endpoint와 response shape를 문서화했다.

## 4. `vibe`

### What it is

`vibe`는 팀 협업용 Todo 관리 백엔드다. FastAPI, SQLModel, Alembic, SQLite, uv 기반으로 구성되어 있다.

### Relevance to LLM/API experience

- LLM API 호출 구현은 없다.
- `CLAUDE.md`에 Claude Code가 프로젝트에서 작업할 때 따라야 할 규칙, 품질 기준, 명령어가 정리되어 있다.
- FastAPI 서버 자체가 REST API 구현 경험으로는 의미가 있다.

### Commands

```bash
uv sync
uv run uvicorn main:app --reload
uv run ruff check .
uv run ruff format --check .
uv run mypy .
uv run pytest
```

### API surface

서버 실행 후:

```text
Swagger UI: http://localhost:8000/docs
ReDoc:      http://localhost:8000/redoc
```

## Cross-Project Patterns

### API call style

- 대부분 SDK 없이 native `fetch` 또는 PowerShell `Invoke-RestMethod`를 사용한다.
- 인증은 주로 bearer token 또는 `x-api-key` header 방식이다.
- base URL, token, model, path는 env var로 분리되어 있다.

### LLM prompt style

- `daily_snippet_claude`는 system prompt 파일을 별도로 두고 JSON-only 응답을 강제한다.
- `EXA`는 검색 결과를 numbered source list로 정리한 뒤 Claude에 한국어 요약 형식을 요구한다.

### Error handling

- Claude 호출 실패 시 response body를 읽어 에러에 포함한다.
- `EXA`의 Claude health check는 status, content-type, request id 계열 헤더를 출력한다.
- `daily_snippet_claude`는 Claude 생성 실패 시 fallback summary로 업로드 흐름을 계속 진행한다.
- GCS/Calendar orchestration은 후속 Calendar 실패 시 선행 GCS 예약을 rollback한다.

### Data normalization

- LLM 응답을 그대로 쓰지 않고 domain type으로 정규화한다.
- 날짜는 `Asia/Seoul`을 기본 기준으로 둔다.
- 외부 API payload는 별도 client/wrapper 계층으로 격리한다.

## Security Notes

민감정보 취급 주의:

- 일부 `.env.example` 파일과 `.vscode/settings.json`에 실제 토큰처럼 보이는 값이 포함되어 있었다.
- 이 요약 문서에는 토큰 값을 옮기지 않았다.
- 공개 저장소나 공유 문서에 올리기 전 다음 조치를 권장한다.

```text
1. 노출된 토큰 폐기/재발급
2. .env.example에는 placeholder만 남기기
3. .env, .vscode/settings.json의 비밀값 git 추적 제외
4. API 호출 로그에 token/body 전문이 남지 않는지 확인
```

## AI Reuse Guide

새 AI 에이전트가 이 워크스페이스를 이어받는다면 다음 순서로 읽으면 된다.

1. `daily_snippet_claude/README.md`
2. `daily_snippet_claude/src/cli/index.ts`
3. `daily_snippet_claude/src/infra/claude/claude-client.ts`
4. `daily_snippet_claude/src/infra/daily-snippet-api/client.ts`
5. `EXA/README.md`
6. `EXA/src/telegram/handler.ts`
7. `EXA/src/search/exa.ts`
8. `EXA/src/llm/claude.ts`
9. `daily_snippet_codex/gcs-room-calendar-sync/SKILL.md`
10. `daily_snippet_codex/gcs-room-calendar-sync/scripts/gcs-pulse.ps1`
11. `daily_snippet_codex/gcs-room-calendar-sync/scripts/reserve-and-invite.ps1`

## Compact Resume Prompt

다른 AI에게 바로 붙여넣을 수 있는 요약:

```text
이 워크스페이스는 LLM/API 통신 실험을 포함한다. 핵심은 3개다.

1. daily_snippet_claude: Node/TS CLI. Markdown 일일 기록에서 오늘 날짜 섹션을 읽고 Claude Messages API(/v1/messages)에 system prompt + user content를 보내 JSON(title, summary, highlights, tomorrow, mood)을 받고, 이를 Markdown content payload로 만들어 daily_snippet 서버에 POST한다. env는 ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_MODEL, DAILY_SNIPPET_API_URL, DAILY_SNIPPET_API_TOKEN 등이다.

2. EXA: Telegram long polling bot. 메시지에 검색/최신/뉴스/링크/출처 같은 키워드가 있으면 EXA /search API를 bearer token으로 호출하고, 검색 결과를 Claude /v1/messages에 넘겨 한국어 요약/출처/링크 형식으로 답변한다. Telegram getUpdates/sendMessage를 native fetch로 호출한다. Claude health check script가 있다.

3. daily_snippet_codex/gcs-room-calendar-sync: Codex Skill + PowerShell wrappers. GCS meeting room API(GET /meeting-rooms, GET/POST reservations, DELETE cancel)를 bearer token으로 호출하고, Google Workspace Calendar CLI로 이벤트를 만든다. Calendar 생성 실패 시 GCS 예약 rollback을 수행한다.

주의: .env.example과 .vscode/settings.json에 실제 토큰처럼 보이는 값이 있었으므로 값을 문서/응답에 노출하지 말고 재발급을 권장한다.
```
