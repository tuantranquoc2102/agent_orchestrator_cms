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

def test_create_post_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    response = client.post("/api/posts", json={"title": "Test Post", "content": "This is a test post."}, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 201
    assert response.json()["title"] == "Test Post"

def test_create_post_unauthorized(setup_database):
    response = client.post("/api/posts", json={"title": "Test Post", "content": "This is a test post."})
    assert response.status_code == 401

def test_get_all_posts_success(setup_database):
    response = client.get("/api/posts")
    assert response.status_code == 200

def test_get_post_by_id_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    post_response = client.post("/api/posts", json={"title": "Test Post", "content": "This is a test post."}, headers={"Authorization": f"Bearer {token}"})
    post_id = post_response.json()["id"]
    response = client.get(f"/api/posts/{post_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Post"

def test_get_post_by_id_not_found(setup_database):
    response = client.get("/api/posts/999")
    assert response.status_code == 404

def test_update_post_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    post_response = client.post("/api/posts", json={"title": "Test Post", "content": "This is a test post."}, headers={"Authorization": f"Bearer {token}"})
    post_id = post_response.json()["id"]
    response = client.put(f"/api/posts/{post_id}", json={"title": "Updated Post", "content": "This is an updated test post."}, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Post"

def test_update_post_unauthorized(setup_database):
    response = client.put("/api/posts/1", json={"title": "Updated Post", "content": "This is an updated test post."})
    assert response.status_code == 401

def test_delete_post_success(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    post_response = client.post("/api/posts", json={"title": "Test Post", "content": "This is a test post."}, headers={"Authorization": f"Bearer {token}"})
    post_id = post_response.json()["id"]
    response = client.delete(f"/api/posts/{post_id}", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 204

def test_delete_post_unauthorized(setup_database):
    response = client.delete("/api/posts/1")
    assert response.status_code == 401

def test_create_post_invalid_input(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    response = client.post("/api/posts", json={"title": "", "content": "This is a test post."}, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 400

def test_update_post_not_found(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    response = client.put("/api/posts/999", json={"title": "Updated Post", "content": "This is an updated test post."}, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 404

def test_delete_post_not_found(setup_database):
    client.post("/api/auth/register", json={"username": "testuser", "password": "testpass", "email": "test@example.com"})
    login_response = client.post("/api/auth/login", json={"username": "testuser", "password": "testpass"})
    token = login_response.json()["access_token"]
    response = client.delete("/api/posts/999", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 404