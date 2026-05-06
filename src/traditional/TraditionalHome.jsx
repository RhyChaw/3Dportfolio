import React, { useEffect, useRef, useState } from 'react';
import Resume from './TradResume';
import Certifications from './TradCert';
import Projects from './TradProjCoffeeLines';
import Experience, { professionalExperience, founderJourney, freelanceWork, openSource } from './TradExp';
import styles from './TraditionalHome.module.css';
import chibiNaruto from './ChibiB.jpg';
import rhythmPhoto from '../assets/rhythm-photo.jpg';
import { top10Projects } from '../pages/ProjectsData';

const TraditionalHome = () => {
  const contentScrollRef = useRef(null);
  const [openSection, setOpenSection] = useState('experience');
  const [openExperienceCategory, setOpenExperienceCategory] = useState('');
  const [openProjectsList, setOpenProjectsList] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const experienceCategories = [
    { id: 'professional', label: 'Engineering', items: professionalExperience },
    { id: 'founder', label: 'Founder', items: founderJourney },
    { id: 'freelance', label: 'Freelance', items: freelanceWork },
    { id: 'opensource', label: 'Research', items: openSource },
  ];

  const visibleProjects = top10Projects.filter((p) => !p?.inProgress);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    const scroller = contentScrollRef.current;
    if (!el || !scroller) return;

    const topBar = isMobile ? 56 : 0;
    const elTop = el.getBoundingClientRect().top;
    const scrollTop = scroller.scrollTop + elTop - topBar - 8;
    scroller.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });

    if (isMobile) setIsMobileMenuOpen(false);
  };

  const selectProjectFromSidebar = (projectTitle) => {
    scrollToId('projects');
    window.dispatchEvent(
      new CustomEvent('traditional-select-project', {
        detail: { title: projectTitle },
      })
    );
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      {isMobile && (
        <div className={styles.mobileTopBar}>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <span className={styles.mobileTopBarTitle}>Rhythm Chawla</span>
        </div>
      )}

      {isMobile && isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={styles.splitLayout}>
        {/* Creme sidebar (25%) */}
        <aside
          className={`${styles.sidebar} ${isMobile && isMobileMenuOpen ? styles.sidebarMobileOpen : ''}`}
          aria-hidden={isMobile && !isMobileMenuOpen}
        >
          <div className={styles.sidebarSection}>
            <button
              type="button"
              className={
                openSection === 'experience'
                  ? styles.sidebarTopButton + ' ' + styles.sidebarTopButtonActive
                  : styles.sidebarTopButton
              }
              onClick={() => setOpenSection(openSection === 'experience' ? '' : 'experience')}
            >
              Experience
            </button>
            {openSection === 'experience' && (
              <div className={styles.sidebarSubList}>
                <button
                  type="button"
                  className={styles.sidebarSubButton}
                  onClick={() => scrollToId('experience')}
                >
                  All Experience
                </button>
                {experienceCategories.map((cat) => {
                  const isOpen = openExperienceCategory === cat.id;
                  return (
                    <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button
                        type="button"
                        className={styles.sidebarSubButton}
                        onClick={() => setOpenExperienceCategory(isOpen ? '' : cat.id)}
                      >
                        {cat.label}
                      </button>
                      {isOpen && (
                        <div className={styles.sidebarNestedList}>
                          {cat.items.map((exp, idx) => (
                            <button
                              key={`${cat.id}-${idx}`}
                              type="button"
                              className={styles.sidebarNestedButton}
                              onClick={() => scrollToId(`experience-${cat.id}-${idx}`)}
                            >
                              {exp.title.split('|')[0].trim()}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.sidebarSection}>
            <button
              type="button"
              className={
                openSection === 'projects'
                  ? styles.sidebarTopButton + ' ' + styles.sidebarTopButtonActive
                  : styles.sidebarTopButton
              }
              onClick={() => setOpenSection(openSection === 'projects' ? '' : 'projects')}
            >
              Projects ({visibleProjects.length})
            </button>
            {openSection === 'projects' && (
              <div className={styles.sidebarSubList}>
                <button
                  type="button"
                  className={styles.sidebarSubButton}
                  onClick={() => setOpenProjectsList((v) => !v)}
                >
                  All Projects
                </button>
                {openProjectsList && (
                  <div className={styles.sidebarNestedList}>
                    {visibleProjects.map((proj, idx) => (
                      <button
                        key={`${proj.title}-${idx}`}
                        type="button"
                        className={styles.sidebarNestedButton}
                        onClick={() => selectProjectFromSidebar(proj.title)}
                      >
                        {proj.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.sidebarSection}>
            <button
              type="button"
              className={
                openSection === 'certifications'
                  ? styles.sidebarTopButton + ' ' + styles.sidebarTopButtonActive
                  : styles.sidebarTopButton
              }
              onClick={() => setOpenSection(openSection === 'certifications' ? '' : 'certifications')}
            >
              Certifications
            </button>
            {openSection === 'certifications' && (
              <div className={styles.sidebarSubList}>
                <button
                  type="button"
                  className={styles.sidebarSubButton}
                  onClick={() => scrollToId('certifications')}
                >
                  View
                </button>
              </div>
            )}
          </div>

          <div className={styles.sidebarSection}>
            <a
              href="/resumes/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={styles.sidebarTopButton}
              style={{ textDecoration: 'none' }}
            >
              Resume
            </a>
          </div>

        </aside>

        {/* Scrollable content (75%) */}
        <div ref={contentScrollRef} className={styles.contentScroll}>
          <div className={styles.rightTopBar}>Rhythm Chawla</div>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 24 : 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 200,
                    borderRadius: 12,
                    overflow: 'hidden',
                    flex: '0 0 auto',
                    background: 'rgba(255, 255, 255, 0.40)',
                    border: '1px solid var(--border-glow)',
                  }}
                >
                  <img
                    src={rhythmPhoto}
                    alt="Rhythm Chawla"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                <div style={{ maxWidth: '420px' }}>
                  <p
                    style={{
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      margin: '0 0 16px',
                      color: 'inherit',
                    }}
                  >
                    Make something people want.
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.8',
                      color: 'rgba(0,0,0,0.6)',
                      margin: '0 0 20px',
                    }}
                  >
                    That's the only question I ask before starting anything.
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.8',
                      color: 'rgba(0,0,0,0.55)',
                      margin: 0,
                    }}
                  >
                    CS at Waterloo (AI + HCI). Built production AI systems at Carta, LLM tooling at Cresta, co-founded G12Uni.
                    Shipped palace-ai, network-mcp, and won Best Prototype at the Google × UWaterloo Symposium. Seeking Fall 2026.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '12px 0',
                      flexWrap: 'wrap',
                      marginTop: 16,
                    }}
                  >
                    {[
                      { label: 'GitHub', href: 'https://github.com/RhyChaw' },
                      { label: 'LinkedIn', href: 'https://linkedin.com/in/rhychaw' },
                      { label: 'Resume', href: '/resumes/resume.pdf' },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: 'rgba(0,0,0,0.45)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = 'rgba(0,0,0,0.8)')}
                        onMouseLeave={(e) => (e.target.style.color = 'rgba(0,0,0,0.45)')}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className={styles.main}>
            <div className={styles.rightSectionFirst}>
              <section id="experience">
                <Experience />
              </section>
            </div>

            <div className={styles.rightSection}>
              <section id="projects">
                <Projects />
              </section>
            </div>

            <div className={styles.rightSection}>
              <section id="certifications">
                <Certifications />
              </section>
            </div>

            <div className={styles.rightSection}>
              <section id="resume">
                <Resume />
              </section>
            </div>
          </main>

          <footer className={styles.footer}>
            <p>&copy; 2026 Rhythm Chawla. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* Floating Chibi Naruto */}
      <a href="/naruto" className={styles.chibiWrapper}>
        <img src={chibiNaruto} alt="Chibi Naruto" className={styles.chibiNaruto} />
        <div className={styles.tooltip}>
          <span>Click to enter 3D World!</span>
        </div>
      </a>
    </div>
  );
};

export default TraditionalHome;