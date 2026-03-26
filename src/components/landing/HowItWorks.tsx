'use client';

import React from 'react';
import { ShineBorder, Timeline } from '@/components/ui/shine-border';

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-foreground mb-4 tracking-tight">How NSB Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            A seamless bridge between high-level application logic and low-level 
            network simulation primitives.
          </p>
        </div>

        <div className="relative">
          <ShineBorder
            borderWidth={2}
            duration={10}
            className="w-full border-none shadow-2xl p-8 md:p-12 overflow-visible"
            color={["#FF007F", "#39FF14", "#00FFFF"]}
          >
            <div className="w-full py-4">
              <Timeline />
            </div>
          </ShineBorder>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
