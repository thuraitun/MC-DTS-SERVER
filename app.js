import express from "express";
import cors from "cors";
const app = express();
import router from "./routes";

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

export default app;