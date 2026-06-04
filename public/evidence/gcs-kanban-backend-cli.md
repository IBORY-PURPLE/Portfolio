# Kanban

팀용 칸반 백엔드와 CLI를 한 저장소에서 관리하는 프로젝트입니다. 이 문서는 전체 프로젝트 구조와 빠른 사용 가이드를 한 곳에 모아두었습니다.

목표

- 로컬에서 빠르게 백엔드를 띄워 Google OAuth로 로그인하고 CLI로 워크스페이스·보드·컬럼·카드를 조작하는 것을 목적으로 합니다.

---

## 1) 기술 스택

- 언어 및 런타임
  - Python 3.12+
- 백엔드
  - FastAPI (HTTP API)
  - SQLAlchemy (ORM)
  - Pydantic / pydantic-settings (설정 및 스키마)
  - uv / uvicorn (개발 실행 도구)
  - Authlib, httpx (Google OAuth / HTTP client)
  - PyJWT (JWT 생성/검증)
- CLI
  - Click 기반 패키지 (cli/kanban_cli)
  - httpx (API 호출)
- 테스트 및 린트
  - pytest, pytest-asyncio
  - ruff
- DB
  - 기본: SQLite (로컬 개발용)
  - 배포/운영: Postgres/Supabase 사용 가능 (DATABASE_URL 환경변수로 교체)

---

## 2) 프로젝트 구조

