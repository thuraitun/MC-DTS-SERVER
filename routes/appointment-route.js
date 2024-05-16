import { Router } from "express";
import {
  createAppointmentHandler,
  deleteAppointmentHandler,
  getAllAppointmentsHandler,
  getAppointmentHandler,
  updateAppointmentHandler,
} from "../controllers/appointment-controllers.js";
const appointmentRoute = Router();

appointmentRoute
  .route("/")
  .get(getAllAppointmentsHandler)
  .post(createAppointmentHandler);

appointmentRoute
  .route("/:oppointmentId")
  .get(getAppointmentHandler)
  .patch(updateAppointmentHandler)
  .delete(deleteAppointmentHandler);

export default appointmentRoute;
