import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * The ribbon on its own, transparent. iOS supplies the rounded corners and
 * refuses alpha in the icon itself, so the pink ground is painted below rather
 * than baked into this mark.
 */
const RIBBON =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTEuNiAyOC42IEwxNiAxOS40IEMxOS4xIDE1LjggMjAuNiAxMy4zIDE5LjcgMTAuNCBDMTkgOC4xIDE3LjUgNi45IDE2IDcuMSIvPjxwYXRoIGQ9Ik0yMC40IDI4LjYgTDE2IDE5LjQgQzEyLjkgMTUuOCAxMS40IDEzLjMgMTIuMyAxMC40IEMxMyA4LjEgMTQuNSA2LjkgMTYgNy4xIi8+PC9nPjwvc3ZnPg==';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F0307A',
        }}
      >
        <img src={RIBBON} width={124} height={124} alt="" />
      </div>
    ),
    { ...size },
  );
}
