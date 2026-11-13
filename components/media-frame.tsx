import { labels } from "@/content/labels";
import type { Locale } from "@/content/locale";
import { getImageProps } from "next/image";
import type { MediaItem } from "@/content/types";

export function MediaFrame({
  media,
  locale = "pt",
  index,
  priority = false,
}: {
  media: MediaItem;
  locale?: Locale;
  index: string;
  priority?: boolean;
}) {
  const { props } = getImageProps({
    src: media.poster,
    alt: media.alt,
    width: media.width,
    height: media.height,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
  });

  return (
    <figure className="media-frame">
      <div className="media-screen">
        {/* eslint-disable-next-line @next/next/no-img-element -- Os atributos vêm de next/image. */}
        <img
          {...props}
          alt={media.alt}
          srcSet={`${media.poster.replace(".webp", "-720.webp")} 720w, ${media.poster.replace(".webp", "-1440.webp")} 1440w, ${media.poster} ${media.width}w`}
          sizes={
            priority
              ? "(min-width: 1160px) 1080px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
              : "(min-width: 1280px) 700px, (min-width: 960px) 57vw, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
          }
        />
        {media.video && (
          <div
            className="project-video"
            data-video-webm={media.video.webm}
            data-video-mp4={media.video.mp4}
            data-video-poster={media.poster}
            data-video-pause={labels[locale].pause}
            data-video-play={labels[locale].play}
          />
        )}
      </div>
      <figcaption className="mono">
        <span>Fig. {index}</span> — {media.caption}
      </figcaption>
    </figure>
  );
}
