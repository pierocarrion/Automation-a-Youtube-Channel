Init Project
```sh
    yarn dev
```
Youtube Channel
```sh
    https://www.youtube.com/channel/UCXe_gDzEW4aSQscv_EZBJVQ
```




API - Trigger the Upload Video to Youtube
```sh
    POST: http://localhost:5000/api/v1/processor/processor
    BODY:
        {
	        "numberVideos": 10,
            "title" :"Video Test",
            "tags" : "",
            "description" : "Description"
        }
```
