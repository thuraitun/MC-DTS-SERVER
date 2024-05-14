import { Router } from "express";
const router = Router();
import appointmentRoute from "./appointment-route.js";
import doctorRoute from "./doctor-route.js";
import slotRoute from "./slot-route.js";

router.use("/doctors", doctorRoute);

router.use("/slots", slotRoute);

router.use("/appointments", appointmentRoute);

export default router;
