import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@/lib/api/products";
import { ProductCarousel } from "@/components/products/product-carousel";
import { AvailabilityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkeletonProductDetail } from "@/components/ui/skeleton";
import {
  formatPrice,
  formatDiscount,
  formatRating,
  capitalizeWords,
} from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return { title: "Product Not Found" };
  }

  try {
    const product = await getProduct(productId);
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

// Generate static paths for popular products
export async function generateStaticParams() {
  const products = await getProducts({ limit: 20 });
  return products.products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await getProduct(productId);
  } catch {
    notFound();
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRightIcon />
          </li>
          <li>
            <Link
              href={`/?category=${product.category}`}
              className="hover:text-primary transition-colors"
            >
              {capitalizeWords(product.category)}
            </Link>
          </li>
          <li>
            <ChevronRightIcon />
          </li>
          <li className="text-text truncate max-w-[200px]">{product.title}</li>
        </ol>
      </nav>

      {/* Product Content */}
      <Suspense fallback={<SkeletonProductDetail />}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Carousel */}
          <ProductCarousel images={product.images} title={product.title} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                {capitalizeWords(product.category)}
              </span>
              {product.brand && (
                <span className="text-sm text-text-muted">{product.brand}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-text">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < Math.round(product.rating)} />
                ))}
              </div>
              <span className="text-sm text-text-muted">
                {formatRating(product.rating)} ({product.reviews.length}{" "}
                reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-text">
                {formatPrice(discountedPrice)}
              </span>
              {product.discountPercentage > 5 && (
                <>
                  <span className="text-xl text-text-subtle line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="px-2 py-1 text-sm font-bold text-error bg-error/10 rounded-full">
                    {formatDiscount(product.discountPercentage)}
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <AvailabilityBadge status={product.availabilityStatus} />

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-text">Description</h2>
              <p className="text-text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-text">
                Product Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <DetailItem label="SKU" value={product.sku} />
                <DetailItem label="Weight" value={`${product.weight} kg`} />
                <DetailItem label="Stock" value={`${product.stock} units`} />
                <DetailItem
                  label="Min Order"
                  value={`${product.minimumOrderQuantity} pcs`}
                />
                <DetailItem
                  label="Warranty"
                  value={product.warrantyInformation}
                />
                <DetailItem label="Ships" value={product.shippingInformation} />
              </div>
            </div>

            {/* Return Policy */}
            <div className="flex items-center gap-3 p-4 bg-success/10 rounded-xl border border-success/20">
              <CheckCircleIcon />
              <span className="text-sm text-success">
                {product.returnPolicy}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <HeartIcon />
              </Button>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs text-text-muted bg-surface rounded-full border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-text mb-8">
              Customer Reviews
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-text">
                          {review.reviewerName}
                        </p>
                        <p className="text-xs text-text-muted">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < review.rating} small />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </Suspense>
    </div>
  );
}

// Enable ISR for product pages
export const revalidate = 300; // Revalidate every 5 minutes

// Helper Components
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-text-muted">{label}</dt>
      <dd className="font-medium text-text">{value}</dd>
    </div>
  );
}

function StarIcon({ filled, small }: { filled: boolean; small?: boolean }) {
  const size = small ? 14 : 18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(filled ? "text-warning" : "text-text-subtle")}
    >
      <path
        d="M9 1.5L11.0206 6.58213H16.4084L12.1939 9.58574L14.2145 14.6679L9 11.6643L3.78554 14.6679L5.80613 9.58574L1.59161 6.58213H6.97937L9 1.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-text-subtle"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-success"
    >
      <path
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 10L9 12L13 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 17.5C10 17.5 2.5 13 2.5 7.5C2.5 4.5 5 2.5 7.5 2.5C9 2.5 10 3.5 10 3.5C10 3.5 11 2.5 12.5 2.5C15 2.5 17.5 4.5 17.5 7.5C17.5 13 10 17.5 10 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
