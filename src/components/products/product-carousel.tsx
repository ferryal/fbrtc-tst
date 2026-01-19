"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  images: string[];
  title: string;
}

export function ProductCarousel({ images, title }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface glass">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={slidePrev}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2",
                "w-10 h-10 rounded-full",
                "bg-surface/80 backdrop-blur-sm border border-border",
                "flex items-center justify-center",
                "text-text hover:bg-surface-hover hover:border-primary",
                "transition-all duration-200",
                "focus-ring",
              )}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={slideNext}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                "w-10 h-10 rounded-full",
                "bg-surface/80 backdrop-blur-sm border border-border",
                "flex items-center justify-center",
                "text-text hover:bg-surface-hover hover:border-primary",
                "transition-all duration-200",
                "focus-ring",
              )}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border text-sm text-text-muted">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => slideTo(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden",
                "border-2 transition-all duration-200",
                "focus-ring",
                index === currentIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-border-hover",
              )}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
              {index === currentIndex && (
                <motion.div
                  layoutId="thumbnail-indicator"
                  className="absolute inset-0 bg-primary/10"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5L7 10L12 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 5L13 10L8 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
