´´´
python3 -m venv ~/env/api
source ~/env/api/bin/activate
which python
python -V

!opt - pip3 install httplib2 --upgrade

pip install google-api-python-client
pip install oauth2client


python src/scripts/upload_video.py --file="result/result.mp4"
´´´