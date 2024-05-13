import { Router } from 'express';
import { createAppointment, deleteAppointment, getAllAppointment, updateAppointment } from '../controllers/appointment-controllers.js';
const appointmentRoute = Router();

appointmentRoute
      .route('/')
      .get(getAllAppointment)
      .post(createAppointment)

appointmentRoute
      .route('/:id')
      .patch(updateAppointment)
      .delete(deleteAppointment)

export default appointmentRoute;