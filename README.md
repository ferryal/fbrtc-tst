# Product Page Optimization

A high-performance, Dribbble-style e-commerce product catalog built with Next.js 15 App Router.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Product List Page** - SSR-rendered with category filtering, price sorting, and infinite scroll
- **Product Detail Page** - ISR-enabled with image carousel and customer reviews
- **Premium Dark Theme** - Dribbble-style UI with glassmorphism and gradient effects
- **Performance Optimized** - Reduced TTFB, FCP, and TTI through various techniques

## 🛠 Tech Stack

| Technology                  | Purpose                                 |
| --------------------------- | --------------------------------------- |
| **Next.js 16** (App Router) | Framework with RSC, SSR, ISR            |
| **TypeScript**              | Type safety                             |
| **Base UI**                 | Accessible unstyled components          |
| **TailwindCSS 4**           | Styling with custom theme               |
| **TanStack Query**          | Data fetching, caching, infinite scroll |
| **Framer Motion**           | Animations                              |
| **Axios**                   | HTTP client                             |
| **Sharp**                   | Image optimization                      |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ferryal/fbrtc-tst
cd fbrtc-tst

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Product list (SSR + Infinite Scroll)
│   ├── loading.tsx           # Loading skeleton
│   └── products/[id]/        # Product detail (ISR)
├── components/
│   ├── ui/                   # Base UI components
│   │   ├── button.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   ├── products/             # Product components
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-filters.tsx
│   │   ├── product-carousel.tsx
│   │   └── infinite-product-list.tsx
│   └── layout/               # Layout components
│       ├── header.tsx
│       └── footer.tsx
└── lib/
    ├── api/                  # Axios + API functions
    ├── hooks/                # TanStack Query hooks
    ├── providers/            # React Query provider
    ├── types/                # TypeScript interfaces
    └── utils/                # Utility functions
```

## ⚡ Performance Optimizations

### 1. Server-Side Rendering (TTFB)

- React Server Components for initial data fetch
- ISR with 5-minute revalidation for product pages
- `generateStaticParams` pre-renders top 20 products

### 2. Image Optimization (FCP)

- Next.js `<Image>` with Sharp for automatic optimization
- AVIF/WebP formats with responsive sizing
- Blur placeholders for perceived loading speed

### 3. Data Caching (TTI)

- TanStack Query with 1-minute staleTime
- Infinite scroll with `useInfiniteQuery`
- SSR-safe query client initialization

### 4. Code Splitting

- Component-level code splitting
- Suspense boundaries with skeleton loading
- Streaming SSR for faster perceived loads

## 🔌 API

This project uses the [DummyJSON Products API](https://dummyjson.com/docs/products):

- `GET /products` - Get all products (with pagination)
- `GET /products/{id}` - Get single product
- `GET /products/categories` - Get all categories
- `GET /products/category/{slug}` - Get products by category

## 📄 License

This project is licensed under the MIT License.
