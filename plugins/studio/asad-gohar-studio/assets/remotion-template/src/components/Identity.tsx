import React from 'react';
import { Img, staticFile } from 'remotion';
import { BRAND } from '../brand';
import { COLORS, FONTS, GRADIENT } from '../theme';

/**
 * The avatar: a photo when one exists, otherwise the initials. The fallback is
 * the point. `brand.profile.json` ships with `photo: null` because there is no
 * headshot in this repo, and a missing <Img> would fail the render rather than
 * degrade. Drop a square photo at public/profile.jpg and set the field.
 */
export const Avatar: React.FC<{ size: number }> = ({ size }) => {
  const initials = BRAND.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: GRADIENT.brand,
        padding: size * 0.045,
        display: 'flex',
        boxShadow: `0 ${size * 0.07}px ${size * 0.3}px ${COLORS.accent}55`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: COLORS.surface,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {BRAND.photo ? (
          <Img
            src={staticFile(BRAND.photo)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontFamily: FONTS.family,
              fontWeight: FONTS.heading,
              fontSize: size * 0.4,
              letterSpacing: '0.02em',
              color: COLORS.accent2,
            }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
};

/** Avatar plus name, with the role either beside it or underneath. */
export const Identity: React.FC<{
  size: number;
  stacked?: boolean;
  nameSize: number;
  roleSize: number;
}> = ({ size, stacked = false, nameSize, roleSize }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: 'center',
      gap: size * (stacked ? 0.28 : 0.24),
    }}
  >
    <Avatar size={size} />
    <div style={{ textAlign: stacked ? 'center' : 'left' }}>
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.heading,
          fontSize: nameSize,
          color: COLORS.text,
          letterSpacing: FONTS.letterSpacingHeading,
          lineHeight: 1.1,
        }}
      >
        {BRAND.name}
      </div>
      <div
        style={{
          fontFamily: FONTS.family,
          fontWeight: FONTS.medium,
          fontSize: roleSize,
          color: COLORS.dim,
          marginTop: roleSize * 0.35,
        }}
      >
        {BRAND.designation}
      </div>
    </div>
  </div>
);
