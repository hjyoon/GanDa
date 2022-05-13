import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/") + "/"
STATIC_DIR = f"{BASE_DIR}/static/"
IMAGE_IDR = f"{BASE_DIR}/static/images/"

BASE_URL = "http://k6s106.p.ssafy.io:8010/"

image_url = "api/gen-image/"
model_url = "api/data-list/"
pkl_url = "api/pkl/"