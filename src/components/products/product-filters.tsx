"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { capitalizeWords } from "@/lib/utils/format";
import type { Category, SortBy, SortOrder } from "@/lib/types/product";

interface ProductFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentSortBy?: SortBy;
  currentOrder?: SortOrder;
}

export function ProductFilters({
  categories,
  currentCategory = "all",
  currentSortBy = "price",
  currentOrder = "asc",
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for immediate UI feedback
  const [category, setCategory] = useState(currentCategory);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [order, setOrder] = useState(currentOrder);

  // Sync with URL params
  useEffect(() => {
    setCategory(currentCategory);
    setSortBy(currentSortBy);
    setOrder(currentOrder);
  }, [currentCategory, currentSortBy, currentOrder]);

  const updateFilters = useCallback(
    (updates: { category?: string; sortBy?: SortBy; order?: SortOrder }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.category !== undefined) {
        if (updates.category === "all") {
          params.delete("category");
        } else {
          params.set("category", updates.category);
        }
      }

      if (updates.sortBy !== undefined) {
        params.set("sortBy", updates.sortBy);
      }

      if (updates.order !== undefined) {
        params.set("order", updates.order);
      }

      startTransition(() => {
        router.push(`/?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams],
  );

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateFilters({ category: value });
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as SortBy);
    updateFilters({ sortBy: value as SortBy });
  };

  const handleOrderToggle = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    updateFilters({ order: newOrder });
  };

  const handleReset = () => {
    setCategory("all");
    setSortBy("price");
    setOrder("asc");
    startTransition(() => {
      router.push("/", { scroll: false });
    });
  };

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: capitalizeWords(cat.name),
    })),
  ];

  const sortOptions = [
    { value: "price", label: "Price" },
    { value: "title", label: "Name" },
    { value: "rating", label: "Rating" },
  ];

  const hasActiveFilters =
    category !== "all" || sortBy !== "price" || order !== "asc";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-wrap items-center gap-4 p-4",
        "glass rounded-2xl",
        isPending && "opacity-70 pointer-events-none",
      )}
    >
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-muted hidden sm:inline">
          Category:
        </span>
        <Select
          value={category}
          onValueChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="All Categories"
          icon={<CategoryIcon />}
        />
      </div>

      {/* Sort By */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-muted hidden sm:inline">
          Sort by:
        </span>
        <Select
          value={sortBy}
          onValueChange={handleSortByChange}
          options={sortOptions}
          icon={<SortIcon />}
        />
      </div>

      {/* Sort Order Toggle */}
      <Button
        variant="outline"
        size="md"
        onClick={handleOrderToggle}
        className="gap-2"
        aria-label={`Sort ${order === "asc" ? "ascending" : "descending"}`}
      >
        {order === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
        <span className="hidden sm:inline">
          {order === "asc" ? "Low to High" : "High to Low"}
        </span>
      </Button>

      {/* Reset Button */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            variant="ghost"
            size="md"
            onClick={handleReset}
            className="gap-2"
          >
            <ResetIcon />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </motion.div>
      )}

      {/* Loading Indicator */}
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-text-muted ml-auto">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Updating...
        </div>
      )}
    </motion.div>
  );
}

// Icons
function CategoryIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4H14M2 8H14M2 12H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 2L12 6M4 10L8 14L12 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3V13M8 3L4 7M8 3L12 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 13V3M8 13L4 9M8 13L12 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C5.87827 2 4.0129 3.12552 3 4.8M3 2V5H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
