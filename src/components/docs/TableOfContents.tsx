'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Wait briefly for MDX content to render
    const timeout = setTimeout(() => {
      const contentEl = document.querySelector('.mdx-content');
      if (!contentEl) return;

      const els = Array.from(contentEl.querySelectorAll('h2, h3')) as HTMLElement[];
      const seen = new Set<string>();
      const parsed: Heading[] = els.map((el) => {
        if (!el.id) {
          const baseId = el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ?? 'heading';
            
          let finalId = baseId;
          let counter = 1;
          while (seen.has(finalId)) {
            finalId = `${baseId}-${counter}`;
            counter++;
          }
          el.id = finalId;
        }
        seen.add(el.id);
        return { id: el.id, text: el.textContent ?? '', level: parseInt(el.tagName[1]) };
      });
      
      setHeadings(parsed);
      setActiveId(parsed[0]?.id || '');

      // Ensure that URL fragment jumps actually execute manually
      // given that standard hash routing is intercepted by React Router/Scroll sometimes.
      if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        const target = document.getElementById(hashId);
        if (target) {
          target.scrollIntoView();
          setActiveId(hashId);
        }
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? '12px' : '0px' }}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm py-0.5 transition-colors border-l-2 pl-3 leading-snug',
                activeId === heading.id
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-border space-y-2">
        <a
          href="#"
          className="block text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          ↑ Scroll to top
        </a>
      </div>
    </nav>
  );
}
