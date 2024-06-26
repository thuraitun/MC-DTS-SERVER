import { Appointment } from "../models/appointment-model.js";
import { Doctor } from "../models/doctor-model.js";
import { Slot } from "../models/slot-model.js";
import ApiError from "../utils/apiError.js";
import { extractQuery } from "../utils/extractQuery.js";

export const getAllDoctorService = async (query) => {
	const { limit, sort, skip, filter } = extractQuery(query, (filter) => filter);
	const doctors = await Doctor.find(filter).sort(sort).skip(skip).limit(limit);
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
	try {
		const { email } = body;
		const isEmail = await Doctor.findOne({ email });
		if (isEmail) throw ApiError.badRequest("This email is already in use");

		const doctor = await Doctor.create(body);
		return doctor;
	} catch (error) {
		throw ApiError.notFound(error);
	}
};

export const updateDoctorService = async (id, data) => {
	if (!id) throw ApiError.notFound();
	const doctor = await Doctor.findByIdAndUpdate(id, data);
	return doctor;
};

export const deleteDoctorService = async (id) => {
	if (!id) throw ApiError.notFound();
	const checkDoctor = await Appointment.findOne({ doctor: id });

	if (checkDoctor)
		throw ApiError.notAuthenticated(
			"Sorry! Can not delete! This doctor is appointmens!",
		);

	const isSlot = await Slot.find({ doctor: id });
	if (isSlot.length > 0) await Slot.deleteMany({ doctor: id });

	const doctor = await Doctor.findByIdAndDelete(id);
	return doctor;
};

export const getDoctorSlotsService = async (id) => {
	const doctorSlots = await Doctor.findById(id).populate("slots");

	if (!doctorSlots) throw ApiError.notFound("Doctor is not found");

	return doctorSlots;
};
