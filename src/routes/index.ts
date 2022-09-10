import { Router } from "restify-router";

import RedditRoute from './reddit.routes';
import YoutubeRoute from './youtube.routes';
import VideoRoute from './video.routes';
import ProcessorRoute from './processor.routes';


const routerInstance = new Router();
const listOfRouter = new Router();

listOfRouter.add('/youtube',YoutubeRoute)
listOfRouter.add('/reddit',RedditRoute)
listOfRouter.add('/video',VideoRoute)

listOfRouter.add('/processor', ProcessorRoute)
routerInstance.add('/api/v1',listOfRouter);

export default routerInstance;