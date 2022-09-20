# Youtube channel automation with NodeJS

Automation in NodeJs with Typescript for uploading videos to Youtube. These videos are sourced from Reddit. Then FFmepg cuts and concat the videos to finally be uploaded to YouTube.

Install dependencies
```sh
    sudo apt-get install youtube-dl
    sudo apt-get install ffmpeg
```

Init Project
```sh
    npm run dev
```
Youtube Channel - Proof of Concept (PoC)
```sh
    https://www.youtube.com/channel/UCXe_gDzEW4aSQscv_EZBJVQ
```

API - Trigger the Upload Video to Youtube
```sh
    POST: http://localhost:5000/api/v1/processor/processor
    BODY:
        {
            "numberVideos": 10,
            "title" :"Video Title",
            "tags" : "Tags Video",
            "description" : "Video Description"
        }
```
