import React, { useEffect, useState } from 'react';

// Import company logos
import cartaLogo from '../compLogos/carta.png';
import crestaLogo from '../compLogos/cresta.jpg';
import conradLogo from '../compLogos/conrad.png';
import bhashaLogo from '../compLogos/bhasha.jpeg';
import g12Logo from '../compLogos/g12.jpeg';
import vbLogo from '../compLogos/vb.jpeg';
import zafariLogo from '../compLogos/zafari.jpeg';
import mettaStarsLogo from '../compLogos/mettastars.jpeg';

// Professional Experience
export const professionalExperience = [
  {
    title: 'Agentic AI Solutions Engineer | Franchise Foundry',
    logo: null,
    detail: `- Architected an end-to-end multimodal agentic AI pipeline: ingests franchise disclosure PDFs, runs LLM prompt synthesis with PDF grounding (Anthropic/Gemini), and deploys production voice sales agents on Vapi — a 7-step automated workflow from ingestion to live phone provisioning.
- Engineered production agent orchestration infrastructure — resumable step-persisted builds, idempotent queue jobs, and structured workflow logs with error traces — turning opaque multi-minute LLM+telephony failures into operator-debuggable agent runs.`,
    year: 'May 2026 – Present',
    techTags: ['Laravel', 'PHP', 'Anthropic', 'Gemini', 'Vapi', 'Twilio', 'LiveKit', 'Agentic AI'],
  },
  {
    title: 'Software Engineer Intern | Carta',
    logo: cartaLogo,
    detail: `- Developed Carta's first MCP compensation benchmarking plugin, enabling HR managers to query real-time salary data through Claude via natural language; architected the full auth flow and an upsell path for non-subscribers.
- Built devtools-mcp, a Chrome extension + Node.js MCP server exposing 16 tools that stream live browser DevTools data (network, console, cookies, storage) directly into Claude Code, eliminating context-switching for engineers during debugging.
- Architected Project Atlas, a persistent context memory system for Claude, designing a .context/ repo structure and custom MCP server integrating Jira, Slack, and Confluence, reducing token consumption by ~86k tokens per investigation session across agent workflows.
- Reduced CI pipeline runtime by 42% (12 -> 7 min) on Jenkins; maintained 100+ contributions in first 90 days spanning Django, Python, Datadog, Sentry, CircleCI, and ArgoCD.
- Led 5 projects end-to-end from scoping to release as primary point of contact, including ERD design, feature flag orchestration, and production job execution on live data.`,
    year: 'Jan 2026 – Apr 2026',
    techTags: ['Python', 'Django', 'gRPC', 'PostgreSQL', 'Docker', 'Jenkins', 'Kubernetes', 'Datadog', 'Sentry', 'Jira', 'MyPy', 'CI/CD', 'Kafka', 'MCP'],
  },
  {
    title: 'Associate Conversation Design Intern | Cresta AI (Series D)',
    logo: crestaLogo,
    detail: `- Engineered an LLM auditing system processing 10,000 conversation logs per run, cutting manual QA time by 98% and enabling reviewers to clear multi-week backlogs in hours.
- Conducted QA for AI agent behavior across 12 enterprise clients including Royal Caribbean, surfacing edge cases for model improvements.
- Automated annotation workflows saving 10+ hours/week; tuned conversation platforms for 10+ client deployments improving bot accuracy by 30%.`,
    year: 'May 2025 – Aug 2025',
    techTags: ['Python', 'LLMs', 'Jupyter', 'Dialogflow CX', 'Google Apps Script', 'Enterprise AI'],
  },
  {
    title: 'Founding Engineer | Conrad School of Entrepreneurship (Co-op)',
    logo: conradLogo,
    detail: `- Co-founded G12Uni: An AI-powered university admissions platform scaling to 40,000 monthly visits and 2,000+ MAU across 10+ countries; selected for Google for Startups.
- Engineered full-stack rebuild (Vite + React + Tailwind) with real-time APIs: Google Meet, maps, chat, avatars, and bots.
- Deployed NLP pipelines for Reddit/YouTube intelligence on Docker + GCP; pitched to 24 high schools and secured 5 pilot agreements.
- Built Jado: An LLM-powered research assistant extending Perplexity-style search with Reddit and YouTube scraping pipelines.`,
    year: 'May 2024 – Aug 2024',
    techTags: ['ReactJS', 'Vite', 'Tailwind', 'Python', 'Docker', 'GCP', 'NLP', 'ML Microservices'],
  },
];

