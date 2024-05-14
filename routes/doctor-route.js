import { Router } from 'express';
import validate from '../middlewares/validate.js';
import { CREATE_DOCTOR, UPDATE_DOCTOR } from '../schema/doctor-schema.js';
const doctorRoute = Router();
import { getAllDoctors, getOneDoctor, updateDoctor, deleteDoctor, createDoctor } from './../controllers/doctor-controller.js';

doctorRoute
      .route('/')
      .get(getAllDoctors)
      .post(validate(CREATE_DOCTOR), createDoctor)

doctorRoute
      .route('/:id')
      .get(getOneDoctor)
      .patch(validate(UPDATE_DOCTOR), updateDoctor)
      .delete(deleteDoctor)

export default doctorRoute;