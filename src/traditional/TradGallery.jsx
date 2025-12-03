import React, { useState, useEffect, useRef } from 'react';

// Gallery images will be imported here as you add them
// Example: import image1 from '../assets/gallery/image1.jpg';

const galleryImages = [
  // Images will be added here
  // Example structure:
  // {
  //   src: image1,
  //   alt: 'Description of image',
  //   caption: 'Optional caption'
  // }
];

const TradGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items one by one
            galleryImages.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // If no images yet, show placeholder
  if (galleryImages.length === 0) {
    return (
      <section
        ref={sectionRef}
        id="gallery"
        style={{
          padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-3xl) var(--space-lg)',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'var(--font-family-primary)',
          position: 'relative',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-4xl)',
            marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
            color: 'var(--text-primary)',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          📸 Gallery
        </h2>
        
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-3xl)',
            background: 'var(--bg-glass)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border-glow)',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Gallery images coming soon...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-3xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
        position: 'relative',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-4xl)',
          marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        📸 Gallery
      </h2>

      {/* Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? 'repeat(auto-fill, minmax(150px, 1fr))' 
            : 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
        }}
      >
        {galleryImages.map((image, index) => {
          const isVisible = visibleItems.includes(index);
          
          return (
            <div
              key={index}
              onClick={() => openLightbox(image)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.5s ease',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-glow)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              
              {/* Overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: 'var(--space-md)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = 1;
                }}
              >
                {image.caption && (
                  <p style={{
                    color: 'white',
                    fontSize: 'var(--text-sm)',
                    margin: 0,
                  }}>
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 'var(--space-xl)',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              cursor: 'default',
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-xl)',
              }}
            />
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'var(--accent-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              ×
            </button>

            {selectedImage.caption && (
              <p style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 'var(--space-md)',
                fontSize: 'var(--text-base)',
              }}>
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TradGallery;

