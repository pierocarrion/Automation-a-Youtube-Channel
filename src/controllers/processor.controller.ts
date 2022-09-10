import redditController from "./reddit.controller";
import videoController from "./video.controller";
import youtubeController from "./youtube.controller";

class ProcessorController{
    constructor(){

    }
    async downloadAndUploadVideos(){
        return new Promise (async(resolve, reject)=>{
            ////Fetching Urls from Reddit
            //const urlVideos = await redditController.getTopNVideoFromRedditAPI(10);
            ////Saving Urls to Mongo
            //await redditController.saveUrls(urlVideos as string[]);
            ////Download Videos
            //await videoController.downloadVideos(urlVideos as string[]);
            ////Cut Videos 
            //await videoController.cutVideos();
            ////Concat Videos
            //await videoController.concatVideos();
            
            const a = await youtubeController.upload();
            console.log("🚀 ~ file: processor.controller.ts ~ line 23 ~ ProcessorController ~ returnnewPromise ~ a", a)
            
            resolve(true);
        });
    }
}
export default new ProcessorController;