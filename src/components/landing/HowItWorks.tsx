'use client';

import React from 'react';
import { Timeline } from '@/components/ui/shine-border';

const HowItWorks = () => {
  return (
    <section className="pt-24 pb-12 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-foreground mb-4 tracking-tight">How NSB Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            A seamless bridge between high-level application logic and low-level 
            network simulation primitives.
          </p>
        </div>

        <div className="relative w-full pt-4 pb-0">
          <Timeline />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
