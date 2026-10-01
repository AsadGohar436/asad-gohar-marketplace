import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';
import { seeded } from './_util';

/**
 * The emerald circuit board: a dark wash, a faint dot grid, and right-angled
 * traces that end in soldered nodes. Generated from a fixed seed, so the same
 * frame is drawn every render and the video does not shimmer.
 *
 * Every trace also carries a slow pulse of light. On a still (one frame) the
 * pulses simply sit wherever frame 0 puts them, which is why nothing here
 * fades in from zero: a still that animates in renders blank.
 */

type Trace = { d: string; len: number; bright: boolean; phase: number };

const buildTraces = (width: number, height: number, count: number): Trace[] => {
  const rnd = seeded(20260919);
  const step = Math.min(width, height) / 14;
  const traces: Trace[] = [];

  for (let i = 0; i < count; i++) {
    // Start on the left or right edge, walk inward in right angles.
    const fromLeft = rnd() > 0.45;
    let x = fromLeft ? -step : width + step;
    let y = Math.round((rnd() * height) / step) * step;
    const dir = fromLeft ? 1 : -1;
    let d = `M ${x} ${y}`;
    let len = 0;
    const legs = 2 + Math.floor(rnd() * 3);

    for (let l = 0; l < legs; l++) {
      const run = step * (1 + Math.floor(rnd() * 3));
      x += run * dir;
      d += ` L ${x} ${y}`;
      len += run;
      const rise = step * (1 + Math.floor(rnd() * 2)) * (rnd() > 0.5 ? 1 : -1);
      y += rise;
      d += ` L ${x} ${y}`;
      len += Math.abs(rise);
    }
    traces.push({ d, len, bright: rnd() > 0.68, phase: rnd() });
  }
  return traces;
};

export const CircuitBackground: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const traces = useMemo(() => buildTraces(width, height, 16), [width, height]);
  const nodeR = Math.min(width, height) * 0.006;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* emerald wash, brightest where the copy starts */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 30% 22%, ${COLORS.card} 0%, ${COLORS.surface} 48%, ${COLORS.bg} 100%)`,
        }}
      />
      {/* faint dot grid, masked so the edges stay calm */}
      <AbsoluteFill
        style={{
          opacity: 0.45 * intensity,
          backgroundImage: `radial-gradient(${COLORS.borderLight} 1px, transparent 1px)`,
          backgroundSize: `${Math.round(Math.min(width, height) / 27)}px ${Math.round(
            Math.min(width, height) / 27
          )}px`,
          maskImage: 'radial-gradient(circle at 50% 45%, black 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 25%, transparent 78%)',
        }}
      />
      <AbsoluteFill style={{ opacity: 0.9 * intensity }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <filter id="trace-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation={nodeR * 1.6} result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {traces.map((t, i) => {
            // The pulse is a short dash chasing the full trace length.
            const travel = (t.phase + frame / 220) % 1;
            return (
              <g key={i}>
                <path
                  d={t.d}
                  fill="none"
                  stroke={t.bright ? COLORS.accent : COLORS.border}
                  strokeWidth={t.bright ? nodeR * 0.5 : nodeR * 0.35}
                  strokeLinecap="square"
                  opacity={t.bright ? 0.5 : 0.75}
                />
                <path
                  d={t.d}
                  fill="none"
                  stroke={COLORS.accent2}
                  strokeWidth={nodeR * 0.55}
                  strokeLinecap="round"
                  filter="url(#trace-glow)"
                  strokeDasharray={`${t.len * 0.12} ${t.len * 1.2}`}
                  strokeDashoffset={-travel * (t.len * 1.32)}
                  opacity={0.55}
                />
              </g>
            );
          })}
          {traces.map((t, i) => {
            const end = t.d.slice(t.d.lastIndexOf('L') + 1).trim().split(/\s+/);
            const cx = Number(end[0]);
            const cy = Number(end[1]);
            if (!Number.isFinite(cx) || !Number.isFinite(cy)) return null;
            return (
              <circle
                key={`n${i}`}
                cx={cx}
                cy={cy}
                r={nodeR}
                fill={COLORS.bg}
                stroke={t.bright ? COLORS.accent2 : COLORS.accent}
                strokeWidth={nodeR * 0.45}
                opacity={t.bright ? 0.9 : 0.55}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
      {/* one soft emerald bloom, top left, so the frame is not evenly lit */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 18% 12%, ${COLORS.accentDeep}33 0%, transparent 46%)`,
        }}
      />
      {/* A scrim, so the traces stay behind the copy instead of running through
          it. Without this a node lands on the footer and the text stops reading,
          which is the usual way a decorative background ruins a frame. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.bg}cc 0%, ${COLORS.bg}a6 40%, ${COLORS.bg}b8 72%, ${COLORS.bg}e0 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
