import { photos, srcSet, src, type PhotoId } from "@/content/photos";

interface Props {
  id: PhotoId;
  sizes?: string;
  className?: string;
  colour?: boolean;
  priority?: boolean;
  alt?: string;
  position?: string;
}

/** A photo with the site-wide treatment (see .photo rules in globals.css). */
export default function Photo({ id, sizes = "50vw", className = "", colour, priority, alt, position }: Props) {
  const p = photos[id];
  return (
    <div className={`photo ${className}`} data-colour={colour ? "true" : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src(p, p.widths[1] ?? p.widths[0])}
        srcSet={srcSet(p)}
        sizes={sizes}
        width={p.w}
        height={p.h}
        alt={alt ?? p.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        style={position ? { objectPosition: position } : undefined}
        draggable={false}
      />
    </div>
  );
}
