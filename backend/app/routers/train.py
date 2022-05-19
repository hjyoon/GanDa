import json
import os
from urllib import response
import requests
import shutil
from typing import List

from fastapi import (
    UploadFile,
    APIRouter
)
from fastapi.responses import Response

from ..settings import BASE_URL


router = APIRouter(
    tags=["train"],
)

train_url = "api/train/image/"


@router.get("/image/{data_id}/")
async def train_image(
    data_id: str
):
    url = f"{BASE_URL}{train_url}{data_id}/"
    data = requests.get(url)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)


@router.post("/image/{data_id}/")
async def upload_train_image(
    data_id: str,
    images: List[UploadFile],
):
    url = f"{BASE_URL}{train_url}{data_id}/"
    files = []
    if os.path.isdir("tmp"):
        shutil.rmtree("tmp")
        os.mkdir("tmp")
    for image in images:
        img_content = await image.read()
        img_path = f"tmp/{image.filename}"
        with open(img_path, "wb") as f:
            f.write(img_content)
        files.append(
            (
                "images",
                (
                    f"{image.filename}",
                    open(img_path, "rb"),
                    f"{image.content_type}",
                )
            )
        )
    data = requests.post(url, files=files)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)


@router.delete("/image/{data_id}/")
async def upload_train_image(
    data_id: str,
):
    url = f"{BASE_URL}{train_url}{data_id}/"
    data = requests.delete(url)
    return Response(status_code=data.status_code)
