import { Request,Response,NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import auth from '../config/auth'

export default async (req : Request , res:  Response, next : NextFunction) => {
  const authHeader = <string>req.headers.authorization;
  let jwtPayload;
  

  try {
    jwtPayload = <any> jwt.verify(authHeader,auth.secret);
    res.locals.jwtPayload = jwtPayload;
    //return res.status(200).json({ success: "Valid token." });
  } catch (e) {
    return res.status(401).json({ error: "Invalid token." });
  }

  return next();
};
