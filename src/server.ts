import express, { Express } from "express";
import dotenv from "dotenv";
import pet_router from "./routes/pet-router";
import { logginMiddleware } from "./middleware/log.md";
import errorHandler from "./middleware/errorHandler.md";
import { passport } from "./passport";
import authRouter from "./routes/auth-router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(logginMiddleware);
app.use(passport.initialize())

app.use("/api/pet", pet_router)
app.use("/auth/", authRouter)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});