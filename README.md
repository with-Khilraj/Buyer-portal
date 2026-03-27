# 🏘️ Buyer Portal - Real Estate Broker Platform

A full-stack real estate platform allowing brokers to manage users and buyers to save their favorite properties.

## 📁 Project Structure

```text
Buyer-portal/
├── client/          # Frontend (React + Vite)
├── server/          # Backend (Node.js + Express)
├── package.json     # Root configuration (Concurrently)
└── README.md        # This file
```

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: (v18+)
- **MongoDB**: A running instance (local or Atlas)

### 2. Installation
Install dependencies for the root, server, and client:

```bash
# In the root directory
npm install && npm run install-all (if script exists) or manually:
npm install
cd client && npm install
cd .. 
cd server && npm install
```

### 3. Environment Setup
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

## 🏃 Running the Project

### Option A: Concurrent Mode (Recommended)
From the **root directory**, run both the frontend and backend simultaneously:
```bash
npm run dev
```

### Option B: Separate Mode
If you want to run them in separate terminals for better logging:

**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

---

## 🔗 API Overview

- **Auth**: `POST /api/users/signup`, `POST /api/users/login`
- **User**: `GET /api/users/me` (requires token)
- **Products**: `GET /api/products`, `POST /api/products/seed`
- **Favourites**: `GET /api/favourites`, `POST /api/favourites`

## 🛡️ Security Features
- **JWT Protection**: Secured routes with token validation.
- **Rate Limiting**: Protection against brute-force attacks on auth routes.
- **Secure Headers**: Using `helmet` for production-ready security.
- **Zod Validation**: Strict schema enforcement for all incoming data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

