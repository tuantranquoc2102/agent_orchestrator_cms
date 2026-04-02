// Test run command: pytest tests/auth.test.py
import pytest
from fastapi.testclient import TestClient
from src.modules.auth.auth.routes import app

client = TestClient(app)

@pytest.fixture
def setup():
    # Setup code (e.g., mock database)
    yield
    # Teardown code (e.g., clear mock database)

def test_register_success(setup):
    response = client.post("/api/auth/register", json={"username": "testuser", "email": "test@example.com", "password": "password123"})
    assert response.status_code == 201
    assert response.json()["username"] == "testuser"

def test_register_duplicate_username(setup):
    client.post("/api/auth/register", json={"username": "testuser", "email": "test@example.com", "password": "password123"})
    response = client.post("/api/auth/register", json={"username": "testuser", "email": "test2@example.com", "password": "password123"})
    assert response.status_code == 409

def test_register_duplicate_email(setup):
    client.post("/api/auth/register", json={"username": "testuser", "email": "test@example.com", "password": "password123"})
    response = client.post("/api/auth/register", json={"username": "testuser2", "email": "test@example.com", "password": "password123"})
    assert response.status_code == 409

def test_login_success(setup):
    client.post("/api/auth/register", json={"username": "testuser", "email": "test@example.com", "password": "password123"})
    response = client.post("/api/auth/login", json={"username": "testuser", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials(setup):
    response = client.post("/api/auth/login", json={"username": "testuser", "password": "wrongpassword"})
    assert response.status_code == 401

def test_logout_success(setup):
    response = client.post("/api/auth/logout", headers={"Authorization": "Bearer fake_token"})
    assert response.status_code == 200

def test_refresh_token_success(setup):
    response = client.post("/api/auth/refresh-token", headers={"Authorization": "Bearer fake_token"})
    assert response.status_code == 200

def test_refresh_token_unauthorized(setup):
    response = client.post("/api/auth/refresh-token")
    assert response.status_code == 401