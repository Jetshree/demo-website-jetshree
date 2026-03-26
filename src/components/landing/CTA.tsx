'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-primary text-white">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-400 opacity-20 blur-[150px] pointer-events-none -z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to Connect Your System?</h2>
        <p className="max-w-xl mx-auto text-white/80 text-lg mb-12">
          Join the UC Santa Cruz open-source ecosystem and start bridging your 
          complex applications with professional network simulators today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/docs/introduction"
            className="flex items-center px-10 py-5 bg-white text-primary font-bold rounded-full hover:bg-slate-50 transition-all shadow-xl shadow-black/20 group"
          >
            Explore Documentation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="mailto:jetshreesharma@gmail.com"
            className="flex items-center px-10 py-5 bg-primary-foreground/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/5 transition-all"
          >
            <Mail className="mr-2" />
            Contact Dev Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
