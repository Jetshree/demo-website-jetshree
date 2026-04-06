## NSB Website Prototype - Technical Overview

This is an **early-stage prototype for the NSB (Network Simulation Bridge) project website**, built with a modern, type-safe tech stack. The prototype demonstrates the foundational architecture for user-centric website for NSB.

### Architecture & Structure

**TypeScript-First Codebase** 
- Strict TypeScript configuration
- Path aliases configured (`@/*` → `./src/*`) for clean imports
- Full type safety across the application

**Core Directories:**
- **`src/app/`** – Next.js App Router for page routing and layouts
- **`src/components/`** – Reusable React components for UI elements
- **`src/lib/`** – Utility functions and helper modules
- **`docs/`** – MDX content files for structured documentation
- **`public/`** – Static assets (images, fonts, etc.)

### Technology Implementation

**Frontend Stack:**
- **Next.js 16.2.1** with React 19 – Modern SSR/SSG capabilities
- **TypeScript** – Full static typing and IDE support
- **Tailwind CSS** with Typography plugin – Responsive, semantic styling
- **MDX via next-mdx-remote** – Dynamic markdown rendering with React components
- **Framer Motion** – Smooth animations and transitions
- **Radix UI + Lucide React** – Accessible, headless UI components

**Build & Dev Tools:**
- ESLint configuration for code quality
- PostCSS for CSS processing
- next-themes for dark mode support
- remark-gfm for GitHub Flavored Markdown support

### Key Features of the Prototype

1. **Content Pipeline** (scope: upto prototype for now)
   - `outputFileTracingIncludes` in Next.js config ensures `/docs/` folder is included in Vercel deployment
   - MDX files are processed at build time for optimal performance
   - Foundation for GitHub API integration

2. **Type Safety**
   - Strict TypeScript configuration (`"strict": true`)
   - Zero-emission build (`"noEmit": true`)
   - ESM module resolution for modern JavaScript

3. **Performance Optimizations**
   - Incremental static regeneration support
   - Optimized CSS with Tailwind's JIT compiler
   - CDN-ready for static assets

4. **Accessibility & Responsive Design**
   - Radix UI components (WCAG-compliant primitives)
   - Mobile-first Tailwind CSS approach
   - Semantic HTML structure via MDX rendering

### Current State

**Deployment:** Live at [https://demo-website-jetshree.vercel.app](https://demo-website-jetshree.vercel.app)

**Development Status:**
- ✅ Foundation architecture in place
- ✅ Content pipeline (MDX rendering) operational
- ✅ TypeScript/ESLint tooling configured
- 🔄 Page templates and layouts in progress
- 📋 GitHub synchronization (planned)
- 📋 Full page implementations (Home, Docs, Tutorials, Research, Use Cases)

### Design Philosophy

The MDX-based content system is specifically designed to evolve-documentation files can be updated in the NSB repository and automatically reflected on the website through the planned GitHub API integration (details described in proposal).
Final design and architecture will be finalized after discussion with mentor. This prototype is deployed on vercel (under hobby plan), the final website is recommended to be deployed on netlify (reasons and comparison mentioned in proposal).
