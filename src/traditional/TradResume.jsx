import React, { useState, useEffect, useMemo } from 'react';
import resumeLatexRaw from './resumeLatex.txt?raw';

const TradResume = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const latexToReadableResume = useMemo(() => {
    const latex = String(resumeLatexRaw || '');

    const readBalancedBraces = (str, openIndex) => {
      // openIndex should point at `{`
      let depth = 0;
      for (let i = openIndex; i < str.length; i += 1) {
        const ch = str[i];
        if (ch === '{') depth += 1;
        if (ch === '}') depth -= 1;
        if (depth === 0) {
          return { content: str.slice(openIndex + 1, i), endIndex: i + 1 };
        }
      }
      return { content: str.slice(openIndex + 1), endIndex: str.length };
    };

    const skipWs = (str, idx) => {
      let i = idx;
      while (i < str.length && /\s/.test(str[i])) i += 1;
      return i;
    };

    const sanitizeInline = (text) => {
      let t = String(text || '');
      t = t.replace(/\r\n/g, '\n');

      // Symbols / simple commands
      t = t.replace(/\\\;/g, ' ');
      t = t.replace(/\\\,/g, ' ');
      t = t.replace(/\\&/g, '&');
      t = t.replace(/\$\|\$/g, '|');
      t = t.replace(/\\\(\s*\\sim\s*\\\)/g, '~');
      t = t.replace(/\\rightarrow/g, '->');
      t = t.replace(/\\%/g, '%');

      // Inline formatting with braces: keep inner content
      t = t.replace(/\\textbf\{([^}]*)\}/g, '$1');
      t = t.replace(/\\textit\{([^}]*)\}/g, '$1');
      t = t.replace(/\\emph\{([^}]*)\}/g, '$1');
      t = t.replace(/\\texttt\{([^}]*)\}/g, '$1');

      // Hyperlinks: \href{url}{text} -> text
      t = t.replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1');

      // Inline math wrappers: best-effort
      t = t.replace(/\\\(([^)]*)\\\)/g, '$1');
      t = t.replace(/\$([^$]+)\$/g, '$1');

      // Remove leftover commands
      t = t.replace(/\\[a-zA-Z]+\*?/g, '');

      // Clean up braces and whitespace (preserve newlines)
      t = t.replace(/[{}]/g, '');
      t = t.replace(/[ \t]+/g, ' ');
      t = t.replace(/\n{3,}/g, '\n\n');
      t = t.trim();
      return t;
    };

    const extractBody = (latexStr) => {
      const start = latexStr.indexOf('\\begin{document}');
      const end = latexStr.lastIndexOf('\\end{document}');
      if (start !== -1 && end !== -1 && end > start) {
        return latexStr.slice(start + '\\begin{document}'.length, end);
      }
      return latexStr;
    };

    const body = extractBody(latex);

    // Header: extract center block
    const headerMatch = body.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/);
    const headerRaw = headerMatch ? headerMatch[1] : '';
    const headerText = sanitizeInline(headerRaw.replace(/\\\\/g, '\n').replace(/\\vspace\{[^}]*\}/g, ''));

    // Collect sections by scanning for `\section{...}`
    const sections = [];
    let scanIdx = 0;
    while (scanIdx < body.length) {
      const marker = body.indexOf('\\section{', scanIdx);
      if (marker === -1) break;

      const titleBraceIndex = marker + '\\section{'.length - 1; // points at `{`
      const titleRead = readBalancedBraces(body, titleBraceIndex);
      const sectionTitle = sanitizeInline(titleRead.content);

      const contentStart = titleRead.endIndex;
      const nextMarker = body.indexOf('\\section{', contentStart);
      const sectionContentEnd = nextMarker === -1 ? body.length : nextMarker;
      const sectionContent = body.slice(contentStart, sectionContentEnd);

      sections.push({ title: sectionTitle, content: sectionContent });
      scanIdx = sectionContentEnd;
    }

    const renderSections = sections.map((sec) => {
      const lines = [];
      const content = sec.content;
      let i = 0;

      const pushLine = (line) => {
        const clean = sanitizeInline(line);
        if (!clean) return;
        lines.push(clean);
      };

      const pushRawLine = (line) => {
        const clean = sanitizeInline(String(line || ''));
        if (!clean) return;
        lines.push(clean);
      };

      while (i < content.length) {
        if (/\s/.test(content[i])) {
          i += 1;
          continue;
        }

        if (content.startsWith('\\resumeSubheadingNoDate', i)) {
          i += '\\resumeSubheadingNoDate'.length;
          i = skipWs(content, i);
          if (content[i] !== '{') continue;
          const a1 = readBalancedBraces(content, i);
          i = a1.endIndex;
          i = skipWs(content, i);
          if (content[i] !== '{') continue;
          const a2 = readBalancedBraces(content, i);
          i = a2.endIndex;

          pushRawLine(a1.content);
          pushRawLine(a2.content);
          continue;
        }

        if (content.startsWith('\\resumeSubheading', i)) {
          i += '\\resumeSubheading'.length;
          const args = [];
          for (let k = 0; k < 5; k += 1) {
            i = skipWs(content, i);
            if (content[i] !== '{') break;
            const arg = readBalancedBraces(content, i);
            args.push(arg.content);
            i = arg.endIndex;
          }
          if (args.length === 5) {
            const [role, dates, company, tech, location] = args;
            pushLine(role);
            pushRawLine(`${dates} | ${company} | ${location}`);
            pushRawLine(tech);
          }
          continue;
        }

        if (content.startsWith('\\resumeItem', i)) {
          i += '\\resumeItem'.length;
          i = skipWs(content, i);
          if (content[i] !== '{') continue;
          const it = readBalancedBraces(content, i);
          i = it.endIndex;
          lines.push(`- ${sanitizeInline(it.content)}`);
          continue;
        }

        // Technical skills itemize: \item <text>
        if (content.startsWith('\\item', i)) {
          i += '\\item'.length;
          const nextItem = content.indexOf('\\item', i);
          const end = nextItem === -1 ? content.length : nextItem;
          const chunk = content.slice(i, end);
          // Stop if we hit an environment end marker
          const envEndIdx = chunk.indexOf('\\end{itemize}');
          const slice = envEndIdx === -1 ? chunk : chunk.slice(0, envEndIdx);
          const clean = sanitizeInline(slice);
          if (clean) lines.push(`- ${clean}`);
          i = end;
          continue;
        }

        // Skip scaffolding blocks / other environments
        if (
          content.startsWith('\\resumeItemListStart', i) ||
          content.startsWith('\\resumeItemListEnd', i) ||
          content.startsWith('\\resumeSubHeadingListStart', i) ||
          content.startsWith('\\resumeSubHeadingListEnd', i) ||
          content.startsWith('\\begin{itemize', i) ||
          content.startsWith('\\end{itemize', i) ||
          content.startsWith('\\small', i) ||
          content.startsWith('\\normalfont', i) ||
          content.startsWith('\\vspace', i) ||
          content.startsWith('\\raggedright', i) ||
          content.startsWith('\\scshape', i) ||
          content.startsWith('\\Huge', i) ||
          content.startsWith('\\large', i) ||
          content.startsWith('\\pdfgentounicode', i) ||
          content.startsWith('\\input', i)
        ) {
          // Advance by skipping the command name, then a bit of whitespace
          const nextWs = content.slice(i).search(/\s/);
          i = nextWs === -1 ? content.length : i + nextWs + 1;
          continue;
        }

        // Unknown: skip ahead one char
        i += 1;
      }

      // Remove consecutive duplicates
      const deduped = [];
      for (let j = 0; j < lines.length; j += 1) {
        if (j > 0 && lines[j] === lines[j - 1] && lines[j]) continue;
        deduped.push(lines[j]);
      }

      return { title: sec.title, lines: deduped };
    });

    return { headerText, renderSections };
  }, []);

  return (
    <section
      id="resume"
      style={{
        padding: isMobile ? 'var(--space-xl) var(--space-md)' : 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
        flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
      }}>
        <a
          id="resume-download"
          href="/resumes/resume.pdf"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.04em',
            padding: isMobile ? 'var(--space-md) var(--space-xl)' : 'var(--space-sm) var(--space-xl)',
            background: 'transparent',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: isMobile ? 'var(--text-base)' : 'var(--text-base)',
            width: isMobile ? '200px' : 'auto',
            borderRadius: 0,
            border: '1px solid var(--border-glow)',
            borderBottom: '2px solid var(--accent-primary)',
            boxShadow: 'none',
            transition: 'color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.color = 'var(--accent-secondary)';
            e.currentTarget.style.borderColor = 'rgba(var(--accent-primary-rgb), 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.borderColor = 'var(--border-glow)';
          }}
        >
          Open Resume PDF
        </a>
      </div>
    </section>
  );
};

export default TradResume;
