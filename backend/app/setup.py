import os
import shutil

from .settings import BASE_DIR


def setup():
    if not os.path.exists(f"{BASE_DIR}static"):
        os.mkdir(f"{BASE_DIR}static")
    if not os.path.exists(f"{BASE_DIR}static/images"):
        os.mkdir(f"{BASE_DIR}static/images")
    if not os.path.exists(f"{BASE_DIR}static/pkls"):
        os.mkdir(f"{BASE_DIR}static/pkls")
    if not os.path.isfile(f"{BASE_DIR}static/images/ganda.jpg"):
        shutil.copyfile(f"{BASE_DIR}ganda.jpg", f"{BASE_DIR}static/images/ganda.jpg")


if __name__ == "__main__":
    setup()
