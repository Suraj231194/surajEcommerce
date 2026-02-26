# SurajHub - Complete Project Structure & Architecture Guide

## 🎯 Project Overview
SurajHub is a **production-ready e-commerce platform** built with modern tech stack:
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + PostgreSQL
- **Design**: Futuristic UI inspired by Flipkart/Amazon
- **Architecture**: Session-based auth, REST API, component-based frontend

---

## 📁 Project Structure

### Frontend (`client/src/`)
```
pages/                    # All user-facing pages
├── Landing.jsx          # First-time visitor landing page (gradient hero, CTAs)
├── Home.jsx             # Homepage after login (featured products, categories)
├── Category.jsx         # Product listing by category with filters
├── ProductDetail.jsx    # Single product page (images, specs, reviews, ratings)
├── Cart.jsx             # Shopping cart with item management
├── Checkout.jsx         # Multi-step checkout (address → payment → confirm)
├── Account.jsx          # User profile overview (quick links to orders/addresses)
├── Orders.jsx           # Order history and tracking
├── Wishlist.jsx         # Saved items for later purchase
├── Admin.jsx            # Admin dashboard (users, sellers, orders, analytics)
├── Seller.jsx           # Seller dashboard (product management, sales)
├── Support.jsx          # Help center with searchable FAQs
├── Contact.jsx          # Contact form and business info
├── PrivacyPolicy.jsx    # Full privacy policy document
├── Login.jsx            # Email + password login
├── Signup.jsx           # User registration
├── Search.jsx           # Product search results
├── OrderSuccess.jsx     # Order confirmation page
└── not-found.jsx        # 404 error page

components/
├── layout/
│   ├── Navbar.jsx       # Sticky header (logo, search, cart, user menu)
│   └── Footer.jsx       # Footer (links, contact, social media)
├── products/
│   ├── ProductCard.jsx  # Reusable product card component
│   ├── ProductGrid.jsx  # Grid layout for products
│   ├── ProductDetail.jsx # Detailed product component
│   ├── FilterSidebar.jsx # Product filters (price, brand, rating)
│   └── SortSelect.jsx   # Sort options
├── cart/
│   └── CartItem.jsx     # Individual cart item
├── checkout/
│   ├── AddressForm.jsx  # Shipping address form
│   ├── PaymentForm.jsx  # Payment method selection
│   └── OrderSummary.jsx # Order total and items
└── ui/                  # shadcn UI components
    ├── button, card, input, accordion, etc.

hooks/
├── useAuth.js           # Auth state (login, logout, user, isAuthenticated)
├── useCart.js           # Cart operations (add, remove, update quantity)
├── use-toast.js         # Toast notification system
└── useProduct.js        # Product data fetching

context/
├── CartContext.jsx      # Global cart state
├── AuthContext.jsx      # Global auth state (if separate)
└── ThemeContext.jsx     # Dark/light theme toggle

lib/
├── queryClient.js       # TanStack Query configuration
├── api.js               # API utility functions
└── utils.js             # Helper functions (format price, validate, etc)

data/
└── products.js          # Mock product data (15 categories, 400+ products)

App.jsx                  # Main app component with routing
main.jsx                 # React entry point
index.css                # Global Tailwind + custom styles
```

### Backend (`server/`)
```
app.ts                   # Express setup (middleware, error handling)
routes.ts                # API route definitions
storage.ts               # Database operations (CRUD via Drizzle ORM)
vite.ts                  # Vite dev server config
```

### Shared
```
shared/schema.ts         # Drizzle ORM schema (users, products, orders, etc)
```

---

## 🔄 User Flow & Journey

### 1️⃣ **New User Journey**
```
Landing Page (hero + CTAs)
    ↓ (click "Get Started")
Signup Form (email, password, name)
    ↓ (create account)
Redirect to Home
    ↓ (authenticated)
Browse Products → Add to Cart → Checkout → Order Placed
```

### 2️⃣ **Product Discovery**
```
Home Page (featured products)
    ↓
Click Category (e.g., "Electronics")
    ↓
Category Page (product grid + filters)
    ↓
Click Product → ProductDetail Page
    ↓
Add to Cart OR View Reviews/Specs
```

