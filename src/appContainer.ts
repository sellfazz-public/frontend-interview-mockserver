import  * as express from "express";
import { Application, RequestHandler, Router } from "express";

// Creates and configures an ExpressJS web server.
export class AppContainer {

  // ref to Express instance
  public app: Application;

  private requestHandlerMiddlewares: RequestHandler[]

  //Run configuration methods on the Express instance.
  constructor() {
    this.app = express();
    this.routerExtenders = []
    this.requestHandlerMiddlewares = []
  }

  // Configure Express middleware.
  public withMiddleware(middleware: RequestHandler): this {
    this.requestHandlerMiddlewares.push(middleware)
    return this
  }

  private implementMiddlewares(){
    this.requestHandlerMiddlewares.forEach((rhm) => {
      this.app.use(rhm);
    })
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    this.routerExtenders.forEach(re => re.extend(router))
    this.app.use('/', router);
  }

  private routerExtenders: RouterExtender[]
  public extendRouter(routerExtender: RouterExtender): this{
    this.routerExtenders.push(routerExtender)
    return this
  }

  public start(port: number){
    this.implementMiddlewares()
    this.routes();
    this.app.listen( port, () => {
      // tslint:disable-next-line:no-console
      console.log( `server started at http://localhost:${ port }` );
  } );  
  }

}




export interface RouterExtender {
  extend(router: Router)
}

