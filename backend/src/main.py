from fastapi import FastAPI
from config import Config
from middleware.cors import add_cors
from middleware.error_handler import error_handler
from modules.auth.auth.routes import router as auth_router
from modules.products.products.routes import router as products_router
from modules.orders.orders.routes import router as orders_router

app = FastAPI()

add_cors(app)

@app.exception_handler(Exception)(error_handler)

app.include_router(auth_router)
app.include_router(products_router)
app.include_router(orders_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=Config.PORT)