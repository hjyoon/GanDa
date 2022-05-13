import os

from .settings import BASE_DIR


def setup():
    if not os.path.exists(f"{BASE_DIR}static"):
        os.mkdir(f"{BASE_DIR}static")
    if not os.path.exists(f"{BASE_DIR}static/images"):
        os.mkdir(f"{BASE_DIR}static/images")
    if not os.path.exists(f"{BASE_DIR}static/pkls"):
        os.mkdir(f"{BASE_DIR}static/pkls")


if __name__ == "__main__":
    setup()
