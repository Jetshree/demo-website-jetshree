"use client";

import React, { lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/common/GithubIcon";

// Use lazy loading for Spline as it's a heavy component
const Spline = lazy(() => import("@splinetool/react-spline"));

const StripeHero = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col pt-32 pb-24 md:pt-48 md:pb-32 bg-background">
            {/* Background Spline Canvas — Stripe Style */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,100%_40%,0_80%)] md:[clip-path:polygon(0_0,100%_0,100%_15%,0_60%)] overflow-hidden">
                    <Suspense fallback={<div className="w-full h-full bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
                        <Spline
                            scene="https://prod.spline.design/TUFzW6NrUlVBSDUk/scene.splinecode"
                            className="w-full h-full scale-125 md:scale-100 origin-top"
                        />
                    </Suspense>
                    {/* Dark Mode Overlay for Background */}
                    <div className="absolute inset-0 bg-background/10 dark:bg-background/10 pointer-events-none" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-8 items-start justify-center">

                {/* Text Content */}
                <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-12">
                    {/* Title Blend Area */}
                    <div className="flex flex-col space-y-2 mix-blend-multiply dark:mix-blend-lighten pointer-events-none">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground/80">
                            Network
                        </h1>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground/80">
                            Simulation
                        </h1>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground/80">
                            Bridge
                        </h1>
                    </div>

                    <div className="max-w-xl space-y-8">
                        <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
                            Millions of data packets flow through NSB's high-performance
                            pipeline, bridging high-level app logic with realistic network
                            simulation primitives.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="/docs/introduction">
                                <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-extrabold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                                    Start Exploring
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <a
                                href="https://github.com/uc-ospo/nsb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 border border-border"
                            >
                                <GithubIcon size={16} />
                                <span>GitHub Repository</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Hero Visual Mockup */}
                <div className="lg:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                    <div className="relative w-full max-w-lg filter drop-shadow-2xl">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 to-blue-500/40 rounded-3xl blur-3xl opacity-100 dark:opacity-60 -z-10 animate-pulse" />
                        <div className="glass rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-2xl">
                            <Image
                                alt="NSB Hero Visual"
                                src="/stripe-hero-image.png"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default StripeHero;
