import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { UserRepository } from "./repository/user-repository";
import dotenv from "dotenv";
import { User } from "./interfaces/user.i";
import { ObjectId } from "mongodb";
dotenv.config()


const ops: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!
}

const userRepo: UserRepository = new UserRepository();

passport.use(
    new JwtStrategy(ops, async (jwt_payload, done) => {
        try {
            const user: User = await userRepo.getById(new ObjectId(jwt_payload.sub));
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
)

export { passport }