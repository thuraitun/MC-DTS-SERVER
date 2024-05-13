const router = require('express').Router();
const {getAllDoctors,getOneDoctor,updateDoctor,deleteDoctor,createDoctor} = require('./../controllers/doctor-controller')

router
      .route('/doctor')
      .get(getAllDoctors)
      .post(createDoctor)

router
      .route('/doctor/:id')
      .get(getOneDoctor)
      .patch(updateDoctor)
      .delete(deleteDoctor)
