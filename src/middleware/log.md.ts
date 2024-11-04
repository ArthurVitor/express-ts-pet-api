import { LogRepository } from "../repository/log-repository";
import { Request, Response, NextFunction } from "express";

const logRepository = new LogRepository();

const logginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logRepository.insertOne({
      requestMethod: req.method,
      requestUrl: req.path,
      time: new Date()
    })
    next();
  };

export { logginMiddleware }