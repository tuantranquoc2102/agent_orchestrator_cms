from fastapi import APIRouter
from .orders.controller import create_order, get_orders

router = APIRouter()

router.post("/api/orders")(create_order)
router.get("/api/orders")(get_orders)