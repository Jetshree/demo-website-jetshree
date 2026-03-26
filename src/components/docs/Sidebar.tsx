'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Book, Layout, Settings, Terminal, PlayCircle } from 'lucide-react';

interface SidebarItemProps {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const sidebarItems: SidebarItemProps[] = [
  { name: 'Introduction', href: '/docs/introduction', icon: <Book size={18} /> },
  { name: 'Installation', href: '/docs/installation', icon: <Settings size={18} /> },
  { name: 'Basic Usage', href: '/docs/usage', icon: <PlayCircle size={18} /> },
  { name: 'Configuration', href: '/docs/configuration', icon: <Layout size={18} /> },
  { name: 'Running', href: '/docs/running', icon: <Terminal size={18} /> },
];

const DocsSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-8 custom-scrollbar">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 pl-4">
          Getting Started
        </h4>
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center group px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
              pathname === item.href
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <span className={`mr-3 transition-colors ${pathname === item.href ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
              {item.icon}
            </span>
            <span className="flex-1">{item.name}</span>
            {pathname === item.href && (
              <ChevronRight size={14} className="text-primary animate-in fade-in slide-in-from-left-1" />
            )}
          </Link>
        ))}
      </div>
      
      <div className="mt-10 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
        <h5 className="text-xs font-bold text-primary uppercase mb-2">Need help?</h5>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Stuck with the setup? Join our discord community for support.
        </p>
      </div>
    </aside>
  );
};

export default DocsSidebar;
