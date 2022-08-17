Init Project
```sh
    yarn dev
```
API - Obtain Video Urls From Reddit
```sh
    POST: http://localhost:5000/api/v1/reddit/execute
    BODY:
        {
	        "topN": 5
        }
```
API - Download Videos
```sh
    GET: http://localhost:5000/api/v1/video/download
        
```

API - Concat Videos
```sh
    GET: http://localhost:5000/api/v1/video/concat
        
```

API - Upload Video To Youtube
```sh
    POST: http://localhost:5000/api/v1/youtube/upload
    BODY: 
        {
            "titleVideo": "Tiktok Trending",
            "description":"Tiktok trending",
            "keywords":"surfing,Santa Cruz",
            "category":"22",
            "privacy" :"public"
        }
        
```

### Hidden
    python3 -m venv ~/env/api | source ~/env/api/bin/activate & python src/scripts/upload_video.py --file="result/result.mp4"
    python3 -m venv ~/env/api 
    source ~/env/api/bin/activate 
    which python
    python -V

    !opt - pip3 install httplib2 --upgrade

    pip install google-api-python-client
    pip install oauth2client
    python src/scripts/upload_video.py --file="result/result.mp4"
### Hidden