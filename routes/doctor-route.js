import { Router } from 'express';
import validate from '../middlewares/validate.js';
import { CREATE_DOCTOR, UPDATE_DOCTOR } from '../schema/doctor-schema.js';
const doctorRoute = Router();
import { getAllDoctors, getOneDoctor, updateDoctor, deleteDoctor, createDoctor, getDoctorSlotsHandler } from './../controllers/doctor-controller.js';

doctorRoute
      .route('/')
      .get(getAllDoctors)
      .post(validate(CREATE_DOCTOR), createDoctor)

doctorRoute
      .route('/:id')
      .get(getOneDoctor)
      .patch(validate(UPDATE_DOCTOR), updateDoctor)
      .delete(deleteDoctor)

doctorRoute.route('/:id/slots').get(getDoctorSlotsHandler)
      // http://localhost:800/api/doctors/doctorId/slots

      
      

export default doctorRoute;