### 3️⃣ **Shopping & Checkout**
```
Add Product to Cart
    ↓ (cart badge updates)
Click Cart Icon
    ↓
Cart Page (review items, update qty)
    ↓
"Proceed to Checkout"
    ↓
Step 1: Enter Shipping Address
    ↓
Step 2: Select Payment Method
    ↓
Step 3: Review & Confirm Order
    ↓
Process Payment (Stripe)
    ↓
Order Success Page
```

### 4️⃣ **Post-Purchase**
```
User Account Page (quick links)
    ↓
"My Orders" → Track order status
    ↓
"My Addresses" → Manage shipping addresses
    ↓
"Wishlist" → View saved items
    ↓
"Settings" → Update profile
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup      # Create account
POST   /api/auth/login       # User login
POST   /api/auth/logout      # End session
GET    /api/auth/me          # Get current user
```

### Products
```
GET    /api/products         # List all (with filters/pagination)
GET    /api/products/:id     # Get single product
GET    /api/products/search  # Search by query
GET    /api/categories       # List categories
```

### Cart
```
GET    /api/cart             # Get user's cart
POST   /api/cart/items       # Add to cart
PATCH  /api/cart/items/:id   # Update quantity
DELETE /api/cart/items/:id   # Remove item
```

### Orders
```
POST   /api/orders           # Create order
GET    /api/orders           # Get user's orders
GET    /api/orders/:id       # Get order details
POST   /api/orders/:id/cancel # Cancel order
```

### Payments
```
POST   /api/payments/intent  # Create Stripe intent
POST   /api/payments/confirm # Confirm payment
```

### Admin/Seller
```
GET    /api/admin/analytics  # Platform stats
GET    /api/sellers/dashboard # Seller stats
POST   /api/sellers/products # Upload product
```

### Support
```
GET    /api/support/faqs     # Get FAQ data
POST   /api/support/contact  # Submit contact form
```

---

## 🎨 Design System

### Colors & Styling
- **Primary Color**: Main brand color (buttons, highlights)
- **Accent Color**: Secondary brand color
- **Muted**: Subtle backgrounds and text
- **Destructive**: Delete/error actions (red)

### Key Design Patterns
1. **Glassmorphism**: Backdrop blur on modals, cards, navbar
2. **Gradients**: Vibrant gradients on hero sections, buttons
3. **Shadows**: Elevated shadows on hover for depth
4. **Animations**: Smooth transitions on interactions
5. **Modern**: Clean, minimalist UI with generous spacing

### Components Used
- **shadcn/ui**: Pre-built accessible components
- **Lucide Icons**: Modern icon library
- **Tailwind CSS**: Utility-first styling framework
- **Framer Motion**: Smooth animations (if added)

---

## 🔐 Authentication Flow

### Session-Based Auth
1. User submits email + password on Login page
2. `useAuth().login()` sends request to `/api/auth/login`
3. Backend validates credentials, creates session
4. Session stored in PostgreSQL via `connect-pg-simple`
5. Session ID stored in secure HTTP-only cookie
6. User redirected to homepage (authenticated)
7. Each page checks `useAuth().isAuthenticated`
8. Unauthorized access redirects to login

### Protected Routes
- `/cart`, `/checkout`, `/account`, `/orders`, `/admin`, `/seller` all require authentication
- Automatic redirect to `/login` if not authenticated

---

## 📊 Data Models

### Users
- id, email, password (hashed), firstName, lastName, phone, profileImage, role (user/seller/admin)

### Products
- id, slug, name, description, brand, category, price, discountPrice, images[], stock, specifications, ratingAvg, reviewCount, sellerId

### Orders
- id, orderNumber, userId, items, shippingAddress, subtotal, tax, shipping, total, status, paymentStatus, createdAt

### Cart Items (temporary in session/context)
- productId, quantity, product (full object)

### Reviews
- id, productId, userId, rating, comment, verified (purchased)

