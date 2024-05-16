import { Doctor } from "../models/doctor-model.js";
import ApiError from "../utils/apiError.js";

export const getAllDoctorService = async () => {
	const doctors = await Doctor.find().populate("slots");
	if (!doctors) {
		throw ApiError.notFound();
	}
	return doctors;
};

export const getOneDoctorService = async (id) => {
	const doctor = await Doctor.findById(id).populate("slots");
	if (!doctor) {
		throw ApiError.notFound();
	}
	return doctor;
};

export const createDoctorService = async (body) => {
	const doctor = await Doctor.create(body);
	return doctor;
};

export const updateDoctorService = async (id, data) => {
	if (!id) throw ApiError.notFound();
	console.log("id: ", id, ", data: ", data);
	const doctor = await Doctor.updateOne({ _id: id }, data);
	return doctor;
};

export const deleteDoctorService = async (id) => {
	if (!id) throw ApiError.notFound();
	const doctor = await Doctor.deleteOne({ _id: id });
	return doctor;
};

export const getDoctorSlotsService = async (id) => {
  
	const doctorSlots = await Doctor.findById(id).populate("slots");
  
	if (!doctorSlots) throw ApiError.notFound("Doctor is not found");

	return doctorSlots;
};
