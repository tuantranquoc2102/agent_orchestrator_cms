# Project Title & Description

## Blog API

The Blog API is a simple yet powerful backend service built with FastAPI that allows users to register, log in, and manage blog posts. Users can create, read, update, and delete their posts, while the system ensures secure authentication through JWT. The frontend is developed using React and styled with Tailwind CSS, providing a responsive and modern user interface.

# Tech Stack

- **Backend Language/Framework**: Python (FastAPI)
- **Database**: SQLite
- **Frontend Framework**: React
- **CSS**: Tailwind CSS

# Prerequisites

- **Node.js**: v14 or higher
- **Python**: v3.8 or higher
- **SQLite**: Included with Python
- **Package Managers**: 
  - npm (for frontend)
  - pip (for backend)

# Project Structure

```
project-root/
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
│   │   │   ├── posts/
│   │   │   │   ├── posts.routes.py
│   │   │   │   ├── posts.controller.py
│   │   │   │   └── posts.service.py
│   │   │   └── users/
│   │   │       ├── users.routes.py
│   │   │       ├── users.controller.py
│   │   │       └── users.service.py
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── PostList.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── CreatePost.jsx
│   │   └── components/
│   │       ├── Layout.jsx
│   │       └── PostCard.jsx
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

3. Create a `.env` file with the following variables:
   ```
   PORT=8000
   DATABASE_URL=sqlite:///./test.db
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:3000
   ```

4. Run migrations (if applicable):
   ```bash
   # Assuming you have a migration tool set up
   alembic upgrade head
   ```

5. Start the server:
   ```bash
   uvicorn src.main:app --reload
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

3. Create a `.env` file with the following variable:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

# Environment Variables

| Variable          | Description                             |
|-------------------|-----------------------------------------|
| **Backend**       |                                         |
| PORT              | Port for the FastAPI server            |
| DATABASE_URL      | Database connection string              |
| JWT_SECRET        | Secret key for JWT token generation     |
| CORS_ORIGIN       | Allowed origin for CORS                 |
| **Frontend**      |                                         |
| REACT_APP_API_URL | Base URL for API requests               |

# API Endpoints

| Method | Path                     | Description          | Auth Required |
|--------|--------------------------|----------------------|---------------|
| POST   | /api/auth/login          | User login           | No            |
| POST   | /api/auth/register       | User registration     | No            |
| POST   | /api/auth/logout         | User logout          | Yes           |
| POST   | /api/auth/refresh        | Token refresh        | Yes           |
| GET    | /api/posts               | Get all posts        | No            |
| GET    | /api/posts/{id}          | Get post by ID       | No            |
| POST   | /api/posts               | Create a new post    | Yes           |
| PUT    | /api/posts/{id}          | Update a post        | Yes           |
| DELETE | /api/posts/{id}          | Delete a post        | Yes           |

# Authentication

The application uses JWT for authentication. The flow is as follows:

1. **Login**: Users can log in by providing their username and password. Upon successful authentication, a JWT token is returned.
2. **Register**: New users can register by providing a username, password, and email. A new user record is created in the database.
3. **Token Refresh**: Users can refresh their JWT token by sending a request with their current token.

# CORS Configuration

The following origins are allowed to access the API:

- `http://localhost:3000`

To change the allowed origins, modify the `CORS_ORIGIN` variable in the backend `.env` file.

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

# Deployment

For production deployment, ensure that the environment variables are set correctly, and consider using a production-ready server like Gunicorn for the FastAPI backend. The frontend can be built using:

```bash
npm run build
```

Then serve the static files using a web server like Nginx.

# License

MIT