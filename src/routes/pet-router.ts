import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { insertPet, getPetById } from '../repository/pet-repository';
import Pet from '../interfaces/pet.i';
import ApiResponse from '../interfaces/response.i';
import { ObjectId } from 'mongodb';

const pet_router = express.Router();
pet_router.use(express.json());

pet_router.get('/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const id = new ObjectId(req.params.id);
        const response: Pet = await getPetById(id);

        res.send(response);
    } catch (error) {
        next(error)
    }
});


pet_router.post('/', async (req: Request<{}, {}, Pet>, res: Response, next: NextFunction) => {
    try {
        const response: Pet = await insertPet(req.body);

        res.send(response);
    } catch (error) {
        next(error)
    }
});


export default pet_router;