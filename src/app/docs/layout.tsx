import React from 'react';
import Navbar from '@/components/common/Navbar';
import { DocsSidebarDesktop, DocsSidebarMobile } from '@/components/docs/DocsSidebar';
import { TableOfContents } from '@/components/docs/TableOfContents';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Mobile drawer navigation */}
      <DocsSidebarMobile />

      <div className="max-w-screen-xl mx-auto flex pt-[72px]">
        {/* Left Sidebar */}
        <DocsSidebarDesktop />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 md:px-10 xl:px-16 py-12">
          {children}
        </main>

        {/* Right "On This Page" sidebar */}
        <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto py-10 pl-4">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
