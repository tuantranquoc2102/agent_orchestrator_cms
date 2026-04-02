// Test run command: pytest tests/products.test.py
import pytest
from fastapi.testclient import TestClient
from src.modules.products.products.routes import app

client = TestClient(app)

@pytest.fixture
def setup():
    # Setup code (e.g., mock database)
    yield
    # Teardown code (e.g., clear mock database)

def test_create_product_success(setup):
    response = client.post("/api/products", json={"name": "Product 1", "description": "Description 1", "price": 10.99})
    assert response.status_code == 201
    assert response.json()["name"] == "Product 1"

def test_create_product_invalid_input(setup):
    response = client.post("/api/products", json={"name": "", "description": "Description 1", "price": 10.99})
    assert response.status_code == 400

def test_get_all_products(setup):
    client.post("/api/products", json={"name": "Product 1", "description": "Description 1", "price": 10.99})
    response = client.get("/api/products")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_product_by_id_success(setup):
    product_response = client.post("/api/products", json={"name": "Product 1", "description": "Description 1", "price": 10.99})
    product_id = product_response.json()["id"]
    response = client.get(f"/api/products/{product_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Product 1"

def test_get_product_by_id_not_found(setup):
    response = client.get("/api/products/9999")
    assert response.status_code == 404