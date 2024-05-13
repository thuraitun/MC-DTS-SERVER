import { Router } from 'express';
import appointmentRoute from './appointment-route.js';
const router = Router();
import doctorRoute from "./doctor-route.js";
import slotRoute from './slot-route.js';

router.use('/doctor', doctorRoute);

router.use('/slot', slotRoute);

router.use('/appointment', appointmentRoute);

export default router;