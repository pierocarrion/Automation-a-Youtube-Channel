import { Router } from "restify-router";

import ProcessorRoute from './processor.routes';


const routerInstance = new Router();
const listOfRouter = new Router();

listOfRouter.add('/processor', ProcessorRoute)

routerInstance.add('/api/v1',listOfRouter);

export default routerInstance;