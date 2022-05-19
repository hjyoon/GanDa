import os
import argparse

def preprocess():
    os.system(f'python dataset_tool.py --source=./data/mygumi_error2 --dest=./data/mygumi_error2s-256x256.zip --resolution=256x256')


def train():
    os.system(f'python train.py --outdir=./results/mygumi_error2 --cfg=stylegan3-t --data=./data/cats-256x256.zip \
    --gpus=1 --batch=8 --gamma=50 --kimg=500 --snap=50 --workers=2 --tick=1 --cbase=16384 --freezed=4\
    --resume=https://api.ngc.nvidia.com/v2/models/nvidia/research/stylegan3/versions/1/files/stylegan3-t-ffhqu-256x256.pkl')


def calc_fid():
    os.system(f'python calc_metrics.py --metrics=fid50k_full --data=./data/cats-256x256.zip \
    --network=https://api.ngc.nvidia.com/v2/models/nvidia/research/stylegan3/versions/1/files/stylegan3-t-ffhqu-256x256.pkl')


parser = argparse.ArgumentParser(description='사용법 테스트입니다.')

parser.add_argument('--type', required=True, help='데이터 전처리 혹은 학습 혹은 fid계산 선택(preprocess or train or calc_fid)', choices=['preprocess', 'train', 'calc_fid'])

args = parser.parse_args()


if __name__ == "__main__":
    if args.type == 'preprocess':
        preprocess()
    elif args.type == 'train':
        train()
    elif args.type == 'calc_fid':
        calc_fid()
