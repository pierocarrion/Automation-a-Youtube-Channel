import { PATH } from "../utils/constants";
import redditController from "./reddit.controller";
import videoController from "./video.controller";
import youtubeController from "./youtube.controller";

class ProcessorController{
    constructor(){}
    
    async downloadAndUploadVideos(content: any){
        return new Promise (async(resolve : any, reject: any)=>{
            ////Fetching Urls from Reddit
            const urlVideos = await redditController.getTopNVideoFromRedditAPI(content.numberVideos);
            ////Saving Urls in Mongo DB
            await redditController.saveUrlsOnDatabase(urlVideos as string[]);
            ////Download Videos
            await videoController.downloadVideos(urlVideos as string[]);
            ////Cut Videos 
            await videoController.cutVideos();
            ////Concat Videos
            await videoController.concatVideos();
            ////Upload Videos to Youtube
            await youtubeController.upload(content);

            resolve();
        });
    }
}
export default new ProcessorController;