"use client";

import type { LucideIcon } from "lucide-react";
import { Target, Car, Blocks, Rocket, Shield, HardDrive } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────────────────────

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

// ─── Data ────────────────────────────────────────────────────────────────────────

export interface SpotlightItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const NSB_ITEMS: SpotlightItem[] = [
  {
    icon: Blocks,
    title: "Multi-Language",
    description: "Full feature parity between Python and C++ client libraries.",
    color: "#8b5cf6",
  },
  {
    icon: Rocket,
    title: "Real-time Processing",
    description: "Low-overhead message passing with high-throughput Redis backing.",
    color: "#3b82f6",
  },
  {
    icon: HardDrive,
    title: "Extensible Core",
    description: "Modular architecture to support new simulators and application types.",
    color: "#10b981",
  },
  {
    icon: Car,
    title: "Autonomous Vehicles",
    description: "Model V2V and V2X communication in large-scale simulation worlds.",
    color: "#f59e0b",
  },
  {
    icon: Target,
    title: "Distributed Systems",
    description: "Simulate real-world network failures and latencies in cluster environments.",
    color: "#f97316",
  },
  {
    icon: Shield,
    title: "Federated Learning",
    description: "Model decentralized training across varying network topologies.",
    color: "#14b8a6",
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────────

interface CardProps {
  item: SpotlightItem;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function Card({ item, dimmed, onHoverStart, onHoverEnd }: CardProps) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      animate={{
        scale: dimmed ? 0.96 : 1,
      }}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border pl-6 pr-6 pt-6 pb-6",
        // Light
        "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
        // Dark
        "dark:bg-white/5 dark:shadow-none",
        "transition-all duration-300"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        borderColor: `${item.color}B0`, // Clearly visible border with reduced transparency
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Static accent tint — always visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
        }}
      />

      {/* Hover glow layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}2e, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      {/* Icon badge */}
      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: `${item.color}18`,
          boxShadow: `inset 0 0 0 1px ${item.color}30`,
        }}
      >
        <Icon size={17} strokeWidth={1.9} style={{ color: item.color }} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-semibold text-[15px] text-foreground tracking-tight">
          {item.title}
        </h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Accent bottom line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${item.color}80, transparent)`,
        }}
      />
    </motion.div>
  );
}

Card.displayName = "Card";

// ─── Main export ──────────────────────────────────────────────────────────────────

export interface SpotlightCardsProps {
  items?: SpotlightItem[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}

export function SpotlightCards({
  items = NSB_ITEMS,
  eyebrow = "Features & Use Cases",
  heading = "Everything you need",
  className,
}: SpotlightCardsProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <section className="pb-24 pt-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative mb-12 flex flex-col gap-1.5 text-center">
          <p className="font-semibold text-[10px] text-primary uppercase tracking-[0.22em]">
            {eyebrow}
          </p>
          <h2 className="font-extrabold text-[32px] md:text-[40px] text-foreground tracking-tight">
            {heading}
          </h2>
        </div>

        {/* Card grid */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
              item={item}
              key={item.title}
              onHoverEnd={() => setHoveredTitle(null)}
              onHoverStart={() => setHoveredTitle(item.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  return <SpotlightCards items={NSB_ITEMS} eyebrow="Features & Use Cases" heading="Where NSB Shines" />;
}
