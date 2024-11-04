import { Request, Response, NextFunction } from 'express';
import { PetNotFoundException } from '../exceptions/PetNotFoundException';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof PetNotFoundException) {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default errorHandler;