// Freelance Work (Latest first)
export const freelanceWork = [
  {
    title: 'Zafari CC Design: Full Stack Developer',
    logo: zafariLogo,
    detail: `- Built a modern, SEO-optimized website for an interior design company
- Implemented server-side rendering with Next.js for optimal performance
- Improved client search ranking and user experience`,
    year: 'May 2025',
    techTags: ['Next.js', 'React', 'TypeScript', 'SEO', 'Server-Side Rendering'],
  },
  {
    title: 'Metta Stars Foundation: Full Stack Developer',
    logo: mettaStarsLogo,
    detail: `- Built a full-stack website for an NGO focused on mental health, finance, and spirituality
- Implemented responsive design and modern UI/UX patterns
- Integrated content management and user engagement features`,
    year: 'April 2025',
    techTags: ['Vite', 'React', 'JavaScript', 'Web Development'],
  },
  {
    title: 'Vasanta Bhavan Oman: Full Stack Developer',
    logo: vbLogo,
    detail: `- Developed an admin panel using ReactJS and Firebase backend
- Built order tracking, staff management, and analytics dashboards
- Deployed the system for a restaurant franchise across Oman`,
    year: 'September 2023',
    techTags: ['ReactJS', 'Firebase', 'Admin Panel', 'Restaurant Management'],
  },
];

// Short intro shown above founder timeline (editorial / “front page” copy)
export const founderJourneySummary =
  "I build products end-to-end - from first commit to real users - usually as a founder or technical co-founder. The thread through my work is education, language, and global communities: shipping platforms people actually use, iterating with partners and users, and staying close to the stack while owning product direction. What follows is a chronological wire of those ventures: the headlines, the build, and the tools behind each one.";

// Founder Journey (Latest first)
export const founderJourney = [
  {
    title: 'G12Uni: Co-Founder & Software Engineer',
    logo: g12Logo,
    detail: `- Launched and scaled a global platform connecting 40,000 monthly visits and 2,000+ MAU across 10+ countries
- Engineered full-stack rebuild with Vite ReactJS, Tailwind, and real-time APIs (Google Meet, maps, chat, avatars, bots)
- Deployed and optimized NLP models on Docker + GCP, building scalable ML microservices
- Partnered with Google for Education Startups through eCoop & Conrad Grebel School of Entrepreneurship
- Selected for Google for Startups program; partnered with Google mentors through eCoop.`,
    year: 'August 2024',
    techTags: ['ReactJS', 'Vite', 'Tailwind', 'Python', 'Flutter', 'Dart', 'Docker', 'GCP', 'NLP', 'Firebase'],
  },
  {
    title: 'Bhasha: Co-Founder',
    logo: bhashaLogo,
    detail: `- Developed a learning platform for Indian languages with mobile and web apps
- Built using Flutter, Dart, and Supabase for seamless cross-platform experience
- Integrated backend services for user progress tracking and content delivery`,
    year: '2025',
    techTags: ['Flutter', 'Dart', 'Supabase', 'Next.js', 'React', 'TypeScript', 'Mobile Development'],
  },
];

// Open Source (Latest first)
export const openSource = [
  {
    title: 'HCI Researcher: Software Engineer | Prof. Edith Law',
    logo: null,
    detail: `- Software engineer on Prof. Edith Law's HCI lab: Building participant-facing tools and research infrastructure for a UWaterloo study on AI literacy in Canadian healthcare.
- Won Best Prototype at the Fall 2025 Google × UWaterloo Symposium on the Future of Learning (Pipette Pro): Developed with Google mentors Chris Reardon and Jules Walter.
- Contributing to research on human-centered AI for educational tools connected to Google's education mission and products like NotebookLM.`,
    year: 'Dec 2025 – Present',
    techTags: ['Next.js', 'TensorFlow', 'Firebase', 'Three.js', 'HCI Research', 'Google', 'EdTech'],
  },
  {
    title: 'palace-ai: Open Source',
    logo: null,
    detail: `- Built and published an open source Python CLI that converts any code repository into a navigable memory palace for AI agents: Generating typed associative networks and per-module room files.
- Achieves 10–42x token reduction with zero API key required; ships with Claude Code integration via \`palace install claude\`.
- Personal implementation of the Atlas context system concept developed during the Carta internship.`,
    year: 'May 2026',
    techTags: ['Python', 'AST', 'pgvector', 'MCP', 'Claude Code', 'PyPI', 'Open Source'],
  },
  {
    title: 'network-mcp: Open Source',
    logo: null,
    detail: `- Built an open source MCP server that ingests LinkedIn connections + personal notes, embeds them with pgvector, and answers natural language queries to surface the right people at the right time.
- Solves the real problem of having 1,700+ connections but no way to leverage them: Ask 'investors who care about edtech' and get ranked, relevant results.`,
    year: 'April 2026',
    techTags: ['Python', 'TypeScript', 'PostgreSQL', 'pgvector', 'FastAPI', 'Docker', 'MCP', 'Open Source'],
  },
  {
    title: 'Parmanu: Research',
    logo: null,
    detail: `- Authored a research paper proposing a particle-based physics engine where material behavior emerges from learned interaction kernels rather than hand-coded solvers (cs.GR, Jan 2026).
- One engine, one substrate, any material: Water, honey, sand, and soft tissue differ only in their latent embedding z. Hybrid analytic + PyTorch learned kernels with ROS bridge for humanoid robotics simulation.`,
    year: 'January 2026',
    techTags: ['Python', 'PyTorch', 'SPH', 'Open3D', 'ROS', 'Physics Simulation', 'Research'],
  },
];

