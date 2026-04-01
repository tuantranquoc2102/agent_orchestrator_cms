# Project Title & Description

## Blog API

The Blog API is a web application that allows users to register, log in, and manage blog posts. Users can create, read, update, and delete their posts, while also being able to view posts created by others. The system employs JWT for authentication, ensuring secure access to user-specific resources.

# Tech Stack

- **Backend**: Python (FastAPI)
- **Database**: SQLite
- **Frontend**: React
- **CSS**: Tailwind CSS

# Prerequisites

- **Node.js**: v14 or higher
- **Python**: v3.7 or higher
- **SQLite**: Included with Python
- **Package Managers**: 
  - npm (for frontend)
  - pip (for backend)

# Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.py
│   │   ├── middleware/
│   │   │   ├── auth.py
│   │   │   └── cors.py
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.py
│   │   │   │   ├── auth.controller.py
│   │   │   │   └── auth.service.py
│   │   │   └── posts/
│   │   │       ├── posts.routes.py
│   │   │       ├── posts.controller.py
│   │   │       └── posts.service.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   └── post.py
│   │   └── main.py
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── api.js
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── PostDetail.jsx
    │   └── components/
    │       ├── Layout.jsx
    │       ├── PostForm.jsx
    │       └── PostList.jsx
```

# Getting Started

## Clone the repo

```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
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

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=8000
   DATABASE_URL=sqlite:///./database.db
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:3000
   ```

4. Run migrations (if applicable):
   ```bash
   # Assuming you have a migration setup
   alembic upgrade head
   ```

5. Start the server:
   ```bash
   uvicorn src.main:app --host 0.0.0.0 --port 8000
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

3. Create a `.env` file in the frontend directory with the following variable:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

# Environment Variables

| Variable         | Description                          |
|------------------|--------------------------------------|
| **Backend**      |                                      |
| PORT             | Port for the FastAPI server          |
| DATABASE_URL     | Database connection string            |
| JWT_SECRET       | Secret key for JWT signing           |
| CORS_ORIGIN      | Allowed origin for CORS              |
| **Frontend**     |                                      |
| REACT_APP_API_URL| Base URL for API requests            |

# API Endpoints

| Method | Path                     | Description                     | Auth Required |
|--------|--------------------------|---------------------------------|---------------|
| POST   | /api/auth/register       | User registration               | No            |
| POST   | /api/auth/login          | User login                      | No            |
| POST   | /api/auth/logout         | User logout                     | Yes           |
| POST   | /api/auth/refresh        | Token refresh                   | Yes           |
| GET    | /api/posts               | Get all posts                   | No            |
| GET    | /api/posts/{id}          | Get a single post by ID        | No            |
| POST   | /api/posts               | Create a new post               | Yes           |
| PUT    | /api/posts/{id}          | Update an existing post        | Yes           |
| DELETE | /api/posts/{id}          | Delete a post                   | Yes           |

# Authentication

The application uses JWT (JSON Web Tokens) for authentication. 

- **Login**: Users can log in by providing their username and password. Upon successful authentication, a JWT is returned.
- **Register**: New users can register by providing a username, password, and email. A JWT is issued upon successful registration.
- **Token Refresh**: Users can refresh their JWT by sending a request to the refresh endpoint with their current token.

# CORS Configuration

The application allows requests from the following origin:

- `http://localhost:3000`

To change the allowed origins, modify the `CORS_ORIGIN` variable in the backend `.env` file.

# Running Tests

## Backend tests

To run backend tests, execute the following command in the backend directory:

```bash
pytest
```

## Frontend tests

To run frontend tests, execute the following command in the frontend directory:

```bash
npm test
```

# Deployment

For production deployment, ensure that the backend is served using a production-grade server (e.g., Gunicorn) and that the frontend is built using:

```bash
npm run build
```

Serve the built files using a static file server or integrate with a backend server.

# License

MIT