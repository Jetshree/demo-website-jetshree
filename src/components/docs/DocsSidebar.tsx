'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Learn NSB',
    items: [
      { title: 'Basic Usage', href: '/docs/usage' },
      { title: 'Configuration', href: '/docs/configuration' },
      { title: 'Running', href: '/docs/running' },
    ],
  },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="w-full">
      {navigation.map((section) => (
        <div key={section.title} className="mb-8">
          <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-3">
            {section.title}
          </h5>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-150',
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium'
                    )}
                  >
                    <span>{item.title}</span>
                    {isActive && (
                      <ChevronRight size={14} className="text-primary flex-shrink-0" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Community card at bottom */}
      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-xs font-bold text-primary mb-1">Community</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Have a question? Join our GitHub Discussions.
        </p>
        <a
          href="https://github.com/Jetshree/nsb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary hover:underline"
        >
          GitHub Discussions →
        </a>
      </div>
    </div>
  );
}

export function DocsSidebarDesktop() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:block w-60 xl:w-64 flex-shrink-0 sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto py-8 pr-4 border-r border-border">
      <SidebarContent pathname={pathname} />
    </aside>
  );
}

export function DocsSidebarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setOpen(prev => !prev);
    window.addEventListener('toggle-docs-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-docs-sidebar', handleToggle);
  }, []);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-background shadow-2xl py-8 px-6 transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-lg text-foreground">NSB Docs</span>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        <SidebarContent pathname={pathname} />
      </div>
    </>
  );
}
