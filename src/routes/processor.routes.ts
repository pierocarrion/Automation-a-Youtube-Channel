import { Response } from "restify";
import { Router } from "restify-router";
import processorController from "../controllers/processor.controller";


const router = new Router();

router.post('/processor', async (req,res): Promise<Response> =>{
    try{
        
        const result = await processorController.downloadAndUploadVideos()
        console.log("🚀 ~ file: processor.routes.ts ~ line 12 ~ router.post ~ result", result)

        return res.json({success:result});
    }catch(error){
        return res.json({success: false, error: error.stack})
    }
})

export default router;