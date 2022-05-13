import os
import requests
from typing import Optional

from fastapi import (
    FastAPI,
    APIRouter
)
from fastapi.responses import FileResponse, Response

from ..settings import BASE_DIR, BASE_URL
from ..setup import setup

router = APIRouter(
    prefix="/gen-image",
    tags=["image"],
)


image_url = "api/gen-image/"


@router.get("/{data_id}/")
async def gen_image(
    data_id: str, 
    count: Optional[int] = 1
):
    setup()
    params = {
        'count' : count
    }
    url = f"{BASE_URL}{image_url}{data_id}/"
    data = requests.get(url, params=params)
    if data.status_code == 200:
        file_path = f"{BASE_DIR}static/images/{data_id}.png"
        with open(file_path, "wb") as f:
            f.write(data.content)
        return FileResponse(file_path)
    return Response(status_code=data.status_code)
