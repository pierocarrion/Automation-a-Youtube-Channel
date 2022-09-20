# Automation a Youtube Channel with NodeJS, Google API, FFmepg and Youtube-DL 

Automation in NodeJS with Typescript for uploading videos to Youtube. These videos are sourced from Reddit. Then FFmepg cuts and concat the videos to finally be uploaded to YouTube.

### Dependencies

1. Youtube-dl
2. Ffmpeg

### Init Project
```sh
npm run dev
```
### Youtube Channel - Proof of Concept (PoC)
```sh
https://www.youtube.com/channel/UCXe_gDzEW4aSQscv_EZBJVQ
```

### Request - Trigger the Upload Video to Youtube
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
