import { Response, Request, NextFunction } from "express";
import express from "express";
import { User } from "../interfaces/user.i";
import { UserRepository } from "../repository/user-repository";
import { passport } from "../passport";

const authRouter = express.Router();
authRouter.use(express.json());

const userRepo: UserRepository = new UserRepository();

authRouter.post('/register', async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {
        res.send(await userRepo.register(req.body))
    } catch (error) {
        next(error)
    }
})

authRouter.post('/login', async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {
        res.json( await userRepo.login(req.body) ).status(200);
    } catch (error) {
        next(error)
    }
})

authRouter.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });


export default authRouter 