# Luxe Atelier - Premium Designer Clothing E-commerce Platform

A sophisticated luxury fashion e-commerce platform built with Next.js, featuring curated designer collections, premium shopping experiences, and comprehensive third-party integrations.

## 🎨 Design Philosophy

Luxe Atelier embodies minimalist elegance with a focus on high-end fashion photography, generous whitespace, and subtle animations. The platform reflects the sophisticated aesthetic of luxury fashion while maintaining exceptional usability and performance.

### Brand Colors
- **Rich Black**: #010203 - Primary brand color
- **Cream**: #F8F5F0 - Background and accent color  
- **Gold**: #D4AF37 - Luxury accent and CTA color

### Typography
- **Headings**: Didot (Times New Roman fallback) - Elegant serif for luxury appeal
- **Body Text**: Inter (Gotham-inspired) - Clean, readable sans-serif

## 🏗️ Architecture

### Core Technologies
- **Frontend**: Next.js 15.5.2 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom luxury design system
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: Zustand for cart and global state
- **Animations**: Framer Motion for luxury interactions

### Third-Party Integrations
- **CMS**: Contentful for content management
- **E-commerce**: Shopify for product catalog and inventory
- **Payments**: Stripe for secure payment processing
- **Email Marketing**: Klaviyo for customer engagement
- **Shipping**: ShipStation for order fulfillment
- **Reviews**: Yotpo for social proof
- **Analytics**: Google Analytics 4 + Hotjar for insights

## 🚀 Features

### E-commerce Core
- ✅ Product catalog with advanced filtering
- ✅ Shopping cart with persistent state
- ✅ Checkout flow with Stripe integration
- ✅ User accounts and order management
- ✅ Wishlist functionality
- ✅ Search and recommendations

### Luxury Experience
- ✅ Premium product galleries with zoom
- ✅ Designer showcase pages
- ✅ Curated collections
- ✅ VIP program integration
- ✅ Personal styling features
- ✅ Concierge service integration

### Performance & SEO
- ✅ Core Web Vitals optimization
- ✅ Structured data markup
- ✅ Open Graph and Twitter Card meta
- ✅ Sitemap and robots.txt
- ✅ Image optimization and lazy loading
- ✅ CDN integration ready

### Security & Compliance
- ✅ PCI DSS compliant payment processing
- ✅ HTTPS enforcement
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Data privacy protection
- ✅ Security headers implementation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── account/           # User account pages
│   ├── cart/              # Shopping cart page
│   ├── collections/       # Product collections
│   ├── product/           # Product detail pages
│   └── globals.css        # Global styles
├── components/
│   ├── cart/              # Shopping cart components
│   ├── layout/            # Header, Footer, Navigation
│   ├── product/           # Product cards, galleries
│   ├── seo/               # SEO and meta components
│   ├── performance/       # Performance optimization
│   └── ui/                # Reusable UI components
├── lib/
│   ├── integrations/      # Third-party service clients
│   ├── seo/               # SEO utilities and schemas
│   ├── store/             # State management
│   ├── contentful.ts      # Contentful CMS client
│   ├── shopify.ts         # Shopify integration
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
# Core Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Contentful CMS
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
CONTENTFUL_ENVIRONMENT=master

# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
SHOPIFY_ADMIN_ACCESS_TOKEN=your-admin-token

# Stripe
STRIPE_SECRET_KEY=sk_test_your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key

# Marketing & Analytics
KLAVIYO_API_KEY=your-klaviyo-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd luxe-atelier

# Install dependencies
npm install

# Start development server
npm run dev
```

---

*Built with ❤️ for luxury fashion*
