import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions/NotFoundException';
import { InvalidCredentialException } from '../exceptions/InvalidCredentialException';
import { EmailAlreadyRegisteredException } from '../exceptions/EmailAlreadyRegisteredException';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof NotFoundException) {
        res.status(404).json({ error: err.message });
    } 
    else if (err instanceof InvalidCredentialException) {
        res.status(401).json({ error: err.message})
    }
    else if (err instanceof EmailAlreadyRegisteredException ) {
        res.status(409).json({ error: err.message })
    }
    else {
        res.status(500).json({ error: err.message });
    }
}

export default errorHandler;