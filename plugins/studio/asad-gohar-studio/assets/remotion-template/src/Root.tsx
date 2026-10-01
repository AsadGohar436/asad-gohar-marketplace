import React from 'react';
import { Composition, type CalculateMetadataFunction } from 'remotion';
import { StudioImage } from './components/StudioImage';
import { StudioVideo } from './StudioVideo';
import { FORMAT, FPS, type FormatName } from './theme';
import { IMAGE, type ImageProps } from './image.config';
import { VIDEO, totalDuration, type VideoProps } from './video.config';

/**
 * Two compositions, three canvas sizes.
 *
 * The size comes from the `format` prop through calculateMetadata rather than
 * from a separate <Composition> per aspect ratio. One registration means one
 * place to change, and `--props='{"format":"story"}'` is enough to move a brief
 * from the feed to a story without touching source.
 */

const sizeOf = (format: FormatName | undefined) => FORMAT[format ?? 'square'] ?? FORMAT.square;

const imageMetadata: CalculateMetadataFunction<ImageProps> = ({ props }) => ({
  ...sizeOf(props.format),
  durationInFrames: 1,
  fps: FPS,
});

const videoMetadata: CalculateMetadataFunction<VideoProps> = ({ props }) => ({
  ...sizeOf(props.format),
  durationInFrames: totalDuration(props.scenes?.length ? props.scenes : VIDEO.scenes),
  fps: FPS,
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Still. Defaults in src/image.config.ts, overridden with --props. */}
      <Composition
        id="Image"
        component={StudioImage}
        defaultProps={IMAGE}
        calculateMetadata={imageMetadata}
        durationInFrames={1}
        fps={FPS}
        width={FORMAT.square.width}
        height={FORMAT.square.height}
      />
      {/* Cut with music. Defaults in src/video.config.ts. */}
      <Composition
        id="Video"
        component={StudioVideo}
        defaultProps={VIDEO}
        calculateMetadata={videoMetadata}
        durationInFrames={totalDuration()}
        fps={FPS}
        width={FORMAT.square.width}
        height={FORMAT.square.height}
      />
    </>
  );
};
