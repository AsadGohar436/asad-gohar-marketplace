import React from 'react';
import { Cpu, ShoppingBag, Send, Github, Database, Sparkles } from 'lucide-react';
import { BRAND_PROFILE } from '../brand';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenInquiry: () => void;
  onOpenSchema: () => void;
  onScrollToStudio: () => void;
  onScrollToMarketplace: () => void;
  onScrollToAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenInquiry,
  onOpenSchema,
  onScrollToStudio,
  onScrollToMarketplace,
  onScrollToAbout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onScrollToMarketplace}>
          <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-accent/40 flex items-center justify-center relative group">
            <Cpu className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-accent rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-accent rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-brand-text tracking-tight text-base sm:text-lg">
                {BRAND_PROFILE.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent2 border border-brand-accent/30 hidden sm:inline-block">
                LinkedIn Studio
              </span>
            </div>
            <p className="text-[11px] text-brand-dim font-mono hidden md:block">
              {BRAND_PROFILE.tagline}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-brand-dim">
          <button
            onClick={onScrollToMarketplace}
            className="hover:text-brand-accent transition-colors"
          >
            Marketplace
          </button>
          <button
            onClick={onScrollToStudio}
            className="hover:text-brand-accent transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Live Studio</span>
          </button>
          <button
            onClick={onOpenSchema}
            className="hover:text-brand-accent transition-colors flex items-center space-x-1"
          >
            <Database className="w-3.5 h-3.5 text-brand-dim" />
            <span>Supabase Schema</span>
          </button>
          <button
            onClick={onScrollToAbout}
            className="hover:text-brand-accent transition-colors"
          >
            Full-Stack Craft
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* GitHub Repo */}
          <a
            href={BRAND_PROFILE.marketplaceRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-dim hover:text-brand-text hover:border-brand-accent/40 transition-colors"
            title="GitHub: AsadGohar436/asad-gohar-marketplace"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-dim hover:text-brand-accent hover:border-brand-accent/40 transition-colors"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent text-brand-bg text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Inquiry CTA */}
          <button
            onClick={onOpenInquiry}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-brand-gradient text-brand-bg font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity glow-accent shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </button>
        </div>

      </div>
    </header>
  );
};
