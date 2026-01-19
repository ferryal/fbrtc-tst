import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-surface flex items-center justify-center">
          <svg
            className="w-12 h-12 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-text">Product Not Found</h1>
        <p className="text-text-muted max-w-md mx-auto">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It
          may have been removed or the link is incorrect.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
