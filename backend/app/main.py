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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PATH_FILES = getcwd() + "/"
BASE_URL = settings.BASE_URL
image_url = "api/gen-image/"
model_url = "api/data-list/"
pkl_url = "api/pkl/"



def resize_image(filename: str):
    sizes = [{
        "width": 256,
        "height": 256
    }]
    for size in sizes:
        size_defined = size['width'], size['height']
        currentTime = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        saved_file_name = ''.join([currentTime,'_',filename])
        image = Image.open(PATH_FILES + filename, mode="r")
        image.thumbnail(size_defined)
        image.save(PATH_FILES + "static/" + "images/" + str(size['width']) + "X" + str(size['height']) + "_" + saved_file_name)
    print("success")


@app.patch("/api/pkl/rename/{data_id}/")
async def pkl_rename(
    data_id: str,
    new_name: Optional[str] = None, 
):
    params = {
        'new_name' : new_name,
    }
    url = f"{BASE_URL}{pkl_url}rename/{data_id}/"
    data = requests.patch(url, params=params)
    if data.status_code == 200:
        return new_name
    return Response(status_code=data.status_code)


@app.get("/api/pkl/download/{data_id}/")
async def pkl_download(
    data_id: str,
):
    url = f"{BASE_URL}{pkl_url}download/{data_id}/"
    data = requests.get(url)
    if data.status_code == 200:
        with open(f"static/pkls/{data_id}.pkl", "wb") as f:
            f.write(data.content)
        return FileResponse(f"static/pkls/{data_id}.pkl")
    return Response(status_code=data.status_code)