const TradExp = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeCategory, setActiveCategory] = useState('professional');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'professional', label: 'Engineering', items: professionalExperience },
    { id: 'founder', label: 'Founder Journey', items: founderJourney },
    { id: 'freelance', label: 'Freelance Work', items: freelanceWork },
    { id: 'opensource', label: 'Open Source / Research', items: openSource },
  ];

  return (
    <div
      style={{
        padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-3xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
        position: 'relative',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-4xl)',
          marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Experience
      </h2>

      {isMobile ? (
        <div
          style={{
            marginBottom: 'var(--space-2xl)',
            paddingBottom: 'var(--space-sm)',
            borderBottom: '1px solid var(--border-glow)',
          }}
        >
          <label
            htmlFor="experience-category-select"
            style={{
              display: 'block',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-sm)',
              fontFamily: 'var(--font-family-primary)',
            }}
          >
            Category
          </label>
          <select
            id="experience-category-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              padding: 'var(--space-md) var(--space-lg)',
              paddingRight: 'var(--space-2xl)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              border: '1px solid var(--border-glow)',
              borderRadius: '8px',
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a4b22' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right var(--space-md) center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)',
            paddingBottom: 'var(--space-sm)',
            borderBottom: '1px solid var(--border-glow)',
          }}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${active ? 'var(--accent-primary)' : 'rgba(var(--accent-primary-rgb), 0.25)'}`,
                  padding: 0,
                  cursor: 'pointer',
                  color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: active ? 900 : 700,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 'var(--space-3xl)' : 'var(--space-4xl)',
        }}
      >
        {categories
          .filter((cat) => cat.id === activeCategory)
          .map((cat) => (
            <div
              key={cat.id}
              id={`experience-${cat.id}`}
              style={{
                scrollMarginTop: 24,
                paddingBottom: isMobile ? 'var(--space-3xl)' : 'var(--space-4xl)',
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? 'var(--text-xl)' : 'var(--text-3xl)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  margin: `0 0 ${isMobile ? 'var(--space-lg)' : 'var(--space-xl)'}`,
                }}
              >
                {cat.label}
              </h3>

              {cat.id === 'founder' ? (
                <>
                  <div
                    style={{
                      maxWidth: '52rem',
                      marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
                      paddingBottom: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
                      borderBottom: '2px double var(--border-glow)',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
                        color: 'var(--text-secondary)',
                        lineHeight: isMobile ? 1.65 : 1.75,
                        fontStyle: 'italic',
                      }}
                    >
                      {founderJourneySummary}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
                    }}
                  >
                    {cat.items.map((exp, index) => (
                      <article
                        key={`${cat.id}-${index}`}
                        id={`experience-${cat.id}-${index}`}
                        style={{
                          position: 'relative',
                          background: 'rgba(255, 255, 255, 0.5)',
                          border: '1px solid var(--border-glow)',
                          borderLeft: '4px solid var(--accent-primary)',
                          borderRadius: '2px',
                          padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        {index === 0 ? (
                          <span
                            style={{
                              position: 'absolute',
                              top: isMobile ? '10px' : '12px',
                              right: isMobile ? '10px' : '14px',
                              fontSize: '10px',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              fontWeight: 800,
                              color: 'var(--accent-secondary)',
                              border: '1px solid rgba(155, 59, 46, 0.35)',
                              padding: '4px 8px',
                              background: 'rgba(255, 255, 255, 0.85)',
                            }}
                          >
                            Latest
                          </span>
                        ) : null}

                        <time
                          dateTime={exp.year}
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            fontWeight: 800,
                            color: 'var(--accent-primary)',
                            marginBottom: 'var(--space-sm)',
                          }}
                        >
                          {exp.year}
                        </time>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-md)',
                            marginBottom: 'var(--space-md)',
                          }}
                        >
                          {exp.logo ? (
                            <img
                              src={exp.logo}
                              alt={`${exp.title} logo`}
                              style={{
                                width: isMobile ? '44px' : '52px',
                                height: isMobile ? '44px' : '52px',
                                objectFit: 'contain',
                                borderRadius: 6,
                                background: 'white',
                                padding: 4,
                                flexShrink: 0,
                                border: '1px solid var(--border-glow)',
                              }}
                            />
                          ) : null}
                          <h4
                            style={{
                              margin: 0,
                              fontSize: isMobile ? '1.2rem' : 'clamp(1.25rem, 2.2vw, 1.65rem)',
                              fontWeight: 900,
                              lineHeight: 1.2,
                              color: 'var(--text-primary)',
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {exp.title}
                          </h4>
                        </div>

                        <div
                          style={{
                            fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
                            color: 'var(--text-secondary)',
                            lineHeight: isMobile ? 1.65 : 1.72,
                            whiteSpace: 'pre-line',
                            paddingTop: 'var(--space-sm)',
                            borderTop: '1px solid rgba(122, 75, 34, 0.12)',
                          }}
                        >
                          {exp.detail}
                        </div>

                        {(exp.techTags || []).length > 0 ? (
                          <div
                            style={{
                              marginTop: 'var(--space-lg)',
                              paddingTop: 'var(--space-md)',
                              borderTop: '1px dashed var(--border-glow)',
                              fontSize: 'var(--text-xs)',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              fontWeight: 700,
                              color: 'var(--text-muted)',
                            }}
                          >
                            <span style={{ marginRight: 'var(--space-sm)' }}>Topics</span>
                            <span style={{ fontWeight: 500, textTransform: 'none', letterSpacing: 'normal', color: 'var(--text-secondary)' }}>
                              {(exp.techTags || []).join(' · ')}
                            </span>
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
                  }}
                >
                  {cat.items.map((exp, index) => {
                    return (
                      <div
                        key={`${cat.id}-${index}`}
                        id={`experience-${cat.id}-${index}`}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 0,
                          borderBottom: '1px solid var(--border-glow)',
                          padding: isMobile ? 'var(--space-lg) 0' : 'var(--space-xl) 0',
                          backdropFilter: 'none',
                          boxShadow: 'none',
                          transition: 'none',
                          position: 'relative',
                          overflow: 'visible',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-block',
                            background: 'transparent',
                            color: 'var(--accent-primary)',
                            padding: 0,
                            borderRadius: 0,
                            fontSize: 'var(--text-sm)',
                            fontWeight: 700,
                            marginBottom: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
                          }}
                        >
                          {exp.year}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-md)',
                            marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          {exp.logo && (
                            <img
                              src={exp.logo}
                              alt={`${exp.title} logo`}
                              style={{
                                width: isMobile ? '40px' : '50px',
                                height: isMobile ? '40px' : '50px',
                                objectFit: 'contain',
                                borderRadius: 8,
                                background: 'white',
                                padding: 4,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.10)',
                              }}
                            />
                          )}
                          <h3
                            style={{
                              fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-2xl)',
                              color: 'var(--text-primary)',
                              fontWeight: 700,
                              margin: 0,
                              lineHeight: 1.3,
                              transition: 'none',
                            }}
                          >
                            {exp.title}
                          </h3>
                        </div>

                        <div
                          style={{
                            fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
                            color: 'var(--text-secondary)',
                            lineHeight: isMobile ? 1.6 : 1.7,
                            whiteSpace: 'pre-line',
                            transition: 'color 0.2s ease',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          {exp.detail}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--space-sm)',
                            marginTop: 'var(--space-lg)',
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          {(exp.techTags || []).map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              style={{
                                fontSize: 'var(--text-sm)',
                                color: 'var(--accent-primary)',
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                borderRadius: 0,
                                fontWeight: 500,
                                transition: 'none',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradExp;
