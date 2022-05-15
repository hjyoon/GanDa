import datetime
import json
import os
import requests
from typing import Optional


from fastapi import FastAPI, UploadFile, BackgroundTasks
from fastapi.responses import FileResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from os import getcwd
from PIL import Image


from . import settings
from .routers import (
    data,
    image,
    pkl,
    train
)


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
