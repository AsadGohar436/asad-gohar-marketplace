import React from 'react';
import { Cpu, Github, ExternalLink, Terminal, Shield, Sparkles } from 'lucide-react';
import { BRAND_PROFILE, BRAND_TOKENS } from '../brand';

interface FooterProps {
  onOpenSchema: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSchema, onOpenInquiry }) => {
  return (
    <footer className="border-t border-brand-border bg-brand-surface/80 text-brand-dim text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-brand-text text-sm tracking-tight font-sans">
                {BRAND_PROFILE.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent2 border border-brand-accent/30">
                Only for LinkedIn
              </span>
            </div>

            <p className="text-xs text-brand-dim max-w-sm font-sans leading-relaxed">
              {BRAND_PROFILE.about}
            </p>

            <div className="text-[11px] text-brand-textSecondary pt-1 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent" />
              <span>Theme: Emerald on near-black ({BRAND_TOKENS.colors.bg} · {BRAND_TOKENS.colors.accent})</span>
            </div>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-2">
            <h4 className="text-brand-text font-bold text-xs uppercase tracking-wider font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              <li>
                <a
                  href={BRAND_PROFILE.marketplaceRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors flex items-center space-x-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenSchema}
                  className="hover:text-brand-accent transition-colors flex items-center space-x-1 text-left"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Supabase PostgreSQL Schema</span>
                </button>
              </li>
              <li>
                <a
                  href={`${BRAND_PROFILE.marketplaceRepoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Remotion Studio Plugin</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Stack & Craft */}
          <div className="space-y-2">
            <h4 className="text-brand-text font-bold text-xs uppercase tracking-wider font-mono">
              Technical Stack
            </h4>
            <div className="flex flex-wrap gap-1">
              {BRAND_PROFILE.stack.concat(['Remotion', 'Supabase', 'Vercel']).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-brand-card border border-brand-border text-[10px] text-brand-textSecondary"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="text-xs text-brand-accent hover:underline flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Direct Inquiry</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-dim space-y-2 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {BRAND_PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-brand-accent" />
              <span>Type-Safe & RLS Protected</span>
            </span>
            <span className="text-brand-accent2 font-semibold">
              {BRAND_PROFILE.footerRight}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
