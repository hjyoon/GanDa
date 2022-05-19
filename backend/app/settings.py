import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/") + "/"
STATIC_DIR = f"{BASE_DIR}/static/"
IMAGE_DIR = f"{BASE_DIR}/static/images/"
PKL_DIR = f"{BASE_DIR}/static/pkls/"

ganda = f"{BASE_DIR}ganda.jpg"

BASE_URL = "http://k6s106.p.ssafy.io:8010/"
# BASE_URL = "http://127.0.0.1:8010/"

image_url = "api/gen-image/"
model_url = "api/data-list/"
pkl_url = "api/pkl/"
