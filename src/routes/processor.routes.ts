import { Response } from "restify";
import { Router } from "restify-router";
import processorController from "../controllers/processor.controller";


const router = new Router();

router.post('/processor', async (req,res): Promise<Response> =>{
    try{
        const {numberVideos,title,tags,description} = req.body;
        const result = await processorController.downloadAndUploadVideos({
            numberVideos,
            title,
            tags,
            description
        })

        return res.json({success:true});
    }catch(error){
        return res.json({success: false, error: error.stack})
    }
})

export default router;