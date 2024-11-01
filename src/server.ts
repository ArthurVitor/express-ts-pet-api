import express, { Express } from "express";
import dotenv from "dotenv";
import pet_router from "./routes/pet-router";
import { logginMiddleware } from "./middleware/log.m";
import errorHandler from "./middleware/errorHandler.m";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(logginMiddleware);

app.use("/api/pet", pet_router)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});