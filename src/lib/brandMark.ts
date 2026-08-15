// The Race Against Cancers mark: an awareness ribbon, drawn as one continuous
// band that crosses itself below the loop. Kept here as a bare path so the
// static icons (icon.svg) and the generated ones (apple-icon.tsx) stay in sync.
// Coordinates live in a 100 x 100 box, centred with room for the round caps.
export const RIBBON_PATH =
  'M34 88 C39 78 45 68 50 60 C57 54 66 44 66 30 C66 20 59 12 50 12 '
  + 'C41 12 34 20 34 30 C34 44 43 54 50 60 C55 68 61 78 66 88';

export const RIBBON_STROKE_WIDTH = 11;

/** The ribbon as a standalone SVG document, stroked in `color`. */
export function ribbonSvg(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">`
    + `<path d="${RIBBON_PATH}" stroke="${color}" stroke-width="${RIBBON_STROKE_WIDTH}"`
    + ` stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/** Satori (next/og) draws SVG through <img>, not inline elements, so the mark
 *  gets handed to it as a data URI. */
export function ribbonDataUri(color: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(ribbonSvg(color)).toString('base64')}`;
}
