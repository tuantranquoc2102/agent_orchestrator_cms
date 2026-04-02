from fastapi import APIRouter
from .products.controller import get_all_products, get_product_by_id

router = APIRouter()

router.get("/api/products")(get_all_products)
router.get("/api/products/{id}")(get_product_by_id)