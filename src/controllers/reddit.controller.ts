import axios from "axios";
import RedditVideoModel from "../datalayers/models/reddit.model";
import { REDDIT_API } from "../utils/constants";

class RedditController {
    constructor() {}
    async getTopNVideoFromRedditAPI(topN = 10){
        try {
            return new Promise(async (resolve, reject) =>{

                const urlRequest = REDDIT_API.URL + REDDIT_API.LIMIT_PARAMETER + topN;
                const {data : {data : {children}}} = await axios.get(urlRequest,{
                    headers:{}
                })

                const urlsVideos = children.map((element: any )=> {
                    console.log(element.data.url_overridden_by_dest)
                    return element.data.url_overridden_by_dest;
                })
                return resolve(urlsVideos);
            })
            

        } catch (error) {
            console.log("🚀 ~ file: reddit.controller.ts ~ line 13 ~ RedditController ~ downloadVideos ~ error", error)
            throw error;
        }
    }
    async saveUrlsOnDatabase(urls: string[]){
        try{
            return new Promise(async (resolve, reject)=>{
                
                try{
                    const redditVideoInserted = await RedditVideoModel.insertMany(
                        urls.map(async url=>{
                            return {
                                videoUrl : url,
                            processed: false    
                            }
                        }));
                        console.log("🚀 ~ file: reddit.controller.ts ~ line 44 ~ RedditController ~ saveUrls ~ inserted", redditVideoInserted)
                    
                    return resolve(true)
                }catch(error){
                    return reject(false)
                }
            })
        }catch(error){
            console.log("🚀 ~ file: reddit.controller.ts ~ line 34 ~ RedditController ~ saveUrls ~ error", error)
            throw error;
        }
    }
}
export default new RedditController()