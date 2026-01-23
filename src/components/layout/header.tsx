"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className={cn("sticky top-0 z-50", "glass border-b border-border")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-text group-hover:text-primary transition-colors">
              ShopPro
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-text-muted hover:text-text transition-colors"
            >
              Products
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-text-muted hover:text-text transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-text-muted hover:text-text transition-colors"
            >
              Deals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2",
                "bg-surface border border-border rounded-xl",
                "text-sm text-text-muted",
                "hover:border-border-hover hover:text-text",
                "transition-all duration-200",
                "hidden sm:flex",
              )}
            >
              <SearchIcon />
              <span>Search...</span>
              <kbd className="hidden lg:inline-flex px-2 py-0.5 text-xs bg-surface-hover rounded">
                ⌘K
              </kbd>
            </button>

            {/* Cart Button */}
            <button
              className={cn(
                "relative flex items-center justify-center",
                "w-10 h-10 rounded-xl",
                "bg-surface border border-border",
                "text-text-muted hover:text-text hover:border-border-hover",
                "transition-all duration-200",
              )}
            >
              <CartIcon />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L11.1 11.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 17.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667C8.33333 16.2064 7.96024 15.8333 7.5 15.8333C7.03976 15.8333 6.66667 16.2064 6.66667 16.6667C6.66667 17.1269 7.03976 17.5 7.5 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 17.5C16.2936 17.5 16.6667 17.1269 16.6667 16.6667C16.6667 16.2064 16.2936 15.8333 15.8333 15.8333C15.3731 15.8333 15 16.2064 15 16.6667C15 17.1269 15.3731 17.5 15.8333 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66667 2.5H4.16667L6.36667 12.0333C6.44557 12.3937 6.65221 12.7146 6.94918 12.9389C7.24615 13.1632 7.61395 13.2765 7.98333 13.2583H15.4167C15.786 13.2765 16.1538 13.1632 16.4508 12.9389C16.7478 12.7146 16.9544 12.3937 17.0333 12.0333L18.3333 5.83333H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
