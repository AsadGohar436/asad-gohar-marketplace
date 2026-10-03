import React, { useState } from 'react';
import { Copy, Check, Download, Sparkles, RefreshCw, Smartphone, Square, FileText } from 'lucide-react';
import { BRAND_PROFILE, BRAND_TOKENS } from '../brand';

export const InteractiveStudio: React.FC = () => {
  const [format, setFormat] = useState<'square' | 'portrait' | 'story'>('square');
  const [variant, setVariant] = useState<'insight' | 'list' | 'quote'>('insight');
  const [eyebrow, setEyebrow] = useState('FULL STACK ARCHITECTURE');
  const [headline, setHeadline] = useState('Front to back, one stack');
  const [bodyText, setBodyText] = useState(
    'Builds the interface in React, the API in Node.js, and the schema in PostgreSQL. Keeping the three in unbroken agreement.'
  );
  const [listItems, setListItems] = useState([
    'PostgreSQL relational schema as the absolute source of truth',
    'Strict TypeScript types shared between server and client',
    'Remotion automated motion reels rendered without cloud lock-in',
  ]);
  const [copiedProps, setCopiedProps] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Remotion props JSON representation
  const generatedProps = {
    format,
    variant,
    eyebrow,
    headline,
    body: variant === 'insight' ? bodyText : undefined,
    quote: variant === 'quote' ? bodyText : undefined,
    items: variant === 'list' ? listItems : undefined,
    brand: {
      name: BRAND_PROFILE.name,
      designation: BRAND_PROFILE.designation,
      handle: BRAND_PROFILE.handle,
      github: BRAND_PROFILE.github,
      footerRight: BRAND_PROFILE.footerRight,
    },
    theme: {
      colors: BRAND_TOKENS.colors,
    },
  };

  const handleCopyProps = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedProps, null, 2));
    setCopiedProps(true);
    setTimeout(() => setCopiedProps(false), 2000);
  };

  const handleCopyPostText = () => {
    const text = `${headline.toUpperCase()}\n\n${eyebrow}\n\n${
      variant === 'list' ? listItems.map((it, idx) => `${idx + 1}. ${it}`).join('\n') : bodyText
    }\n\n---\nBuilt by ${BRAND_PROFILE.name} (${BRAND_PROFILE.bio})\n#FullStack #TypeScript #React #PostgreSQL #LinkedIn`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const resetToDefaults = () => {
    setFormat('square');
    setVariant('insight');
    setEyebrow('FULL STACK ARCHITECTURE');
    setHeadline('Front to back, one stack');
    setBodyText(
      'Builds the interface in React, the API in Node.js, and the schema in PostgreSQL. Keeping the three in unbroken agreement.'
    );
  };

  return (
    <section id="studio" className="py-20 relative bg-brand-surface/40 border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-mono text-brand-accent mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight">
            Live Dark-Green LinkedIn Canvas Studio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-dim">
            Test and customize the signature emerald circuit board layout in real-time. Export ready-to-run Remotion JSON props for your feed.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <h3 className="text-base font-semibold text-brand-text flex items-center space-x-2">
                <span>Studio Parameters</span>
              </h3>
              <button
                onClick={resetToDefaults}
                className="text-xs font-mono text-brand-dim hover:text-brand-accent flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Canvas Format Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-brand-dim mb-2">
                1. Canvas Format & Aspect
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('square')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                    format === 'square'
                      ? 'bg-brand-accent/20 border-brand-accent text-brand-text shadow-sm'
                      : 'bg-brand-surface border-brand-border text-brand-dim hover:text-brand-text'
                  }`}
                >
                  <Square className="w-4 h-4 text-brand-accent" />
                  <span>Square 1:1</span>
                  <span className="text-[10px] text-brand-dim font-mono">1080×1080</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('portrait')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                    format === 'portrait'
                      ? 'bg-brand-accent/20 border-brand-accent text-brand-text shadow-sm'
                      : 'bg-brand-surface border-brand-border text-brand-dim hover:text-brand-text'
                  }`}
                >
                  <FileText className="w-4 h-4 text-brand-accent" />
                  <span>Portrait 4:5</span>
                  <span className="text-[10px] text-brand-dim font-mono">1080×1350</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('story')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                    format === 'story'
                      ? 'bg-brand-accent/20 border-brand-accent text-brand-text shadow-sm'
                      : 'bg-brand-surface border-brand-border text-brand-dim hover:text-brand-text'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-brand-accent" />
                  <span>Story 9:16</span>
                  <span className="text-[10px] text-brand-dim font-mono">1080×1920</span>
                </button>
              </div>
            </div>

            {/* Layout Variant */}
            <div>
              <label className="block text-xs font-mono uppercase text-brand-dim mb-2">
                2. Layout Variant
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['insight', 'list', 'quote'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={`py-2 px-3 rounded-lg border text-xs capitalize font-medium transition-all ${
                      variant === v
                        ? 'bg-brand-accent/20 border-brand-accent text-brand-text'
                        : 'bg-brand-surface border-brand-border text-brand-dim hover:text-brand-text'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={eyebrow}
                  onChange={(e) => setEyebrow(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent font-mono"
                  placeholder="e.g. FULL STACK ARCHITECTURE"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent font-medium"
                  placeholder="Main statement"
                />
              </div>

              {variant !== 'list' ? (
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                    {variant === 'quote' ? 'Quote Text' : 'Body Copy'}
                  </label>
                  <textarea
                    rows={3}
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                    placeholder="Enter copy details..."
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-brand-dim">
                    Numbered List Points (3 to 5)
                  </label>
                  {listItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-brand-accent">{index + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...listItems];
                          updated[index] = e.target.value;
                          setListItems(updated);
                        }}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleCopyProps}
                className="flex-1 py-2.5 px-3 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-accent/50 text-brand-text text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copiedProps ? <Check className="w-3.5 h-3.5 text-brand-accent" /> : <Copy className="w-3.5 h-3.5 text-brand-accent" />}
                <span>{copiedProps ? 'Props Copied!' : 'Copy props.json'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyPostText}
                className="flex-1 py-2.5 px-3 rounded-xl bg-brand-gradient text-brand-bg text-xs font-semibold flex items-center justify-center space-x-1.5 hover:opacity-95 transition-opacity shadow-sm"
              >
                {copiedText ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Text Copied!' : 'Copy LinkedIn Post'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Canvas Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between text-xs font-mono text-brand-dim mb-3 px-2">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                <span>Live Feed Preview ({BRAND_TOKENS.formats[format].label})</span>
              </span>
              <span>Theme: #070b09 Dark Emerald</span>
            </div>

            {/* Canvas Container with aspect ratio emulation */}
            <div
              className={`w-full max-w-lg relative rounded-2xl overflow-hidden border border-brand-border/80 shadow-2xl transition-all duration-300 ${
                format === 'square'
                  ? 'aspect-square'
                  : format === 'portrait'
                  ? 'aspect-[4/5]'
                  : 'aspect-[9/16] max-w-sm'
              }`}
              style={{
                backgroundColor: BRAND_TOKENS.colors.bg,
              }}
            >
              {/* Circuit board traces & dot background */}
              <div className="absolute inset-0 circuit-grid opacity-60 pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/15 rounded-full blur-2xl pointer-events-none" />

              {/* Inside Canvas Content */}
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-brand-text z-10">
                
                {/* Header: Identity */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-accent/50 flex items-center justify-center font-bold text-brand-accent text-sm shadow-inner">
                      AG
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-text tracking-tight flex items-center space-x-1.5">
                        <span>{BRAND_PROFILE.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      </div>
                      <div className="text-[11px] text-brand-dim font-mono">
                        {BRAND_PROFILE.designation}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-brand-accent2 px-2 py-0.5 rounded-md bg-brand-accent/10 border border-brand-accent/20">
                    {format.toUpperCase()}
                  </span>
                </div>

                {/* Body Content */}
                <div className="my-auto py-4 space-y-4">
                  {eyebrow && (
                    <div className="text-[11px] font-mono text-brand-accent font-semibold tracking-wider uppercase">
                      {eyebrow}
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight">
                    <span className="bg-clip-text text-transparent bg-brand-gradient">
                      {headline}
                    </span>
                  </h3>

                  {variant === 'insight' && (
                    <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed">
                      {bodyText}
                    </p>
                  )}

                  {variant === 'quote' && (
                    <blockquote className="border-l-2 border-brand-accent pl-4 text-xs sm:text-sm italic text-brand-textSecondary">
                      "{bodyText}"
                    </blockquote>
                  )}

                  {variant === 'list' && (
                    <div className="space-y-2 pt-1">
                      {listItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-2.5 p-2 rounded-lg bg-brand-surface/70 border border-brand-border/60 text-xs text-brand-text"
                        >
                          <span className="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent font-mono text-[11px] flex items-center justify-center shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Bottom Brand Bar */}
                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-dim">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-brand-accent" />
                    <span>github.com/{BRAND_PROFILE.github}</span>
                  </div>
                  <span className="text-brand-accent2 font-semibold">
                    {BRAND_PROFILE.footerRight}
                  </span>
                </div>

              </div>
            </div>

            <p className="text-[11px] font-mono text-brand-dim mt-3 text-center">
              Powered by Remotion Canvas Tokens · Zero Off-Palette Colors · Inter Font
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
