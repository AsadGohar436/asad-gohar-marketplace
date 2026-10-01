/**
 * Asad's facts. Read from `brand.profile.json` (the canonical copy) so the
 * mirror in shared/brand/ can never quietly disagree with what gets rendered.
 *
 * To rebrand this studio for someone else: edit brand.profile.json and swap
 * public/profile.jpg. Nothing else needs to change.
 */
import profile from './brand.profile.json';

export const BRAND = profile;
