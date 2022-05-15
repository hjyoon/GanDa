import json
import requests
from typing import Optional

from fastapi import (
    UploadFile,
    APIRouter
)
from fastapi.responses import Response

from ..settings import BASE_URL, IMAGE_DIR, PKL_DIR, ganda
from ..setup import setup

router = APIRouter(
    tags=["data list"],
)

model_url = "api/data-list/"


@router.get("/")
async def read_data_list():
    url = f"{BASE_URL}{model_url}"
    data = requests.get(url)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)


@router.post("/")
async def create_data_list(
    pkl_file: UploadFile, 
    name: Optional[str] = None, 
    img: Optional[UploadFile] = None,
    description: Optional[str] = None,
):
    setup()
    pkl_content = await pkl_file.read()
    pkl_path = f"{PKL_DIR}{pkl_file.filename}"
    with open(pkl_path, "wb") as f:
        f.write(pkl_content)
    if img is None:
        files = {
            'img' : ("ganda.jpg", open(ganda,'rb'), "image/jpg"),
            'pkl_file' : (f"{pkl_file.filename}", open(pkl_path,'rb'), f"{pkl_file.content_type}"),
        }
    else:
        img_content = await img.read()
        image_path = f"{IMAGE_DIR}{img.filename}"
        with open(image_path, "wb") as f:
            f.write(img_content)
        files = {
            'img' : (f"{img.filename}", open(image_path,'rb'), f"{img.content_type}"),
            'pkl_file' : (f"{pkl_file.filename}", open(pkl_path,'rb'), f"{pkl_file.content_type}"),
        }
    params = {
        'name' : name,
        'description' : description
    }
    url = f"{BASE_URL}{model_url}"
    data = requests.post(url, params=params, files=files)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)


@router.patch("/{data_id}/")
async def update_data(
    data_id: int,
    name: Optional[str] = None, 
    img: Optional[UploadFile] = None,
    description: Optional[str] = None,
):
    setup()
    if img is None:
        files = {
            'img' : ("ganda.jpg", open(ganda,'rb'), "image/jpg"),
        }
    else:
        img_content = await img.read()
        image_path = f"{IMAGE_DIR}{img.filename}"
        with open(image_path, "wb") as f:
            f.write(img_content)
        files = {
            'img' : (f"{img.filename}", open(image_path,'rb'), f"{img.content_type}")
        }
    params = {
        'name' : name,
        'description' : description
    }
    url = f"{BASE_URL}{model_url}{data_id}/"
    data = requests.patch(url, params=params, files=files)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)


@router.delete("/{data_id}/")
async def delete_data(
    data_id: int,
):
    url = f"{BASE_URL}{model_url}{data_id}/"
    data = requests.delete(url)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)
