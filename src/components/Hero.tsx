import React from 'react';
import { ArrowRight, Sparkles, Database, Layers, ShieldCheck, Video } from 'lucide-react';
import { BRAND_PROFILE } from '../brand';

interface HeroProps {
  onExploreMarketplace: () => void;
  onOpenStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMarketplace, onOpenStudio }) => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden circuit-grid">
      {/* Background radial aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-brand-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-mono text-brand-accent2 mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span>ENGINEERING-GRADE · ONLY FOR LINKEDIN · DARK GREEN THEME</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Full-Stack Marketplace & Content Studio for{' '}
          <span className="bg-clip-text text-transparent bg-brand-gradient">
            LinkedIn
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-brand-dim max-w-2xl mx-auto font-normal leading-relaxed">
          {BRAND_PROFILE.tagline} Built by {BRAND_PROFILE.name}. Programmatic Remotion video reels, 
          ultra-HD carousels, lead pipelines, and web applications crafted exclusively for LinkedIn technical creators.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreMarketplace}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-gradient text-brand-bg font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg glow-accent hover:opacity-95 transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Products & Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenStudio}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-accent/40 text-brand-text font-medium text-sm flex items-center justify-center space-x-2 hover:bg-brand-card transition-all"
          >
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span>Launch Live LinkedIn Studio</span>
          </button>
        </div>

        {/* Tech Stack Pillars */}
        <div className="mt-12 pt-8 border-t border-brand-border/60 max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-wider text-brand-dim font-mono mb-4">
            Unified Core Technology Stack
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono">
            {BRAND_PROFILE.stack.concat(['Remotion', 'Supabase', 'Tailwind CSS']).map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-textSecondary flex items-center space-x-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Engineering Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center space-x-2 text-brand-accent font-medium text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Full-Stack Contract</span>
            </div>
            <p className="text-xs text-brand-dim leading-snug">
              React UI, Node.js API, and PostgreSQL schema kept in continuous mutual agreement.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center space-x-2 text-brand-accent font-medium text-xs mb-1">
              <Video className="w-4 h-4" />
              <span>Remotion Video</span>
            </div>
            <p className="text-xs text-brand-dim leading-snug">
              Hardware-rendered 60fps MP4s at 2x scale with licensed ambient audio tracks.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center space-x-2 text-brand-accent font-medium text-xs mb-1">
              <Layers className="w-4 h-4" />
              <span>Measured Auto-Fit</span>
            </div>
            <p className="text-xs text-brand-dim leading-snug">
              Carousels calculated after font rasterization with zero margin clipping.
            </p>
          </div>

          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center space-x-2 text-brand-accent font-medium text-xs mb-1">
              <Database className="w-4 h-4" />
              <span>Supabase Ready</span>
            </div>
            <p className="text-xs text-brand-dim leading-snug">
              Equipped with PostgreSQL migrations, RLS policies, and order storage handlers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
