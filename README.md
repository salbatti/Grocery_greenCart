# GreenCart - Grocery Delivery Frontend

GreenCart is a full-stack grocery delivery application built with React, Vite, Tailwind CSS, Express, and MongoDB-ready APIs. The storefront lets users browse grocery categories, view product details, add items to cart, sign in, place orders, and review order history.

This repository contains the customer-facing frontend.

## Live Demo

- Frontend: https://greencart-store-eight.vercel.app
- Backend API: https://greencart-api.vercel.app
- Backend repository: https://github.com/salbatti/Grocery_greenCart_server

Demo account:

```text
Email: demo@greencart.dev
Password: password123
```

## Features

- Responsive grocery storefront with category sections and best-seller products
- Product details pages with images, pricing, descriptions, and related products
- Cart management with quantity updates, totals, tax calculation, and order summary
- User authentication flow connected to a cookie-based backend session
- Checkout flow for cash on delivery and Stripe-ready online payment fallback
- Order history page showing placed orders and item details
- Production deployment connected to a Vercel-hosted Express API
- Demo product fallback so the store remains browsable if the API is temporarily unavailable

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Vercel

## Local Setup

```bash
npm install
npm run dev
```

Create a `.env` file for local development:

```env
VITE_CURRENCY=₹
VITE_BACKEND_URL=http://127.0.0.1:4000
```

For the deployed app, `VITE_BACKEND_URL` points to the production API.

## Resume Summary

Built and deployed a responsive MERN grocery delivery frontend with product browsing, cart and checkout workflows, user authentication, order history, API integration, and production hosting on Vercel.
