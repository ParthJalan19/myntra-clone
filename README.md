#  Myntra Clone — Fashion E-Commerce Mobile App

A full-stack fashion e-commerce mobile application built with React Native (Expo) and Node.js, replicating core features of Myntra — India's leading fashion retail platform.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native, Expo SDK 54, Expo Router |
| Language | TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JWT + Expo SecureStore |
| Local Storage | AsyncStorage |
| HTTP Client | Axios |
| Icons | Lucide React Native |

---

## Features

### Core Features
-  User Authentication (Login, Signup, Logout)
-  Home Screen with auto-scrolling banners, categories, trending products
-  Product Detail with image carousel, size selector
-  Shopping Bag with quantity management
-  Wishlist
-  Category browsing with subcategory filters
-  Order placement and history
-  User Profile

### Advanced Features (Internship Tasks)
1.  **Recently Viewed** — Tracks and displays recently viewed products in a horizontal carousel
2.  **Save for Later** — Move items between bag and saved section, synced with backend
3.  **You May Also Like** — Product recommendations carousel on product detail page
4.  **In-App Notifications** — Toast banner notifications for order updates and actions
5.  **Dark Mode** — Device-aware theme with manual toggle and persistence
6.  **My Transactions** — Full transaction history with filters, sort, and CSV export

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- MongoDB (local or Atlas)
- Expo Go app on your mobile device

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
MONGO_URI=mongodb://localhost:27017/myntra
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start MongoDB and run the backend:
```bash
# Start MongoDB (Windows)
net start MongoDB

# Start backend
npm run dev
```

### Frontend Setup
```bash
cd myntra-fresh
npm install --legacy-peer-deps
```

Update the `BASE_URL` in your files to match your machine's IP:
```typescript
const BASE_URL = "http://YOUR_IP_ADDRESS:5000";
```

Start the app:
```bash
npx expo start
```

Scan the QR code with Expo Go on your phone.

---

##  Project Structure

```
├── myntra-fresh/               # React Native Frontend
│   ├── app/
│   │   ├── (tabs)/             # Tab screens (Home, Categories, Bag, Wishlist, Profile)
│   │   ├── (auth)/             # Auth screens (Login, Signup)
│   │   ├── product/[id].tsx    # Product detail screen
│   │   ├── category/[id].tsx   # Category screen
│   │   ├── checkout.tsx        # Checkout screen
│   │   ├── orders.tsx          # Orders history
│   │   ├── transactions.tsx    # My transactions
│   │   └── settings.tsx        # Settings
│   ├── context/
│   │   ├── AuthContext.tsx     # Authentication state
│   │   ├── ThemeContext.tsx    # Dark/Light theme
│   │   └── NotificationContext.tsx  # In-app notifications
│   └── utils/
│       ├── storage.ts          # SecureStore helpers
│       ├── recentlyViewed.ts   # Recently viewed tracking
│       └── notifications.ts   # Notification helpers
│
└── backend/                    # Node.js Backend
    ├── models/                 # MongoDB models
    ├── routes/                 # Express route handlers
    └── server.js               # Entry point
```

---

## Database

The project uses MongoDB with the following collections:
- **users** — User accounts and push tokens
- **categories** — 7 product categories with subcategories
- **products** — 46 products across all categories
- **bags** — Shopping cart items per user
- **wishlists** — Wishlisted products per user
- **orders** — Order history
- **saved** — Save for later items

---

## App Screens

| Screen | Description |
|--------|-------------|
| Home | Banners, deals, categories, trending, recently viewed |
| Categories | All categories grid |
| Product Detail | Images, sizes, add to bag/wishlist, recommendations |
| Bag | Cart items, save for later, checkout |
| Wishlist | Saved products |
| Profile | User info, orders, transactions, settings |
| Checkout | Address, payment, order placement |
| Transactions | History, filters, CSV export |
| Settings | Dark mode, account options |

---

## Developed By

Built as part of the **ElevanceSkills Internship Program**
Track: Full-Stack Mobile Development
Year: 2026