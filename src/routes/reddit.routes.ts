import { Response } from "restify";
import { Router } from "restify-router";
import redditController from "../controllers/reddit.controller";

const router = new Router();

router.post('/execute', async (req,res): Promise<Response> =>{
    try{
        const {topN} = req.body;
        /*
        await redditController.getTopNVideoFromRedditAPI(topN).then(async (urls)=>{
            await redditController.saveUrls(urls as string[]);
        })
        */
        return res.json({success:true});
    }catch(error){
        return res.json({success: false, error: error.stack})
    }
})

export default router;