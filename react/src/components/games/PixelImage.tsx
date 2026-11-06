import type { CSSProperties } from 'react';
import type { GameArt } from '../../games/types';
import { gameAssetUrl } from '../../games/assets';

interface PixelImageProps {
  art: GameArt;
  /** Whole-number scales of the art's own size: phones, then 640px and up, then 1024px and up. */
  scales: readonly [number, number?, number?];
  className?: string;
  eager?: boolean;
}

/** Pixel art at a whole-number scale, drawn with hard edges (see .pixel-art in index.css). */
export default function PixelImage({ art, scales, className = '', eager = false }: PixelImageProps) {
  const [s1, s2 = s1, s3 = s2] = scales;
  const style = {
    '--px-w': art.w,
    '--px-h': art.h,
    '--px-s1': s1,
    '--px-s2': s2,
    '--px-s3': s3,
  } as CSSProperties;
  return (
    <img
      src={gameAssetUrl(art.src)}
      alt={art.alt}
      width={art.w * s1}
      height={art.h * s1}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`pixel-art ${className}`}
      style={style}
    />
  );
}
