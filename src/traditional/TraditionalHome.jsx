import React, { useEffect, useRef, useState } from 'react';
import Resume from './TradResume';
import Certifications from './TradCert';
import Projects from './TradProjCoffeeLines';
import Experience, { professionalExperience, founderJourney, freelanceWork, openSource } from './TradExp';
import FloatingIcons from '../components/FloatingIcons';
import styles from './TraditionalHome.module.css';
import chibiNaruto from './ChibiB.jpg';
import rhythmPhoto from '../assets/rhythm-photo.jpg';
import LogosBelt from './LogosBelt';
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
    { id: 'opensource', label: 'Open Source / Research', items: openSource },
  ];

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
              Projects
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
                    {top10Projects.map((proj, idx) => (
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

          {/* Continuous logo showcase below the resume section */}
          <div className={styles.sidebarLogosWrap}>
            <LogosBelt variant="sidebar" />
          </div>
        </aside>

        {/* Scrollable content (75%) */}
        <div ref={contentScrollRef} className={styles.contentScroll}>
          <div className={styles.rightTopBar}>Rhythm Chawla</div>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={`${styles.heroGrid} ${styles.heroGridSolo}`}>
                <div className={styles.heroImage}>
                  <div className={styles.imagePlaceholder}>
                    <img
                      src={rhythmPhoto}
                      alt="Rhythm Chawla"
                      className={styles.profileImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const next = e.target.nextElementSibling;
                        if (next) next.style.display = 'flex';
                      }}
                    />
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
            <p>&copy; 2025 Rhythm Chawla. All rights reserved.</p>
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

      {/* Floating Social Icons */}
      <FloatingIcons />
    </div>
  );
};

export default TraditionalHome;