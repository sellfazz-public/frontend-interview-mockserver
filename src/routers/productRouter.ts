import { RouterExtender } from "../appContainer";
import { Router, Request, Response, NextFunction } from "express";
import { Authentication } from "../storages/user";
import { runningStorage } from "../storages";
import config from "../../config";
import { verifyAuthentication } from "../middlewares/auth";
import { Product } from "../storages/product";



export class ProductRouterExtender implements RouterExtender {
  extend(router: Router) {

    router
      .route('/products')
      .all(verifyAuthentication)
      .get((req: Request, res: Response, next: NextFunction) => {
        let user = req["user"]
        let productStorage = runningStorage.productPerOwnerStorage.getOrEnsureByUserId(user.id)

        let products = productStorage.list()
        res.json({
          data: products,
          count: products.length
        });
      })
      .post((req: Request, res: Response, next: NextFunction) => {
        let user = req["user"]
        let productStorage = runningStorage.productPerOwnerStorage.getOrEnsureByUserId(user.id)
        let product = req.body as Product
        let savedProduct = productStorage.saveNew(product)
        res.json(savedProduct);
      });

    router
      .route('/products/:id')
      .all(verifyAuthentication)
      .put((req: Request, res: Response, next: NextFunction) => {
        let user = req["user"]
        let productStorage = runningStorage.productPerOwnerStorage.getOrEnsureByUserId(user.id)

        let id = req.param["id"]
        let product = req.body as Product

        let savedProduct = productStorage.get(id) as Product

        let toBeUpdatedProduct = {
          ...savedProduct,
          ...product
        } as Product
        product.id = id
        productStorage.set(id, toBeUpdatedProduct)
        res.json(toBeUpdatedProduct);
      })
      .delete((req: Request, res: Response, next: NextFunction) => {
        let user = req["user"]
        let productStorage = runningStorage.productPerOwnerStorage.getOrEnsureByUserId(user.id)
        let id = req.param["id"]
        let product = productStorage.get(id)
        productStorage.clear(id)
        res.json(product);
      });
  }
}