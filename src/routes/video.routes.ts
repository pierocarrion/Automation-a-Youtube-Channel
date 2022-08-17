import { Response } from 'restify';
import { Router } from 'restify-router';
import videoController from '../controllers/video.controller';

const router = new Router();

router.get('/download', async (req, res): Promise<Response> => {
    try {
        await videoController.execute();
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, error: error.stack });
    }
});
router.get('/concat', async(req,res): Promise<Response> =>{
    try{
        await videoController.concatVideos();
        return res.json({success: true});
    }catch(error){
        return res.json({success: false, error: error.stack})
    }
})
export default router;
