-- Asad Gohar LinkedIn Marketplace Schema
-- PostgreSQL Migration for Supabase

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text not null,
  long_description text,
  category text not null check (category in ('video-motion', 'stills-carousels', 'engineering-web', 'automation', 'interactive-tools')),
  price decimal(10,2) not null default 0.00,
  is_free boolean not null default false,
  is_popular boolean not null default false,
  stack text[] not null default '{}',
  formats text[] not null default '{}',
  deliverables text[] not null default '{}',
  preview_type text default 'code',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. ORDERS TABLE
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete set null,
  product_slug text not null,
  product_title text not null,
  tier text not null default 'Standard',
  customer_name text not null,
  customer_email text not null,
  customer_linkedin text,
  amount decimal(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

-- 3. INQUIRIES TABLE
create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  linkedin_url text,
  project_type text not null,
  estimated_timeline text,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'in_discussion', 'archived')),
  created_at timestamptz not null default now()
);

-- 4. REVIEWS TABLE
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_title text not null,
  linkedin_profile text,
  rating integer not null check (rating >= 1 and rating <= 5),
  content text not null,
  verified_client boolean not null default true,
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);

-- ROW LEVEL SECURITY (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;
alter table public.reviews enable row level security;

-- Public can read products and reviews
create policy "Allow public read access on products"
  on public.products for select
  using (true);

create policy "Allow public read access on reviews"
  on public.reviews for select
  using (true);

-- Anyone can submit inquiries and orders
create policy "Allow anonymous insert on inquiries"
  on public.inquiries for insert
  with check (true);

create policy "Allow anonymous insert on orders"
  on public.orders for insert
  with check (true);

-- Seed Initial Products
insert into public.products (slug, title, description, long_description, category, price, is_free, is_popular, stack, formats, deliverables, preview_type)
values
  (
    'remotion-linkedin-video-kit',
    'LinkedIn Remotion Video Motion Kit',
    'High-fidelity programmatic MP4 video reels with synchronized audio and circuit-board backdrops, rendered locally at 2x scale.',
    'A turnkey Remotion template engineered specifically for LinkedIn video posts. Includes 3 tested canvas formats, smooth cross-dissolves, circuit board pulsing traces, and an automated verification script that guarantees audio track clearance.',
    'video-motion',
    149.00,
    false,
    true,
    array['Remotion', 'React', 'TypeScript', 'Node.js'],
    array['Square 1:1', 'Portrait 4:5', 'Story 9:16'],
    array['Full Remotion Source Code', 'Audio Config with Clearance Validator', 'Pre-configured Video Scenes (Intro, Beats, Outro)', 'Props Verification Script'],
    'video'
  ),
  (
    'emerald-circuit-carousel-studio',
    'Emerald Circuit Carousel Studio',
    'Programmatic Remotion still layouts at 4x resolution (4320x4320) with measured auto-fit spacing that never clips text.',
    'Say goodbye to fragile design tools. Define your copy in JSON, run one command, and get pixel-perfect 4x PNG stills formatted for LinkedIn. Features 5 layout variants: Insight, List, Stat, Quote, and Showcase with auto-scaling font calculations.',
    'stills-carousels',
    89.00,
    false,
    true,
    array['React', 'TypeScript', 'Remotion Still', 'Tailwind'],
    array['Square 1:1', 'Portrait 4:5', 'Story 9:16'],
    array['5 Layout Templates (Insight, List, Stat, Quote, Showcase)', 'Measured Auto-gap Spacing System', 'Automated 4x Export Workflow', 'Props JSON Schema Validator'],
    'card'
  ),
  (
    'fullstack-linkedin-dev-portfolio',
    'Full-Stack LinkedIn Developer Portfolio',
    'Complete personal marketplace and portfolio site for LinkedIn creators and developers, powered by React, Tailwind, and Supabase.',
    'Showcase your technical projects, Remotion clips, digital assets, and consulting packages on your own domain with the signature dark emerald aesthetics. Connects directly to Supabase for automated order handling and client inquiries.',
    'engineering-web',
    299.00,
    false,
    false,
    array['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind'],
    array['Responsive Web App', 'Vercel Deployment'],
    array['Next-gen React + Vite Architecture', 'Supabase Database Migrations & RLS', 'Interactive Live Preview Generator', 'Inquiry & Cart Order Processing Drawer'],
    'code'
  ),
  (
    'linkedin-lead-webhook-automation',
    'LinkedIn Lead & Webhook Automation Pipeline',
    'Headless Node.js and PostgreSQL pipeline to capture, qualify, and sync inbound LinkedIn inquiries directly into your private database.',
    'Eliminate manual lead logging. This backend pipeline receives webhook payloads, validates contact authenticity, stores records in PostgreSQL, and notifies your private Slack or email channel instantly.',
    'automation',
    199.00,
    false,
    false,
    array['Node.js', 'PostgreSQL', 'TypeScript', 'Webhooks'],
    array['Backend Service', 'Docker Container'],
    array['End-to-end Node.js Webhook Server', 'PostgreSQL Lead Table Schemas', 'Instant Alert Dispatcher', 'Detailed API Integration Documentation'],
    'terminal'
  ),
  (
    'interactive-linkedin-card-generator',
    'Interactive LinkedIn Post Card Generator',
    'In-browser interactive studio to preview, generate, and export dark emerald LinkedIn feed cards directly in your browser.',
    'Free developer utility to craft circuit-board LinkedIn cards without launching a local terminal. Type your headline, tweak the body, switch formats in real time, and copy ready-to-use Remotion props.',
    'interactive-tools',
    0.00,
    true,
    false,
    array['React', 'Canvas API', 'TypeScript'],
    array['Web Tool', 'JSON Export'],
    array['Live Browser Renderer', 'Instant Props JSON Exporter', 'Multi-ratio Canvas Switcher', 'Zero-setup Web Access'],
    'tool'
  ),
  (
    'fullstack-schema-api-integration',
    'Full-Stack Schema & API Technical Sprint',
    'Direct pair-programming and technical implementation sprint: bridging React, Node.js, and PostgreSQL with end-to-end type safety.',
    'Architectural sprint where we establish an unbroken type contract from PostgreSQL schema definitions up through Node.js endpoints into React UI state. Includes database indexing, query optimization, and structured logging.',
    'engineering-web',
    349.00,
    false,
    true,
    array['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    array['Custom Engineering', 'Live Technical Sprint'],
    array['Complete PostgreSQL Schema Architecture', 'Type-safe REST / RPC Handlers', 'Performance & Query Optimization', 'Git Pull Request with Full Documentation'],
    'code'
  )
on conflict (slug) do nothing;
