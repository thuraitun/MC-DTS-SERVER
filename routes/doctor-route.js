import { Router } from 'express';
const doctorRoute = Router();
import { getAllDoctors, getOneDoctor, updateDoctor, deleteDoctor, createDoctor } from './../controllers/doctor-controller.js';
import { createSlot, getAllSlots } from '../controllers/slot-controller.js';

doctorRoute
      .route('/')
      .get(getAllDoctors)
      .post(createDoctor)

doctorRoute
      .route('/:id')
      .get(getOneDoctor)
      .patch(updateDoctor)
      .delete(deleteDoctor)

export default doctorRoute;