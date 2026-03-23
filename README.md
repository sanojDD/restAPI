```markdown
# 🛒 RestAPI MVC - E-Commerce Backend

A robust, secure, and scalable **E-Commerce REST API** built with **Node.js**, **Express**, and **MongoDB**.
This project follows the **MVC (Model-View-Controller)** architectural pattern and features a
 complete Authentication and Authorization system.

---

## 🚀 Features

* **User Authentication:** Secure registration and login using **JWT (JSON Web Tokens)**.
* **Password Security:** Industry-standard password hashing using **Bcrypt**.
* **Role-Based Access Control (RBAC):** Middleware to differentiate between `Regular Users` and `Admins`.
* **Relational Data Mapping:** Products are linked to the Admin who created them using **Mongoose Population**.
* **Validation Layer:** Strict request body validation powered by **Zod**.
* **Global Error Handling:** Custom middleware to catch asynchronous errors and format clean JSON responses.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose ODM
* **Security:** JWT (jsonwebtoken), Bcryptjs
* **Validation:** Zod
* **Environment Management:** Dotenv

---

## 📂 Project Structure

```text
├── config/             # Database connection (db.js)
├── controllers/        # Business logic (authController, productController)
├── middleware/         # Auth, Admin check, and Global Error handlers
├── models/             # Mongoose Schemas (userModel, productModel)
├── routes/             # API Endpoints (userRoutes, productRoutes)
├── utils/              # Helper functions (generateToken.js)
├── .env                # Environment variables (Sensitive - Git Ignored)
├── index.js            # Server entry point
└── package.json        # Project dependencies and scripts
```

---

## 🚦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/sanojDD/restAPI.git](https://github.com/sanojDD/restAPI.git)
cd mvc
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory and add your credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 3. Run the Server
```bash
# Run with Nodemon (Development)
npm run dev

# Run normally
npm start
```

---

## 🛣️ API Endpoints

### 🔐 User & Auth
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/users` | Register a new user | Public |
| POST | `/api/users/login` | Login & receive JWT | Public |

### 📦 Products
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/products` | Get all products (with Owner details) | Public |
| GET | `/api/products/:id` | Get single product details | Public |
| POST | `/api/products` | Create a new product | **Admin Only** |
| PUT | `/api/products/:id` | Update an existing product | **Admin Only** |
| DELETE | `/api/products/:id` | Remove a product | **Admin Only** |

---

## ✅ Development Roadmap
- [x] Basic MVC Architecture
- [x] MongoDB Connection Setup
- [x] JWT Authentication & Protected Routes
- [x] Admin Role Authorization
- [x] Mongoose Relationship (Product -> User)
- [ ] Image Upload Integration (Cloudinary)
- [ ] Shopping Cart & Order Logic
- [ ] Deployment to Render/Heroku

---

Developed by **Sanoj Dahal**
```
