// Run command: pytest tests/auth.test.py
import pytest
from fastapi.testclient import TestClient
from src.modules.auth.auth.routes import app

client = TestClient(app)

@pytest.fixture
def setup():
    # Setup code (e.g., mocking database)
    yield
    # Teardown code (e.g., reset mocks)

def test_register_success(setup):
    response = client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    assert response.status_code == 201
    assert "access_token" in response.json()

def test_register_duplicate_username(setup):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    response = client.post("/api/auth/register", json={"username": "testuser", "password": "testpass2", "email": "test2@example.com"})
    assert response.status_code == 409

def test_login_success(setup):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials(setup):
    response = client.post("/api/auth/login", json={"username": "wronguser", "password": "wrongpass"})
    assert response.status_code == 401

def test_logout_success(setup):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    access_token = login_response.json()["access_token"]
    response = client.post("/api/auth/logout", headers={"Authorization": f"Bearer {access_token}"})
    assert response.status_code == 200

def test_logout_unauthorized(setup):
    response = client.post("/api/auth/logout")
    assert response.status_code == 401

def test_refresh_token_success(setup):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    access_token = login_response.json()["access_token"]
    response = client.post("/api/auth/refresh", headers={"Authorization": f"Bearer {access_token}"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_refresh_token_unauthorized(setup):
    response = client.post("/api/auth/refresh")
    assert response.status_code == 401