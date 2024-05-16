import ApiError from "../utils/apiError.js";
import { Appointment } from "../models/appointment-model.js";
import { extractQuery } from "../utils/extractQuery.js";
import { Doctor } from "../models/doctor-model.js";
import { Slot } from "../models/slot-model.js";

export const getAllAppointmentsService = async (query) => {
	const { sort, limit, skip, filter } = extractQuery(query, (filter) => filter);

	const appointments = await Promise.all([
		Appointment.find(filter).sort(sort).skip(skip).limit(limit),
	]);

	if (!Object.keys(appointments).length)
		throw ApiError.notFound("Appointments are not available");

	return appointments;
};

export const getOneAppointmentService = async (id) => {
	const appointment = await Appointment.findById(id);
	if (!appointment) {
		throw ApiError.notFound();
	}
	return appointment;
};

export const createAppointmentService = async (body) => {
	const { doctor, slot } = body;
	const isDoctorExisting = await Doctor.findById(doctor);
	if (!isDoctorExisting) throw ApiError.notFound("Doctor not found");

	const isSlotExisting = await Slot.findById(slot);
	if (!isSlotExisting) throw ApiError.notFound("Slot not found");

	const isValidSlot = await Appointment.findOne({ slot });
	if (isValidSlot)
		throw ApiError.notFound("This slot already have appointment!");

	const appointment = await Appointment.create(body);
	return appointment;
};

export const updateAppointmentService = async (id, data) => {
	if (!id) throw ApiError.notFound();
	console.log("id: ", id, ", data: ", data);
	const appointment = await Appointment.updateOne({ _id: id }, data);
	return appointment;
};

export const deleteAppointmentService = async (id) => {
	if (!id) throw ApiError.notFound();
	const appointment = await Appointment.deleteOne({ _id: id });
	return appointment;
};
