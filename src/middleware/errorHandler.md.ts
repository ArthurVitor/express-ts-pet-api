import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions/NotFoundException';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof NotFoundException) {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message });
    }
}

export default errorHandler;