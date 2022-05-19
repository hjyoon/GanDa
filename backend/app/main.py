from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routers import (
    data,
    image,
    pkl,
    train
)
from .settings import BASE_DIR


app = FastAPI()

app.include_router(
    image.router,
    prefix="/api/gen-image",
)
app.include_router(
    data.router,
    prefix="/api/data-list"
)
app.include_router(
    pkl.router,
    prefix="/api/pkl"
)
app.include_router(
    train.router,
    prefix="/api/train"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/api/images/",
    StaticFiles(directory=f"{BASE_DIR}static/images/"),
    name="images"
)
