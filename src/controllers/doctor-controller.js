import { createDoctorService, deleteDoctorService, getAllDoctorService, getOneDoctorService, updateDoctorService } from "../services/doctor-services"

exports.getAllDoctors = async (req, res) => {
      const doctors = await getAllDoctorService();
      res.status(200).json({
            status: "success",
            data: doctors
      })
};
exports.getOneDoctor = async (req, res) => {
      const doctor = await getOneDoctorService(id);
      res.status(200).json({
            status: "success",
            data: doctor
      })
};
exports.createDoctor = async (req, res) => {
      const doctor = await createDoctorService(req.body);
      res.status(200).json({
            status: "success",
            data: doctor
      })
};
exports.updateDoctor = async (req, res) => {
      const doctor = await updateDoctorService(req.params.id, req.body);
      res.status(200).json({
            status: "success",
            data: doctors
      })
};
exports.deleteDoctor = async (req, res) => {
      await deleteDoctorService(req.params.id);
      res.status(200).json({
            status: "success"
      })
};