import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { promisify } from "util";

export default async (req , res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not defined." });
  }

  const [bearer, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token,authConfig.secret);
    //return res.status(200).json({ success: "Valid token." });
  } catch (e) {
    return res.status(401).json({ error: "Invalid token." });
  }

  return next();
};
