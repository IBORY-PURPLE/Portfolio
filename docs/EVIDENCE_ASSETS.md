# Evidence Asset Manifest

이 포트폴리오는 방문자가 Google Drive 권한에 막히지 않도록 공개 가능한 증빙을 `public/evidence/`에 내재화한다.

## Static Routing

- 배포 경로: `/evidence/<file-name>`
- 저장 위치: `public/evidence/`
- 렌더링 위치: 프로젝트 상세의 Evidence 섹션과 Credentials 페이지
- 비공개 자료: 전화번호 등 민감정보가 있는 `basic-info-md`는 데이터에는 남기되 사이트에 렌더링하지 않는다.

## Ingestion Pipeline

`scripts/sync-evidence-assets.ps1`은 Drive 원본 중 공개 가능한 파일만 `public/evidence/`로 내려받는 운영용 스크립트다. 사이트 런타임은 이 스크립트나 Drive에 의존하지 않고, 빌드 결과에는 `public/evidence/`의 정적 파일만 포함된다.

- 자격증은 원본이 아니라 `*-public-redacted.png` 사본만 공개한다. 생년월일, 자격번호, 관리번호, 사진, QR/바코드, 검증 URL은 마스킹 대상이다.
- 내부 회고 원문은 공개하지 않고, 외부용 익명 요약본만 `gcs-pitumi-retro-public-summary.md`로 제공한다.

```powershell
.\scripts\sync-evidence-assets.ps1
.\scripts\sync-evidence-assets.ps1 -VerifyOnly
```

## Public Assets

| File | Viewer | Notes |
|---|---|---|
| `windmill-project-summary.pdf` | PDF inline viewer | WindMill 프로젝트 요약 |
| `windmill-contribution-profile.md` | Markdown viewer | PR/브랜치 기반 기여 후보 |
| `windmill-readme.md` | Markdown viewer | 검증 문장 규칙 |
| `footstep-contribution-profile.md` | Markdown viewer | IBORY-PURPLE 계정 기반 Footstep 기여 확인 기록 |
| `footstep-readme.md` | Markdown viewer | 팀 프로젝트 source 설명 |
| `gcs-*.md`, `gcs-*.pdf` | Markdown/PDF viewer | 공개 가능한 GCS 발표, 회고, 자동화 증빙 |
| `gcs-pitumi-retro-public-summary.md` | Markdown viewer | 내부 회고 원문을 대체한 익명 외부용 요약 |
| `cert-*-public-redacted.png` | Image preview | 민감 필드를 불투명 마스킹한 자격증 공개 사본 |

## Forbidden Public Originals

다음 파일은 `public/evidence/`에 있으면 안 된다. 검증 스크립트는 존재만으로 실패해야 한다.

- `gcs-pitumi-retro.md`
- `cert-history.pdf`
- `cert-history.png`
- `cert-linuxmaster.png`
- `cert-info-processing.jpg`

## QA Gate

- `npm run check`
- `npm run build`
- `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`
- 공개 폴더의 금지 원본 파일 부재 확인
- 데스크톱 1280x720, 모바일 390x844에서 Home, Projects, WindMill, Footstep, Credentials, Contact 확인
