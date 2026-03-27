'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon } from './GithubIcon';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: '/docs/introduction' },
    { name: 'Tutorials', href: '#' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight">NSB</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href="https://github.com/Jetshree/nsb"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
            >
              <GithubIcon size={16} />
              Star on GitHub
            </a>
          </div>

          {/* Mobile menu and theme toggle */}
          <div className="md:hidden flex items-center space-x-1">
            {pathname.startsWith('/docs') && (
              <button
                onClick={() => window.dispatchEvent(new Event('toggle-docs-sidebar'))}
                className="flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 shadow-sm text-xs font-semibold hover:bg-primary/90 transition-colors"
                title="Open Docs Menu"
              >
                Docs
              </button>
            )}
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b absolute top-16 left-0 right-0 py-8 px-4 space-y-4 flex flex-col items-center shadow-2xl z-50"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`w-full text-center py-2 text-base font-medium rounded-md transition-colors ${
                isActive(link.href) ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 w-full flex flex-col space-y-3">
            <a
              href="https://github.com/Jetshree/nsb"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <GithubIcon size={18} />
              Star on GitHub
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
