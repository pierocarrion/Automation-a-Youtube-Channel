import { spawn } from 'child_process';
import { ChildProcess } from '../utils/child_process';
var TwoStep = require("two-step");
class YoutubeController{
    constructor(){}
    async uploadVideo(titleVideo: string,description: string, keywords: string, category: string,  privacy: string,){
        try{
            let command = "/home/ss/env/api/bin/python"; // display all files in current directory with  (-l) long format
            let pathVideoResult = "temp/result/result.mp4";
            let args = [
                "src/scripts/upload_video.py",
                `--file="${pathVideoResult}"`,
                `--title="${titleVideo}"`,
                `--description="${description}"`,
                `--keywords="${keywords}"`,
                `--category="${category}"`,
                `--privacyStatus="${privacy}"`
             ]
            await ChildProcess(command,args)
        }catch(error){
            console.log("🚀 ~ file: youtube.controller.ts ~ line 8 ~ YoutubeController ~ uploadVideo ~ error", error)
            throw error;
        }
    }
}
export default new YoutubeController();
