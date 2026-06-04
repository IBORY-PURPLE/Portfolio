# Evidence Asset Manifest

이 포트폴리오는 방문자가 Google Drive 권한에 막히지 않도록 공개 가능한 증빙을 `public/evidence/`에 내재화한다.

## Static Routing

- 배포 경로: `/evidence/<file-name>`
- 저장 위치: `public/evidence/`
- 렌더링 위치: 프로젝트 상세의 Evidence 섹션과 Credentials 페이지
- 비공개 자료: 전화번호 등 민감정보가 있는 `basic-info-md`는 데이터에는 남기되 사이트에 렌더링하지 않는다.

## Ingestion Pipeline

`scripts/sync-evidence-assets.ps1`은 원본 Drive 파일을 공개 사본으로 내려받는 운영용 스크립트다. 사이트 런타임은 이 스크립트나 Drive에 의존하지 않고, 빌드 결과에는 `public/evidence/`의 정적 파일만 포함된다.

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
| `footstep-contribution-profile.md` | Markdown viewer | Footstep 기여 후보 |
| `footstep-readme.md` | Markdown viewer | 팀 프로젝트 source 설명 |
| `gcs-*.md`, `gcs-*.pdf` | Markdown/PDF viewer | GCS 발표, 회고, 자동화 증빙 |
| `cert-*.pdf`, `cert-*.png`, `cert-*.jpg` | PDF/Image preview | 자격증 증빙 |

## QA Gate

- `npm run check`
- `npm run build`
- `.\scripts\sync-evidence-assets.ps1 -VerifyOnly`
- 데스크톱 1280x720, 모바일 390x844에서 Home, Projects, WindMill, Footstep, Credentials, Contact 확인
