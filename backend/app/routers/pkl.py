import requests
from typing import Optional

from fastapi import APIRouter
from fastapi.responses import Response, FileResponse

from ..settings import BASE_URL, PKL_DIR
from ..setup import setup

router = APIRouter(
    tags=["pkl"],
)

pkl_url = "api/pkl/"


@router.patch("/rename/{data_id}/")
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


@router.get("/download/{data_id}/")
async def pkl_download(
    data_id: str,
):
    setup()
    url = f"{BASE_URL}{pkl_url}download/{data_id}/"
    data = requests.get(url)
    if data.status_code == 200:
        pkl_path = f"{PKL_DIR}{data_id}.pkl"
        with open(pkl_path, "wb") as f:
            f.write(data.content)
        return FileResponse(pkl_path)
    return Response(status_code=data.status_code)
