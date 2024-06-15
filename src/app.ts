import express, { Request, Response } from "express";
import mainRouter from "./router";
// import { initializeDatabase } from "./models";
import AuthMiddleware from "./middleware/jwt";

const app = express();
const port = 3000;

app.use(express.json());
app.use(AuthMiddleware.authenticateToken);

app.use("/api", mainRouter);

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json("error 404 - bingo reunion");
});

app.use((req: Request, res: Response) => {
  return res.status(404).json("error 404 - bingo reunion");
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
