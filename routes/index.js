import { Router } from "express";
const router = Router();
import appointmentRouter from "./appointment-route";

router
    .use('/appiontment', appointmentRouter)

export default router;
