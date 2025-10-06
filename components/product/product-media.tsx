'use client';

import { ExternalVideo, Media, MediaImage, Video } from 'lib/shopify/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ProductMediaProps {
  media: Media;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

export function ProductMedia({ 
  media, 
  alt, 
  className = '', 
  priority = false,
  fill = false,
  sizes,
  width,
  height
}: ProductMediaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video on hover for product tiles
  useEffect(() => {
    if (media.mediaContentType === 'VIDEO' && videoRef.current) {
      if (isHovered && !isPlaying) {
        videoRef.current.play().catch(() => {
          // Ignore autoplay errors
        });
        setIsPlaying(true);
      } else if (!isHovered && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isHovered, isPlaying, media.mediaContentType]);

  // Handle different media types
  switch (media.mediaContentType) {
    case 'IMAGE': {
      const mediaImage = media as MediaImage;
      return (
        <Image
          src={mediaImage.image.url}
          alt={alt}
          {...(fill ? {} : { 
            width: width || mediaImage.image.width, 
            height: height || mediaImage.image.height 
          })}
          className={className}
          priority={priority}
          fill={fill}
          sizes={sizes}
        />
      );
    }

    case 'VIDEO': {
      const video = media as Video;
      const bestSource = video.sources.find(source => source.format === 'mp4') || video.sources[0];
      
      if (!bestSource) return null;

      return (
        <div 
          className="relative w-full h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            ref={videoRef}
            className={`${className} object-cover`}
            width={width || bestSource.width}
            height={height || bestSource.height}
            loop
            muted
            playsInline
            preload="metadata"
            style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
          >
            <source src={bestSource.url} type={bestSource.mimeType} />
            Your browser does not support the video tag.
          </video>
          
          {/* Play button overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-gray-800 ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      );
    }

    case 'EXTERNAL_VIDEO': {
      const externalVideo = media as ExternalVideo;
      return (
        <div className="relative w-full h-full">
          <iframe
            src={externalVideo.embeddedUrl}
            className={className}
            width={width || 400}
            height={height || 400}
            frameBorder="0"
            allowFullScreen
            title={alt}
            style={fill ? { width: '100%', height: '100%' } : undefined}
          />
        </div>
      );
    }

    default:
      return null;
  }
}

// Utility function to get the first media item (image or video)
export function getFirstMediaItem(media: Media[]): Media | null {
  return media.length > 0 ? media[0]! : null;
}

// Utility function to get all images from media array
export function getImagesFromMedia(media: Media[]): MediaImage[] {
  return media.filter((item): item is MediaImage => item.mediaContentType === 'IMAGE');
}

// Utility function to get all videos from media array
export function getVideosFromMedia(media: Media[]): (Video | ExternalVideo)[] {
  return media.filter((item): item is Video | ExternalVideo => 
    item.mediaContentType === 'VIDEO' || item.mediaContentType === 'EXTERNAL_VIDEO'
  );
}
