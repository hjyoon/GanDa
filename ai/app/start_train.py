import random
import os
from time import time


def make_image(network, trunc=1):
    # seed = random.randrange(1000)
    seed = 1-100
    model_dir = {
        'cat' : 'https://drive.google.com/drive/folders/1rLUTCb-YPWdWiVBwbVX0vGe2HtA1dG8K?usp=sharing/cat.pkl',
        'food' : 'https://drive.google.com/drive/folders/1rLUTCb-YPWdWiVBwbVX0vGe2HtA1dG8K?usp=sharing/food.pkl',
        'landscape' : 'https://drive.google.com/drive/folders/1rLUTCb-YPWdWiVBwbVX0vGe2HtA1dG8K?usp=sharing/landscape.pkl',
        'poster' : 'https://drive.google.com/drive/folders/1rLUTCb-YPWdWiVBwbVX0vGe2HtA1dG8K?usp=sharing/poster.pkl',
    }
    # model = model_dir[network]
    model = './results/mygumi_error2/00001-stylegan3-t-mygumi_error2s-256x256-gpus1-batch8-gamma50/network-snapshot-000500.pkl'
    start = time()
    os.system(f'python gen_images.py --outdir=out/mygumi --trunc={trunc} --seeds=1001-2000 --network={model}')
    print(time() - start)
    return 

def preprocess():
    os.system(f'python dataset_tool.py --source=./data/mygumi_error2 --dest=./data/mygumi_error2s-256x256.zip --resolution=256x256')

def train():
    os.system(f'python train.py --outdir=./results/mygumi_error2 --cfg=stylegan3-t --data=./data/mygumi_error2s-256x256.zip \
    --gpus=1 --batch=8 --gamma=50 --kimg=500 --snap=50 --workers=2 --tick=1 \
    --resume=./results/mygumi_error2/00003-stylegan3-t-mygumi_error2s-256x256-gpus1-batch8-gamma50/network-snapshot-000500.pkl \
    --cbase=16384 --freezed=4')
    # --resume=https://api.ngc.nvidia.com/v2/models/nvidia/research/stylegan3/versions/1/files/stylegan3-t-ffhqu-256x256.pkl \


def calc_fid():
    os.system(f'python calc_metrics.py --metrics=fid50k_full --data=./data/pandas-256x256.zip \
    --network=./results/panda/00000-stylegan3-t-pandas-256x256-gpus1-batch8-gamma50/network-snapshot-000200.pkl')


def style_mix():
    os.system(
        f'python style_mixing.py --outdir=./results/mixed_image/ffhq --rows=85,100,75,458,1500 --cols=55,821,1789,293 \
        --network=https://api.ngc.nvidia.com/v2/models/nvidia/research/stylegan3/versions/1/files/stylegan3-t-ffhqu-256x256.pkl'
    )


if __name__ == "__main__":
    model = ""
    
    # make_image('cat')
    # preprocess()
    train()
    # calc_fid()
    # style_mix()
