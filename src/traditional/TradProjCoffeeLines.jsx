import React, { useEffect, useMemo, useState } from 'react';
import { top10Projects } from '../pages/ProjectsData';

const categoryOptions = ['All', 'AI & Systems', 'Research', 'Hackathon', 'Full Stack'];

const MOBILE_LIST_CAP = 5;

const TradProjCoffeeLines = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [pendingProjectTitle, setPendingProjectTitle] = useState('');
  const [mobileListExpanded, setMobileListExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleSelectProject = (event) => {
      const title = event?.detail?.title;
      if (!title) return;
      setFilter('All');
      setSearchTerm('');
      setPendingProjectTitle(title);
    };

    window.addEventListener('traditional-select-project', handleSelectProject);
    return () => window.removeEventListener('traditional-select-project', handleSelectProject);
  }, []);

  const getTechArray = (proj) => {
    if (!proj) return [];
    if (Array.isArray(proj.techStack)) return proj.techStack;
    if (typeof proj.tech === 'string') {
      return proj.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }
    return [];
  };

  const matchesCategoryFilter = (filterValue, projCategory) => {
    if (filterValue === 'All') return true;
    const cat = String(projCategory || '').toLowerCase();

    if (filterValue === 'AI & Systems') {
      const needles = ['ai', 'ml', 'data engineering', 'systems', 'product', 'extension', 'robotics', 'c++'];
      return needles.some((n) => cat.includes(n));
    }

    if (filterValue === 'Research') {
      return cat.includes('research');
    }

    if (filterValue === 'Hackathon') {
      const needles = ['hackathon', 'game development', 'c++ / game dev'];
      return needles.some((n) => cat.includes(n));
    }

    if (filterValue === 'Full Stack') {
      return cat.includes('full stack');
    }

    return false;
  };

  const getThumbnailPalette = (projCategory) => {
    switch (projCategory) {
      case 'AI / Developer Tools':
        return { bg: '#E8E4FF', text: '#5B4FCF' };
      case 'Research / Simulation':
      case 'Data Engineering':
        return { bg: '#E1F5EE', text: '#0F6E56' };
      case 'Hackathon':
      case 'Robotics / Hackathon':
      case 'C++ / Game Dev':
      case 'Game Development':
        return { bg: '#FEF3E2', text: '#854F0B' };
      case 'Full Stack':
      case 'Full Stack / AI':
        return { bg: '#E6F1FB', text: '#185FA5' };
      case 'ML':
        return { bg: '#FAECE7', text: '#993C1D' };
      case 'Free Lance':
        return { bg: '#F1EFE8', text: '#5F5E5A' };
      default:
        return { bg: '#F1EFE8', text: '#5F5E5A' };
    }
  };

  const getTitleInitials = (title) => {
    const cleaned = String(title || '').replace(/[^a-zA-Z0-9]/g, '');
    const two = cleaned.slice(0, 2).toUpperCase();
    return two || 'PR';
  };

  const filteredProjects = useMemo(() => {
    return top10Projects.filter((proj) => {
      if (proj?.inProgress) return false;
      const matchesFilter = matchesCategoryFilter(filter, proj.category);
      const techs = getTechArray(proj).map((t) => String(t).toLowerCase());
      const matchesSearch =
        searchTerm === '' ||
        techs.some((t) => t.includes(searchTerm.toLowerCase())) ||
        proj.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  const totalVisibleProjects = useMemo(() => {
    return top10Projects.filter((proj) => !proj?.inProgress).length;
  }, []);

  useEffect(() => {
    setSelectedProject(0);
    setMobileListExpanded(false);
  }, [filter]);

  // If the focused project is past the short list (e.g. sidebar pick), show full list on mobile
  useEffect(() => {
    if (!isMobile) return;
    if (filteredProjects.length > MOBILE_LIST_CAP && selectedProject >= MOBILE_LIST_CAP) {
      setMobileListExpanded(true);
    }
  }, [isMobile, selectedProject, filteredProjects.length]);

  useEffect(() => {
    if (!pendingProjectTitle) return;
    const idx = filteredProjects.findIndex((p) => p.title === pendingProjectTitle);
    if (idx >= 0) {
      setSelectedProject(idx);
      setPendingProjectTitle('');
    }
  }, [filteredProjects, pendingProjectTitle]);

  const selected = filteredProjects[selectedProject] || filteredProjects[0];
  const selectedTech = getTechArray(selected);

  const projectsForMobileList =
    isMobile && !mobileListExpanded && filteredProjects.length > MOBILE_LIST_CAP
      ? filteredProjects.slice(0, MOBILE_LIST_CAP)
      : filteredProjects;

  const linkBtnStyle = {
    width: '100%',
    marginTop: 'var(--space-md)',
    padding: 'var(--space-sm) var(--space-md)',
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--text-sm)',
    fontWeight: 700,
    color: 'var(--accent-primary)',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid var(--border-glow)',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const actionBtnStyle = {
    display: 'block',
    width: '100%',
    padding: 'var(--space-sm) var(--space-md)',
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--text-sm)',
    fontWeight: 800,
    color: 'var(--accent-primary)',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid var(--border-glow)',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
  };

  return (
    <section
      id="projects"
      style={{
        padding: 0,
        maxWidth: '100%',
        margin: 0,
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          textAlign: 'left',
          fontSize: isMobile ? 'var(--text-3xl)' : 'var(--text-4xl)',
          marginBottom: 'var(--space-xl)',
          color: 'var(--text-primary)',
          fontWeight: 700,
        }}
      >
        Projects ({totalVisibleProjects})
      </h2>

      {/* Filter + Search */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-lg)',
          borderBottom: '1px solid var(--border-glow)',
          paddingBottom: 'var(--space-lg)',
          marginBottom: 'var(--space-2xl)',
        }}
      >
        {isMobile ? (
          <div style={{ width: '100%' }}>
            <label
              htmlFor="projects-category-select"
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
              id="projects-category-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            {categoryOptions.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `2px solid ${active ? 'var(--accent-primary)' : 'rgba(var(--accent-primary-rgb), 0.25)'}`,
                    padding: 0,
                    cursor: 'pointer',
                    color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: active ? 800 : 600,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div style={{ flex: isMobile ? '0 0 auto' : '0 0 420px', position: 'relative' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by technology or project name..."
            style={{
              width: '100%',
              padding: 'var(--space-md) 0 var(--space-sm) 0',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--border-glow)',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--text-sm)',
            }}
          />
        </div>
      </div>

      {/* Projects split layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
          gap: 0,
        }}
      >
        {/* Left list */}
        <div
          style={{
            paddingRight: isMobile ? 0 : 'var(--space-xl)',
            borderRight: isMobile ? 'none' : '1px solid var(--border-glow)',
            height: isMobile ? 'auto' : '70vh',
            overflowY: isMobile ? 'visible' : 'auto',
          }}
        >
          {filteredProjects.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No matching projects.</div>
          ) : (
            <>
              {(isMobile ? projectsForMobileList : filteredProjects).map((proj, idx) => {
                const active = idx === selectedProject;
                const techShort = getTechArray(proj).slice(0, 3).join(', ');
                const hook = typeof proj?.hook === 'string' ? proj.hook.trim() : '';
                const hasLiveDemo = Boolean(proj?.link && proj.link !== '#');
                const thumbPalette = getThumbnailPalette(proj?.category);
                return (
                  <button
                    key={`${proj.title}-${idx}`}
                    type="button"
                    onClick={() => setSelectedProject(idx)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: 'var(--space-md) 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--border-glow)',
                      cursor: 'pointer',
                      color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-family-primary)',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 'var(--space-md)', alignItems: 'center' }}>
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 8,
                          overflow: 'hidden',
                          border: '1px solid var(--border-glow)',
                          background: 'rgba(255, 255, 255, 0.35)',
                          flex: '0 0 auto',
                        }}
                      >
                        {proj.image ? (
                          <img
                            src={proj.image}
                            alt={proj.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: thumbPalette.bg,
                              color: thumbPalette.text,
                              fontWeight: 500,
                              fontSize: 16,
                              letterSpacing: '0.02em',
                            }}
                          >
                            {getTitleInitials(proj.title)}
                          </div>
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: active ? 900 : 700,
                              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
                              color: active ? 'var(--accent-primary)' : 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              minWidth: 0,
                            }}
                          >
                            {proj.title}
                          </div>

                          {proj.award ? (
                            <span
                              style={{
                                background: '#FEF3E2',
                                color: '#854F0B',
                                fontSize: 10,
                                padding: '2px 6px',
                                borderRadius: 3,
                                fontWeight: 800,
                                flex: '0 0 auto',
                              }}
                            >
                              🏆 Award
                            </span>
                          ) : null}

                          {proj.featured === true ? (
                            <span
                              style={{
                                background: '#E8E4FF',
                                color: '#5B4FCF',
                                fontSize: 10,
                                padding: '2px 6px',
                                borderRadius: 3,
                                fontWeight: 800,
                                flex: '0 0 auto',
                              }}
                            >
                              Featured
                            </span>
                          ) : null}

                          {hasLiveDemo ? (
                            <span
                              title="Live demo available"
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: 999,
                                background: '#639922',
                                display: 'inline-block',
                                flex: '0 0 auto',
                              }}
                            />
                          ) : null}
                        </div>

                        {hook ? (
                          <div style={{ marginTop: 'var(--space-xs)', fontSize: 12, color: 'var(--text-secondary)' }}>{hook}</div>
                        ) : null}

                        <div style={{ marginTop: 'var(--space-xs)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                          {proj.date}
                          {techShort ? ` · ${techShort}` : ''}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              {isMobile && filteredProjects.length > MOBILE_LIST_CAP && !mobileListExpanded ? (
                <button type="button" onClick={() => setMobileListExpanded(true)} style={linkBtnStyle}>
                  Show all {filteredProjects.length} projects
                </button>
              ) : null}
              {isMobile && filteredProjects.length > MOBILE_LIST_CAP && mobileListExpanded && selectedProject < MOBILE_LIST_CAP ? (
                <button type="button" onClick={() => setMobileListExpanded(false)} style={linkBtnStyle}>
                  Show top {MOBILE_LIST_CAP} only
                </button>
              ) : null}
            </>
          )}
        </div>

        {/* Right detail */}
        <div style={{ paddingLeft: isMobile ? 0 : 'var(--space-xl)', paddingTop: 'var(--space-lg)' }}>
          {selected ? (
            <>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  style={{
                    width: '100%',
                    maxHeight: 240,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 20,
                  }}
                />
              ) : null}

              <div style={{ color: 'var(--text-primary)', fontSize: isMobile ? 'var(--text-3xl)' : 'var(--text-4xl)', fontWeight: 900 }}>
                {selected.title}
              </div>

              {selected.hook ? (
                <div style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 'var(--space-sm)', marginBottom: 12 }}>
                  {selected.hook}
                </div>
              ) : null}

              <div style={{ color: 'var(--accent-primary)', fontWeight: 800, marginTop: 'var(--space-md)' }}>{selected.date}</div>

              {selected.award ? (
                <div
                  style={{
                    marginTop: 'var(--space-sm)',
                    background: '#FEF3E2',
                    color: '#854F0B',
                    padding: '6px 12px',
                    borderRadius: 4,
                    fontSize: 13,
                    display: 'inline-block',
                    fontWeight: 800,
                  }}
                >
                  🏆 {selected.award}
                </div>
              ) : null}

              <div style={{ color: 'var(--text-secondary)', lineHeight: isMobile ? 1.7 : 1.8, fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)', marginTop: 'var(--space-xl)' }}>
                {selected.description}
              </div>

              <div style={{ marginTop: 'var(--space-xl)', borderTop: '1px solid var(--border-glow)', paddingTop: 'var(--space-lg)' }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 900, marginBottom: 'var(--space-sm)' }}>Tech Stack</div>
                <div style={{ color: 'var(--text-secondary)' }}>{selectedTech.length ? selectedTech.join(', ') : '—'}</div>
              </div>

              {selected.link && selected.link !== '#' && selected.git && selected.git !== '#' ? (
                <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', flexDirection: isMobile ? 'column' : 'row' }}>
                  <a href={selected.link} target="_blank" rel="noreferrer" style={{ ...actionBtnStyle, flex: 1 }}>
                    Demo →
                  </a>
                  <a href={selected.git} target="_blank" rel="noreferrer" style={{ ...actionBtnStyle, flex: 1 }}>
                    GitHub →
                  </a>
                </div>
              ) : selected.link && selected.link !== '#' ? (
                <div style={{ marginTop: 'var(--space-xl)' }}>
                  <a href={selected.link} target="_blank" rel="noreferrer" style={actionBtnStyle}>
                    Demo →
                  </a>
                </div>
              ) : selected.git && selected.git !== '#' ? (
                <div style={{ marginTop: 'var(--space-xl)' }}>
                  <a href={selected.git} target="_blank" rel="noreferrer" style={actionBtnStyle}>
                    GitHub →
                  </a>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TradProjCoffeeLines;

