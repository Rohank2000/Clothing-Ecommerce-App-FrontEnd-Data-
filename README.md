# 👕 ClothingApp (Major Project 1 FrontEnd)

> A modern e-commerce App frontend for clothing catalogue — built with React + Vite.

## ✨ Features

- Browse categories, featured collections, and curated picks
- Product listing and detailed product view
- Cart & wishlist synced to backend
- Full address management (add/edit/delete)
- Checkout with order placement
- Order confirmation & order history
- Live product search
- Toast notifications for all actions
- Responsive design (Bootstrap 5)

## 🛠️ Tech Stack

**React 19 · Vite 8 · React Router 7 · Bootstrap 5 · React Context**


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
cd Major_Project_1_Frontend
npm install
Environment Variables
Create a .env file:
BASE_URL=https://your-backend-url.vercel.app
Run Development Server
npm run dev
Build for Production
npm run build
npm run preview

🧭 Routes
Path
/
/category/productlist/:categoryId
/category/productlist/details/:clothingId
/user/wishlist
/user/cart
/user/profile
/user/profile/address
/user/profile/checkout
/user/profile/order-success
/user/profile/orders

🔌 API Endpoints Used
Endpoint
GET /api/fetch/categories
GET /api/fetch/clothing
GET /api/fetch/cart?userId=...
GET /api/fetch/wishlist?userId=...
GET /api/fetch/addresses
POST /api/addresses
POST /api/addresses/:id
DELETE /api/remove/addresses
POST /api/orders

