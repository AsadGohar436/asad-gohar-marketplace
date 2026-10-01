import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // one worker per core

// Room for the webfont fetch plus the still's measure pass on a cold machine,
// so a slow font never fails an otherwise good render.
Config.setDelayRenderTimeoutInMilliseconds(30000);
