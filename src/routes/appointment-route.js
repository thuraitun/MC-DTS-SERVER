import { Router } from 'express';
const appointmentRoute = Router();

appointmentRoute
      .route('/')
      .get()
      .post()

export default appointmentRoute;