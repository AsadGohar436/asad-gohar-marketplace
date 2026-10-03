import React, { useState } from 'react';
import { X, Database, Terminal, Shield, Check, Copy } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface SupabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSchemaModal: React.FC<SupabaseSchemaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'cli'>('sql');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSchemaSnippet = `-- PostgreSQL Schema for Asad Gohar LinkedIn Marketplace
-- supabase/migrations/20261003_init.sql

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null,
  price decimal(10,2) not null default 0.00,
  stack text[] not null default '{}',
  formats text[] not null default '{}',
  deliverables text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  product_slug text not null,
  product_title text not null,
  tier text not null default 'Standard',
  customer_name text not null,
  customer_email text not null,
  customer_linkedin text,
  amount decimal(10,2) not null,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  linkedin_url text,
  project_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;`;

  const cliCommandsSnippet = `# 1. Start Supabase Locally
supabase start

# 2. Apply Migrations to PostgreSQL
supabase db push

# 3. Check Database Status
supabase status

# 4. Deploy to Vercel with Vercel CLI
vercel --prod

# 5. Push changes to GitHub
git add .
git commit -m "feat: linkedin marketplace with supabase backend"
git push origin main`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === 'sql' ? sqlSchemaSnippet : cliCommandsSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-text">
                PostgreSQL & Supabase Architecture
              </h2>
              <p className="text-xs text-brand-dim font-mono">
                Status: {isSupabaseConfigured ? '🟢 Live Supabase Connected' : '🟡 Simulated Storage Mode'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-brand-card hover:bg-brand-border text-brand-dim hover:text-brand-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4 border-b border-brand-border/60 flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('sql')}
              className={`pb-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center space-x-1.5 ${
                activeTab === 'sql'
                  ? 'border-brand-accent text-brand-accent2'
                  : 'border-transparent text-brand-dim hover:text-brand-text'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>SQL Schema & Migrations</span>
            </button>
            <button
              onClick={() => setActiveTab('cli')}
              className={`pb-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center space-x-1.5 ${
                activeTab === 'cli'
                  ? 'border-brand-accent text-brand-accent2'
                  : 'border-transparent text-brand-dim hover:text-brand-text'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Supabase / Vercel CLI</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="pb-3 text-xs font-mono text-brand-dim hover:text-brand-accent flex items-center space-x-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Code block body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-brand-textSecondary bg-brand-bg">
          <pre className="overflow-x-auto leading-relaxed">
            {activeTab === 'sql' ? sqlSchemaSnippet : cliCommandsSnippet}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-border bg-brand-card/50 flex items-center justify-between text-[11px] font-mono text-brand-dim">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-brand-accent" />
            <span>RLS Enabled · Zero API Exposure</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-text hover:border-brand-accent/40 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
