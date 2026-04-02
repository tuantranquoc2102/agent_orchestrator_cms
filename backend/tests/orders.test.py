// Test run command: pytest tests/orders.test.py
import pytest
from fastapi.testclient import TestClient
from src.modules.orders.orders.routes import app

client = TestClient(app)

@pytest.fixture
def setup():
    # Setup code (e.g., mock database)
    yield
    # Teardown code (e.g., clear mock database)

def test_create_order_success(setup):
    client.post("/api/auth/register", json={"username": "testuser", "email": "test@example.com", "password": "password123"})
    client.post("/api/auth/login", json={"username": "testuser", "password": "password123"})
    product_response = client.post("/api/products", json={"name": "Product 1", "description": "Description 1", "price": 10.99})
    product_id = product_response.json()["id"]
    response = client.post("/api/orders", json={"user_id": 1, "total_amount": 10.99, "items": [{"product_id": product_id, "quantity": 1}]})
    assert response.status_code == 201

def test_create_order_unauthorized(setup):
    response = client.post("/api/orders", json={"user_id": 1, "total_amount": 10.99, "items": [{"product_id": 1, "quantity": 1}]})
    assert response.status_code == 401

def test_get_orders_success(setup):
    client.post("/api/auth/register", json={"username": "testuser", "email": "test@example.com", "password": "password123"})
    client.post("/api/auth/login", json={"username": "testuser", "password": "password123"})
    client.post("/api/orders", json={"user_id": 1, "total_amount": 10.99, "items": [{"product_id": 1, "quantity": 1}]})
    response = client.get("/api/orders", headers={"Authorization": "Bearer fake_token"})
    assert response.status_code == 200
    assert len(response.json()) > 0