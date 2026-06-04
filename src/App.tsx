import { useEffect, useMemo, useState, type ReactNode } from "react";
import { portfolioData } from "./data";
import type { Evidence, Project, ProjectStatus, StatusLabel, Visibility } from "./data";

const data = portfolioData;

function getCurrentRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function evidenceVisibilityLabel(visibility: Visibility) {
  if (visibility === "public") return "공개";
  if (visibility === "private") return "비공개";
  return "권한 확인 필요";
}

function evidenceAccessLabel(item: Evidence) {
  if (item.assetUrl && item.visibility === "public") return "배포 파일";
  return evidenceVisibilityLabel(item.visibility);
}

function evidenceHref(item: Evidence) {
  if (item.assetUrl && item.visibility === "public") return item.assetUrl;
  return item.url;
}

function getStatus(status: ProjectStatus): StatusLabel {
  return data.statusLabels[status] ?? data.statusLabels.needs_user_confirmation;
}

function getEvidence(id: string): Evidence | undefined {
  return data.evidence.find((item) => item.id === id);
}

function TagList({ tags, strong = false }: { tags: string[]; strong?: boolean }) {
  return (
    <div className={`tag-row${strong ? " tag-row-strong" : ""}`}>
      {tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function EvidenceList({ ids }: { ids: string[] }) {
  const items = ids.map(getEvidence).filter((item): item is Evidence => Boolean(item));

  if (!items.length) {
    return <p className="muted">등록된 증빙이 없습니다.</p>;
  }

  return (
    <div className="evidence-list">
      {items.map((item) => {
        const body = (
          <>
            <span className="evidence-type">{item.type}</span>
            <strong>{item.title}</strong>
            <small>{item.note}</small>
            <span className="evidence-visibility">{evidenceAccessLabel(item)}</span>
          </>
        );

        const href = evidenceHref(item);

        if (!href || item.visibility === "private") {
          return (
            <div className="evidence-item" key={item.id}>
              {body}
            </div>
          );
        }

        return (
          <a
            className="evidence-item evidence-link"
            href={href}
            key={item.id}
            rel="noreferrer"
            target="_blank"
          >
            {body}
          </a>
        );
      })}
    </div>
  );
}

function Header({ route }: { route: string }) {
  const links = [
    ["/", "Home"],
    ["/projects", "Projects"],
    ["/credentials", "Credentials"],
    ["/contact", "Contact"],
  ] as const;

  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="홈으로 이동">
        <span className="brand-mark">SCW</span>
        <span>송채우 Portfolio</span>
      </a>
      <nav className="site-nav" aria-label="주요 탐색">
        {links.map(([href, label]) => {
          const active = href === "/" ? route === "/" : route.startsWith(href);
          return (
            <a className={active ? "active" : ""} href={`#${href}`} key={href}>
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{data.profile.name}</strong>
        <p>문제 정의, 제품 기획, 기술 실행을 근거와 함께 정리한 포트폴리오입니다.</p>
      </div>
      <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
    </footer>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">PM, Developer, SW Salesman, problem definer</p>
        <h1 id="hero-title">{data.profile.name}</h1>
        <p className="hero-headline">{data.profile.headline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#/projects">
            대표 프로젝트와 근거 보기
          </a>
          <a className="button button-secondary" href={`mailto:${data.profile.email}`}>
            이메일로 연락하기
          </a>
        </div>
      </div>
      <figure className="hero-visual">
        <img
          className="hero-image"
          src="/assets/portfolio-hero-minimal.png"
          alt="흰 배경 위에 절제된 포트폴리오 인터페이스 모형이 떠 있는 미니멀 비주얼"
        />
      </figure>
    </section>
  );
}

function ProjectMiniCard({ project }: { project: Project }) {
  const status = getStatus(project.status);

  return (
    <a className="mini-card" href={`#/projects/${project.slug}`}>
      <span>{project.period}</span>
      <strong>{project.title}</strong>
      <small>{status.label}</small>
    </a>
  );
}

function SignalBoard() {
  const featured = data.projects
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  return (
    <section className="section signal-section" aria-labelledby="signal-title">
      <div className="section-heading">
        <p className="eyebrow">30초 안에 보여줄 신호</p>
        <h2 id="signal-title">고객 문제를 제품 흐름으로 바꾸는 사람</h2>
        <p>{data.profile.shortPitch}</p>
      </div>
      <div className="featured-strip">
        {featured.map((project) => (
          <ProjectMiniCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="bento-grid">
        <article className="bento-card bento-card-large accent-lime">
          <span className="metric">4.24</span>
          <h3>학업 지속성</h3>
          <p>가천대학교 인공지능학과, 전체 GPA 4.24와 직전학기 4.5. 국가우수장학금 이공계 수혜.</p>
        </article>
        <article className="bento-card accent-coral">
          <span className="metric">PM</span>
          <h3>문제 정의</h3>
          <p>사용자 관찰과 회고 자료를 기반으로 문제, 가치, 실행 범위를 분리합니다.</p>
        </article>
        <article className="bento-card accent-cobalt">
          <span className="metric">API</span>
          <h3>실행 연결</h3>
          <p>React, FastAPI, Supabase, LLM API, 자동화 스크립트를 제품 흐름으로 묶습니다.</p>
        </article>
        <article className="bento-card accent-mint">
          <span className="metric">Trust</span>
          <h3>근거 기반 문장</h3>
          <p>확인된 내용과 확인 필요한 기여를 나눠 과장 없는 포트폴리오 문장을 만듭니다.</p>
        </article>
      </div>
    </section>
  );
}

function CapabilityMatrix() {
  return (
    <section className="section section-contrast" aria-labelledby="capability-title">
      <div className="section-heading">
        <p className="eyebrow">Capability Matrix</p>
        <h2 id="capability-title">정성 역량과 기술 실행을 같이 보여줍니다</h2>
      </div>
      <div className="matrix">
        <div className="matrix-column">
          <h3>Discovery & Narrative</h3>
          <ul>
            <li>고객 인터뷰와 회고에서 문제 신호 추출</li>
            <li>문제, 사용자 맥락, 세일즈 메시지를 분리</li>
            <li>지원서에 바로 쓸 수 있는 근거 기반 문장화</li>
          </ul>
        </div>
        <div className="matrix-column">
          <h3>Build & Integrate</h3>
          <ul>
            <li>React/Vite, Next.js, Tailwind, CSS Module 화면 구현</li>
            <li>FastAPI, Supabase, Google OAuth, CLI 백엔드 흐름</li>
            <li>Claude, EXA, Telegram, GCS API 기반 자동화</li>
          </ul>
        </div>
        <div className="matrix-column">
          <h3>Operate & Verify</h3>
          <ul>
            <li>PR, issue, branch, README, 배포 문서 기반 협업</li>
            <li>피드백 점수, retry, rollback이 있는 자동화 루프</li>
            <li>민감정보와 미확인 기여를 분리하는 공개 원칙</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section" aria-labelledby="timeline-title">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2 id="timeline-title">배경과 기본 정보</h2>
      </div>
      <div className="profile-grid">
        <article className="profile-panel">
          <h3>Education</h3>
          <p>
            <strong>{data.profile.education.school}</strong> {data.profile.education.major}
          </p>
          <p>{data.profile.education.gpa}</p>
          <p>{data.profile.education.scholarship}</p>
        </article>
        <article className="profile-panel">
          <h3>Experience</h3>
          {data.profile.experience.map((item) => (
            <div className="timeline-item" key={`${item.period}-${item.title}`}>
              <span>{item.period}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </article>
        <article className="profile-panel">
          <h3>Strengths</h3>
          <ul className="clean-list">
            {data.profile.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <SignalBoard />
      <CapabilityMatrix />
      <Timeline />
      <ContactBand />
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = getStatus(project.status);

  return (
    <a
      className="project-card"
      href={`#/projects/${project.slug}`}
      aria-label={`${project.title} 문제와 근거 보기`}
    >
      <div className="project-card-top">
        <span className="period">{project.period}</span>
        <span className={`status-badge status-${project.status}`}>{status.label}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p>{project.summary}</p>
      <TagList tags={project.tags} />
      <span className="text-link">문제·근거 보기</span>
    </a>
  );
}

function ProjectsPage({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) {
  const projects = useMemo(() => {
    const sorted = data.projects.slice().sort((a, b) => a.priority - b.priority);
    if (selectedFilter === "전체") return sorted;
    return sorted.filter((project) => project.tags.includes(selectedFilter));
  }, [selectedFilter]);

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Projects</p>
        <h1>문제, 고객 맥락, 기술 실행을 함께 보여주는 프로젝트</h1>
        <p>카드는 빠르게 스캔하고, 상세 페이지에서는 문제 정의와 근거 상태를 확인할 수 있습니다.</p>
      </section>
      <section className="section section-tight">
        <div className="filter-bar" role="toolbar" aria-label="프로젝트 필터">
          {data.filters.map((filter) => (
            <button
              className={`filter-button${filter === selectedFilter ? " selected" : ""}`}
              type="button"
              aria-pressed={filter === selectedFilter}
              data-filter={filter}
              key={filter}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

function DetailSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function DetailParagraph({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content?: string;
}) {
  return (
    <DetailSection id={id} title={title}>
      <p>{content || "추가 확인 필요"}</p>
    </DetailSection>
  );
}

function DetailList({ items }: { items?: string[] }) {
  if (!items || !items.length) {
    return <p className="muted">추가 확인 필요</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ProjectMediaGallery({ media }: { media?: Project["media"] }) {
  if (!media || !media.length) {
    return null;
  }

  return (
    <DetailSection title="Project Images">
      <div className="media-grid">
        {media.map((item) => (
          <figure className="media-card" key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </DetailSection>
  );
}

function DetailNav() {
  const links = [
    ["overview", "개요"],
    ["problem", "문제"],
    ["narrative", "기획/세일즈"],
    ["execution", "실행"],
    ["evidence", "근거"],
  ] as const;

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="detail-nav" aria-label="프로젝트 상세 섹션">
      {links.map(([id, label]) => (
        <button key={id} type="button" onClick={() => scrollToSection(id)}>
          {label}
        </button>
      ))}
    </nav>
  );
}

function ProjectDetailPage({ slug }: { slug: string }) {
  const project = data.projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  const status = getStatus(project.status);

  return (
    <article className="detail-page">
      <a className="back-link" href="#/projects">
        프로젝트 목록으로 돌아가기
      </a>
      <header className="detail-hero">
        <div>
          <p className="eyebrow">
            {project.period} · {status.label}
          </p>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          <TagList tags={project.tags} />
        </div>
        <aside className="detail-status">
          <strong>검증 상태</strong>
          <span className={`status-badge status-${project.status}`}>{status.label}</span>
          <p>{status.description}</p>
        </aside>
      </header>
      <div className="detail-layout">
        <DetailNav />
        <div className="detail-content">
          <DetailParagraph id="overview" title="Overview" content={project.summary} />
          <DetailParagraph id="problem" title="Problem" content={project.problem} />
          <DetailParagraph id="customer" title="Customer / Stakeholder Context" content={project.customerContext} />
          <DetailSection id="narrative" title="Planning and Sales Narrative">
            <div className="two-column">
              <div>
                <h3>Planning</h3>
                <p>{project.planningNarrative}</p>
              </div>
              <div>
                <h3>Sales</h3>
                <p>{project.salesNarrative}</p>
              </div>
            </div>
          </DetailSection>
          <DetailParagraph id="role" title="My Role" content={project.role} />
          <DetailSection id="execution" title="Execution Scope">
            <DetailList items={project.executionScope} />
            <h3>Technical Highlights</h3>
            <TagList tags={project.technicalHighlights} strong />
          </DetailSection>
          <DetailSection title="Architecture or Workflow">
            <DetailList items={project.architectureNotes} />
          </DetailSection>
          <DetailSection title="Qualitative Highlights">
            <DetailList items={project.qualitativeHighlights} />
          </DetailSection>
          <ProjectMediaGallery media={project.media} />
          <DetailSection id="evidence" title="Evidence">
            <EvidenceList ids={project.evidenceIds} />
          </DetailSection>
          <DetailSection title="What I Learned">
            <DetailList items={project.lessons} />
          </DetailSection>
          <DetailSection title="What I Would Improve Now">
            <DetailList items={project.improvements} />
          </DetailSection>
        </div>
      </div>
    </article>
  );
}

function CredentialsPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Credentials</p>
        <h1>자격증과 증빙 상태</h1>
        <p>자격 사항과 공개 사본으로 확인 가능한 증빙을 함께 정리했습니다.</p>
      </section>
      <section className="section section-tight">
        <div className="credential-grid">
          {data.credentials.map((credential) => {
            const evidence = getEvidence(credential.evidenceId);
            return (
              <article className="credential-card" key={credential.evidenceId}>
                <span>{credential.date}</span>
                <h2>{credential.title}</h2>
                <p>{credential.issuer}</p>
                <EvidenceList ids={evidence ? [evidence.id] : []} />
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ContactBand() {
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <p className="eyebrow">Contact</p>
      <h2 id="contact-band-title">채용 담당자가 바로 연락할 수 있게</h2>
      <p>프로젝트 맥락과 근거 자료를 확인한 뒤 바로 대화를 이어갈 수 있도록 이메일 연락 동선을 남겼습니다.</p>
      <a className="button button-primary" href={`mailto:${data.profile.email}`}>
        {data.profile.email}
      </a>
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1>프로젝트를 확인한 뒤 바로 연락할 수 있습니다</h1>
        <p>지원 직무와 맞는 프로젝트 맥락을 함께 확인하고 이메일로 대화를 이어갈 수 있습니다.</p>
      </section>
      <section className="section section-tight">
        <div className="contact-grid">
          <article className="contact-card">
            <h2>Email</h2>
            <p>{data.profile.email}</p>
            <a className="button button-primary" href={`mailto:${data.profile.email}`}>
              이메일로 연락하기
            </a>
          </article>
          <article className="contact-card">
            <h2>함께 보면 좋은 자료</h2>
            <ul>
              <li>
                <a href="#/projects">대표 프로젝트와 근거</a>
              </li>
              <li>
                <a href="#/projects/windmill">WindMill 상세 사례</a>
              </li>
              <li>
                <a href="#/credentials">자격증 증빙</a>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="page-intro">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>프로젝트 목록에서 다시 선택해 주세요.</p>
      <a className="button button-primary" href="#/projects">
        프로젝트 목록
      </a>
    </section>
  );
}

function Page({
  route,
  selectedFilter,
  setSelectedFilter,
}: {
  route: string;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) {
  if (route === "/" || route === "") return <HomePage />;
  if (route === "/projects") {
    return <ProjectsPage selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />;
  }
  if (route.startsWith("/projects/")) {
    return <ProjectDetailPage slug={route.replace("/projects/", "")} />;
  }
  if (route === "/credentials") return <CredentialsPage />;
  if (route === "/contact") return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  const [route, setRoute] = useState(getCurrentRoute);
  const [selectedFilter, setSelectedFilter] = useState("전체");

  useEffect(() => {
    function handleHashChange() {
      setRoute(getCurrentRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = route.startsWith("/projects/") ? "프로젝트 상세 · 송채우 Portfolio" : "송채우 Portfolio";
  }, [route]);

  return (
    <>
      <Header route={route} />
      <main id="main">
        <Page route={route} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      </main>
      <Footer />
    </>
  );
}
