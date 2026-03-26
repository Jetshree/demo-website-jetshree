'use client';

import React from 'react';
import Link from 'next/link';
import { Network, GitBranch, Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden border-b">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/15 transition-all"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Beta Version Available
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Bridge Applications with <br />
            <span className="gradient-text">Network Simulators</span>
          </motion.h1>

          {/* Subheader */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl text-xl text-muted-foreground leading-relaxed"
          >
            NSB connects your applications directly to simulators like ns-3 and OMNeT++. 
            A professional, low-overhead bridge designed for high-performance 
            simulation workflows.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              href="/docs/introduction"
              className="flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group"
            >
              Get Started
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/uc-ospo/nsb" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                <GitBranch className="w-5 h-5" />
                <span>Star on GitHub</span>
              </a>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-5xl mt-12 overflow-hidden rounded-2xl border shadow-2xl glass p-1 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center min-h-[400px]"
          >
             <div className="flex flex-col items-center justify-center space-y-8 w-full py-16">
                 {/* Architecture Visual */}
                 <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 w-full mb-8">
                     <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-xl border shadow-sm w-48 transition-transform hover:-translate-y-1">
                         <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                             <div className="w-6 h-6 border-2 border-blue-600 rounded" />
                         </div>
                         <span className="font-semibold text-sm">Application</span>
                         <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Python / C++</span>
                     </div>
                     <ArrowRight size={24} className="text-muted-foreground animate-pulse rotate-90 md:rotate-0" />
                     <div className="flex flex-col items-center p-6 bg-primary text-white rounded-xl shadow-xl w-56 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <Network size={32} className="mb-3" />
                         <span className="font-bold">NSB Daemon</span>
                         <span className="text-[10px] opacity-80 uppercase tracking-wider mt-1">Message Bridge</span>
                     </div>
                     <ArrowRight size={24} className="text-muted-foreground animate-pulse rotate-90 md:rotate-0" />
                     <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-xl border shadow-sm w-48 transition-transform hover:-translate-y-1">
                         <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                             <div className="w-6 h-6 border-2 border-emerald-600 rounded-full" />
                         </div>
                         <span className="font-semibold text-sm">Simulator</span>
                         <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">ns-3 / OMNeT++</span>
                     </div>
                 </div>
                 
                 <div className="px-6 py-2 bg-muted/50 rounded-full border text-xs font-mono text-muted-foreground tracking-tighter">
                   $ ./nsb_daemon config.yaml
                 </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
