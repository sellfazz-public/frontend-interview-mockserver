
import { Request, Response, NextFunction } from "express";
import config from './../../config'
import { User } from "../storages/user";
var jwt = require('jsonwebtoken');



function extractTokenString(req: Request): string{
    let token = req.headers['authorization'] as string
    return token.replace("Bearer ","")

}

export function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
  /*
   * Check if authorization header is set
   */
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
      try {
          /*
           * Try to decode & verify the JWT token
           * The token contains user's id ( it can contain more informations )
           * and this is saved in req.user object
           */
          req["user"] = jwt.verify(extractTokenString(req), config.JwtSecretKey);
      } catch(err) {
          /*
           * If the authorization header is corrupted, it throws exception
           * So return 401 status code with JSON error message
           */
          return res.status(401).json({
              error: {
                  msg: 'Failed to authenticate token!'
              }
          });
      }
  } else {
      /*
       * If there is no autorization header, return 401 status code with JSON
       * error message
       */
      return res.status(401).json({
          error: {
              msg: 'No token!'
          }
      });
  }
  next();
  return;
}