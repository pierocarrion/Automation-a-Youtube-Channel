Init Project
```sh
    yarn dev
```
Youtube Channel
```sh
    https://www.youtube.com/channel/UCXe_gDzEW4aSQscv_EZBJVQ
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
