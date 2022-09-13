# Youtube channel automation with NodeJS

Development in NodeJs with Typescript that automates the upload of videos to Youtube. These videos are sourced from Reddit and downloaded. With the use of FFmepg, the videos are cut and concatenated to finally be uploaded to YouTube.


Init Project
```sh
    npm install
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
