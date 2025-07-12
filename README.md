

# 🌾 MyFarm – Direct Farm-to-Buyer Marketplace

## Overview

**MyFarm** is a full-stack web platform that connects **local farmers** directly with **bulk buyers**, eliminating intermediaries to ensure **fair pricing, transparent transactions, and better profit margins** for farmers. The platform emphasizes simplicity and accessibility to serve users with varying levels of digital literacy, particularly in rural areas.

---

## 🔧 Tech Stack

* **Frontend**: React, Redux, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Architecture**: RESTful API

---

## 🚀 Features

* 👨‍🌾 **Farmer Listings**: Farmers can create, update, and manage product listings
* 🛒 **Buyer Dashboard**: Bulk buyers can view and filter products based on categories, pricing, and availability
* 💬 **Direct Messaging**: Enables real-time communication between farmers and buyers
* 📦 **Order Management**: Track order requests and transaction history
* 🌐 **Responsive Design**: Mobile-friendly and accessible UI for rural users
* ⚙️ **Secure & Scalable**: Built with best practices in API security and scalable infrastructure

---

## 📁 Project Structure

```
/myfarm
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/          # Redux store, actions, reducers
│   │   └── App.js
│   └── tailwind.config.js
│
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API route handlers
│   ├── controllers/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🧪 API Endpoints (Backend)

* `POST /api/auth/register` – Register farmer or buyer
* `POST /api/auth/login` – Login
* `GET /api/products` – List all products
* `POST /api/products` – Create a new product listing
* `GET /api/users/:id` – Get user profile

---

## 🛠️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or Atlas cloud instance)
* Yarn or npm

### Installation

1. Clone the repo

```bash
git clone https://github.com/your-username/myfarm.git
cd myfarm
```

2. Set up environment variables

Create a `.env` file in the `/server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

4. Run the development servers

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## ✅ Future Enhancements

* 📍 Geo-location based product recommendations
* 🧾 In-app payments and digital receipts
* 🛡️ Role-based access control (Admin, Farmer, Buyer)
* 🌍 Multi-language support for rural accessibility

---

## 💡 Impact

> Empowered farmers to **increase profits**, **expand market reach**, and **negotiate directly** with buyers by eliminating middlemen. Designed with an intuitive UI for rural users, **MyFarm** bridges the digital gap in agriculture.

---

## 🧑‍💻 Author

**Shubham Mukherjee**
[LinkedIn](https://www.linkedin.com/in/shubham-mukherjee-a851a420a) | [GitHub](https://github.com/shubhamMukherjee2304)

