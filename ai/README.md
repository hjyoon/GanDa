# AI README

# 이미지 생성

## 이미지 생성을 위한 서버
- app 디렉터리의 코드 단독으로 동작하지 않습니다.
- 다음의 두가지 방법 중 한가지를 권장합니다.
  - StyleGAN3기반으로 설정되 git clone
  - StyleGAN3를 clone 받은 후 직접 설정
- conda 가상환경 설정은 다음 문서 참조 바랍니다.
  - [conda.md](conda.md)

## StyleGAN3에 설정된 git clone
- [StyleGAN3 + FastAPI](https://github.com/mintropy/stylegan3) clone
- conda 가상환경 설정
- `main.bash` 파일을 활용하여 실행

```bash
$ bash main.bash
```

## StyleGAN3을 받아서 직접 설정
- [StyleGAN3](https://github.com/NVlabs/stylegan3) clone
- app 디렉터리의 모든 파일 이동
- conda 가상환경 설정
- `main.bash`를 통하여 실행하는 경우 conda 가상환경 이름이 달라서 문제 발생할 수 있음
    - `main.bash` 5번줄을 `conda activate stylegan3` 로 변경 후 실행할 수 있음

## conda 가상환경 설정 후 수동으로 실행
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

# 학습하는 방법
* 학습에 gpu서버를 필요로 하므로 colab에서 실행이 가능하도록 ipynb파일로 정리했습니다.
* 해당 파일을 활용하여 colab에서 실행해보시길 바랍니다.
- `start_train.py` 파일을 활용하는 경우, StyleGAN3 github을 클론 받아 사용하는 것을 권장합니다.
