import express, { Request, Response } from "express";
import mainRouter from "./router";
import { initializeDatabase } from "./models";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", mainRouter);

app.use("*", (req: Request, res: Response) => {
  return "error 404 - bingo reunion";
});

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
});
