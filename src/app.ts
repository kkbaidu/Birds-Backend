import express from "express";
import birdRoutes from "./routes/bird";
// const cors = require("cors")
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/birds", birdRoutes);

export default app;
