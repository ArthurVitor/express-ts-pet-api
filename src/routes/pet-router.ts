import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { PetRepository } from '../repository/pet-repository';
import Pet from '../interfaces/pet.i';
import { ObjectId } from 'mongodb';

const pet_router = express.Router();
pet_router.use(express.json());

const petRepository = new PetRepository();

pet_router.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = new ObjectId(req.params.id);
        const response: Pet = await petRepository.getById(id);

        res.send(response);
    } catch (error) {
        next(error)
    }
});


pet_router.post('/', async (req: Request<{}, {}, Pet>, res: Response, next: NextFunction) => {
    try {
        const response: Pet = await petRepository.insertOne(req.body);

        res.send(response);
    } catch (error) {
        next(error)
    }
});


export default pet_router;