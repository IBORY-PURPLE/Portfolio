export type Visibility = "public" | "private";

export type ProjectStatus =
  | "verified"
  | "strong_but_needs_confirmation"
  | "needs_user_confirmation";

export type StatusLabel = {
  label: string;
  description: string;
};

export type Evidence = {
  id: string;
  title: string;
  type: string;
  url: string;
  assetUrl?: string;
  pages?: number;
  visibility: Visibility;
  note: string;
};

export type Credential = {
  title: string;
  issuer: string;
  date: string;
  evidenceId: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectCover = {
  src: string;
  alt: string;
  focalPoint?: string;
  kind: "concept" | "documentary" | "product" | "reconstruction" | "evidence";
};

export type ProjectMetric = {
  label: string;
  value: string;
  description: string;
  kind: "input" | "output" | "impact";
};

export type ProjectResultLabel = "Result" | "Team Result" | "Evidence" | "Planned Experiment";

export type ProjectContribution = {
  level: string;
  percentage?: number;
  percentageBasis?: string;
  ownership: string;
  scope: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  priority: number;
  status: ProjectStatus;
  tags: string[];
  summary: string;
  cover: ProjectCover;
  headlineImpact?: string;
  cardProblem?: string;
  cardAction?: string;
  cardResult?: string;
  resultLabel?: ProjectResultLabel;
  productSignal?: string;
  problem: string;
  customerContext: string;
  planningNarrative: string;
  salesNarrative: string;
  role: string;
  roiMetrics: ProjectMetric[];
  contribution: ProjectContribution;
  qualitativeHighlights: string[];
  executionScope: string[];
  technicalHighlights: string[];
  architectureNotes: string[];
  evidenceIds: string[];
  media?: ProjectMedia[];
  lessons: string[];
  improvements: string[];
};

export type Profile = {
  name: string;
  englishName: string;
  email: string;
  headline: string;
  shortPitch: string;
  location: string;
  education: {
    school: string;
    major: string;
    gpa: string;
    scholarship: string;
  };
  experience: Array<{
    period: string;
    title: string;
    description: string;
  }>;
  strengths: string[];
  links: Array<{
    label: string;
    href: string;
    kind: "primary" | "secondary";
  }>;
};

export type PortfolioData = {
  profile: Profile;
  filters: string[];
  statusLabels: Record<ProjectStatus, StatusLabel>;
  projects: Project[];
  credentials: Credential[];
  evidence: Evidence[];
};

export const portfolioData = {
  profile: {
    name: "송채우",
    englishName: "Song Chaewoo",
    email: "songchaewoo0@gmail.com",
    headline: "고객 문제를 제품 실험으로 연결하는 PM/Product Builder",
    shortPitch: "현장 인터뷰와 수요 신호로 문제를 정의하고, 웹·API·AI 자동화로 검증 가능한 제품 실험까지 만듭니다.",
    location: "Seoul, Korea",
    education: {
      school: "가천대학교",
      major: "인공지능학과(구 소프트웨어전공)",
      gpa: "전체 4.24 / 직전학기 4.5",
      scholarship: "국가우수장학금 이공계"
    },
    experience: [
      {
        period: "2022.03 - 2022.08",
        title: "UMC 웹 프론트 파트원",
        description: "React 기반 팀 프로젝트와 GitHub 협업 흐름을 경험했습니다."
      },
      {
        period: "2023.09 - 2025.03",
        title: "국방정보본부 정보사령부 육군 정보체계운용병",
        description: "정보체계 운영 환경에서 안정성, 기록, 절차 중심의 업무 태도를 익혔습니다."
      }
    ],
    strengths: [
      "고객 인터뷰와 관찰을 문제 정의로 전환",
      "기획 의도와 세일즈 메시지를 짧고 설득력 있게 정리",
      "React/Vite, Next.js, FastAPI, Supabase, 외부 API 연동 실행",
      "LLM API와 자동화 워크플로를 실제 업무 흐름으로 연결",
      "GitHub PR, 이슈, 문서 기반 협업 맥락 이해"
    ],
    links: [
      {
        label: "Email",
        href: "mailto:songchaewoo0@gmail.com",
        kind: "primary"
      }
    ]
  },
  filters: [
    "전체",
    "PM·기획",
    "고객검증",
    "개발·자동화",
    "협업·발표",
    "보조 사례"
  ],
  statusLabels: {
    verified: {
      label: "근거 자료 확인",
      description: "공개 근거 자료에서 확인 가능한 범위만 표시했습니다."
    },
    strong_but_needs_confirmation: {
      label: "강한 근거, 확인 필요",
      description: "근거가 강하지만 본인 최종 확인 전까지 단정하지 않습니다."
    },
    needs_user_confirmation: {
      label: "확인 필요",
      description: "지원서 문장으로 쓰기 전 사용자 확인이 필요합니다."
    }
  },
  projects: [
    {
      slug: "windmill",
      title: "WindMill",
      subtitle: "투자 판단 보조와 포트폴리오 추천 흐름을 가진 주식 웹 서비스",
      period: "2025.08",
      priority: 10,
      status: "strong_but_needs_confirmation",
      tags: ["Planning", "Customer", "Frontend", "AI/API", "Collaboration"],
      summary: "흩어진 주식 정보, 관심/보유 종목 관리, AI 예측 그래프를 한 흐름으로 묶어 사용자가 종목을 찾고 비교하고 판단하도록 돕는 프로젝트입니다.",
      cover: {
        src: "/assets/projects/covers/windmill-v4.webp",
        alt: "WindMill 모바일 홈과 아바타 기반 포트폴리오, 주식 뉴스 화면을 재구성한 실제 제품 인터페이스",
        kind: "product"
      },
      headlineImpact: "투자 정보 탐색, 관심/보유 관리, AI 예측을 하나의 판단 여정으로 묶은 확인 전 강점 사례",
      cardProblem: "개인 투자자가 종목 정보와 예측, 보유/관심 상태를 따로 확인해야 함",
      cardAction: "상세, 거래 로그, 예측 그래프, 추천 화면을 판단 흐름으로 연결",
      cardResult: "3개 공개 근거가 있으나 최종 기여 범위 확인 전까지 보조 사례로 배치",
      resultLabel: "Evidence",
      productSignal: "사용자 판단 여정을 설계한 강점은 있으나, 채용용 대표 사례로 쓰기 전 역할 확인이 필요합니다.",
      problem: "개인 투자자는 종목 정보, 관심 종목, 보유 종목, 예측 데이터를 각각 다른 곳에서 확인해야 해 판단 흐름이 끊깁니다.",
      customerContext: "사용자가 종목을 검색하고, 보유/관심 상태를 관리하고, 예측 그래프와 포트폴리오 추천을 통해 다음 행동을 정하는 흐름을 중심으로 정리했습니다.",
      planningNarrative: "기술 스택보다 먼저 사용자가 '무엇을 보고 어떤 판단을 해야 하는가'를 잡고, 주식 상세, 거래 로그, AI 예측, 추천 화면을 단계적으로 연결했습니다.",
      salesNarrative: "투자 판단을 대신하는 서비스가 아니라, 사용자의 정보 탐색 비용을 낮추고 비교 가능한 근거를 한 화면 안에 모으는 도구로 설명할 수 있습니다.",
      role: "공개 GitHub 기록 기준으로 `채우` author와 `chaewoo` 브랜치 PR이 다수 확인됩니다. 최종 확인 전까지는 주요 프론트엔드 기여 후보로 표현합니다.",
      roiMetrics: [
        {
          label: "Input · 구현 범위",
          value: "5개 UI 흐름",
          description: "주식 상세부터 관심/보유, 거래 로그, 예측, 추천까지 연결",
          kind: "input"
        },
        {
          label: "Output · 제품 구조",
          value: "1개 판단 여정",
          description: "흩어진 투자 정보를 탐색·비교·판단 흐름으로 통합",
          kind: "output"
        },
        {
          label: "Evidence · 검증 가능성",
          value: "3개 공개 근거",
          description: "요약 PDF, 기여 후보 기록, README로 역할을 교차 확인",
          kind: "output"
        }
      ],
      contribution: {
        level: "주요 Frontend 기여 후보",
        ownership: "기여 범위 최종 확인 전",
        scope: [
          "사용자 판단 여정 중심의 화면 구조",
          "React/Vite 주요 화면과 API 연동 후보",
          "TanStack Query와 배포 프록시 문서화 후보"
        ]
      },
      qualitativeHighlights: [
        "고객 가치: 종목 탐색, 보유/관심 관리, 예측 확인, 추천 흐름을 한 제품 시나리오로 구성",
        "기획 포인트: 주식 상세와 포트폴리오 추천을 별개 기능이 아닌 판단 여정으로 연결",
        "협업 포인트: PR, 브랜치, README, 배포 설정 등 공개 기록 기반의 증빙이 남아 있음"
      ],
      executionScope: [
        "React/Vite 기반 프론트엔드 주요 화면 구현 후보",
        "CRA에서 Vite로 전환 후보",
        "TanStack Query 도입 및 fetch 흐름 개선 후보",
        "주식 상세, 관심/보유 종목, 거래 로그, 예측 그래프, 포트폴리오 추천 UI 후보",
        "Vercel 배포와 `/api/*` 프록시 문서화 후보"
      ],
      technicalHighlights: [
        "React/Vite",
        "TanStack Query",
        "AI 예측 API 연동",
        "Portfolio API 연동",
        "Vercel proxy"
      ],
      architectureNotes: [
        "Frontend page layer에서 stock detail, mystock, interest stock, portfolio 추천 흐름을 분리",
        "API client layer를 통해 predict, portfolio, mystock 호출을 정리",
        "Vercel 배포 환경에서 `/api/*` proxy를 문서화"
      ],
      evidenceIds: ["windmill-summary-pdf", "windmill-contribution-profile", "windmill-readme"],
      lessons: [
        "사용자 판단을 돕는 서비스에서는 기능 목록보다 정보가 나타나는 순서가 더 중요합니다.",
        "API 호출 흐름은 화면 완성도뿐 아니라 사용자가 기다리는 시간을 줄이는 제품 경험입니다."
      ],
      improvements: [
        "기여 범위와 팀 규모, 수상/발표 여부를 본인 확인 후 확정 문장으로 전환",
        "실제 배포 URL과 공개 GitHub URL을 CTA에 연결"
      ]
    },
    {
      slug: "gcs-daily-snippet",
      title: "GCS Pulse Daily Snippet Agent",
      subtitle: "Obsidian 일기를 API와 AI 피드백 루프로 자동 업로드하는 에이전트 워크플로",
      period: "2026.06",
      priority: 3,
      status: "verified",
      tags: ["Planning", "AI/API", "Backend", "Automation"],
      summary: "GCS Pulse Daily/Weekly Snippet API와 웹 화면을 구현하고, Codex/Claude Code 에이전트가 Obsidian 기록을 구조화해 점수 기준을 통과할 때까지 개선하는 자동화 루프를 설계했습니다.",
      cover: {
        src: "/assets/projects/covers/gcs-daily-snippet.webp",
        alt: "일기 기록이 API와 품질 검토 장치를 순환하며 개선되는 자동화 루프",
        kind: "concept"
      },
      headlineImpact: "회고 업로드와 AI 피드백 개선을 매일 반복 가능한 자동화 루프로 전환",
      cardProblem: "회고 작성, 업로드, 피드백 반영이 매일 수동 반복됨",
      cardAction: "API 명세, 웹 화면, 에이전트 재시도 정책을 하나로 연결",
      cardResult: "Obsidian 기록을 점수 기준 통과까지 자동 개선",
      resultLabel: "Evidence",
      productSignal: "사람이 반복하던 업무를 API와 피드백 루프로 줄이는 제품 운영 감각을 보여줍니다.",
      problem: "매일 작성하는 Obsidian 회고와 GCS Pulse 업로드 형식이 달라 반복 입력 비용이 컸고, AI 피드백 점수를 보고 다시 고치는 과정도 수동이었습니다.",
      customerContext: "사용자는 원문 일기를 그대로 공개하지 않으면서도, 회고 품질을 유지하고 매일 누락 없이 기록을 업로드하고 싶어 합니다.",
      planningNarrative: "핵심은 'AI가 글을 대신 쓰는 것'이 아니라, 근거 자료를 보존하고 서버의 평가 기준을 통과할 때까지 자동 개선하는 품질 관리 루프입니다.",
      salesNarrative: "개인의 회고 습관을 API, 웹 UI, 자동화, 피드백 분석이 연결된 작은 제품으로 바꾼 사례입니다.",
      role: "개인 프로젝트 owner로서 API 명세 분석, Daily/Weekly Snippet API와 웹 기능 구현, 에이전트 자동 업로드 워크플로 설계를 담당한 것으로 자료에 정리되어 있습니다.",
      roiMetrics: [
        {
          label: "Input · 연결 범위",
          value: "4개 실행 계층",
          description: "Obsidian, API, 웹 화면, 에이전트 자동화를 하나의 루프로 설계",
          kind: "input"
        },
        {
          label: "Output · 품질 기준",
          value: "90점 이상",
          description: "서버 피드백 기준을 통과할 때까지 자동 개선",
          kind: "output"
        },
        {
          label: "Evidence · 운영 안정성",
          value: "Retry + Rollback",
          description: "실패 시 재시도하고 최대 시도 초과 시 임시 업로드를 복구",
          kind: "output"
        }
      ],
      contribution: {
        level: "개인 프로젝트 Owner",
        percentage: 100,
        ownership: "기획·설계·구현 전 과정",
        scope: [
          "API 명세 분석과 Daily/Weekly 기능 구현",
          "웹 작성 화면과 점수 시각화",
          "에이전트 자동 업로드 및 실패 복구 정책"
        ]
      },
      qualitativeHighlights: [
        "원문을 그대로 노출하지 않는 privacy-aware diary transformation",
        "90점 이상 feedback gate와 retry/rollback 정책",
        "API 명세, 웹 화면, CLI 자동화, 에이전트 프롬프트를 하나의 루프로 연결"
      ],
      executionScope: [
        "FastAPI Daily/Weekly Snippet CRUD, organize, feedback API 흐름",
        "Next.js/React/TypeScript 기반 작성 화면과 score visualization",
        "Python CLI, Windows Task Scheduler, Obsidian linked note graph parsing",
        "Codex/Claude Code 에이전트 prompt loop 설계"
      ],
      technicalHighlights: [
        "FastAPI",
        "Next.js",
        "React",
        "TypeScript",
        "SSE streaming",
        "OpenAPI",
        "Bearer token auth",
        "Windows Task Scheduler"
      ],
      architectureNotes: [
        "Obsidian note graph collector가 linked note context를 수집",
        "GCS Pulse API가 create/update/delete/feedback 상태를 관리",
        "AI feedback total_score가 target 미만이면 이전 feedback을 다음 prompt에 재주입",
        "최대 시도 실패 시 임시 업로드를 rollback"
      ],
      evidenceIds: ["gcs-daily-snippet-agent-md"],
      media: [
        {
          src: "/assets/projects/evidence/daily-artifact-flow.webp",
          alt: "Daily Snippet API와 AI 피드백 루프 실제 문서 기반 artifact preview",
          caption: "실제 Markdown 근거 문서의 구현 흐름을 시각화한 artifact preview"
        },
        {
          src: "/assets/projects/evidence/daily-artifact-stack.webp",
          alt: "Daily Snippet 자동화 구현 범위 실제 문서 기반 artifact preview",
          caption: "실제 근거 문서에 기록된 privacy, API, UI, agent 운영 범위"
        }
      ],
      lessons: [
        "자동화는 한 번 실행보다 실패와 재시도를 설계할 때 제품 경험이 됩니다.",
        "프롬프트 품질은 서버 rubric과 연결될 때 더 객관적으로 개선할 수 있습니다."
      ],
      improvements: [
        "개인 일기 원문은 계속 제외하고, 점수 변화와 설계 구조만 공개 증빙으로 사용",
        "라이브 데모용 sample note를 별도로 만들어 개인정보 없이 흐름 시연"
      ]
    },
    {
      slug: "gcs-hutzpa-creator-popups",
      title: "1인 창작자 오프라인 접점 검증",
      subtitle: "100명 DM, 28명 응답, 현장 방문으로 작은 오프라인 판매 접점의 문제 신호를 확인한 팀 발표",
      period: "2026.05",
      priority: 2,
      status: "verified",
      tags: ["Planning", "Research", "Customer", "Sales", "Presentation", "Collaboration"],
      summary: "1인 굿즈/일러스트 창작자가 기존 팔로워 밖의 신규 고객을 만나는 문제를 잡고, DM 반응과 오프라인 공간 방문으로 낮은 비용의 검증 흐름을 설계한 3차 팀 발표 프로젝트입니다.",
      cover: {
        src: "/assets/projects/covers/gcs-hutzpa-creator-popups.webp",
        alt: "창작자의 작은 굿즈가 여러 오프라인 공간의 진열대로 연결되는 프리토타입 생태계",
        kind: "concept"
      },
      headlineImpact: "100명 DM과 현장 방문으로 1인 창작자의 오프라인 진입 문제 신호를 확인",
      cardProblem: "1인 창작자는 팔로워 밖 신규 고객을 만날 낮은 비용의 접점이 부족함",
      cardAction: "DM 100명·응답 28명과 현장 방문을 바탕으로 공간 접촉 계획 설계",
      cardResult: "작가 10명·공간 20곳 대상 유료 테스트 계획",
      resultLabel: "Planned Experiment",
      productSignal: "온라인 가설을 실제 고객/공간 접촉으로 좁히고 유료 테스트 가설을 구체화한 사례입니다.",
      problem: "소규모 1인 창작자는 온라인 노출이 기존 팔로워 중심이고, 대형 페어나 단독 팝업은 비용과 운영 부담이 커 신규 고객을 만날 작은 접점이 부족합니다.",
      customerContext: "서울일러스트페어 참여 창작자를 중심으로 DM 100명을 시도해 28명의 응답을 확보했고, 군자역 플리마켓과 독립서점 공간을 방문해 실제 오프라인 진입 비용과 운영 조건을 확인했습니다.",
      planningNarrative: "온라인 홍보 한계, 페어 비용, 공간 맥락을 분리해 '기존 방문객이 있는 오프라인 공간에서 소량으로 발견되는 구조'라는 가설로 좁혔습니다.",
      salesNarrative: "작가 10명에게 유료 테스트를 제안하고 사진관·꽃집·네일샵·카페 등 공간 20곳을 접촉하는 다음 실험을 설계했습니다. 공간 1곳에 3~5명분 굿즈를 소량 배치하는 프리토타이핑 계획입니다.",
      role: "발표대본에서 팀 후츠파 발표자로 확인됩니다. 팀 발표 자료 기준으로 문제 정의, 현장 검증, 다음 검증 계획을 함께 정리한 프로젝트입니다.",
      roiMetrics: [
        {
          label: "Input · 고객 접촉",
          value: "DM 100명",
          description: "서울일러스트페어 참여 1인 창작자에게 문제 신호를 확인",
          kind: "input"
        },
        {
          label: "Output · 초기 반응",
          value: "응답 28명",
          description: "오프라인 신규 고객 접점에 대한 구체적 반응 확보",
          kind: "output"
        },
        {
          label: "Impact · 응답률",
          value: "28%",
          description: "다음 유료 테스트와 공간 섭외 실험으로 이어질 수요 신호",
          kind: "impact"
        }
      ],
      contribution: {
        level: "팀 공동 기여 · 발표자",
        ownership: "발표 대본에서 역할 확인",
        scope: [
          "1인 창작자 문제 가설 정리",
          "현장 검증 결과와 공간 조건 구조화",
          "유료 테스트·Fake Door 다음 실험 제안"
        ]
      },
      qualitativeHighlights: [
        "서울일러스트페어 참여 1인 창작자 대상 DM 100명, 응답 28명으로 초기 수요 신호 확인",
        "군자역 플리마켓과 독립서점 방문을 통해 자리 대여비, 운영 부담, 공간 맥락을 구체화",
        "작가 유료 테스트와 오프라인 공간 접촉을 다음 검증 행동으로 전환"
      ],
      executionScope: [
        "1인 창작자 문제 가설 정리",
        "DM 기반 고객 반응 확인",
        "오프라인 공간 방문과 비용 조사",
        "유료 테스트, 공간 섭외, Fake Door 검증 계획 수립"
      ],
      technicalHighlights: [
        "Customer Discovery",
        "Field Research",
        "Market Sizing",
        "Fake Door Test",
        "Presentation"
      ],
      architectureNotes: [
        "창작자 오프라인 진출 욕구 확인",
        "페어와 단독 팝업의 비용/운영 부담 분리",
        "기존 방문객이 있는 공간과 소량 굿즈 배치 가설 설정",
        "유료 테스트와 공간 접촉으로 다음 검증 단위를 설계"
      ],
      evidenceIds: ["gcs-hutzpa-3-slides-pdf", "gcs-hutzpa-3-script-pdf"],
      media: [
        {
          src: "/assets/projects/evidence/creator-01.webp",
          alt: "1인 창작자 오프라인 접점 발표자료 첫 페이지",
          caption: "실제 3차 팀 발표자료 · 문제와 실험 방향"
        },
        {
          src: "/assets/projects/evidence/creator-02.webp",
          alt: "1인 창작자 오프라인 접점 발표자료 두 번째 페이지",
          caption: "실제 3차 팀 발표자료 · 고객과 공간 맥락"
        }
      ],
      lessons: [
        "아이디어가 설득력 있어 보여도 고객 반응, 공간 조건, 지불 의사를 분리해서 확인해야 합니다.",
        "발표 자료는 결과 보고가 아니라 다음 검증 행동을 만들 때 더 강한 제품 문서가 됩니다."
      ],
      improvements: [
        "실제 유료 테스트 결과가 생기면 전환율과 재참여 의사를 추가",
        "창작자/공간 양면 시장의 우선순위를 더 명확히 분리"
      ]
    },
    {
      slug: "gcs-agentic-linkedin",
      title: "AgenticLinkedIn",
      subtitle: "AI agent를 LinkedIn형 프로필·네트워크 맥락으로 보여준 1차 AI Native 데모",
      period: "2026.04",
      priority: 4,
      status: "verified",
      tags: ["Planning", "AI/API", "Frontend", "Presentation", "Collaboration"],
      summary: "Drive에서 별도 AgenticLinkedIn 폴더, 발표자료, 메인 이미지, 데모 영상이 확인된 AI Native 프로젝트입니다. 선원/고립된 바다 고객검증 사례와 섞이지 않도록 독립 대표 프로젝트로 분리했습니다.",
      cover: {
        src: "/assets/projects/covers/gcs-agentic-linkedin.webp",
        alt: "AgentLinkedIn 발표자료 표지와 AI agent 네트워크 그래픽",
        kind: "evidence"
      },
      headlineImpact: "AI agent 컨셉을 LinkedIn형 네트워크·프로필 경험으로 보여주는 독립 데모를 구성",
      cardProblem: "AI agent 데모는 기능만 나열하면 역할과 협업 맥락이 빠르게 이해되지 않음",
      cardAction: "LinkedIn형 프로필·네트워크 메타포로 agent 발견과 설명 흐름을 설계",
      cardResult: "별도 발표자료·메인 이미지·데모 영상이 확인된 AI Native 사례",
      resultLabel: "Evidence",
      productSignal: "고객검증보다 AI Native 제품 컨셉과 데모 구조를 빠르게 만든 대표 사례입니다.",
      problem: "AI agent 프로젝트는 기능만 보여주면 채용자나 협업자가 '이 agent가 어떤 역할을 하고 왜 필요한가'를 빠르게 이해하기 어렵습니다.",
      customerContext: "팀은 agentic AI를 LinkedIn 같은 프로필·연결 맥락으로 보여주는 방향을 잡고, 발표자료와 메인 이미지, 데모 영상으로 별도 산출물을 남겼습니다.",
      planningNarrative: "기술 데모를 기능 나열이 아니라 agent의 정체성, 관계, 활용 맥락이 드러나는 제품 설명 흐름으로 바꿨습니다.",
      salesNarrative: "AgenticLinkedIn은 고립된 바다 선원 문제 검증과 다른 축의 AI Native 데모입니다. 사용자가 agent를 발견하고 비교하고 협업 가능성을 상상하도록 만드는 컨셉 사례로 보여줍니다.",
      role: "Drive의 AgenticLinkedIn 폴더와 발표자료 파일명에서 송채우가 팀 발표 참여자로 확인됩니다. 공개 자료만으로 개인별 구현 범위를 단정하지 않습니다.",
      roiMetrics: [
        {
          label: "Input · 산출물",
          value: "3개 Drive 근거",
          description: "발표자료, 메인 이미지, 데모 영상이 별도 폴더에서 확인됨",
          kind: "input"
        },
        {
          label: "Output · 제품 컨셉",
          value: "Agent LinkedIn",
          description: "agent 프로필과 연결 맥락을 LinkedIn형 데모로 구조화",
          kind: "output"
        },
        {
          label: "Evidence · 독립 산출물",
          value: "독립 사례",
          description: "고립된 바다 고객검증 사례와 섞이지 않도록 대표 프로젝트로 분리",
          kind: "output"
        }
      ],
      contribution: {
        level: "팀 공동 기획·데모 발표",
        percentageBasis: "개인별 구현 기여율은 Drive 자료만으로 미분해",
        ownership: "AgenticLinkedIn 발표자료·데모 근거에서 팀 참여 확인",
        scope: [
          "Agentic AI 제품 컨셉 구조화",
          "LinkedIn형 프로필·네트워크 메타포 정리",
          "발표자료와 데모 흐름 구성 참여"
        ]
      },
      qualitativeHighlights: [
        "제품 컨셉: AI agent를 단순 기능이 아니라 프로필과 관계 맥락으로 설명",
        "데모 구조: 발표자료, 메인 이미지, 데모 영상이 별도 Drive 폴더로 확인",
        "포트폴리오 정리: 고립된 바다 고객검증 사례와 분리해 AI Native 역량을 별도 신호로 제시"
      ],
      executionScope: [
        "AgenticLinkedIn 제품 컨셉 정리",
        "AI agent 프로필·네트워크형 사용자 경험 설계",
        "팀 발표자료와 데모 영상 흐름 구성",
        "선원 문제 검증 프로젝트와의 포트폴리오 항목 분리"
      ],
      technicalHighlights: [
        "AI Native",
        "Agentic AI",
        "Product Concept",
        "Demo Video",
        "Presentation"
      ],
      architectureNotes: [
        "Agent를 프로필 단위로 설명",
        "LinkedIn형 연결 맥락으로 발견·비교 흐름 구성",
        "발표자료와 데모 영상으로 제품 컨셉 검증",
        "고객검증 사례와 AI Native 데모 사례를 별도 카드로 분리"
      ],
      evidenceIds: [
        "gcs-agentic-linkedin-slides-pdf",
        "gcs-agentic-linkedin-main-image-drive",
        "gcs-agentic-linkedin-demo-drive"
      ],
      lessons: [
        "AI 데모는 기능보다 사용자가 이해할 역할과 맥락이 먼저 보여야 합니다.",
        "서로 다른 스프린트 산출물은 하나의 카드에 섞지 않을 때 채용 담당자가 빠르게 이해합니다."
      ],
      improvements: [
        "Drive 메인 이미지를 접근 가능한 로컬 WebP 커버로 교체",
        "개인별 구현/기획 범위를 확인해 역할 문장을 더 날카롭게 분리"
      ]
    },
    {
      slug: "gcs-hutzpa-construction-billing",
      title: "공사 기성청구 고객 검증",
      subtitle: "9시간 현장 인터뷰로 데스크 리서치의 빈틈을 깨고 진짜 기성청구 문제를 찾다",
      period: "2026.05",
      priority: 1,
      status: "verified",
      tags: ["Planning", "Research", "Customer", "Sales", "Presentation", "Collaboration"],
      summary: "오전 10시부터 오후 7시까지 위례 건설 현장을 직접 돌며 인터뷰 거절을 감수했습니다. 덤프트럭 기사에서 DL건설 현장 관리자까지 이해관계자를 넓혀, 월말 기성청구 자료가 서로 연결되지 않는 진짜 Pain Point를 발견하고 사업 발표의 문제 정의로 전환했습니다.",
      cover: {
        src: "/assets/projects/covers/gcs-hutzpa-construction-billing.webp",
        alt: "건설 현장의 흩어진 사진·도면·수량 자료가 하나의 라임색 흐름으로 연결되는 장면",
        kind: "concept"
      },
      headlineImpact: "9시간 현장 인터뷰로 기성청구 병목을 찾고 초기 수요 신호까지 확인",
      cardProblem: "데스크 리서치만으로는 기성청구의 진짜 병목과 타깃이 보이지 않음",
      cardAction: "현장 방문과 이해관계자 인터뷰로 원청 공무 담당자 문제로 피벗",
      cardResult: "조회 57명 중 신청 24명, 파일럿 확정 8명 신호 확보",
      resultLabel: "Team Result",
      productSignal: "틀린 가설을 현장 증거로 버리고 더 큰 문제로 피벗한 대표 고객 검증 사례입니다.",
      problem: "데스크 리서치만으로는 '누가 기성청구 과정에서 가장 큰 비용을 치르는가'가 보이지 않았습니다. 초기 덤프트럭 기사 가설을 고집하면 현장의 더 큰 병목을 놓칠 수 있는 상황이었습니다.",
      customerContext: "오전 10시부터 오후 7시까지 위례 건설 현장에 직접 찾아가 거절을 무릅쓰고 대화를 요청했습니다. 덤프트럭 기사에게서 출발해 DL건설 현장 관리자까지 인터뷰 범위를 넓히며, 사진·수량·도면을 월말마다 다시 맞춰야 하는 실무자의 목소리를 확보했습니다.",
      planningNarrative: "초기 가설이 틀릴 수 있음을 빠르게 인정하고, 현장에서 반복해서 나온 증언을 따라 타깃을 원청 공무 담당자로 피벗했습니다. 흩어진 공사 데이터가 '발주처가 검증 가능한 형태'로 연결되지 않는 구조를 핵심 문제로 정의했습니다.",
      salesNarrative: "현장 목소리로 문제 정의를 날카롭게 만든 뒤 2차 후츠파 사업 발표를 완수했습니다. 이후 랜딩페이지에서도 조회 57명 중 신청 24명, 파일럿 확정 8명이라는 초기 수요 신호를 확보했습니다.",
      role: "현장 인터뷰와 문제 정의 전환에 직접 참여하고, 팀 발표·회고에서 검증 결과를 사업 맥락으로 구조화했습니다. 팀 전체 기여율은 공개 자료만으로 정확히 나누지 않습니다.",
      roiMetrics: [
        {
          label: "현장 밀착 검증",
          value: "9시간",
          description: "오전 10시부터 오후 7시까지 위례 건설 현장을 직접 탐색",
          kind: "input"
        },
        {
          label: "인터뷰 확장",
          value: "기사 → 관리자",
          description: "거절을 감수하며 덤프트럭 기사부터 DL건설 현장 관리자까지 접근",
          kind: "input"
        },
        {
          label: "진짜 Pain Point",
          value: "문제 신호 확인",
          description: "데스크 리서치로 보이지 않던 기성청구 자료 연결 병목을 발견",
          kind: "output"
        },
        {
          label: "후속 수요 신호",
          value: "24명 → 8명",
          description: "신청 전환율 42%, 신청자 중 파일럿 확정 전환율 33%",
          kind: "impact"
        }
      ],
      contribution: {
        level: "현장 인터뷰·문제 정의 기여",
        percentageBasis: "팀 내 전체 기여율은 공개 자료상 미확인",
        ownership: "고객 접촉부터 피벗 논리와 발표 맥락 구조화까지 참여",
        scope: [
          "위례 건설 현장 방문과 인터뷰 요청",
          "덤프트럭 기사·현장 관리자 목소리 수집",
          "원청 공무 담당자 문제로의 피벗 구조화",
          "2차 후츠파 사업 발표와 회고 정리"
        ]
      },
      qualitativeHighlights: [
        "설득력: 약속 없는 현장을 직접 찾아가 인터뷰 거절을 감수하고 실무자의 대화를 끌어냈습니다.",
        "현장 집요함: 9시간 동안 고객 범위를 넓히며 데스크 리서치가 놓친 업무 병목을 끝까지 추적했습니다.",
        "문제 전환: 처음 세운 덤프트럭 기사 가설을 방어하지 않고, 더 강한 현장 증거를 따라 원청 공무 담당자 문제로 피벗했습니다."
      ],
      executionScope: [
        "위례 건설 현장 방문과 덤프트럭 운전자 인터뷰",
        "DL건설 현장 관리자 인터뷰 기반 문제 재정의",
        "랜딩페이지/커뮤니티 반응 기반 전환 확인",
        "팀 의사결정 기준, 시간 제한, 검증 행동 규칙 정리"
      ],
      technicalHighlights: [
        "Customer Interview",
        "Landing Page Validation",
        "Conversion Funnel",
        "Retrospective",
        "Presentation"
      ],
      architectureNotes: [
        "초기 사용자 가설 수립",
        "인터뷰로 가설의 빈틈 확인",
        "공무 담당자 업무 병목으로 문제 전환",
        "랜딩페이지 신청/파일럿 확정 지표로 수요 신호 확인"
      ],
      evidenceIds: ["gcs-hutzpa-2-slides-pdf", "gcs-hutzpa-2-retro-md"],
      media: [
        {
          src: "/assets/projects/evidence/construction-01.webp",
          alt: "공사 기성청구 고객 검증 발표자료 첫 페이지",
          caption: "실제 2차 팀 발표자료 · 고객 검증 개요"
        },
        {
          src: "/assets/projects/evidence/construction-02.webp",
          alt: "공사 기성청구 고객 검증 발표자료 두 번째 페이지",
          caption: "실제 2차 팀 발표자료 · 문제 정의와 현장 맥락"
        }
      ],
      lessons: [
        "거절을 피하는 것보다 현장에 들어가는 것이 문제 발견 속도를 훨씬 빠르게 만듭니다.",
        "타깃을 바꾸는 판단은 실패가 아니라 더 강한 고객 증거를 따라가는 과정입니다."
      ],
      improvements: [
        "파일럿 확정 이후 실제 사용 지속률과 반복 사용 사유를 추가",
        "인터뷰 전 성공 기준과 질문 우선순위를 정해 9시간의 현장 탐색 밀도를 더 높이기"
      ]
    },
    {
      slug: "gcs-isolated-sea",
      title: "고립된 바다 선원 문제 검증",
      subtitle: "선원 문제 가설을 인터뷰와 실패 회고로 재정의한 1차 피투미 고객검증 프로젝트",
      period: "2026.04",
      priority: 5,
      status: "verified",
      tags: ["Planning", "Research", "Customer", "Presentation", "Collaboration"],
      summary: "1차 피투미의 고립된 바다 발표자료와 회고를 기반으로, 선원/해운업 가설을 검증하며 실패 원인을 리서치 게이트와 Kill Rule로 바꾼 프로젝트입니다. AgenticLinkedIn 데모와 섞지 않고 별도 고객검증 사례로 정리했습니다.",
      cover: {
        src: "/assets/projects/covers/gcs-isolated-sea.webp",
        alt: "잘못된 해운업 가설을 걷어내고 인터뷰 근거를 다음 검증 기준으로 통과시키는 장면",
        kind: "concept"
      },
      headlineImpact: "실패한 선원 문제 가설을 리서치 게이트와 Kill Rule이라는 다음 실행 기준으로 전환",
      cardProblem: "초기 선원/해운업 가설이 러프했고 질문 설계가 검증에 충분하지 않음",
      cardAction: "인터뷰 8건과 회고를 통해 리서치·타깃·질문 부족을 분리",
      cardResult: "다음 스프린트의 Gate + Kill Rule 기준 도출",
      resultLabel: "Evidence",
      productSignal: "성과만 포장하지 않고 약한 가설을 버리는 학습 속도를 보여주는 독립 고객검증 사례입니다.",
      problem: "초기 문제 가설은 실제 선원/해운업 맥락보다 러프했고, 데스크 리서치와 경쟁사/정책 확인 없이 인터뷰를 진행해 검증 밀도가 낮아졌습니다.",
      customerContext: "선원/해운업 종사자와 유사 타깃 인터뷰 8건을 진행했지만, 실제 핵심 타깃 수와 질문 설계가 충분하지 않아 문제의 Why를 깊게 확인하지 못했습니다.",
      planningNarrative: "발표 실패를 숨기지 않고 데스크 리서치 게이트, 팀 재구성, Kill Rule, 시간보다 밀도 기준이라는 다음 스프린트 원칙으로 바꿨습니다.",
      salesNarrative: "완성된 성과보다도 '얕은 가설을 어떻게 버리고 더 강한 검증 방식으로 바꾸는가'를 보여주는 제품 사고 사례로 설명할 수 있습니다.",
      role: "1차 피투미 발표/회고 자료에 참여자로 확인됩니다. 고객 인터뷰, 실패 원인 정리, 다음 스프린트 원칙 도출 경험이 자료에 남아 있습니다.",
      roiMetrics: [
        {
          label: "Input · 검증 시도",
          value: "인터뷰 8건",
          description: "선원·해운업 및 유사 타깃을 만나 초기 가설의 빈틈 확인",
          kind: "input"
        },
        {
          label: "Output · 실패 원인",
          value: "3개 원인 분리",
          description: "리서치, 타깃, 질문 설계의 부족을 숨기지 않고 구체화",
          kind: "output"
        },
        {
          label: "Evidence · 실행 기준",
          value: "Gate + Kill Rule",
          description: "다음 스프린트에서 약한 가설을 빠르게 거르는 규칙으로 전환",
          kind: "output"
        }
      ],
      contribution: {
        level: "팀 공동 기여",
        ownership: "발표·회고 자료에서 참여 확인",
        scope: [
          "고객 인터뷰와 초기 가설 검증",
          "실패 원인의 구조화",
          "리서치 게이트와 Kill Rule 도출"
        ]
      },
      qualitativeHighlights: [
        "선원/해운업 관련 인터뷰 8건을 통해 초기 가설의 빈틈을 확인",
        "데스크 리서치, 법/정책, 경쟁사 분석 부족을 실패 요인으로 명시",
        "다음 도메인 진입 전 리서치 게이트와 Kill Rule을 세워 검증 방식을 개선"
      ],
      executionScope: [
        "초기 선원/고립된 바다 문제 가설 수립",
        "타깃/유사 타깃 인터뷰 진행",
        "실패 회고와 원인 분리",
        "다음 스프린트 검증 기준 재설계"
      ],
      technicalHighlights: [
        "Problem Framing",
        "Desk Research",
        "Customer Interview",
        "Retrospective",
        "Presentation"
      ],
      architectureNotes: [
        "가설 설정",
        "인터뷰 진행",
        "리서치 부족과 Why 부재를 실패 원인으로 분리",
        "게이트와 Kill Rule로 다음 실행 기준 재정의"
      ],
      evidenceIds: ["gcs-pitumi-slides-pdf", "gcs-pitumi-retro-public-summary-md"],
      lessons: [
        "고객 인터뷰는 많이 하는 것보다 질문 전 리서치와 Why 반복이 더 중요합니다.",
        "실패 회고가 다음 실행 기준으로 바뀔 때 포트폴리오에서도 신뢰 가능한 성장 근거가 됩니다."
      ],
      improvements: [
        "인터뷰 질문지와 리서치 체크리스트를 공개 가능한 형태로 정리",
        "동일한 실패가 반복되지 않았음을 2차/3차 프로젝트와 연결해 보여주기"
      ]
    },
    {
      slug: "gcs-llm-api-automation",
      title: "GCS8 LLM/API Automation",
      subtitle: "Claude, EXA, Telegram, GCS room/calendar API를 연결한 실무형 자동화 묶음",
      period: "2026.03 - 2026.05",
      priority: 6,
      status: "verified",
      tags: ["AI/API", "Automation", "Backend", "Sales"],
      summary: "Claude Messages API, EXA Search API, Telegram Bot, GCS 회의실 API, Google Calendar CLI를 직접 호출해 검색, 요약, 예약, 초대 흐름을 자동화한 프로젝트군입니다.",
      cover: {
        src: "/assets/projects/covers/gcs-llm-api-automation.webp",
        alt: "검색·메신저·캘린더·회의실 도구가 하나의 라임색 자동화 경로로 연결된 장면",
        kind: "concept"
      },
      headlineImpact: "LLM, 검색, 메신저, 회의실/캘린더 API를 업무 완료 흐름으로 연결",
      cardProblem: "AI/API 실험이 실제 업무 완료와 실패 복구까지 이어지지 않음",
      cardAction: "검색·요약·예약·초대 흐름을 인증/fallback 포함 자동화로 묶음",
      cardResult: "반복 운영 업무를 CLI/API 기반 실행 흐름으로 전환",
      resultLabel: "Evidence",
      productSignal: "데모가 아니라 사용자가 끝까지 완료해야 하는 작업 단위로 자동화를 설계했습니다.",
      problem: "LLM/API 실험은 데모로 끝나기 쉽지만, 실제 업무에서는 인증, 오류 처리, fallback, rollback, 환경변수 관리까지 연결되어야 합니다.",
      customerContext: "운영자와 팀원이 반복적으로 처리하는 검색 요약, 회고 업로드, 회의실 예약, 캘린더 초대 같은 업무를 자동화 대상으로 봤습니다.",
      planningNarrative: "각 API를 기능 단위로만 호출하지 않고, 사용자가 끝까지 완료해야 하는 업무 흐름으로 묶었습니다.",
      salesNarrative: "AI를 멋진 답변 생성기가 아니라, 반복 업무를 줄이고 실패 복구까지 돕는 운영 파트너로 포지셔닝한 사례입니다.",
      role: "자료 기준으로 LLM/API 통신 패턴을 정리하고, CLI와 자동화 스크립트가 호출할 수 있는 구조를 설계한 경험이 확인됩니다.",
      roiMetrics: [
        {
          label: "Input · 외부 연동",
          value: "4개 연동군",
          description: "Claude, EXA, Telegram, GCS/Calendar를 업무 흐름에 연결",
          kind: "input"
        },
        {
          label: "Output · 자동화 흐름",
          value: "3개 운영 시나리오",
          description: "검색·요약, 회고 업로드, 회의실 예약·초대 흐름 구현",
          kind: "output"
        },
        {
          label: "Evidence · 실패 복구",
          value: "Rollback 적용",
          description: "Calendar 생성 실패 시 앞선 회의실 예약까지 복구",
          kind: "output"
        }
      ],
      contribution: {
        level: "핵심 설계·구현",
        ownership: "공개 정리 자료에서 확인",
        scope: [
          "LLM/API 통신 패턴과 인증 방식 정리",
          "CLI·자동화 스크립트 호출 구조",
          "오류 기록, fallback, rollback 정책"
        ]
      },
      qualitativeHighlights: [
        "외부 SDK에 의존하지 않고 native fetch와 PowerShell wrapper 중심으로 API 호출 표준화",
        "Claude 응답 실패 시 body snippet과 request id를 남기는 디버깅 경험",
        "회의실 예약 후 Calendar 생성 실패 시 GCS 예약 rollback"
      ],
      executionScope: [
        "Claude Messages API 기반 daily snippet 요약",
        "EXA Search API와 Claude 요약을 결합한 Telegram bot",
        "GCS meeting room API와 Google Workspace Calendar CLI 오케스트레이션",
        "환경변수, bearer token, x-api-key 인증 분리"
      ],
      technicalHighlights: [
        "Node.js",
        "TypeScript",
        "Claude Messages API",
        "EXA Search API",
        "Telegram Bot API",
        "PowerShell",
        "Google Calendar CLI"
      ],
      architectureNotes: [
        "search trigger heuristic으로 검색 필요 메시지만 EXA 호출",
        "news/web 병렬 호출 후 URL dedupe",
        "회의실 예약과 캘린더 초대 사이에 rollback boundary 설정"
      ],
      evidenceIds: ["gcs-llm-api-md"],
      media: [
        {
          src: "/assets/projects/evidence/llm-artifact-flow.webp",
          alt: "LLM과 외부 API 오케스트레이션 실제 문서 기반 artifact preview",
          caption: "실제 Markdown 근거 문서에 기록된 검색·요약·예약·초대 흐름"
        },
        {
          src: "/assets/projects/evidence/llm-artifact-recovery.webp",
          alt: "LLM API 자동화 실패 복구 실제 문서 기반 artifact preview",
          caption: "실제 근거 문서에 기록된 인증·오류 기록·fallback·rollback"
        }
      ],
      lessons: [
        "API 연동은 성공 케이스보다 인증 실패와 응답 shape 변화에 강해야 합니다.",
        "자동화는 사용자에게 보이지 않는 실패 복구 정책까지 포함해야 신뢰를 얻습니다."
      ],
      improvements: [
        "토큰처럼 보이는 값이 있던 예시 파일은 공개 자료에서 제외하고 필요 시 재발급 권장",
        "민감 설정 파일은 포트폴리오 evidence에서 제외"
      ]
    },
    {
      slug: "oishifood-landing",
      title: "Oishifood Landing Page",
      subtitle: "팀 정체성과 미식 스토리를 스크롤 기반 인터랙션으로 보여준 랜딩 페이지",
      period: "2026.03.10 - 2026.03.13",
      priority: 7,
      status: "verified",
      tags: ["Frontend", "Sales", "Planning", "Customer"],
      summary: "Oishifood 팀의 콘셉트와 멤버별 미식 스토리를 hero, scroll journey, member modal, newsletter flow로 구성한 팀 소개형 랜딩 페이지입니다.",
      cover: {
        src: "/assets/projects/covers/oishifood-landing.webp",
        alt: "팀원별 미식 이야기가 하나의 스크롤 리본을 따라 뉴스레터 참여로 이어지는 장면",
        kind: "concept"
      },
      headlineImpact: "팀 정체성과 참여 행동을 스크롤 인터랙션, 멤버 모달, 뉴스레터 흐름으로 연결",
      cardProblem: "팀 소개가 나열식이면 방문자가 정체성과 다음 행동을 기억하기 어려움",
      cardAction: "Hero, Scroll Journey, Members, Newsletter를 하나의 미식 스토리로 구성",
      cardResult: "구독과 발송까지 이어지는 랜딩 페이지 행동 흐름 구현",
      productSignal: "시각 완성도와 세일즈 표면 설계를 보여주는 프론트엔드 보조 사례입니다.",
      problem: "팀 소개는 나열식이면 기억에 남기 어렵고, 각 멤버의 캐릭터와 팀의 톤을 한 화면 흐름으로 설득해야 했습니다.",
      customerContext: "방문자가 팀의 정체성, 멤버 캐릭터, 미식 취향, 뉴스레터 행동까지 자연스럽게 이해하도록 구성했습니다.",
      planningNarrative: "스크롤 진행도와 카드 전환으로 팀의 미식 여정을 이야기처럼 읽게 만들었습니다.",
      salesNarrative: "랜딩 페이지를 단순 소개가 아니라 팀의 인상과 참여 행동을 만드는 세일즈 표면으로 설계했습니다.",
      role: "문서 기준으로 4일 동안 React/Vite/Tailwind 기반 랜딩 페이지와 Supabase 뉴스레터 연동 구조를 정리했습니다.",
      roiMetrics: [
        {
          label: "Input · 제작 기간",
          value: "4일",
          description: "콘셉트 정리부터 인터랙션과 뉴스레터 연동까지 집중 구현",
          kind: "input"
        },
        {
          label: "Output · 핵심 화면",
          value: "4개 섹션",
          description: "Hero, Scroll Journey, Members, Footer/Newsletter 구성",
          kind: "output"
        },
        {
          label: "Output · 행동 연결",
          value: "구독 → 발송",
          description: "팀 소개에서 끝나지 않고 Supabase·Resend 참여 흐름으로 연결",
          kind: "output"
        }
      ],
      contribution: {
        level: "Frontend 구현·연동",
        ownership: "프로젝트 문서에서 범위 확인",
        scope: [
          "React/Vite/Tailwind 화면 구조",
          "스크롤 기반 인터랙션",
          "Supabase 뉴스레터 구독·발송 연동"
        ]
      },
      qualitativeHighlights: [
        "팀 콘셉트와 멤버별 음식 스토리를 하나의 스크롤 흐름으로 정리",
        "멤버 카드에서 상세 모달로 이어지는 인터랙션",
        "Supabase와 Resend를 연결한 뉴스레터 구독/발송 구조"
      ],
      executionScope: [
        "React 19, Vite 7, Tailwind CSS 4 환경 구성",
        "Hero, Scroll Journey, Members, Footer/Newsletter 섹션",
        "IntersectionObserver 기반 Reveal",
        "Supabase REST RPC, Edge Function, Resend API 연동"
      ],
      technicalHighlights: [
        "React 19",
        "Vite 7",
        "Tailwind CSS 4",
        "Supabase",
        "Resend",
        "IntersectionObserver"
      ],
      architectureNotes: [
        "content/ko.json으로 콘텐츠와 화면 구조 분리",
        "newsletterService와 supabaseRest를 별도 계층으로 분리",
        "관리자 발송 패널은 환경변수로 노출 제어"
      ],
      evidenceIds: ["oishifood-md", "oishifood-repo", "oishifood-deploy"],
      lessons: [
        "랜딩 페이지는 기능보다 먼저 기억되는 이야기 구조가 있어야 합니다.",
        "작은 팀 소개도 구독 같은 행동 흐름을 붙이면 제품형 페이지가 됩니다."
      ],
      improvements: [
        "실제 전환 지표가 있으면 구독 흐름 성과까지 추가",
        "이미지 asset 최적화와 Lighthouse 점검 추가"
      ]
    },
    {
      slug: "kanban-backend-cli",
      title: "Kanban Backend / CLI",
      subtitle: "FastAPI 백엔드와 Click CLI를 연결한 팀용 칸반 운영 도구",
      period: "2026.04",
      priority: 9,
      status: "verified",
      tags: ["Backend", "Automation", "Collaboration"],
      summary: "Google OAuth 로그인, 워크스페이스/보드/컬럼/카드 API, Click CLI를 하나의 저장소에서 관리하는 칸반 백엔드/CLI 프로젝트입니다.",
      cover: {
        src: "/assets/projects/covers/kanban-backend-cli.webp",
        alt: "작업 카드가 인증과 API 구조를 통과하며 이동하는 미니어처 칸반 운영 시스템",
        kind: "concept"
      },
      headlineImpact: "FastAPI 백엔드와 Click CLI를 같은 도메인 모델로 묶어 팀 작업 운영 표면을 정리",
      cardProblem: "협업 도구는 웹 화면 외에도 인증, API, CLI, 테스트 재현성이 필요함",
      cardAction: "Workspace/Board/Column/Card 모델과 OAuth, CLI 명령 흐름을 연결",
      cardResult: "API + CLI + Test/Lint 기반의 로컬 운영 흐름 정리",
      resultLabel: "Evidence",
      productSignal: "화면보다 운영 도구와 재현성에 가까운 백엔드/CLI 실행 사례입니다.",
      problem: "팀 협업 도구는 웹 화면뿐 아니라 로컬 CLI, 인증, 데이터 모델, 테스트 흐름까지 맞아야 실사용이 가능합니다.",
      customerContext: "개발자가 로컬에서 빠르게 백엔드를 띄우고 CLI로 워크스페이스, 보드, 컬럼, 카드를 조작하는 상황을 목표로 했습니다.",
      planningNarrative: "API와 CLI가 같은 도메인 모델을 공유하도록, 인증과 리소스 조작을 명령어 흐름으로 정리했습니다.",
      salesNarrative: "팀의 작업 상태를 CLI에서도 빠르게 조작할 수 있는 운영 도구로 설명할 수 있습니다.",
      role: "자료 기준으로 FastAPI 백엔드와 CLI 구조, OAuth, 테스트/린트 운영 문서를 정리한 프로젝트입니다.",
      roiMetrics: [
        {
          label: "Input · 도메인 모델",
          value: "4개 리소스",
          description: "Workspace, Board, Column, Card를 일관된 구조로 모델링",
          kind: "input"
        },
        {
          label: "Output · 사용 표면",
          value: "API + CLI",
          description: "같은 도메인 작업을 서버와 로컬 명령에서 모두 수행",
          kind: "output"
        },
        {
          label: "Evidence · 재현성",
          value: "Test + Lint",
          description: "pytest와 ruff, 운영 문서로 로컬 실행과 검증 흐름 정리",
          kind: "output"
        }
      ],
      contribution: {
        level: "Backend·CLI 구조화",
        ownership: "공개 정리 자료에서 확인",
        scope: [
          "FastAPI 도메인 API와 서비스 계층",
          "Click CLI와 OpenAPI mapping",
          "OAuth, 테스트, 린트 운영 문서"
        ]
      },
      qualitativeHighlights: [
        "Google OAuth와 JWT 세션 교환 흐름",
        "workspace, board, column, card API 모델링",
        "OpenAPI와 CLI mapping 검증"
      ],
      executionScope: [
        "FastAPI, SQLAlchemy, Pydantic 기반 backend",
        "Click, httpx 기반 CLI",
        "pytest, ruff 기반 검증",
        "SQLite 기본, DATABASE_URL로 Postgres/Supabase 확장 가능"
      ],
      technicalHighlights: [
        "Python 3.12",
        "FastAPI",
        "SQLAlchemy",
        "Pydantic",
        "Click",
        "Google OAuth",
        "PyJWT"
      ],
      architectureNotes: [
        "backend/app/api에 v1 routers 분리",
        "services layer에서 workspace, board, column, card 도메인 처리",
        "CLI auth_store가 Windows credential path에 token 저장"
      ],
      evidenceIds: ["gcs-kanban-md"],
      lessons: [
        "백엔드는 기능 구현뿐 아니라 인증 설정과 로컬 재현성이 중요합니다.",
        "CLI는 제품의 운영 표면이 될 수 있습니다."
      ],
      improvements: [
        "public demo용 seed data와 스모크 테스트 캡처 추가",
        "민감한 OAuth 값은 모든 evidence에서 placeholder 처리"
      ]
    },
    {
      slug: "areum-stage-project",
      title: "연극동아리 아름",
      subtitle: "3개월의 집요한 몰입으로 무경험 상태에서 대학로 주연 무대까지",
      period: "2023.02",
      priority: 11,
      status: "strong_but_needs_confirmation",
      tags: ["Growth", "Collaboration", "Presentation"],
      summary: "연기 경험이 없는 상태에서 3개월 안에 주연 브란트 역을 완성해야 했습니다. 매일 자정까지 팀 연습을 이어가고 샤워 시간 1시간 30분까지 대본 암기에 사용해, 혜화 대학로에서 1박 2일간 총 200명의 관객 앞 공연과 전석 매진을 완수했습니다.",
      cover: {
        src: "/assets/projects/areum/areum-3.jpg",
        alt: "연극동아리 아름의 실제 무대 장면",
        kind: "documentary"
      },
      headlineImpact: "무경험 상태에서 3개월 몰입으로 주연 무대와 전석 매진 공연까지 완주",
      cardProblem: "주연 역할을 맡았지만 연기 경험과 무대 자신감이 모두 부족함",
      cardAction: "매일 자정까지 팀 연습하고 개인 시간까지 대본 암기와 피드백 반영에 사용",
      cardResult: "혜화 대학로 1박 2일 공연, 총 200명 관객 앞 전석 매진",
      productSignal: "PM 대표 사례보다는 압박 속 피드백 수용과 몰입도를 보여주는 성장 사례입니다.",
      problem: "연기 경험과 무대 자신감이 모두 부족한 상태에서 단 3개월 안에 표정, 행동, 발성, 대본을 실제 공연 수준으로 끌어올려야 했습니다. 개인의 준비 부족이 곧바로 팀 전체 장면의 완성도를 떨어뜨리는 상황이었습니다.",
      customerContext: "매일 자정까지 이어지는 팀 연습을 소화하면서도 부족한 암기 시간을 확보해야 했습니다. 샤워 시간 1시간 30분까지 대본을 반복해 듣고 외우며, 연출과 동료 배우의 피드백을 다음 장면에 즉시 반영했습니다.",
      planningNarrative: "막연히 오래 연습하기보다 대본 암기, 발성, 표정, 감정선, 장면 합을 나누어 반복했습니다. 혼자 해결되지 않는 감정 표현은 연출과 계속 소통하며 수정해 주연 역할의 완성도를 끌어올렸습니다.",
      salesNarrative: "3개월의 준비를 혜화 대학로 실전 무대로 전환해 1박 2일간 총 200명의 관객 앞에서 공연했고 전석 매진을 달성했습니다. 긴장 속에서도 메시지를 유지하고 팀 결과물을 끝까지 책임지는 실행력을 증명했습니다.",
      role: "연극동아리 아름의 `해더웨이 가의 유령`에서 주연 브란트 역을 맡아, 대본 암기부터 감정선·장면 합·실전 공연까지 역할 전 과정을 책임졌습니다.",
      roiMetrics: [
        {
          label: "준비 기간",
          value: "3개월",
          description: "무경험 상태에서 주연 역할의 표정·행동·발성·대본을 완성",
          kind: "input"
        },
        {
          label: "몰입 강도",
          value: "매일 자정까지",
          description: "팀 연습에 더해 샤워 시간 1시간 30분까지 대본 암기에 활용",
          kind: "input"
        },
        {
          label: "실전 관객",
          value: "총 200명",
          description: "혜화 대학로에서 1박 2일간 주연 배우로 공연",
          kind: "output"
        },
        {
          label: "티켓 성과",
          value: "전석 매진",
          description: "제한된 준비 기간을 관객이 선택한 공연 결과로 전환",
          kind: "impact"
        }
      ],
      contribution: {
        level: "주연 배우 · 브란트 역",
        percentage: 100,
        percentageBasis: "주연 브란트 역할 수행 범위 기준",
        ownership: "대본·감정선·장면 합·실전 공연의 역할 전 과정",
        scope: [
          "주연 브란트 역 대본 통암기",
          "발성·표정·행동·감정선 집중 훈련",
          "연출·배우와 장면별 합 조정",
          "혜화 대학로 1박 2일 공연 완주"
        ]
      },
      qualitativeHighlights: [
        "집요함: 매일 자정까지 연습하고 샤워 시간 1시간 30분까지 대본 암기에 사용해 부족한 경험을 반복량으로 메웠습니다.",
        "피드백 수용: 감정 표현이 막힐 때 연출과 끊임없이 소통하고, 받은 피드백을 다음 장면에 바로 반영했습니다.",
        "팀 책임감: 주연의 준비 부족이 전체 공연을 흔든다는 압박을 회피하지 않고, 200명 관객 앞 전석 매진 공연까지 완주했습니다."
      ],
      executionScope: [
        "개인 시간을 활용한 대본 통암기",
        "매일 자정까지 발성·표정·감정 연기 훈련",
        "연출, 배우들과 장면별 합과 감정선 조정",
        "혜화 대학로 1박 2일 실전 공연 완주",
        "원본 이미지 3장을 배포 자산으로 저장"
      ],
      technicalHighlights: [
        "Public Speaking",
        "Teamwork",
        "Resilience",
        "Performance",
        "Feedback"
      ],
      architectureNotes: [
        "3개월 타임어택과 무경험 상태 인식",
        "대본·발성·표정·감정선 훈련 분리",
        "매일 팀 연습과 개인 시간 암기 병행",
        "연출 피드백을 장면에 반복 적용",
        "200명 관객 앞 전석 매진 공연으로 전환"
      ],
      evidenceIds: ["areum-activity-pdf", "areum-image-1", "areum-image-2", "areum-image-3"],
      media: [
        {
          src: "/assets/projects/areum/areum-1.jpg",
          alt: "연극동아리 아름 공연 후 전체 단체 사진",
          caption: "공연 후 전체 단체 사진"
        },
        {
          src: "/assets/projects/areum/areum-2.jpg",
          alt: "연극동아리 아름 공연 후 배우와 스태프 단체 사진",
          caption: "공연 후 배우와 스태프 단체 사진"
        },
        {
          src: "/assets/projects/areum/areum-3.jpg",
          alt: "연극동아리 아름 무대 장면 단체 사진",
          caption: "무대 장면 기록"
        }
      ],
      lessons: [
        "짧은 시간의 역량 격차는 몰입 시간뿐 아니라 피드백을 반영하는 속도로 줄일 수 있습니다.",
        "불편한 역할을 맡아 끝까지 해낸 경험은 고객 앞에서도 긴장보다 전달할 메시지에 집중하게 만듭니다."
      ],
      improvements: [
        "관객 수와 매진 기록을 증명할 티켓·예매 자료를 공개 근거로 추가",
        "개인정보 보호를 위해 원본 사진 사용 범위를 계속 점검"
      ]
    },
    {
      slug: "footstep",
      title: "Footstep",
      subtitle: "React 팀 프로젝트와 GitHub 협업 흐름을 재구성한 UMC 프로젝트",
      period: "2022.06",
      priority: 8,
      status: "verified",
      tags: ["Frontend", "Collaboration"],
      summary: "React Router와 CSS Module을 사용해 Footer, ProfileSetting/API, 댓글 UI를 구현하고 GitHub issue, branch, PR 흐름으로 협업한 UMC 팀 프로젝트입니다.",
      cover: {
        src: "/assets/projects/covers/footstep.webp",
        alt: "Footstep 기록형 웹 서비스 화면을 노트북 목업으로 재구성한 이미지",
        kind: "reconstruction"
      },
      headlineImpact: "React 프론트엔드 구현 · Footer, ProfileSetting/API, 댓글 UI · GitHub 협업",
      cardProblem: "기록형 웹 서비스의 프로필 설정, 댓글, 공통 레이아웃 UI를 팀 개발 흐름 안에서 연결해야 함",
      cardAction: "Footer와 ProfileSetting/API, 댓글 UI를 구현하고 PR·Issue 기반으로 협업",
      cardResult: "IBORY-PURPLE 계정의 5개 PR·3개 Issue 기록으로 구현·협업 기여 확인",
      resultLabel: "Evidence",
      productSignal: "초기 React 팀 프로젝트에서 UI 구현과 GitHub 협업을 함께 경험한 검증된 보조 사례입니다.",
      problem: "기록형 웹 서비스의 화면 흐름 안에서 프로필 설정, 댓글 상호작용, 공통 Footer 등 여러 UI 컴포넌트를 연결하고 팀 단위로 병합해야 했습니다.",
      customerContext: "사용자가 프로필을 설정하고 기록에 댓글로 상호작용하는 화면을 중심으로, 팀원이 나눈 컴포넌트를 하나의 React 서비스 흐름으로 연결했습니다.",
      planningNarrative: "Figma와 Notion은 팀 협업 맥락 자료로 참고하고, 본인 역할은 IBORY-PURPLE GitHub 기록에서 확인되는 구현과 협업 범위로 한정했습니다.",
      salesNarrative: "대표 성과 사례보다는, 초기 팀 프로젝트에서 맡은 React UI 구현과 PR·Issue 기반 협업 방식을 설명하는 검증된 보조 사례로 배치합니다.",
      role: "본인 계정으로 확인된 `IBORY-PURPLE` GitHub 기록 기준, Footer UI와 ProfileSetting 화면/API 연결, CommentList·Comments_SideBar 관련 구현에 참여하고 PR·Issue·branch 흐름으로 협업했습니다.",
      roiMetrics: [
        {
          label: "Input · 협업 흐름",
          value: "PR + Issue + Branch",
          description: "기능 단위 branch와 PR, issue를 사용해 팀 개발 과정에 참여",
          kind: "input"
        },
        {
          label: "Output · 구현 범위",
          value: "3개 핵심 UI",
          description: "Footer, ProfileSetting/API, 댓글 UI 구현 기록 확인",
          kind: "output"
        },
        {
          label: "Evidence · 연결 기록",
          value: "5 PR · 3 Issue",
          description: "IBORY-PURPLE 계정과 연결된 공개 GitHub 협업 기록",
          kind: "output"
        }
      ],
      contribution: {
        level: "React 프론트엔드 구현·협업",
        ownership: "IBORY-PURPLE 계정 기여 확인",
        scope: [
          "Footer UI와 ProfileSetting 화면/API 연결",
          "CommentList·Comments_SideBar 관련 UI 구현",
          "PR·Issue·Branch 기반 팀 협업"
        ]
      },
      qualitativeHighlights: [
        "ProfileSetting 컴포넌트 구현과 API 연결·수정",
        "Footer와 댓글 관련 React 컴포넌트 구현",
        "PR, issue, branch 기반 팀 개발과 병합 흐름 참여"
      ],
      executionScope: [
        "React Router 기반 화면 흐름 참여",
        "CSS Module 기반 Footer·ProfileSetting 스타일",
        "ProfileSetting API 연결과 댓글 관련 UI 구현",
        "GitHub issue, branch, PR 기반 협업"
      ],
      technicalHighlights: [
        "React",
        "React Router",
        "CSS Modules",
        "GitHub",
        "Figma",
        "Notion"
      ],
      architectureNotes: [
        "routes와 components가 분리된 프론트엔드 구조",
        "ProfileSetting, Footer, CommentList 관련 구현 파일 기록 존재"
      ],
      evidenceIds: ["footstep-contribution-profile", "footstep-readme"],
      lessons: [
        "React 컴포넌트를 기능 단위로 나누고 PR과 이슈로 연결하면 팀 병합 흐름을 추적하기 쉽습니다.",
        "초기 팀 프로젝트 경험도 구현 파일과 협업 기록을 함께 보면 역할을 구체적으로 설명할 수 있습니다."
      ],
      improvements: [
        "외부 사용자 반응이나 배포 결과를 확인할 수 있는 근거 추가",
        "직접 담당한 Figma frame과 Notion 문서 범위 추가 확인"
      ]
    }
  ],
  credentials: [
    {
      title: "한국사능력검정시험 1급",
      issuer: "국사편찬위원회",
      date: "2026.02.20",
      evidenceId: "cert-history-public-redacted"
    },
    {
      title: "리눅스마스터 2급",
      issuer: "한국정보통신진흥협회",
      date: "2026.01.02",
      evidenceId: "cert-linuxmaster-public-redacted"
    },
    {
      title: "정보처리기능사",
      issuer: "과학기술정보통신부",
      date: "2023.05.01",
      evidenceId: "cert-info-processing-public-redacted"
    }
  ],
  evidence: [
    {
      id: "basic-info-md",
      title: "기본정보.md",
      type: "Private Markdown",
      url: "",
      visibility: "private",
      note: "전화번호가 포함되어 있어 사이트에 직접 노출하지 않습니다."
    },
    {
      id: "windmill-summary-pdf",
      title: "WindMill Project Summary PDF",
      type: "PDF",
      url: "/evidence/windmill-project-summary.pdf",
      assetUrl: "/evidence/windmill-project-summary.pdf",
      pages: 3,
      visibility: "public",
      note: "학술제 프로젝트 요약 PDF. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "windmill-contribution-profile",
      title: "WindMill contribution-profile.md",
      type: "Markdown",
      url: "/evidence/windmill-contribution-profile.md",
      assetUrl: "/evidence/windmill-contribution-profile.md",
      visibility: "public",
      note: "PR/브랜치 기반 기여 후보 정리. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "windmill-readme",
      title: "WindMill Portfolio Source README",
      type: "Markdown",
      url: "/evidence/windmill-readme.md",
      assetUrl: "/evidence/windmill-readme.md",
      visibility: "public",
      note: "verified, hypothesis, needs confirmation 규칙을 설명. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "gcs-daily-snippet-agent-md",
      title: "GCS Pulse Daily Snippet Agent Automation",
      type: "Markdown",
      url: "/evidence/gcs-daily-snippet-agent.md",
      assetUrl: "/evidence/gcs-daily-snippet-agent.md",
      visibility: "public",
      note: "API, 웹, 자동화, feedback loop 설계 자료. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "gcs-hutzpa-3-slides-pdf",
      title: "GCS8 팀후츠파 3차 발표 슬라이드",
      type: "PDF",
      url: "/evidence/gcs-hutzpa-creator-popups-slides.pdf",
      assetUrl: "/evidence/gcs-hutzpa-creator-popups-slides.pdf",
      pages: 13,
      visibility: "public",
      note: "1인 창작자 오프라인 접점 문제 정의와 검증 계획이 담긴 3차 발표 자료."
    },
    {
      id: "gcs-hutzpa-3-script-pdf",
      title: "GCS8 팀후츠파 3차 발표대본",
      type: "PDF",
      url: "/evidence/gcs-hutzpa-creator-popups-script.pdf",
      assetUrl: "/evidence/gcs-hutzpa-creator-popups-script.pdf",
      pages: 4,
      visibility: "public",
      note: "송채우 발표자 맥락과 발표 흐름을 확인할 수 있는 3차 발표 대본."
    },
    {
      id: "gcs-hutzpa-2-slides-pdf",
      title: "GCS8 팀후츠파 2차 발표 슬라이드",
      type: "PDF",
      url: "/evidence/gcs-hutzpa-construction-billing-slides.pdf",
      assetUrl: "/evidence/gcs-hutzpa-construction-billing-slides.pdf",
      pages: 12,
      visibility: "public",
      note: "공사 기성청구 문제 정의, 랜딩페이지 반응, 파일럿 전환 수치가 담긴 2차 발표 자료."
    },
    {
      id: "gcs-hutzpa-2-retro-md",
      title: "GCS8 팀후츠파 2차 발표 회고",
      type: "Markdown",
      url: "/evidence/gcs-hutzpa-construction-billing-retro.md",
      assetUrl: "/evidence/gcs-hutzpa-construction-billing-retro.md",
      visibility: "public",
      note: "인터뷰, 피벗, 팀 의사결정 개선점을 정리한 2차 회고 자료."
    },
    {
      id: "gcs-pitumi-slides-pdf",
      title: "GCS8 1차 피투미 발표자료",
      type: "PDF",
      url: "/evidence/gcs-pitumi-slides.pdf",
      assetUrl: "/evidence/gcs-pitumi-slides.pdf",
      pages: 17,
      visibility: "public",
      note: "1차 팀 발표 슬라이드 자료."
    },
    {
      id: "gcs-pitumi-retro-public-summary-md",
      title: "GCS8 1차 피투미 공개 회고 요약",
      type: "Markdown",
      url: "/evidence/gcs-pitumi-retro-public-summary.md",
      assetUrl: "/evidence/gcs-pitumi-retro-public-summary.md",
      visibility: "public",
      note: "실명, 음성 전사 원문, 내부 평가를 제외하고 검증 수치와 학습만 정리한 외부 공개용 요약."
    },
    {
      id: "gcs-agentic-linkedin-slides-pdf",
      title: "GCS8 1차 AgenticLinkedIn 발표자료",
      type: "PDF",
      url: "/evidence/gcs-agentic-linkedin-slides.pdf",
      assetUrl: "/evidence/gcs-agentic-linkedin-slides.pdf",
      pages: 9,
      visibility: "public",
      note: "Drive에서 확인한 별도 AgenticLinkedIn 발표자료. 기존 피투미 파일명으로 섞여 있던 로컬 PDF를 AgenticLinkedIn 근거로 분리했습니다."
    },
    {
      id: "gcs-agentic-linkedin-main-image-drive",
      title: "AgenticLinkedIn 메인 이미지",
      type: "Drive Image",
      url: "https://drive.google.com/file/d/1Uz-4_Uc899Muv2G76cTzw_3-xirW-ZFd/view?usp=drivesdk",
      visibility: "public",
      note: "AgenticLinkedIn Drive 폴더의 메인 이미지. WebP 커버 최적화는 원본 다운로드 권한이 열릴 때 교체합니다."
    },
    {
      id: "gcs-agentic-linkedin-demo-drive",
      title: "AgenticLinkedIn 데모 영상",
      type: "Drive Video",
      url: "https://drive.google.com/file/d/1tLaNiIdB8tpIo88xm0JDwjsGgQNWZ6T4/view?usp=drivesdk",
      visibility: "public",
      note: "AgenticLinkedIn Drive 폴더에서 확인한 AI Native 데모 영상."
    },
    {
      id: "gcs-llm-api-md",
      title: "LLM CLI / API Communication Summary",
      type: "Markdown",
      url: "/evidence/gcs-llm-api-automation.md",
      assetUrl: "/evidence/gcs-llm-api-automation.md",
      visibility: "public",
      note: "Claude, EXA, Telegram, GCS/Calendar API 통합 경험 정리. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "oishifood-md",
      title: "Oishifood Landing Page Markdown",
      type: "Markdown",
      url: "/evidence/oishifood-landing.md",
      assetUrl: "/evidence/oishifood-landing.md",
      visibility: "public",
      note: "랜딩 페이지 구조, 기술 스택, 개발 과정 정리. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "oishifood-repo",
      title: "Oishifood Repository",
      type: "GitHub",
      url: "https://github.com/1000AIStartupTeam/Oishifood",
      visibility: "public",
      note: "공개 저장소."
    },
    {
      id: "oishifood-deploy",
      title: "Oishifood Live Site",
      type: "Deployment",
      url: "https://oishifood-chi.vercel.app/",
      visibility: "public",
      note: "배포본."
    },
    {
      id: "gcs-kanban-md",
      title: "Kanban Backend/CLI Markdown",
      type: "Markdown",
      url: "/evidence/gcs-kanban-backend-cli.md",
      assetUrl: "/evidence/gcs-kanban-backend-cli.md",
      visibility: "public",
      note: "FastAPI backend와 Click CLI 구조 자료. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "footstep-contribution-profile",
      title: "Footstep contribution-profile.md",
      type: "Markdown",
      url: "/evidence/footstep-contribution-profile.md",
      assetUrl: "/evidence/footstep-contribution-profile.md",
      visibility: "public",
      note: "IBORY-PURPLE 계정 확인에 기반한 Footstep 프론트엔드 기여 기록. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "footstep-readme",
      title: "Footstep README",
      type: "Markdown",
      url: "/evidence/footstep-readme.md",
      assetUrl: "/evidence/footstep-readme.md",
      visibility: "public",
      note: "팀 프로젝트 source 설명. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "areum-activity-pdf",
      title: "연극동아리 아름 활동 PDF",
      type: "PDF",
      url: "/evidence/areum-activity.pdf",
      assetUrl: "/evidence/areum-activity.pdf",
      pages: 2,
      visibility: "public",
      note: "무대 공포 극복, 주연 역할, 공연 경험을 정리한 내부 공개 사본."
    },
    {
      id: "areum-image-1",
      title: "아름 활동 이미지 1",
      type: "Local Image",
      url: "/assets/projects/areum/areum-1.jpg",
      assetUrl: "/assets/projects/areum/areum-1.jpg",
      visibility: "public",
      note: "배포 자산으로 저장한 공연 후 전체 단체 사진."
    },
    {
      id: "areum-image-2",
      title: "아름 활동 이미지 2",
      type: "Local Image",
      url: "/assets/projects/areum/areum-2.jpg",
      assetUrl: "/assets/projects/areum/areum-2.jpg",
      visibility: "public",
      note: "배포 자산으로 저장한 배우와 스태프 단체 사진."
    },
    {
      id: "areum-image-3",
      title: "아름 활동 이미지 3",
      type: "Local Image",
      url: "/assets/projects/areum/areum-3.jpg",
      assetUrl: "/assets/projects/areum/areum-3.jpg",
      visibility: "public",
      note: "배포 자산으로 저장한 무대 장면 기록."
    },
    {
      id: "cert-history-public-redacted",
      title: "한국사능력검정 1급 증빙",
      type: "Image",
      url: "/evidence/cert-history.png",
      assetUrl: "/evidence/cert-history.png",
      visibility: "public",
      note: "한국사능력검정시험 1급 합격 증빙 원본."
    },
    {
      id: "cert-linuxmaster-public-redacted",
      title: "리눅스마스터 2급 증빙",
      type: "Image",
      url: "/evidence/cert-linuxmaster.png",
      assetUrl: "/evidence/cert-linuxmaster.png",
      visibility: "public",
      note: "리눅스마스터 2급 합격 증빙 원본."
    },
    {
      id: "cert-info-processing-public-redacted",
      title: "정보처리기능사 증빙",
      type: "Image",
      url: "/evidence/cert-info-processing.jpg",
      assetUrl: "/evidence/cert-info-processing.jpg",
      visibility: "public",
      note: "정보처리기능사 합격 증빙 원본."
    }
  ]
} satisfies PortfolioData;
