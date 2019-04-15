import {AppContainer} from './src/appContainer'
import { ProductRouterExtender } from './src/routers/productRouter';
import * as logger from 'morgan';
import bodyParser = require("body-parser");
import { UserRouterExtender } from './src/routers/userRouter';


new AppContainer()
.extendRouter(new ProductRouterExtender())
.extendRouter(new UserRouterExtender())
.withMiddleware(logger("dev"))
.withMiddleware(bodyParser.json())
.withMiddleware(bodyParser.urlencoded({extended: false}))
.start(8080);