### Wishlist
- id, userId, productId, createdAt

### Addresses
- id, userId, fullName, phone, street, city, state, postalCode, isDefault

---

## 🚀 Key Features

### For Users
✅ Browse 15 categories with 400+ products
✅ Search with auto-suggest
✅ Filter by price, brand, rating
✅ Product reviews & ratings
✅ Shopping cart with persistence
✅ Multi-step checkout with Stripe
✅ Order tracking
✅ Wishlist/favorites
✅ Account management
✅ 24/7 support center
✅ Privacy & security documentation

### For Sellers
✅ Product upload & management
✅ Sales dashboard & analytics
✅ Order fulfillment
✅ Inventory management
✅ Seller ratings & reviews

### For Admins
✅ User management
✅ Seller approval & moderation
✅ Order analytics
✅ Platform insights
✅ Coupon/promo management

---

## 🔧 Tech Stack Details

### Frontend
- **React 18**: Component library
- **Vite**: Fast build tool
- **Tailwind CSS**: Styling
- **TanStack Query**: Server state management
- **wouter**: Lightweight router
- **shadcn/ui**: Component library
- **Lucide Icons**: Icons
- **react-hook-form**: Form handling
- **Zod**: Runtime validation

### Backend
- **Express.js**: HTTP server
- **PostgreSQL**: Database (via Neon)
- **Drizzle ORM**: Type-safe queries
- **Stripe**: Payment processing
- **express-session**: Session management
- **bcryptjs**: Password hashing
- **passport.js**: Auth (ready for OAuth)

---

## 📝 File Naming Conventions

### Pages
- **PascalCase** (e.g., `Login.jsx`, `ProductDetail.jsx`)
- **One component per file**
- **No "Page" suffix** in filename (just the page name)

### Components
- **PascalCase** (e.g., `ProductCard.jsx`, `FilterSidebar.jsx`)
- **Folder for related components** (e.g., `products/`, `layout/`)

### Hooks
- **camelCase with "use" prefix** (e.g., `useAuth.js`, `useCart.js`)
- **Exported as custom hooks**

### Utilities/Helpers
- **camelCase** (e.g., `api.js`, `utils.js`)

### Data/Constants
- **camelCase or UPPER_CASE** (e.g., `products.js`, `constants.js`)

---

## 🧪 Testing Checklist

- [ ] User can sign up with valid credentials
- [ ] User can login and stays logged in
- [ ] Products load on homepage
- [ ] Filtering by category works
- [ ] Search finds products
- [ ] Add to cart updates badge
- [ ] Cart persists on page refresh
- [ ] Checkout form validates address
- [ ] Payment processes successfully
- [ ] Order confirmation shows
- [ ] User can view order history
- [ ] Wishlist functionality works
- [ ] Support page loads FAQs
- [ ] Contact form submits
- [ ] Privacy policy is readable
- [ ] Responsive on mobile/tablet
- [ ] Dark mode toggles correctly
- [ ] No console errors

---

## 🚀 Deployment Checklist

- [ ] All env variables set
- [ ] Database migrations completed
- [ ] Stripe keys configured
- [ ] SSL certificate installed
- [ ] Backups scheduled
- [ ] Error logging enabled
- [ ] Performance monitoring active
- [ ] CDN configured for images
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Email notifications working
- [ ] Support contact info verified

---

## 📞 Support & Maintenance

### User Support Pages
- `/support` - FAQs and help center
- `/contact` - Contact form
- `/privacy` - Privacy policy

### Developer Docs
- `client/README.md` - Frontend setup & structure
- `server/README.md` - Backend setup & APIs
- This file - Complete project guide

### Common Issues
- See `client/README.md` and `server/README.md` for detailed troubleshooting

---

## 🎓 Learning Resources

- **React**: Official docs at react.dev
- **Tailwind CSS**: Docs at tailwindcss.com
- **Express**: Docs at expressjs.com
- **PostgreSQL**: Docs at postgresql.org
- **Stripe**: Docs at stripe.com/docs

---

## 📄 License
All rights reserved © SurajHub 2025
