# Project Title & Description

## E-Commerce Platform

This is a modular e-commerce platform that allows users to register, log in, browse products, and place orders. The system is built using FastAPI for the backend and React with Tailwind CSS for the frontend, providing a responsive and dynamic user experience.

---

# Tech Stack

- **Backend**: Python (FastAPI)
- **Database**: PostgreSQL
- **Frontend**: React
- **CSS**: Tailwind CSS

---

# Prerequisites

- **Node.js**: v14 or higher
- **Python**: v3.7 or higher
- **PostgreSQL**: v12 or higher
- **Package Managers**: npm (for frontend), pip (for backend)

---

# Project Structure

```
.
├── backend/
│   └── src/
│       ├── config/
│       │   └── index.py
│       ├── middleware/
│       │   ├── auth.py
│       │   └── cors.py
│       └── modules/
│           ├── auth/
│           │   ├── auth.controller.py
│           │   ├── auth.routes.py
│           │   └── auth.service.py
│           ├── products/
│           │   ├── products.controller.py
│           │   ├── products.routes.py
│           │   └── products.service.py
│           └── orders/
│               ├── orders.controller.py
│               ├── orders.routes.py
│               └── orders.service.py
└── frontend/
    └── src/
        ├── components/
        │   ├── Layout.jsx
        │   └── ProductCard.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── ProductList.jsx
        │   ├── ProductDetail.jsx
        │   └── OrderHistory.jsx
        └── services/
            └── api.js
```

---

# Getting Started

## Clone the repo

```bash
git clone https://github.com/yourusername/e-commerce-platform.git
cd e-commerce-platform
```

## Backend setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=8000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:3000
   ```

4. Run migrations to set up the database:
   ```bash
   alembic upgrade head
   ```

5. Start the server:
   ```bash
   uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
   ```

## Frontend setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory with the following variable:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

---

# Environment Variables

| Variable         | Description                                |
|------------------|--------------------------------------------|
| **Backend**      |                                            |
| PORT             | Port for the FastAPI server                |
| DATABASE_URL     | Connection string for PostgreSQL database   |
| JWT_SECRET       | Secret key for JWT authentication           |
| CORS_ORIGIN      | Allowed origin for CORS                    |
| **Frontend**     |                                            |
| REACT_APP_API_URL| Base URL for API requests                  |

---

# API Endpoints

| Method | Path                     | Description                          | Auth Required |
|--------|--------------------------|--------------------------------------|---------------|
| POST   | /api/auth/register       | User registration                    | No            |
| POST   | /api/auth/login          | User login                           | No            |
| POST   | /api/auth/logout         | User logout                          | Yes           |
| POST   | /api/auth/refresh-token  | Token refresh                        | Yes           |
| GET    | /api/products            | Get all products                     | No            |
| GET    | /api/products/{id}       | Get product by ID                   | No            |
| POST   | /api/orders              | Create a new order                  | Yes           |
| GET    | /api/orders              | Get all orders for the authenticated user | Yes      |

---

# Authentication

The application uses JWT (JSON Web Token) for authentication. 

- **Register**: Users can register by providing a username, email, and password. A JWT is returned upon successful registration.
- **Login**: Users can log in using their credentials. A JWT is returned upon successful login.
- **Token Refresh**: Users can refresh their JWT by sending a request to the refresh token endpoint, which returns a new token.

---

# CORS Configuration

The application allows requests from the following origin:

- `http://localhost:3000`

To change the allowed origins, modify the `CORS_ORIGIN` variable in the backend `.env` file.

---

# Running Tests

## Backend Tests

To run backend tests, navigate to the backend directory and execute:

```bash
pytest
```

## Frontend Tests

To run frontend tests, navigate to the frontend directory and execute:

```bash
npm test
```

---

# Deployment

For production deployment, ensure that the environment variables are set correctly for the backend and frontend. Use a production-ready server for FastAPI (like Gunicorn) and serve the React app using a static file server or a cloud service.

---

# License

MIT License. See [LICENSE](LICENSE) for details.