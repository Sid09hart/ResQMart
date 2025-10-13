# ResQMart 🛍️♻️

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

A hyper-local marketplace connecting small sellers with buyers to rescue expiring goods, reduce food waste, and save money.


## 🎯 Problem Statement

Every day, small local stores, bakeries, and grocers are forced to throw away perfectly good food that is nearing its expiry date. This results in significant financial loss for the sellers and a massive environmental impact from food waste. At the same time, consumers are always looking for ways to save money on quality goods. ResQMart bridges this gap by creating a win-win platform for both sellers and buyers.

## ✨ Key Features

### For Buyers 🛒
- **Geo-aware Browsing:** Discover deals on expiring products from local stores within a specific radius.
- **Advanced Filtering & Sorting:** Filter products by category and distance, and sort by price or expiry date.
- **Product Details:** View detailed information, seller location on an interactive map, and stock availability.
- **User Authentication:** Secure registration and login for a personalized experience.
- **Shopping Cart:** Add items to a cart and manage them in a sleek, slide-out drawer.
- **Checkout Flow:** A complete checkout process with options for "Store Pickup" or "Home Delivery" and a simulated payment.
- **User Dashboard:** View your complete order history.
- **Wishlist:** Save out-of-stock or expired items to be notified later.

### For Sellers 🏪
- **Secure Registration:** Onboard as a "buyer" and apply to become a verified seller through an admin-approved process.
- **Protected Routes:** Only authenticated and verified sellers can access seller-specific features.
- **Product Upload:** An easy-to-use, multi-step form to list a new product, including image upload, expiry date, and pinpointing the location on a map.
- **Inventory Management:** Product quantities are automatically decremented after a successful purchase.
- **Seller Dashboard:** View all personal product listings.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Animation:** Framer Motion
- **Routing:** React Router
- **API Communication:** Axios
- **Mapping:** React Leaflet

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Image Storage:** Cloudinary
- **File Handling:** Multer
- **Email Service:** Nodemailer (with SendGrid)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm
- A MongoDB database (local or via Atlas)
- A Cloudinary account
- A SendGrid account (for email verification)

### Backend Setup

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/ResQMart.git](https://github.com/your-username/ResQMart.git)
    ```
2.  Navigate to the backend directory:
    ```bash
    cd ResQMart/Backend
    ```
3.  Install NPM packages:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the `Backend` root and add the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL_HOST=smtp.sendgrid.net
    EMAIL_PORT=587
    EMAIL_USER=apikey
    EMAIL_PASS=your_sendgrid_api_key
    EMAIL_FROM="ResQMart <your-verified-sender@example.com>"
    ```
5.  Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🔮 Future Scope

This project has a solid MVP foundation. Future enhancements could include:
- **Real Payment Integration:** Swapping the mock payment system with a real Stripe integration.
- **Trust & Review System:** Allowing buyers to rate and review sellers after a purchase.
- **AI Smart Pricing:** An engine to suggest optimal discounts based on demand and time left.
- **Progressive Web App (PWA):** Adding offline capabilities and push notifications.
