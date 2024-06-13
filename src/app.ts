import express from "express";
import mainRouter from "./router";
import { initializeDatabase } from "./models";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", mainRouter);

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
});
