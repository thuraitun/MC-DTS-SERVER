import { Router } from "express";
import {
  createAppointmentHandler,
  deleteAppointmentHandler,
  getAllAppointmentsHandler,
  getAppointmentHandler,
  updateAppointmentHandler,
} from "../controllers/appointment-controllers.js";
import validate from "../middlewares/validate.js";
import { CREATE_APPOINTMENT } from "../schema/appointment-schema.js";
const appointmentRoute = Router();

appointmentRoute
  .route("/")
  .get(getAllAppointmentsHandler)
  .post(validate(CREATE_APPOINTMENT), createAppointmentHandler);

appointmentRoute
  .route("/:appointmentId")
  .get(getAppointmentHandler)
  .patch(updateAppointmentHandler)
  .delete(deleteAppointmentHandler);

export default appointmentRoute;
