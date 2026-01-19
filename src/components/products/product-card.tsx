"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice, formatDiscount, formatRating } from "@/lib/utils/format";
import { AvailabilityBadge } from "@/components/ui/badge";
import type { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

export function ProductCard({
  product,
  index = 0,
  priority = false,
}: ProductCardProps) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <article
          className={cn(
            "glass glass-hover rounded-2xl overflow-hidden",
            "transform transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-lg",
            "hover:border-primary/30",
          )}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-surface">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGEyExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANV6f1KeijmjnqVp1kKkF4+XEj4G4P1vkfOe8VpwY1MxfYn3gYxg6lJmJTdKn//Z"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Discount Badge */}
            {product.discountPercentage > 5 && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-error text-white text-xs font-bold rounded-full">
                  {formatDiscount(product.discountPercentage)}
                </span>
              </div>
            )}

            {/* Rating Badge */}
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                <StarIcon />
                {formatRating(product.rating)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Category */}
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {product.category.split("-").join(" ")}
            </span>

            {/* Title */}
            <h3 className="font-semibold text-text line-clamp-1 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-text-muted line-clamp-2">
              {product.description}
            </p>

            {/* Price & Availability */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-text">
                  {formatPrice(discountedPrice)}
                </span>
                {product.discountPercentage > 5 && (
                  <span className="text-sm text-text-subtle line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <AvailabilityBadge status={product.availabilityStatus} />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" />
    </svg>
  );
}
