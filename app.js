import express from "express";
import cors from "cors";
const app = express();
import ApiError from "./utils/apiError.js";
import router from "./routes/index.js";
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.all('*', (req, res, next) => {
      res.send(ApiError.notFound());
})
export default app;