- `backend/` — FastAPI 애플리케이션
  - `backend/app/main.py` — 앱 생성 및 OpenAPI 커스터마이징
  - `backend/app/api/` — 라우터들 (v1 엔드포인트)
    - 주요 엔드포인트 예: [backend/app/api/v1/auth.py:22-69](backend/app/api/v1/auth.py#L22-L69) (OAuth 로그인/CLI 교환)
    - 워크스페이스 관련: [backend/app/api/v1/workspaces.py:29-41](backend/app/api/v1/workspaces.py#L29-L41)
    - 컬럼/카드 엔드포인트: [backend/app/api/v1/columns.py:25-34](backend/app/api/v1/columns.py#L25-L34)
  - `backend/app/core/` — 설정, OAuth 헬퍼, 보안 유틸
    - 설정: [backend/app/core/config.py](backend/app/core/config.py)
    - OAuth: [backend/app/core/oauth.py](backend/app/core/oauth.py)
    - JWT 유틸: [backend/app/core/security.py](backend/app/core/security.py)
  - `backend/app/services/` — 도메인 서비스 (workspace, board, column, card 등)
  - `backend/app/models/` — SQLAlchemy 모델
  - `.env` — 로컬 개발 설정(클라이언트 ID/SECRET 등)

- `cli/` — Click 기반 CLI 패키지
  - `cli/kanban_cli/` — 클릭 커맨드 구현
    - `commands/` — auth, workspaces, boards, columns, cards, spec 등
    - `auth_store.py` — 토큰 저장소 (%APPDATA%/kanban/credentials.json)
    - `common.py` — 클라이언트 빌드 및 설정 수립
  - `cli/README.md` — CLI 전용 사용법 (프로젝트 내 별도 문서)

- `docs/` — 제품 요구사항, 기술 설계, 테스트 케이스 등 운영/기획 문서
- `scripts/` — 개발 편의 스크립트 (예: scripts/cli_smoke_test.py — 자동 캡처 기반 E2E 스모크 테스트)

---

## 3) 사용 가이드 (빠른 시작)

### 1. 사전 준비 (.env)

`backend/.env`에 최소한 아래 항목을 설정하세요 (예시는 로컬 개발값):

```env
BOOTSTRAP_ADMIN_EMAIL=owner@example.com
JWT_SECRET_KEY=replace-with-long-random
SESSION_SECRET_KEY=replace-with-long-random

GOOGLE_WEB_CLIENT_ID=...
GOOGLE_WEB_CLIENT_SECRET=...
GOOGLE_WEB_REDIRECT_URI=http://127.0.0.1:8000/api/v1/auth/google/callback

GOOGLE_CLI_CLIENT_ID=...
GOOGLE_CLI_CLIENT_SECRET=...
GOOGLE_CLI_REDIRECT_URI=http://127.0.0.1:8976/callback

BACKEND_BASE_URL=http://127.0.0.1:8000
```

- Google Cloud Console에서 OAuth 클라이언트를 만들고 `Authorized redirect URI`에 `GOOGLE_WEB_REDIRECT_URI` 및 `GOOGLE_CLI_REDIRECT_URI`를 각각 등록해야 합니다.
- .env를 수정한 뒤에는 백엔드를 재시작해야 변경이 반영됩니다.

### 2. 백엔드 실행

```powershell
cd backend
uv sync
uv run dev --reload
```

- API: `http://127.0.0.1:8000/api/v1`
- Swagger UI: `http://127.0.0.1:8000/docs`

### 3. CLI 설치/실행(개발용)

```powershell
cd cli
uv sync
uv run kanban --help
```

또는 저장소 루트에서 일회성 실행:

```powershell
uvx --from ./cli kanban auth login
```

### 4. 로그인 (CLI)

1. `uv run kanban auth login` 명령을 실행합니다.
2. 브라우저 창이 열리고 Google 계정으로 로그인을 진행합니다.
3. Google이 리디렉트할 때 로컬 캡처 포트(예: `http://127.0.0.1:8976/callback`)에 CLI가 리스닝하지 않으면 브라우저에 `ERR_CONNECTION_REFUSED`가 표시될 수 있습니다. 이 경우 주소창에 표시된 전체 콜백 URL을 복사해서 CLI에 붙여넣으면 됩니다(프롬프트: "Paste the full callback URL after login:").
4. 로그인 성공 시 CLI가 발급된 세션(JSON)을 출력하고 토큰을 저장합니다.

- 저장 위치(Windows): `%APPDATA%\kanban\credentials.json`

### 5. 자주 쓰는 CLI 명령 예시

- 현재 사용자 확인
  - `uv run kanban auth me`
- 워크스페이스
  - `uv run kanban workspaces list`
  - `uv run kanban workspaces create --name "AI Startup"`
  - `uv run kanban workspaces board <workspace-id>`
- 컬럼
  - `uv run kanban boards columns list <board-id>`
  - `uv run kanban boards columns create <board-id> --name "Blocked"`
- 카드
  - `uv run kanban columns cards create <column-id> --title "Prepare sprint"`
  - `uv run kanban cards move <card-id> --target-column-id <target-column-id> --target-position 0`

자세한 명령 목록과 예제는 [cli/README.md](cli/README.md)를 참고하세요.

### 6. 빠른 E2E(예)

1. 로그인: `uv run kanban auth login` → 콜백 URL 붙여넣기
2. 워크스페이스 생성: `uv run kanban workspaces create --name "CLI Test Workspace" --json`
3. 응답에서 `workspace_id` 복사 → 보드 조회: `uv run kanban workspaces board <workspace-id> --json`
4. 컬럼 id 확보 → 카드 생성: `uv run kanban columns cards create <column-id> --title "Prepare sprint" --json`
5. 카드 이동: `uv run kanban cards move <card-id> --target-column-id <target-column-id> --target-position 0 --json`

### 7. 테스트 및 검증

- 백엔드 테스트

```powershell
cd backend
uv run pytest -c pyproject.toml tests
```

- CLI 테스트

```powershell
cd cli
uv run pytest
```

- OpenAPI와 CLI 매핑 확인

```powershell
cd cli
uv run kanban spec check
```

---

## 문제 해결 팁 (자주 발생)

- 401 / 인증 오류
  - `.env` 값이 올바르게 설정되어 있는지(특히 JWT_SECRET_KEY, GOOGLE_* 값) 확인하고 백엔드를 재시작하세요.
  - CLI에 저장된 `credentials.json`의 `base_url`과 실제 백엔드 주소가 일치하는지 확인하세요.
- OAuth redirect_uri 불일치
  - Google Cloud Console에 등록된 redirect URI가 `backend/.env`의 값과 1:1로 일치해야 합니다(포트 포함).
- `Could not reach the backend` 오류
  - 백엔드가 실행 중인지, `--base-url`이 맞는지 확인하세요.

---

## 추가 문서

- 제품 요구/설계: `docs/PRD.md`, `docs/TSD.md`
- CLI 설계: `docs/PRD_CLI.md`, `docs/TSD_CLI.md`
- 테스트 케이스: `docs/TEST_CASE.md`, `docs/TEST_CASE_CLI.md`

---

필요하면 이 README에 예시 출력(예: 워크스페이스 생성 응답 샘플)이나 로컬 개발용 `.env.example` 파일을 추가해 드리겠습니다.