'use client';

import React from 'react';
import { Target, Car, Blocks, Rocket, Shield, HardDrive } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Multi-Language Support",
      desc: "Full feature parity between Python and C++ client libraries.",
      icon: <Blocks className="w-12 h-12 text-primary" />,
    },
    {
      title: "Real-time Processing",
      desc: "Low-overhead message passing with high-throughput Redis backing.",
      icon: <Rocket className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Extensible Core",
      desc: "Modular architecture to support new simulators and application types.",
      icon: <HardDrive className="w-12 h-12 text-emerald-500" />,
    },
  ];

  const useCases = [
    {
      title: "Autonomous Vehicles",
      desc: "Model V2V and V2X communication in large-scale simulation worlds.",
      icon: <Car className="w-8 h-8 text-primary" />,
    },
    {
      title: "Distributed Systems",
      desc: "Simulate real-world network failures and latencies in cluster environments.",
      icon: <Target className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Federated Learning",
      desc: "Model decentralized training across varying network topologies.",
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all group">
              <div className="mb-6 p-4 bg-muted/50 rounded-2xl w-fit group-hover:bg-primary/5 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="bg-primary/5 py-12 px-8 rounded-[40px] border border-primary/10">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Use Cases</h3>
            <h2 className="text-4xl font-extrabold">Where NSB Shines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="glass p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="mb-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-full shadow-sm">
                  {useCase.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{useCase.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {useCase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
