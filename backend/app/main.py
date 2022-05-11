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


import settings


app = FastAPI()

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


@app.post("/api/gen-image/{data_id}/")
async def gen_image(
    background_tasks: BackgroundTasks,
    data_id: str, 
    count: Optional[int] = 1
):
    '''    
    file_urls = []
    for file in in_files:
        # SAVE FILE ORIGINAL
        with open(PATH_FILES + file.filename, "wb") as myfile:
            content = await file.read()
            myfile.write(content)
            myfile.close()
        # RESIZE IMAGES
        background_tasks.add_task(resize_image, filename=file.filename)
        file_urls.append(PATH_FILES + file.filename)
    '''
    if not os.path.exists("static/images"):
        os.mkdir("static/images")
    params = {
        'count' : count
    }
    url = f"{BASE_URL}{image_url}{data_id}"
    data = requests.get(url, params=params)
    if data.status_code == 200:
        with open(f"static/images/{data_id}.png", "wb") as f:
            f.write(data.content)
        return FileResponse(f"static/images/{data_id}.png")
    return Response(status_code=data.status_code)


@app.get("/api/data-list/")
async def read_data_list():
    url = f"{BASE_URL}{model_url}"
    data = requests.get(url)
    if data.status_code == 200:
        data_str = data.content.decode('utf8').replace("'", '"')
        data_json = json.loads(data_str)
        return data_json
    return Response(status_code=data.status_code)


@app.post("/api/data-list/")
async def create_data_list(
    pkl_file: UploadFile, 
    name: Optional[str] = None, 
    img: Optional[UploadFile] = None,
    description: Optional[str] = None,
):
    if not os.path.exists("static/images"):
        os.mkdir("static/images")
    if not os.path.exists("static/pkls"):
        os.mkdir("static/pkls")
    img_content = await img.read()
    pkl_content = await pkl_file.read()
    with open(f"static/images/{img.filename}", "wb") as f:
        f.write(img_content)
    with open(f"static/pkls/{pkl_file.filename}", "wb") as f:
        f.write(pkl_content)
    files = {
        'img' : (f"{img.filename}", open(f"static/images/{img.filename}",'rb'), f"{img.content_type}"),
        'pkl_file' : (f"{pkl_file.filename}", open(f"static/pkls/{pkl_file.filename}",'rb'), f"{pkl_file.content_type}"),
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


@app.patch("/api/data-list/{data_id}/")
async def update_data(
    data_id: int,
    name: Optional[str] = None, 
    img: Optional[UploadFile] = None,
    description: Optional[str] = None,
):
    if not os.path.exists("static/images"):
        os.mkdir("static/images")
    img_content = await img.read()
    with open(f"static/images/{img.filename}", "wb") as f:
        f.write(img_content)
    files = {
        'img' : (f"{img.filename}", open(f"static/images/{img.filename}",'rb'), f"{img.content_type}")
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


@app.delete("/api/data-list/{data_id}/")
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
