// Command to run tests: pytest tests/
import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

@pytest.fixture
def setup_database():
    # Setup code to mock the database
    yield
    # Teardown code to reset the database

def test_register_success(setup_database):
    response = client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    assert response.status_code == 201
    assert "access_token" in response.json()

def test_register_duplicate_username(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    response = client.post("/api/auth/register", json={"username": "testuser", "password": "testpass2", "email": "test2@example.com"})
    assert response.status_code == 409

def test_login_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials(setup_database):
    response = client.post("/api/auth/login", json={"username": "wronguser", "password": "wrongpass"})
    assert response.status_code == 401

def test_logout_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    response = client.post("/api/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200

def test_logout_unauthorized(setup_database):
    response = client.post("/api/auth/logout")
    assert response.status_code == 401

def test_refresh_token_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    response = client.post("/api/auth/refresh", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_refresh_token_unauthorized(setup_database):
    response = client.post("/api/auth/refresh")
    assert response.status_code == 401