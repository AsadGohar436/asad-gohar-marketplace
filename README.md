# Asad Gohar — LinkedIn Marketplace

A high-performance, engineering-grade web marketplace and content studio for **Asad Gohar** (Full Stack Developer — React, Node.js, TypeScript, PostgreSQL), built exclusively for the **LinkedIn** ecosystem with an **emerald on near-black dark green theme**.

- **Theme Palette:** `#070b09` (near-black bg), `#0e1512` (surface), `#111a15` (card), `#10b981` (accent emerald), `#34d399` (accent2), `#059669` (deep emerald), Inter typography, and circuit-board traces.
- **GitHub Repository:** [https://github.com/AsadGohar436/asad-gohar-marketplace](https://github.com/AsadGohar436/asad-gohar-marketplace)
- **Deployment Ready:** Vercel CLI (`vercel`) + Supabase CLI (`supabase`) + GitHub CLI (`gh`).

---

## What’s Inside

1. **Web Marketplace App (`src/`):**
   - **Marketplace Catalog:** Remotion video motion kits, carousel studios, full-stack developer portfolio platforms, lead automation pipelines, and direct engineering sprints.
   - **Interactive Live Studio:** In-browser dark-green LinkedIn canvas previewer with dynamic copy, multi-format switching (Square 1:1, Portrait 4:5, Story 9:16), live props exporter, and post generator.
   - **Order & Cart Drawer:** Multi-tier selection (Starter, Pro, Enterprise), order confirmation, and celebratory feedback.
   - **Supabase PostgreSQL Integration:** Complete schema (`products`, `orders`, `inquiries`, `reviews`) with RLS security and graceful fallback demo storage.
   - **PostgreSQL / CLI Inspector:** Built-in modal to view the SQL schema, migrations, and CLI deployment workflows.

2. **Claude Code Remotion Plugin (`plugins/studio/asad-gohar-studio`):**
   - Local rendering engine generating 4x ultra-HD PNG stills and 2x MP4 videos scored with cleared audio tracks.
   - Automated layout measurement avoiding text clipping.

3. **Brand Truth (`shared/brand/`):**
   - `shared/brand/profile.json` and `shared/brand/tokens.json` strictly defining color codes, fonts, and factual guidelines without fluff or hype.

---

## Quick Start

### 1. Web Marketplace

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Supabase Integration (Local or Cloud)

The marketplace includes a migration file at `supabase/migrations/20261003_init.sql`.

```bash
# Start local Supabase containers (Docker required)
supabase start

# Apply PostgreSQL migrations
supabase db push

# Check local credentials and status
supabase status
```

To connect your Supabase project in production, copy `.env.example` to `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Deploy to Vercel

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 4. Remotion Local Studio (Stills & Video)

```bash
cd plugins/studio/asad-gohar-studio/assets/remotion-template
npm install

npm run image     # → out/image.png (Square 1:1, 4x = 4320x4320)
npm run video     # → out/video.mp4 (Square 1:1, 2x = 2160x2160 with music)
npm run studio    # Live browser preview
```

---

## Brand Architecture & Rules

- **Voice:** First person, plain, practical. Writes from work actually done, not advice read somewhere.
- **Constraints (`doNotClaim`):** No invented experience durations, no seniority fluff, no unsubstantiated follower or client claims.
- **Visuals:** Dark emerald only. Circuit board traces, soldered nodes, and strict font scales.

---

## License

MIT © Asad Gohar
