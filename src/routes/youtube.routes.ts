import { Router } from "restify-router";
import youtubeController from "../controllers/youtube.controller";

const router = new Router();

router.post('/upload', async (req, res): Promise<Response> => {
    try {
        const {titleVideo,description,keywords,category,privacy} = req.body;
        await youtubeController.uploadVideo(titleVideo,description,keywords,category,privacy);
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, error: error.stack });
    }
});
export default router;