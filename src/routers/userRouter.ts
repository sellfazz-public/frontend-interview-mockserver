import { RouterExtender } from "../appContainer";
import { Router, Request, Response, NextFunction } from "express";
import { Authentication } from "../storages/user";
import { runningStorage } from "../storages";
import config from "../../config";
var jwt = require('jsonwebtoken');

export class UserRouterExtender implements RouterExtender {
  extend(router: Router) {
    router.post('/register', (req: Request, res: Response, next: NextFunction) => {
      let authentication = req.body as Authentication
      let user = runningStorage.userStorage.saveNew({
        ...authentication,
        id: ""
      })
      res.json({
        email: user.email,
        id: user.id
      });
    });
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
      let authentication = req.body as Authentication
      let isCorrectPassword = runningStorage.userStorage.isCorrectPassword(authentication.email, authentication.password)      
      if (!isCorrectPassword) {
        return res.status(401).json({
          error: {
            msg: 'Failed to authorize token!'
          }
        });
      }

      let user = runningStorage.userStorage.getByEmail(authentication.email)
      var token = jwt.sign({
        email: user.email,
        id: user.id
      }, config.JwtSecretKey);
      return res.json({
        token
      })
    });

  }
}