import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../brand';
import { COLORS, FONTS, GRADIENT, LAYOUT, RADIUS, TIMING } from '../theme';
import type { BeatScene, IntroScene, OutroScene } from '../video.config';
import { CircuitBackground } from './CircuitBackground';
import { Identity } from './Identity';
import { HighlightPhrase, enter, enterFade, exitFade, riseStyle, u } from './_util';

/**
 * The three scene types. All of them read LAYOUT for their margins and their
 * one vertical gap, so the rhythm is identical from scene to scene: that is the
 * whole reason a cut like this reads as one piece rather than three slides.
 *
 * Each scene fades in late and out early, matching the dissolve overlap, so two
 * headlines never sit on top of each other mid-transition.
 */

const gradClip: React.CSSProperties = {
  background: GRADIENT.brand,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const useScene = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const uu = (n: number) => u(width, height, n);
  const fade = TIMING.transitionOverlap;
  const opacity = enterFade(frame, fade) * exitFade(frame, durationInFrames, fade);
  return { frame, fps, width, height, uu, opacity };
};

const Frame: React.FC<{
  opacity: number;
  uu: (n: number) => number;
  align?: 'center' | 'flex-start';
  children: React.ReactNode;
}> = ({ opacity, uu, align = 'center', children }) => (
  <AbsoluteFill>
    <CircuitBackground intensity={0.85} />
    <AbsoluteFill
      style={{
        padding: `${uu(LAYOUT.padY)}px ${uu(LAYOUT.padX)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: align,
        textAlign: align === 'center' ? 'center' : 'left',
        gap: uu(LAYOUT.gap),
        opacity,
      }}
    >
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

export const VideoIntro: React.FC<IntroScene> = ({ title, keyPhrase, sub }) => {
  const { frame, fps, uu, opacity } = useScene();
  const a = enter(frame, fps, 2);
  const b = enter(frame, fps, 10);

  return (
    <Frame opacity={opacity} uu={uu}>
      <div style={riseStyle(a, uu(26))}>
        <Identity size={uu(160)} stacked nameSize={uu(52)} roleSize={uu(32)} />
      </div>
      <div style={riseStyle(b, uu(26))}>
        <HighlightPhrase
          text={title}
          phrase={keyPhrase}
          style={{
            fontFamily: FONTS.family,
            fontWeight: FONTS.heading,
            fontSize: uu(title.length > 48 ? 62 : 74),
            lineHeight: 1.1,
            letterSpacing: FONTS.letterSpacingHeading,
            color: COLORS.text,
          }}
          phraseStyle={gradClip}
        />
        {sub ? (
          <div
            style={{
              marginTop: uu(LAYOUT.gap * 0.5),
              fontFamily: FONTS.family,
              fontWeight: FONTS.medium,
              fontSize: uu(36),
              color: COLORS.dim,
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </Frame>
  );
};

export const VideoBeat: React.FC<BeatScene> = ({ label, title, keyPhrase, sub, bullets, art }) => {
  const { frame, fps, uu, opacity } = useScene();
  const a = enter(frame, fps, 2);
  const b = enter(frame, fps, 8);

  return (
    <Frame opacity={opacity} uu={uu} align="flex-start">
      {art ? (
        <AbsoluteFill style={{ opacity: 0.18 }}>
          <Img
            src={staticFile(art)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      ) : null}

      {label ? (
        <div
          style={{
            ...riseStyle(a, uu(18)),
            fontFamily: FONTS.family,
            fontWeight: FONTS.semibold,
            fontSize: uu(30),
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: COLORS.accent,
          }}
        >
          {label}
        </div>
      ) : null}

      <div style={riseStyle(a, uu(24))}>
        <HighlightPhrase
          text={title}
          phrase={keyPhrase}
          style={{
            fontFamily: FONTS.family,
            fontWeight: FONTS.heading,
            fontSize: uu(title.length > 44 ? 64 : 78),
            lineHeight: 1.08,
            letterSpacing: FONTS.letterSpacingHeading,
            color: COLORS.text,
          }}
          phraseStyle={gradClip}
        />
      </div>

      {sub ? (
        <div
          style={{
            ...riseStyle(b, uu(20)),
            fontFamily: FONTS.family,
            fontWeight: FONTS.body,
            fontSize: uu(38),
            lineHeight: 1.35,
            color: COLORS.textSecondary,
          }}
        >
          {sub}
        </div>
      ) : null}

      {bullets && bullets.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: uu(LAYOUT.gap * 0.45),
            width: '100%',
          }}
        >
          {bullets.slice(0, 3).map((t, i) => {
            const s = enter(frame, fps, 8 + i * 6);
            return (
              <div
                key={i}
                style={{
                  ...riseStyle(s, uu(18)),
                  display: 'flex',
                  alignItems: 'center',
                  gap: uu(20),
                  background: COLORS.card,
                  border: `${uu(2)}px solid ${COLORS.border}`,
                  borderRadius: RADIUS.lg,
                  padding: `${uu(22)}px ${uu(28)}px`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.family,
                    fontWeight: FONTS.heading,
                    fontSize: uu(34),
                    color: COLORS.accent2,
                  }}
                >
                  ✓
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
                  {t}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </Frame>
  );
};

export const VideoOutro: React.FC<OutroScene> = ({ cta }) => {
  const { frame, fps, uu, opacity } = useScene();
  const a = enter(frame, fps, 2);
  const b = enter(frame, fps, 12);

  return (
    <Frame opacity={opacity} uu={uu}>
      <div style={riseStyle(a, uu(24))}>
        <Identity size={uu(150)} stacked nameSize={uu(50)} roleSize={uu(30)} />
      </div>
      <div
        style={{
          ...riseStyle(b, uu(22)),
          fontFamily: FONTS.family,
          fontWeight: FONTS.heading,
          fontSize: uu(58),
          letterSpacing: FONTS.letterSpacingHeading,
          ...gradClip,
        }}
      >
        {cta}
      </div>
      <div
        style={{
          ...riseStyle(b, uu(18)),
          fontFamily: FONTS.family,
          fontWeight: FONTS.medium,
          fontSize: uu(32),
          color: COLORS.dim,
        }}
      >
        {BRAND.github ?? BRAND.tagline}
      </div>
    </Frame>
  );
};
