'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { GithubIcon } from './GithubIcon';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">NSB</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Network Simulation Bridge (NSB) connects your applications to 
              state-of-the-art network simulators like ns-3 and OMNeT++.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/Jetshree/nsb" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon size={20} />
              </a>
              <a href="mailto:jetshreesharma@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Docs Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Documentation</h4>
            <ul className="space-y-2">
              <li><Link href="/docs/introduction" className="text-sm text-muted-foreground hover:text-primary transition-colors">Introduction</Link></li>
              <li><Link href="/docs/installation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Installation</Link></li>
              <li><Link href="/docs/usage" className="text-sm text-muted-foreground hover:text-primary transition-colors">Basic Usage</Link></li>
              <li><Link href="/docs/configuration" className="text-sm text-muted-foreground hover:text-primary transition-colors">Configuration</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Use Cases</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Publication</Link></li>
            </ul>
          </div>

          {/* Organization */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Affiliation</h4>
            <p className="text-sm text-muted-foreground">
              University of California, <br />
              Santa Cruz (UCSC)
            </p>
            <p className="text-sm text-muted-foreground">
              Inter-Networking Research Group <br />
              (INRG)
            </p>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UC Santa Cruz. Licensed under BSD.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
