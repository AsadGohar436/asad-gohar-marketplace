import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { AUDIO } from './audio.config';
import { COLORS, TIMING } from './theme';
import { VIDEO, type VideoProps } from './video.config';
import { VideoBeat, VideoIntro, VideoOutro } from './components/VideoScenes';

/**
 * The cut. Scenes in order, cross-dissolves between them, music underneath.
 *
 * The dissolve is the only transition on purpose: a slide or a wipe makes a
 * short piece feel busy, and every scene already carries its own entrance.
 */

const Music: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  if (!AUDIO.file) return null;

  const fadeIn = Math.max(1, Math.round(AUDIO.fadeInSec * fps));
  const fadeOut = Math.max(1, Math.round(AUDIO.fadeOutSec * fps));

  return (
    <Audio
      src={staticFile(AUDIO.file)}
      loop={AUDIO.loop}
      startFrom={Math.round(AUDIO.startFromSec * fps)}
      volume={(f) =>
        AUDIO.volume *
        interpolate(f, [0, fadeIn], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }) *
        interpolate(f, [durationInFrames - fadeOut, durationInFrames], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      }
    />
  );
};

export const StudioVideo: React.FC<VideoProps> = (props) => {
  const scenes = props.scenes?.length ? props.scenes : VIDEO.scenes;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <TransitionSeries>
        {scenes.map((scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={scene.durationInFrames}>
              {scene.kind === 'intro' ? (
                <VideoIntro {...scene} />
              ) : scene.kind === 'beat' ? (
                <VideoBeat {...scene} />
              ) : (
                <VideoOutro {...scene} />
              )}
            </TransitionSeries.Sequence>
            {i < scenes.length - 1 ? (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TIMING.transitionOverlap })}
              />
            ) : null}
          </React.Fragment>
        ))}
      </TransitionSeries>
      <Music />
    </AbsoluteFill>
  );
};
