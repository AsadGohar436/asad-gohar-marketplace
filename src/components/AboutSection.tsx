import React from 'react';
import { Cpu, CheckCircle, ExternalLink, Github } from 'lucide-react';
import { BRAND_PROFILE } from '../brand';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative bg-brand-surface/20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-mono text-brand-accent">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full-Stack Engineering Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
              Front to back, one stack. Keeping the three in agreement.
            </h2>

            <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed">
              {BRAND_PROFILE.about}
            </p>

            <blockquote className="p-4 rounded-xl bg-brand-surface border-l-2 border-brand-accent text-xs sm:text-sm text-brand-dim italic">
              "{BRAND_PROFILE.voice}"
            </blockquote>

            {/* Core Values */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-brand-text">React & TypeScript on the Front</h4>
                  <p className="text-xs text-brand-dim mt-0.5">
                    Precise, componentized interfaces with zero guesswork in props or layout bounds.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-brand-text">Node.js Behind It</h4>
                  <p className="text-xs text-brand-dim mt-0.5">
                    Streamlined endpoints, webhook processing, Remotion pipelines, and secure data routing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-brand-text">PostgreSQL Underneath</h4>
                  <p className="text-xs text-brand-dim mt-0.5">
                    Relational integrity, strict constraints, migrations, and Row-Level Security via Supabase.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <a
                href={BRAND_PROFILE.marketplaceRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-accent/40 text-brand-text text-xs font-mono transition-colors"
              >
                <Github className="w-4 h-4 text-brand-accent" />
                <span>github.com/{BRAND_PROFILE.github}</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-dim" />
              </a>
            </div>
          </div>

          {/* Right Architecture Terminal Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl glass-card border border-brand-border/80 overflow-hidden shadow-2xl">
              
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-brand-surface border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-accent/80" />
                  <span className="text-xs font-mono text-brand-dim ml-2">asad-gohar-stack.ts</span>
                </div>
                <span className="text-[10px] font-mono text-brand-accent2 bg-brand-accent/15 px-2 py-0.5 rounded">
                  ESNext
                </span>
              </div>

              {/* Code Contents */}
              <div className="p-5 font-mono text-xs text-brand-textSecondary space-y-3 bg-brand-bg/95">
                <div>
                  <span className="text-brand-dim">// The three layers agreeing</span>
                  <div className="text-brand-accent2 mt-1">interface FullStackProfile {'{'}</div>
                  <div className="pl-4 text-brand-text">developer: <span className="text-emerald-300">"{BRAND_PROFILE.name}"</span>;</div>
                  <div className="pl-4 text-brand-text">focus: <span className="text-emerald-300">"LinkedIn Content & Automation"</span>;</div>
                  <div className="pl-4 text-brand-text">frontend: <span className="text-emerald-300">"React + TypeScript"</span>;</div>
                  <div className="pl-4 text-brand-text">backend: <span className="text-emerald-300">"Node.js API"</span>;</div>
                  <div className="pl-4 text-brand-text">database: <span className="text-emerald-300">"PostgreSQL (Supabase)"</span>;</div>
                  <div className="pl-4 text-brand-text">motion: <span className="text-emerald-300">"Remotion Local Rendering"</span>;</div>
                  <div className="text-brand-accent2">{'}'}</div>
                </div>

                <div className="pt-2 border-t border-brand-border/60">
                  <span className="text-brand-dim">// Strict fact policy</span>
                  <div className="text-brand-text mt-1">const claims = {'{'}</div>
                  <div className="pl-4 text-brand-dim">hype: false,</div>
                  <div className="pl-4 text-brand-dim">fluff: false,</div>
                  <div className="pl-4 text-brand-accent">craftDriven: true,</div>
                  <div className="text-brand-text">{'}'};</div>
                </div>

                <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between text-[11px] text-brand-dim">
                  <span>theme: emerald-on-near-black</span>
                  <span className="text-brand-accent">ready</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
