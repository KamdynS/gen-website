"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const TOTAL_IMAGES = 470;
const GRID_SIZE = 4;
const MAX_ACTIVE_IMAGES = 9;
const IMAGE_DISPLAY_TIME = 7500; // 7.5 seconds
const FADE_DURATION = 500; // 0.5 seconds for fade in/out
const MAX_RETRIES = 3; // Maximum number of retries for loading an image

interface ImageItem {
  id: string;
  src: string;
  cellIndex: number;
}

// New component for full-screen view
const FullScreenImage: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={src}
          alt="Full-screen gallery image"
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-60 text-white text-4xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
        aria-label="Close full-screen view"
      >
        &times;
      </button>
    </div>
  );
};

const GalleryCell: React.FC<{ image: ImageItem; onRemove: () => void; onImageClick: (src: string) => void }> = ({ image, onRemove, onImageClick }) => {
  const [opacity, setOpacity] = useState(0);
  const [imageSrc, setImageSrc] = useState(image.src);
  const [retryCount, setRetryCount] = useState(0);

  const getRandomImageSrc = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
    return `/images/image${randomNumber}.jpg`;
  }, []);

  const handleImageError = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      setImageSrc(getRandomImageSrc());
      setRetryCount(prev => prev + 1);
    } else {
      console.error(`Failed to load image after ${MAX_RETRIES} attempts`);
      onRemove();
    }
  }, [retryCount, getRandomImageSrc, onRemove]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const fadeInTimer = setTimeout(() => setOpacity(1), 50);
      const removeTimer = setTimeout(() => {
        setOpacity(0);
        setTimeout(onRemove, FADE_DURATION);
      }, IMAGE_DISPLAY_TIME - FADE_DURATION);
      
      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(removeTimer);
      };
    });
    
    return () => cancelAnimationFrame(handle);
  }, [onRemove]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
      style={{
        opacity,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
      onClick={() => onImageClick(imageSrc)}
    >
      <Image
        src={imageSrc}
        alt="Gallery image"
        fill
        sizes="100vw"
        style={{ objectFit: 'contain' }}
        onError={handleImageError}
      />
    </div>
  );
};

const DynamicImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [fullScreenSrc, setFullScreenSrc] = useState<string | null>(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  const getRandomImageSrc = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
    return `/images/image${randomNumber}.jpg`;
  }, []);

  const addImage = useCallback(() => {
    if (images.length >= MAX_ACTIVE_IMAGES) return;

    const availableCells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i)
      .filter(i => !images.some(img => img.cellIndex === i));

    if (availableCells.length === 0) return;

    const cellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const newImage: ImageItem = {
      id: Date.now().toString(),
      src: getRandomImageSrc(),
      cellIndex,
    };

    setImages(prev => [...prev, newImage]);
  }, [images, getRandomImageSrc]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const handleImageClick = useCallback((src: string) => {
    setFullScreenSrc(src);
    setIsTimerPaused(true);
  }, []);

  const handleCloseFullScreen = useCallback(() => {
    setFullScreenSrc(null);
    setIsTimerPaused(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isTimerPaused) {
      interval = setInterval(() => {
        if (images.length < MAX_ACTIVE_IMAGES) {
          addImage();
        }
      }, 1000); // Try to add a new image every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [addImage, images.length, isTimerPaused]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-4">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <div key={index} className="relative">
            {images.find(img => img.cellIndex === index) && (
              <GalleryCell
                image={images.find(img => img.cellIndex === index)!}
                onRemove={() => removeImage(images.find(img => img.cellIndex === index)!.id)}
                onImageClick={handleImageClick}
              />
            )}
          </div>
        ))}
      </div>
      {fullScreenSrc && (
        <FullScreenImage src={fullScreenSrc} onClose={handleCloseFullScreen} />
      )}
    </>
  );
};

export default DynamicImageGallery;