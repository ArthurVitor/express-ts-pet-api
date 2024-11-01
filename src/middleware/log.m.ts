import { logRequest } from "../repository/log-repository";
import { Request, Response, NextFunction } from "express";

const logginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logRequest(req.url, req.method, new Date())
    next(); 
  };

export { logginMiddleware }