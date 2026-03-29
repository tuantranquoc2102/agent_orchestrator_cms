# Project Title: Blog API

## Description
The Blog API is a web application that allows users to register, log in, and manage blog posts. Users can create, read, update, and delete their posts. The application utilizes JWT for authentication and is designed to be modular, with a clean separation between backend and frontend components.

## Tech Stack
- **Backend**: Python (FastAPI)
- **Database**: SQLite
- **Frontend**: React
- **CSS**: Tailwind CSS

## Prerequisites
- **Node.js**: v14 or higher
- **Python**: v3.7 or higher
- **SQLite**: Pre-installed with Python
- **Package Managers**: 
  - npm (for frontend)
  - pip (for backend)

## Project Structure
```
.
├── backend/
│   └── src/
│       ├── config/
│       │   └── index.py
│       ├── middleware/
│       │   ├── auth.py
│       │   └── cors.py
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── auth.controller.py
│       │   │   ├── auth.routes.py
│       │   │   └── auth.service.py
│       │   └── posts/
│       │       ├── posts.controller.py
│       │       ├── posts.routes.py
│       │       └── posts.service.py
│       ├── models/
│       │   ├── post.py
│       │   └── user.py
│       └── main.py
└── frontend/
    └── src/
        ├── services/
        │   └── api.js
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── PostList.jsx
        │   └── PostDetail.jsx
        └── components/
            ├── Layout.jsx
            ├── PostForm.jsx
            └── PostItem.jsx
```

## Getting Started

### Clone the repo
```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```

### Backend setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `src/` directory with the following variables:
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
   uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend setup
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

## Environment Variables

| Variable         | Description                               |
|------------------|-------------------------------------------|
| **Backend**      |                                           |
| PORT             | The port on which the backend runs       |
| DATABASE_URL     | The database connection string            |
| JWT_SECRET       | Secret key for JWT authentication         |
| CORS_ORIGIN      | Allowed origin for CORS                   |
| **Frontend**     |                                           |
| REACT_APP_API_URL| Base URL for API requests                 |

## API Endpoints

| Method | Path                        | Description                           | Auth Required |
|--------|-----------------------------|---------------------------------------|---------------|
| POST   | /api/auth/register          | User registration                     | No            |
| POST   | /api/auth/login             | User login                            | No            |
| POST   | /api/auth/logout            | User logout                           | Yes           |
| POST   | /api/auth/token/refresh     | Refresh authentication token          | Yes           |
| GET    | /api/posts                  | Get all posts                        | No            |
| GET    | /api/posts/{id}             | Get a single post by ID              | No            |
| POST   | /api/posts                  | Create a new post                    | Yes           |
| PUT    | /api/posts/{id}             | Update an existing post              | Yes           |
| DELETE | /api/posts/{id}             | Delete a post                        | Yes           |

## Authentication
The application uses JWT for authentication. Users can register and log in to receive a token. This token must be included in the Authorization header for protected routes. Users can also refresh their tokens using the refresh endpoint.

## CORS Configuration
The application allows requests from the following origin:
- `http://localhost:3000`

To change the allowed origins, modify the `CORS_ORIGIN` variable in the backend `.env` file.

## Running Tests
### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment
To deploy the application in a production environment, ensure that the backend is served using a production-ready server (e.g., Gunicorn) and that the frontend is built using:
```bash
npm run build
```
Serve the static files from the `build` directory.

## License
MIT