"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

const TOTAL_IMAGES = 432;
const GRID_SIZE = 4;
const MAX_ACTIVE_IMAGES = 9;
const IMAGE_DISPLAY_TIME = 15000; // 15 seconds
const FADE_DURATION = 500; // 0.5 seconds for fade in/out

interface ImageItem {
  id: string;
  src: string;
  cellIndex: number;
  startTime: number;
}

function GalleryCell({ image, onRemove }: { image: ImageItem, onRemove: () => void }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setOpacity(1), 50);
    const removeTimer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onRemove, FADE_DURATION);
    }, IMAGE_DISPLAY_TIME - FADE_DURATION);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(removeTimer);
    };
  }, [image.id, onRemove]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: opacity,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      <Image
        src={image.src}
        alt="Gallery image"
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([]);

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
      cellIndex: cellIndex,
      startTime: Date.now(),
    };

    setImages(prev => [...prev, newImage]);
  }, [images, getRandomImageSrc]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length < MAX_ACTIVE_IMAGES) {
        addImage();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [addImage, images.length]);

  const cellImages = useMemo(() => {
    const cells: (ImageItem | null)[] = Array(GRID_SIZE * GRID_SIZE).fill(null);
    images.forEach(img => {
      cells[img.cellIndex] = img;
    });
    return cells;
  }, [images]);

  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-4">
      {cellImages.map((image, index) => (
        <div key={index} className="relative">
          {image && (
            <GalleryCell
              key={image.id}
              image={image}
              onRemove={() => removeImage(image.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}