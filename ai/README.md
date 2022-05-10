# AI README

# 훈련

# 이미지 생성을 위한 서버
- app 디렉터리의 코드 단독으로 동작하지 않습니다.
- 다음의 두가지 방법 중 한가지를 권장합니다.
  - StyleGAN3기반으로 설정되 git clone
  - StyleGAN3를 clone 받은 후 직접 설정
- conda 가상환경 설정은 다음 문서 참조 바랍니다.
  - [conda.md](conda.md)

## StyleGAN3에 설정된 git clone
- [StyleGAN3 + FastAPI](https://github.com/mintropy/stylegan3) clone
- conda 가상환경 설정

## StyleGAN3을 받아서 직접 설정
- [StyleGAN3](https://github.com/NVlabs/stylegan3) clone
- app 디렉터리의 모든 파일 이동
- conda 가상환경 설정

## conda 가상환경 설정 후
- 다음 순서를 거쳐 실행
    - conda 가상환경 실행
    - pip install
    - 필요한 디렉터리 생성
    - 서버 실행

```bash
# conda 가상환경 생성
$ conda env create -f enviroment.yml
# StyleGAN3 + FastAPI을 clone 받은 경우 stylegan3-fastapi
$ conda activate stylegan3
# pip install
$ pip install -r requirements.txt
# 디렉터리 생성
$ python setup.py
# 서버 실행
$ uvicorn main:app --host 0.0.0.0 --port 8010
```
