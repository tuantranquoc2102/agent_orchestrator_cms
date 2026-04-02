from fastapi import Depends
from .orders.service import create_new_order, fetch_user_orders
from modules.auth.auth.models import User

async def create_order(order_data: dict, current_user: User = Depends(get_current_user)):
    return await create_new_order(order_data, current_user)

async def get_orders(current_user: User = Depends(get_current_user)):
    return await fetch_user_orders(current_user)