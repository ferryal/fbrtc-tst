import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className={cn("border-t border-border mt-auto")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
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
              <span className="text-xl font-bold text-text">ShopPro</span>
            </Link>
            <p className="text-sm text-text-muted">
              Premium products at the best prices. Shop with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Products", "Categories", "Deals", "New Arrivals"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Support</h3>
            <ul className="space-y-3">
              {["FAQ", "Shipping", "Returns", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Newsletter</h3>
            <p className="text-sm text-text-muted mb-4">
              Subscribe for exclusive deals and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  "flex-1 px-4 py-2",
                  "bg-surface border border-border rounded-xl",
                  "text-sm text-text placeholder:text-text-subtle",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                  "transition-all duration-200",
                )}
              />
              <button
                type="submit"
                className={cn(
                  "px-4 py-2",
                  "bg-primary text-white rounded-xl",
                  "text-sm font-medium",
                  "hover:bg-primary-hover",
                  "transition-colors duration-200",
                )}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} ShopPro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <Link
                key={link}
                href="/"
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
