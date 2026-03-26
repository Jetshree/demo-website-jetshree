"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import * as LucideIcons from "lucide-react";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 */
function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid h-full w-full place-items-center rounded-3xl bg-background p-3 text-foreground transition-colors duration-300",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--shine-pulse-duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-3xl before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]`}
      ></div>
      {children}
    </div>
  );
}

export function TimelineContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center gap-3 md:order-2 relative z-10">
      {children}
    </div>
  );
}

export function TimelineEvent({
  label,
  message,
  icon,
  isLast = false,
}: Event & {
  isLast?: boolean;
}) {
  // Use lucide-react mapping to match the dynamic structure while staying in the NSB domain
  const Icon = (LucideIcons as any)[icon.name] || LucideIcons.HelpCircle;
  
  return (
    <div className="group relative -m-2 flex gap-4 border border-transparent p-2">
      <div className="relative">
        <div
          className={cn(
            "rounded-full border bg-background p-2",
            icon.borderColor
          )}
        >
          <Icon className={cn("h-4 w-4", icon.textColor)} />
        </div>
        {!isLast ? (
          <div className="absolute inset-x-0 mx-auto h-full w-[2px] bg-muted" />
        ) : null}
      </div>
      <div className="mt-1 flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold">{label}</p>
        </div>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface Event {
  label: string;
  message: string;
  icon: {
    name: string;
    textColor: string;
    borderColor: string;
  };
}

const nsbTimeline = [
  {
    label: "Application Call",
    message: "Your application sends a message via the NsbAppClient interface (available in Python or C++).",
    icon: {
      name: "Cpu",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/40",
    },
  },
  {
    label: "Daemon Bridge",
    message: "The NSB Daemon receives the message and stores it in the high-performance Redis-backed payload server.",
    icon: {
      name: "Layers",
      textColor: "text-purple-500",
      borderColor: "border-purple-500/40",
    },
  },
  {
    label: "Simulator Routing",
    message: "The Network Simulator fetches payloads using NsbSimClient and simulates real-world delays and drops.",
    icon: {
      name: "Zap",
      textColor: "text-amber-500",
      borderColor: "border-amber-500/40",
    },
  },
  {
    label: "Message Arrival",
    message: "Once delivery conditions are met, the destination application receives the message as if over a real network.",
    icon: {
      name: "CheckCircle2",
      textColor: "text-emerald-500",
      borderColor: "border-emerald-500/40",
    },
  },
] satisfies Event[];

export function Timeline() {
  return (
    <div className="w-full max-w-3xl">
      <TimelineContainer>
        {nsbTimeline.map((event, i) => (
          <TimelineEvent
            key={event.label}
            isLast={i === nsbTimeline.length - 1}
            {...event}
          />
        ))}
      </TimelineContainer>
    </div>
  );
}

export { ShineBorder }
