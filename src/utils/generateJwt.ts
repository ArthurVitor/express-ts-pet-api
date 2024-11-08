import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

function generateToken(userId: string): string {
    const payload = {
        sub: userId, 
        iat: Date.now(),
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '1h'
    });
}

export { generateToken }