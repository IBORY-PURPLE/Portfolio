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

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  priority: number;
  status: ProjectStatus;
  tags: string[];
  summary: string;
  problem: string;
  customerContext: string;
  planningNarrative: string;
  salesNarrative: string;
  role: string;
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
    headline: "고객 문제를 제품 흐름으로 정리하고, 필요한 기술까지 직접 연결하는 PM/사업개발형 빌더",
    shortPitch: "고객 문제 정의, 기획/세일즈 문장화, React/API/AI 자동화를 실행까지 연결합니다.",
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
    "Planning",
    "Research",
    "Customer",
    "Sales",
    "Frontend",
    "AI/API",
    "Backend",
    "Automation",
    "Collaboration",
    "Presentation",
    "Growth"
  ],
  statusLabels: {
    verified: {
      label: "자료 확인",
      description: "내부 공개 사본 또는 공개 자료에서 확인된 내용입니다."
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
      priority: 1,
      status: "strong_but_needs_confirmation",
      tags: ["Planning", "Customer", "Frontend", "AI/API", "Collaboration"],
      summary: "흩어진 주식 정보, 관심/보유 종목 관리, AI 예측 그래프를 한 흐름으로 묶어 사용자가 종목을 찾고 비교하고 판단하도록 돕는 프로젝트입니다.",
      problem: "개인 투자자는 종목 정보, 관심 종목, 보유 종목, 예측 데이터를 각각 다른 곳에서 확인해야 해 판단 흐름이 끊깁니다.",
      customerContext: "사용자가 종목을 검색하고, 보유/관심 상태를 관리하고, 예측 그래프와 포트폴리오 추천을 통해 다음 행동을 정하는 흐름을 중심으로 정리했습니다.",
      planningNarrative: "기술 스택보다 먼저 사용자가 '무엇을 보고 어떤 판단을 해야 하는가'를 잡고, 주식 상세, 거래 로그, AI 예측, 추천 화면을 단계적으로 연결했습니다.",
      salesNarrative: "투자 판단을 대신하는 서비스가 아니라, 사용자의 정보 탐색 비용을 낮추고 비교 가능한 근거를 한 화면 안에 모으는 도구로 설명할 수 있습니다.",
      role: "공개 GitHub 기록 기준으로 `채우` author와 `chaewoo` 브랜치 PR이 다수 확인됩니다. 최종 확인 전까지는 주요 프론트엔드 기여 후보로 표현합니다.",
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
      priority: 2,
      status: "verified",
      tags: ["Planning", "AI/API", "Backend", "Automation"],
      summary: "GCS Pulse Daily/Weekly Snippet API와 웹 화면을 구현하고, Codex/Claude Code 에이전트가 Obsidian 기록을 구조화해 점수 기준을 통과할 때까지 개선하는 자동화 루프를 설계했습니다.",
      problem: "매일 작성하는 Obsidian 회고와 GCS Pulse 업로드 형식이 달라 반복 입력 비용이 컸고, AI 피드백 점수를 보고 다시 고치는 과정도 수동이었습니다.",
      customerContext: "사용자는 원문 일기를 그대로 공개하지 않으면서도, 회고 품질을 유지하고 매일 누락 없이 기록을 업로드하고 싶어 합니다.",
      planningNarrative: "핵심은 'AI가 글을 대신 쓰는 것'이 아니라, 근거 자료를 보존하고 서버의 평가 기준을 통과할 때까지 자동 개선하는 품질 관리 루프입니다.",
      salesNarrative: "개인의 회고 습관을 API, 웹 UI, 자동화, 피드백 분석이 연결된 작은 제품으로 바꾼 사례입니다.",
      role: "개인 프로젝트 owner로서 API 명세 분석, Daily/Weekly Snippet API와 웹 기능 구현, 에이전트 자동 업로드 워크플로 설계를 담당한 것으로 자료에 정리되어 있습니다.",
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
      title: "GCS8 3차 팀 후츠파: 1인 창작자 오프라인 접점",
      subtitle: "100명 DM, 28명 응답, 현장 방문으로 작은 오프라인 판매 접점을 검증한 팀 발표",
      period: "2026.05",
      priority: 3,
      status: "verified",
      tags: ["Planning", "Research", "Customer", "Sales", "Presentation", "Collaboration"],
      summary: "1인 굿즈/일러스트 창작자가 기존 팔로워 밖의 신규 고객을 만나는 문제를 잡고, DM 반응과 오프라인 공간 방문으로 낮은 비용의 검증 흐름을 설계한 3차 팀 발표 프로젝트입니다.",
      problem: "소규모 1인 창작자는 온라인 노출이 기존 팔로워 중심이고, 대형 페어나 단독 팝업은 비용과 운영 부담이 커 신규 고객을 만날 작은 접점이 부족합니다.",
      customerContext: "서울일러스트페어 참여 창작자를 중심으로 DM 100명을 시도해 28명의 응답을 확보했고, 군자역 플리마켓과 독립서점 공간을 방문해 실제 오프라인 진입 비용과 운영 조건을 확인했습니다.",
      planningNarrative: "온라인 홍보 한계, 페어 비용, 공간 맥락을 분리해 '기존 방문객이 있는 오프라인 공간에서 소량으로 발견되는 구조'라는 가설로 좁혔습니다.",
      salesNarrative: "작가 10명에게 유료 테스트를 제안하고, 사진관/꽃집/네일샵/카페 등 공간 20곳을 접촉해 공간 1곳에 3~5명분 굿즈를 소량 배치하는 프리토타이핑 흐름으로 설명했습니다.",
      role: "발표대본에서 팀 후츠파 발표자로 확인됩니다. 팀 발표 자료 기준으로 문제 정의, 현장 검증, 다음 검증 계획을 함께 정리한 프로젝트입니다.",
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
      slug: "gcs-hutzpa-construction-billing",
      title: "GCS8 2차 팀 후츠파: 공사 기성청구 검증",
      subtitle: "덤프트럭 가설에서 원청 공무 담당자의 월말 기성청구 문제로 피벗한 팀 발표",
      period: "2026.05",
      priority: 4,
      status: "verified",
      tags: ["Planning", "Research", "Customer", "Sales", "Presentation", "Collaboration"],
      summary: "초기 덤프트럭 기사 가설을 인터뷰로 점검한 뒤, 원청 공무 담당자의 월말 기성청구 취합/검증 문제로 방향을 바꾸고 랜딩페이지 반응까지 확인한 2차 팀 발표 프로젝트입니다.",
      problem: "공무 담당자는 사진, 도면, 수량 산출서가 내역서 항목과 연결되지 않아 월말 기성청구 마감 때 자료를 수작업으로 취합하고 검증해야 합니다.",
      customerContext: "덤프트럭 운전자 인터뷰 3건에서 급여 정산 시점 문제를 확인했지만, 더 큰 업무 병목은 원청 공무 담당자의 증빙 자료 정리와 내역서 연결 과정에서 드러났습니다.",
      planningNarrative: "처음 잡은 사용자가 틀릴 수 있음을 인정하고, 인터뷰에서 나온 더 구체적인 고통을 따라 문제 정의를 공사 관리자 업무 흐름으로 전환했습니다.",
      salesNarrative: "카페 글 조회수 57명, 신청자 24명, 파일럿 사용 확정자 8명으로 신청 전환율 42%, 파일럿 확정 전환율 33%의 초기 수요 신호를 정리했습니다.",
      role: "팀 후츠파 발표/회고 참여자로 확인됩니다. 팀 자료 기준으로 고객 인터뷰, 문제 전환, 랜딩페이지 검증 결과를 함께 정리했습니다.",
      qualitativeHighlights: [
        "초기 덤프트럭 기사 가설에서 공무 담당자 기성청구 문제로 피벗",
        "랜딩페이지 반응으로 신청자 24명, 파일럿 확정자 8명의 수요 신호 확인",
        "의사결정 지연과 검증 부족을 회고하고 다음 스프린트 운영 원칙으로 전환"
      ],
      executionScope: [
        "덤프트럭 운전자 인터뷰와 가설 점검",
        "공사 관리자 인터뷰 기반 문제 재정의",
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
      lessons: [
        "타깃을 바꾸는 판단은 실패가 아니라 더 정확한 문제로 이동하는 과정입니다.",
        "전환율은 제품을 멋지게 보이게 하는 숫자가 아니라 다음 실험의 우선순위를 정하는 기준입니다."
      ],
      improvements: [
        "파일럿 확정 이후 실제 사용 지속률과 반복 사용 사유를 추가",
        "현장 업무 자료 샘플을 개인정보 없이 재구성해 이해 속도를 높이기"
      ]
    },
    {
      slug: "gcs-pitumi-ai-native",
      title: "GCS8 1차 피투미 AI Native",
      subtitle: "선원 문제 가설을 인터뷰와 실패 회고로 재정의한 1차 팀 발표 프로젝트",
      period: "2026.04",
      priority: 5,
      status: "verified",
      tags: ["Planning", "Research", "Customer", "Presentation", "Collaboration"],
      summary: "제목 앞 ! 표시가 있는 AI Native 발표 자료와 1차 발표/회고를 기반으로, 선원/해운업 가설을 검증하며 실패 원인을 리서치 게이트와 Kill Rule로 바꾼 프로젝트입니다.",
      problem: "초기 문제 가설은 실제 선원/해운업 맥락보다 러프했고, 데스크 리서치와 경쟁사/정책 확인 없이 인터뷰를 진행해 검증 밀도가 낮아졌습니다.",
      customerContext: "선원/해운업 종사자와 유사 타깃 인터뷰 8건을 진행했지만, 실제 핵심 타깃 수와 질문 설계가 충분하지 않아 문제의 Why를 깊게 확인하지 못했습니다.",
      planningNarrative: "발표 실패를 숨기지 않고 데스크 리서치 게이트, 팀 재구성, Kill Rule, 시간보다 밀도 기준이라는 다음 스프린트 원칙으로 바꿨습니다.",
      salesNarrative: "완성된 성과보다도 '얕은 가설을 어떻게 버리고 더 강한 검증 방식으로 바꾸는가'를 보여주는 제품 사고 사례로 설명할 수 있습니다.",
      role: "1차 피투미 발표/회고 자료에 참여자로 확인됩니다. 고객 인터뷰, 실패 원인 정리, 다음 스프린트 원칙 도출 경험이 자료에 남아 있습니다.",
      qualitativeHighlights: [
        "선원/해운업 관련 인터뷰 8건을 통해 초기 가설의 빈틈을 확인",
        "데스크 리서치, 법/정책, 경쟁사 분석 부족을 실패 요인으로 명시",
        "다음 도메인 진입 전 리서치 게이트와 Kill Rule을 세워 검증 방식을 개선"
      ],
      executionScope: [
        "초기 AI Native 문제 가설 수립",
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
      evidenceIds: ["gcs-pitumi-ai-native-pdf", "gcs-pitumi-slides-pdf", "gcs-pitumi-retro-md"],
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
      problem: "LLM/API 실험은 데모로 끝나기 쉽지만, 실제 업무에서는 인증, 오류 처리, fallback, rollback, 환경변수 관리까지 연결되어야 합니다.",
      customerContext: "운영자와 팀원이 반복적으로 처리하는 검색 요약, 회고 업로드, 회의실 예약, 캘린더 초대 같은 업무를 자동화 대상으로 봤습니다.",
      planningNarrative: "각 API를 기능 단위로만 호출하지 않고, 사용자가 끝까지 완료해야 하는 업무 흐름으로 묶었습니다.",
      salesNarrative: "AI를 멋진 답변 생성기가 아니라, 반복 업무를 줄이고 실패 복구까지 돕는 운영 파트너로 포지셔닝한 사례입니다.",
      role: "자료 기준으로 LLM/API 통신 패턴을 정리하고, CLI와 자동화 스크립트가 호출할 수 있는 구조를 설계한 경험이 확인됩니다.",
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
      problem: "팀 소개는 나열식이면 기억에 남기 어렵고, 각 멤버의 캐릭터와 팀의 톤을 한 화면 흐름으로 설득해야 했습니다.",
      customerContext: "방문자가 팀의 정체성, 멤버 캐릭터, 미식 취향, 뉴스레터 행동까지 자연스럽게 이해하도록 구성했습니다.",
      planningNarrative: "스크롤 진행도와 카드 전환으로 팀의 미식 여정을 이야기처럼 읽게 만들었습니다.",
      salesNarrative: "랜딩 페이지를 단순 소개가 아니라 팀의 인상과 참여 행동을 만드는 세일즈 표면으로 설계했습니다.",
      role: "문서 기준으로 4일 동안 React/Vite/Tailwind 기반 랜딩 페이지와 Supabase 뉴스레터 연동 구조를 정리했습니다.",
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
      priority: 8,
      status: "verified",
      tags: ["Backend", "Automation", "Collaboration"],
      summary: "Google OAuth 로그인, 워크스페이스/보드/컬럼/카드 API, Click CLI를 하나의 저장소에서 관리하는 칸반 백엔드/CLI 프로젝트입니다.",
      problem: "팀 협업 도구는 웹 화면뿐 아니라 로컬 CLI, 인증, 데이터 모델, 테스트 흐름까지 맞아야 실사용이 가능합니다.",
      customerContext: "개발자가 로컬에서 빠르게 백엔드를 띄우고 CLI로 워크스페이스, 보드, 컬럼, 카드를 조작하는 상황을 목표로 했습니다.",
      planningNarrative: "API와 CLI가 같은 도메인 모델을 공유하도록, 인증과 리소스 조작을 명령어 흐름으로 정리했습니다.",
      salesNarrative: "팀의 작업 상태를 CLI에서도 빠르게 조작할 수 있는 운영 도구로 설명할 수 있습니다.",
      role: "자료 기준으로 FastAPI 백엔드와 CLI 구조, OAuth, 테스트/린트 운영 문서를 정리한 프로젝트입니다.",
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
      subtitle: "발표 공포를 주연 무대 경험으로 전환한 협업/성장 프로젝트",
      period: "2023.02",
      priority: 9,
      status: "verified",
      tags: ["Growth", "Collaboration", "Presentation"],
      summary: "연기 경험이 없는 상태에서 연극동아리 아름의 공연 주연을 맡아, 2개월간 발성/표정/감정 연기와 팀 합을 맞추고 대학로 무대에서 100여 명 관객 앞 2회 공연을 완주한 활동입니다.",
      problem: "무대 공포와 발표 공포가 있었지만, 사람 앞에서 메시지를 전달하고 팀과 함께 결과물을 책임지는 경험이 필요했습니다.",
      customerContext: "관객, 연출, 동료 배우가 모두 이해관계자인 공연 환경에서 개인의 불안보다 장면의 완성도와 팀의 리듬을 우선해야 했습니다.",
      planningNarrative: "공연을 활동 이력으로만 두지 않고, 낯선 문제에 들어가 반복 훈련, 피드백 수용, 실전 발표로 공포를 낮춘 성장 프로세스로 정리했습니다.",
      salesNarrative: "고객 인터뷰, 발표, 세일즈 상황에서 필요한 태도인 낯선 사람 앞에서 말하기, 긴장 속에서 메시지 유지하기, 팀 결과물 책임지기를 보여주는 보조 사례입니다.",
      role: "연극동아리 아름 공연 `해더웨이 가의 유령`에서 주연 브란트 역을 맡은 것으로 공개 사본 자료에서 확인됩니다.",
      qualitativeHighlights: [
        "연기 경험이 없는 상태에서 주연 역할을 맡아 2개월간 반복 연습",
        "대학로/혜화 공연장에서 100여 명 관객 앞 토/일 2회 공연 완주",
        "포기하고 싶은 압박을 팀 책임감과 피드백 수용으로 돌파"
      ],
      executionScope: [
        "대본 암기와 발성/표정/감정 연기 훈련",
        "연출, 배우들과 장면별 합과 감정선 조정",
        "실전 공연 2회 완주",
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
        "개인 공포 인식",
        "주연 역할 수락",
        "반복 연습과 연출 피드백",
        "관객 앞 실전 공연",
        "발표 자신감과 팀 책임감으로 전환"
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
        "발표 역량은 타고나는 것이 아니라 반복 노출, 피드백, 팀 책임감으로 훈련할 수 있습니다.",
        "불편한 역할을 맡아 끝까지 해낸 경험은 고객 앞에서 말하고 설득하는 자신감으로 이어집니다."
      ],
      improvements: [
        "공연명, 공연장, 정확한 공연 일자를 추가 확인해 더 명확히 정리",
        "개인정보 보호를 위해 원본 사진 사용 범위를 계속 점검"
      ]
    },
    {
      slug: "footstep",
      title: "Footstep",
      subtitle: "React 팀 프로젝트와 GitHub 협업 흐름을 재구성한 UMC 프로젝트",
      period: "2022.06",
      priority: 10,
      status: "needs_user_confirmation",
      tags: ["Frontend", "Collaboration"],
      summary: "React Router, CSS Module, Figma, GitHub, Notion 협업 자료를 기반으로 팀 개발 흐름과 후보 기여를 조심스럽게 정리한 프로젝트입니다.",
      problem: "오래된 팀 프로젝트는 실제 담당 범위와 계정 소유 확인이 흐려질 수 있어, 포트폴리오 문장으로 쓰려면 과장 없이 근거를 분리해야 합니다.",
      customerContext: "채용 담당자에게는 초기 팀 협업 경험으로, 기술 면접관에게는 역할 확인 필요 상태를 솔직하게 보여주는 보조 사례입니다.",
      planningNarrative: "Figma, GitHub, Notion에 흩어진 협업 자료를 제품 개발 흐름으로 다시 읽었습니다.",
      salesNarrative: "기술 실력의 대표 사례보다는, 팀 프로젝트 안에서 협업 방식과 화면 구현 후보를 설명하는 보조 사례로 배치합니다.",
      role: "IBORY-PURPLE, CHAEWOOSONG 계정 확인 전까지 Footer, ProfileSetting, CommentList 등 직접 구현을 단정하지 않습니다.",
      qualitativeHighlights: [
        "공개 GitHub 기록을 다시 읽고 역할 후보와 확인 필요 사항을 분리",
        "PR, issue, branch 기반 팀 개발 흐름 파악",
        "오래된 프로젝트를 안전한 포트폴리오 문장으로 재구성"
      ],
      executionScope: [
        "React Router 기반 화면 라우팅",
        "CSS Module 기반 화면별 스타일",
        "Footer, ProfileSetting, Comment UI 후보",
        "GitHub issue, branch, PR 협업"
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
        "ProfileSetting, Footer, CommentList 등 후보 파일 기록 존재"
      ],
      evidenceIds: ["footstep-contribution-profile", "footstep-readme"],
      lessons: [
        "포트폴리오에서는 오래된 프로젝트일수록 단정 표현을 줄이고 근거 상태를 드러내야 합니다.",
        "협업 경험은 구현 결과뿐 아니라 PR과 이슈 흐름에서도 설명할 수 있습니다."
      ],
      improvements: [
        "GitHub 계정 본인 확인",
        "실제 담당 화면과 Figma frame 범위 확인"
      ]
    }
  ],
  credentials: [
    {
      title: "한국사능력검정시험 1급",
      issuer: "국사편찬위원회",
      date: "2026.02.20",
      evidenceId: "cert-history-pdf"
    },
    {
      title: "리눅스마스터 2급",
      issuer: "한국정보통신진흥협회",
      date: "2026.01.02",
      evidenceId: "cert-linuxmaster-png"
    },
    {
      title: "정보처리기능사",
      issuer: "과학기술정보통신부",
      date: "2023.05.01",
      evidenceId: "cert-info-processing-jpg"
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
      id: "gcs-pitumi-ai-native-pdf",
      title: "!GCS8기 1조피투미 AI Native PDF",
      type: "PDF",
      url: "/evidence/gcs-pitumi-ai-native.pdf",
      assetUrl: "/evidence/gcs-pitumi-ai-native.pdf",
      pages: 9,
      visibility: "public",
      note: "제목 앞 ! 표시가 있어 필수 반영한 GCS 1차 AI Native 발표 자료."
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
      id: "gcs-pitumi-retro-md",
      title: "GCS8 1차 피투미 발표 회고",
      type: "Markdown",
      url: "/evidence/gcs-pitumi-retro.md",
      assetUrl: "/evidence/gcs-pitumi-retro.md",
      visibility: "public",
      note: "선원/해운업 가설 검증 실패와 다음 스프린트 원칙을 정리한 1차 회고 자료."
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
      note: "계정/역할 확인 전까지 hypothesis로 사용. 배포본에 포함되는 내부 공개 사본."
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
      id: "cert-history-pdf",
      title: "한국사능력검정 1급 증빙",
      type: "PDF",
      url: "/evidence/cert-history.pdf",
      assetUrl: "/evidence/cert-history.pdf",
      pages: 1,
      visibility: "public",
      note: "자격증 증빙. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "cert-linuxmaster-png",
      title: "리눅스마스터 2급 증빙",
      type: "Image",
      url: "/evidence/cert-linuxmaster.png",
      assetUrl: "/evidence/cert-linuxmaster.png",
      visibility: "public",
      note: "자격증 증빙. 배포본에 포함되는 내부 공개 사본."
    },
    {
      id: "cert-info-processing-jpg",
      title: "정보처리기능사 증빙",
      type: "Image",
      url: "/evidence/cert-info-processing.jpg",
      assetUrl: "/evidence/cert-info-processing.jpg",
      visibility: "public",
      note: "자격증 증빙. 배포본에 포함되는 내부 공개 사본."
    }
  ]
} satisfies PortfolioData;
