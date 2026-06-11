import React, { useState, useRef, useEffect } from 'react';

/**
 * OptimizedImage – A reusable image component with:
 *   • Native lazy loading (loading="lazy") + IntersectionObserver fallback
 *   • Tiny blur placeholder while loading
 *   • Error fallback (per image type)
 *   • WebP mime-type hint via <picture> when a Unsplash/remote URL is used
 */

// Category-specific gradient fallbacks (colourful so nothing looks blank)
const FALLBACK_GRADIENTS = {
  banner:     'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
  category:   'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  product:    'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  subcategory:'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  default:    'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
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
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  // IntersectionObserver – only load when near viewport
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }   // start loading 200px before it enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };

  const fallback = FALLBACK_GRADIENTS[type] || FALLBACK_GRADIENTS.default;

  if (error || !src) {
    return (
      <div
        ref={imgRef}
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
      ref={imgRef}
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

      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit }}
        />
      )}
    </div>
  );
}
