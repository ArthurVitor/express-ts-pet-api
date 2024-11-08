import { Response, Request, NextFunction } from "express";
import express from "express";
import { User } from "../interfaces/user.i";
import { passport } from "../passport";
import { UserService } from "../service/user-service";

const authRouter = express.Router();
authRouter.use(express.json());

const userService: UserService = new UserService();

authRouter.post('/register', async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {
        res.send(await userService.register(req.body))
    } catch (error) {
        next(error)
    }
})

authRouter.post('/login', async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    try {
        res.json( await userService.login(req.body) ).status(200);
    } catch (error) {
        next(error)
    }
})

authRouter.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


export default authRouter 