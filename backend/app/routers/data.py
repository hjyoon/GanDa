import datetime
import json
import shutil
import requests
import os
from typing import Optional

from fastapi import (
    UploadFile,
    APIRouter,
    Query,
    File
)
from fastapi.responses import Response

from ..settings import BASE_DIR, BASE_URL, IMAGE_DIR, PKL_DIR, ganda
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
    img: Optional[UploadFile] = File(None),
    description: Optional[str] = None,
    fid: Optional[float] = Query(default=None, gt=0),
    kimg: Optional[int] = Query(default=None, gt=0),
):
    setup()
    pkl_content = await pkl_file.read()
    pkl_path = f"{PKL_DIR}{pkl_file.filename}"
    with open(pkl_path, "wb") as f:
        f.write(pkl_content)
    if img is None:
        img_name = "ganda.jpg"
    else:
        img_name = img.filename
        if os.path.isfile(f"{IMAGE_DIR}{img_name}"):
            t = datetime.datetime.now().isoformat(timespec="seconds").replace(":", "")
            dot_idx = img_name.rindex(".")
            img_name = f"{img_name[:dot_idx]}-{t}{img_name[dot_idx:]}"
        with open(f"{IMAGE_DIR}{img_name}", "wb") as image:
            shutil.copyfileobj(img.file, image)
    files = {
        'pkl_file' : 
            (
                f"{pkl_file.filename}", 
                open(pkl_path,'rb'), 
                f"{pkl_file.content_type}"
            ),
    }
    params = {
        'name' : name,
        'description' : description,
        'fid': fid,
        'kimg': kimg,
        'img': img_name,
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
    img: Optional[UploadFile] = File(None),
    description: Optional[str] = None,
    fid: Optional[float] = Query(default=None, gt=0),
    kimg: Optional[int] = Query(default=None, gt=0),
):
    setup()
    if img is None:
        img_name = "ganda.jpg"
    else:
        img_name = img.filename
        if os.path.isfile(f"{IMAGE_DIR}{img_name}"):
            t = datetime.datetime.now().isoformat(timespec="seconds").replace(":", "")
            dot_idx = img_name.rindex(".")
            img_name = f"{img_name[:dot_idx]}-{t}{img_name[dot_idx:]}"
        with open(f"{IMAGE_DIR}{img_name}", "wb") as image:
            shutil.copyfileobj(img.file, image)
    params = {
        'name' : name,
        'description' : description,
        'fid': fid,
        'kimg': kimg,
        'img': img_name,
    }
    url = f"{BASE_URL}{model_url}{data_id}/"
    data = requests.patch(url, params=params)
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
