import React, { useState } from 'react';
import { getImageUrl } from '../../utils/imageHelper';

/**
 * OptimizedImage – A reusable image component with:
 *   • Native lazy loading (loading="lazy")
 *   • Tiny blur placeholder while loading
 *   • Error fallback (per image type)
 *   • Auto URL resolution for relative uploads paths
 */

// Category-specific gradient fallbacks (colourful so nothing looks blank)
const FALLBACK_GRADIENTS = {
  banner:     'linear-gradient(135deg, #4B5320 0%, #2F3E16 100%)',
  category:   'linear-gradient(135deg, #F8F9F5 0%, #E2E8F0 100%)',
  product:    'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
  subcategory:'linear-gradient(135deg, #F8F9F5 0%, #E2E8F0 100%)',
  default:    'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
};

export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  style = {},
  type = 'default',  // 'banner' | 'category' | 'product' | 'subcategory'
  objectFit = 'cover',
  onLoad,
  onError,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const resolvedSrc = getImageUrl(src);
  const fallback = FALLBACK_GRADIENTS[type] || FALLBACK_GRADIENTS.default;

  if (error || !resolvedSrc) {
    return (
      <div
        className={className}
        style={{
          background: fallback,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
        aria-label={alt}
        {...props}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Blur placeholder shown while loading */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: fallback, opacity: 0.35 }}
        />
      )}

      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setError(true);
          onError?.(e);
        }}
        className={`w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit }}
      />
    </div>
  );
}

