import React, { useEffect, useMemo, useState } from 'react';
import { top10Projects } from '../pages/ProjectsData';

const categoryOptions = ['All', 'Hackathon', 'Free Lance', 'Open Source', 'Full Stack', 'ML'];

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

  const filteredProjects = useMemo(() => {
    return top10Projects.filter((proj) => {
      const matchesFilter = filter === 'All' || proj.category === filter;
      const techs = getTechArray(proj).map((t) => String(t).toLowerCase());
      const matchesSearch =
        searchTerm === '' ||
        techs.some((t) => t.includes(searchTerm.toLowerCase())) ||
        proj.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

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
        Projects
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
                    <div style={{ fontWeight: active ? 900 : 700, fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)' }}>
                      {proj.title}
                    </div>
                    <div style={{ marginTop: 'var(--space-xs)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      {proj.date} {techShort ? `• ${techShort}` : ''}
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
                    maxHeight: 220,
                    objectFit: 'contain',
                    border: '1px solid var(--border-glow)',
                    marginBottom: 'var(--space-xl)',
                  }}
                />
              ) : null}

              <div style={{ color: 'var(--text-primary)', fontSize: isMobile ? 'var(--text-3xl)' : 'var(--text-4xl)', fontWeight: 900 }}>
                {selected.title}
              </div>

              <div style={{ color: 'var(--accent-primary)', fontWeight: 800, marginTop: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                {selected.date}
              </div>

              <div style={{ color: 'var(--text-secondary)', lineHeight: isMobile ? 1.7 : 1.8, fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)' }}>
                {selected.description}
              </div>

              <div style={{ marginTop: 'var(--space-xl)', borderTop: '1px solid var(--border-glow)', paddingTop: 'var(--space-lg)' }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 900, marginBottom: 'var(--space-sm)' }}>Tech Stack</div>
                <div style={{ color: 'var(--text-secondary)' }}>{selectedTech.length ? selectedTech.join(', ') : '—'}</div>
              </div>

              <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
                {selected.link && selected.link !== '#' ? (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontWeight: 800 }}
                  >
                    Demo →
                  </a>
                ) : null}
                {selected.git && selected.git !== '#' ? (
                  <a
                    href={selected.git}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontWeight: 800 }}
                  >
                    GitHub →
                  </a>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TradProjCoffeeLines;

