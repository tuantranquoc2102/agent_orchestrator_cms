from fastapi import HTTPException
from .products.service import fetch_all_products, fetch_product_by_id

async def get_all_products():
    return await fetch_all_products()

async def get_product_by_id(id: int):
    product = await fetch_product_by_id(id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product