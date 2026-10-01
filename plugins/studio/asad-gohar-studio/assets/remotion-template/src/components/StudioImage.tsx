import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  AbsoluteFill,
  Img,
  continueRender,
  delayRender,
  staticFile,
  useVideoConfig,
} from 'remotion';
import { BRAND } from '../brand';
import { COLORS, FONTS, GRADIENT, RADIUS } from '../theme';
import { IMAGE, type ImageProps } from '../image.config';
import { CircuitBackground } from './CircuitBackground';
import { Avatar } from './Identity';
import { HighlightPhrase, u } from './_util';

/**
 * The still. One frame, one canvas size chosen by `format`, five body variants.
 *
 * Spacing is measured, not guessed: after the fonts are applied the column's
 * natural height is read, the leftover space is split into ONE uniform gap, and
 * oversized copy scales down instead of clipping. The side margins stay
 * identical on every render, so a heavy brief gets slightly smaller type rather
 * than extra padding, and a light brief does not float in the middle.
 *
 * Nothing animates: at frame 0 an entrance spring is still at zero, which is
 * how stills come out blank.
 */

const gradClip: React.CSSProperties = {
  background: GRADIENT.brand,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const StudioImage: React.FC<ImageProps> = (props) => {
  const { width, height } = useVideoConfig();
  const uu = (n: number) => u(width, height, n);
  const cfg: ImageProps = { ...IMAGE, ...props };

  const sideX = width * 0.065;
  const edgeY = height * 0.055;
  const maxGap = uu(70);

  const columnRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ gap: number; scale: number } | null>(null);
  const [handle] = useState(() => delayRender('studio-image-autofit'));

  useLayoutEffect(() => {
    let cancelled = false;
    const measure = async () => {
      try {
        await document.fonts.ready;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
        if (cancelled) return;
        const el = columnRef.current;
        if (!el) return;
        const blocks = Array.from(el.children) as HTMLElement[];
        const natural = blocks.reduce((n, b) => n + b.getBoundingClientRect().height, 0);
        const available = height - edgeY * 2;
        const slots = Math.max(1, blocks.length - 1);
        if (natural > available) {
          setFit({ gap: 0, scale: available / natural });
        } else {
          setFit({ gap: Math.min(maxGap, (available - natural) / slots), scale: 1 });
        }
      } finally {
        continueRender(handle);
      }
    };
    measure();
    return () => {
      cancelled = true;
    };
    // Measured once, on mount: a still has exactly one frame.
  }, []);

  const tags = cfg.footerTags.length > 0 ? cfg.footerTags : BRAND.tags;

  // Long headlines step down before the auto-fit has to shrink the whole frame.
  const headlineSize = uu(
    cfg.headline.length > 76 ? 58 : cfg.headline.length > 46 ? 68 : 82
  );

  /* ------------------------------------------------------------------ header */
  const header = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: uu(24),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: uu(22) }}>
        <Avatar size={uu(92)} />
        <div
          style={{
            fontFamily: FONTS.family,
            fontWeight: FONTS.heading,
            fontSize: uu(38),
            color: COLORS.text,
            letterSpacing: FONTS.letterSpacingHeading,
          }}
        >
          {BRAND.name}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.medium,
          fontSize: uu(30),
          color: COLORS.dim,
          textAlign: 'right',
        }}
      >
        {BRAND.designation}
      </div>
    </div>
  );

  /* -------------------------------------------------------------------- copy */
  const eyebrow = cfg.eyebrow ? (
    <div
      style={{
        fontFamily: FONTS.family,
        fontWeight: FONTS.semibold,
        fontSize: uu(28),
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: COLORS.accent,
      }}
    >
      {cfg.eyebrow}
    </div>
  ) : null;

  const headline = (
    <HighlightPhrase
      text={cfg.headline}
      phrase={cfg.keyPhrase}
      style={{
        fontFamily: FONTS.family,
        fontWeight: FONTS.heading,
        fontSize: headlineSize,
        lineHeight: 1.08,
        letterSpacing: FONTS.letterSpacingHeading,
        color: COLORS.text,
      }}
      phraseStyle={gradClip}
    />
  );

  const subhead = cfg.subhead ? (
    <HighlightPhrase
      text={cfg.subhead}
      phrase={cfg.subheadAccent}
      style={{
        fontFamily: FONTS.family,
        fontWeight: FONTS.medium,
        fontSize: uu(40),
        lineHeight: 1.3,
        color: COLORS.textSecondary,
      }}
      phraseStyle={{ color: COLORS.accent2 }}
    />
  ) : null;

  /* -------------------------------------------------------------------- body */
  const card: React.CSSProperties = {
    background: COLORS.card,
    border: `${uu(2)}px solid ${COLORS.border}`,
    borderRadius: RADIUS.lg,
    padding: `${uu(26)}px ${uu(30)}px`,
  };

  const art = cfg.art ? (
    <div
      style={{
        width: '100%',
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        border: `${uu(2)}px solid ${COLORS.border}`,
        boxShadow: `0 ${uu(20)}px ${uu(60)}px ${COLORS.bg}`,
      }}
    >
      <Img
        src={staticFile(cfg.art)}
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
    </div>
  ) : null;

  let body: React.ReactNode = null;
  if (cfg.variant === 'list') {
    body = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: uu(18), width: '100%' }}>
        {cfg.points.slice(0, 5).map((p, i) => (
          <div key={i} style={{ ...card, display: 'flex', alignItems: 'center', gap: uu(22) }}>
            <span
              style={{
                fontFamily: FONTS.family,
                fontWeight: FONTS.heading,
                fontSize: uu(34),
                ...gradClip,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: FONTS.family,
                fontWeight: FONTS.medium,
                fontSize: uu(34),
                lineHeight: 1.3,
                color: COLORS.textSecondary,
              }}
            >
              {p}
            </span>
          </div>
        ))}
      </div>
    );
  } else if (cfg.variant === 'stat') {
    body = (
      <div
        style={{
          ...card,
          width: '100%',
          display: 'flex',
          alignItems: 'baseline',
          gap: uu(28),
          borderColor: COLORS.accentDeep,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.family,
            fontWeight: FONTS.heading,
            fontSize: uu(120),
            lineHeight: 1,
            letterSpacing: FONTS.letterSpacingHeading,
            ...gradClip,
          }}
        >
          {cfg.stat.value}
        </span>
        <span
          style={{
            fontFamily: FONTS.family,
            fontWeight: FONTS.medium,
            fontSize: uu(34),
            lineHeight: 1.25,
            color: COLORS.textSecondary,
          }}
        >
          {cfg.stat.label}
        </span>
      </div>
    );
  } else if (cfg.variant === 'quote') {
    body = (
      <div
        style={{
          width: '100%',
          borderLeft: `${uu(8)}px solid ${COLORS.accent}`,
          paddingLeft: uu(30),
          fontFamily: FONTS.family,
          fontWeight: FONTS.semibold,
          fontSize: uu(cfg.quote.length > 100 ? 48 : 58),
          lineHeight: 1.22,
          color: COLORS.text,
        }}
      >
        {cfg.quote}
      </div>
    );
  } else if (cfg.variant === 'showcase') {
    body = art;
  } else {
    body = cfg.body ? (
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.body,
          fontSize: uu(34),
          lineHeight: 1.45,
          color: COLORS.textSecondary,
        }}
      >
        {cfg.body}
      </div>
    ) : null;
  }

  /* ------------------------------------------------------------------ footer */
  const footer = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: uu(20),
        borderTop: `${uu(2)}px solid ${COLORS.border}`,
        paddingTop: uu(24),
      }}
    >
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.medium,
          fontSize: uu(28),
          color: COLORS.dim,
        }}
      >
        {tags.join(' · ')}
      </div>
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.semibold,
          fontSize: uu(28),
          color: COLORS.accent2,
        }}
      >
        {BRAND.footerRight} ↗
      </div>
    </div>
  );

  const blocks = [header, eyebrow, headline, subhead, body, footer].filter(Boolean);
  const scale = fit?.scale ?? 1;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <CircuitBackground intensity={cfg.variant === 'showcase' ? 0.7 : 1} />

      {/* A generated picture can also sit behind the copy as a wash. */}
      {cfg.art && cfg.variant !== 'showcase' ? (
        <AbsoluteFill style={{ opacity: cfg.artWash }}>
          <Img
            src={staticFile(cfg.art)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      ) : null}

      <AbsoluteFill style={{ padding: `${edgeY}px ${sideX}px` }}>
        <div
          ref={columnRef}
          style={{
            // Counter-stretch, so shrinking the type never widens the margins.
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: fit?.gap ?? 0,
            // Hidden until measured, so a half-laid-out frame is never captured.
            opacity: fit ? 1 : 0,
          }}
        >
          {blocks.map((b, i) => (
            <div key={i} style={{ width: '100%' }}>
              {b}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
