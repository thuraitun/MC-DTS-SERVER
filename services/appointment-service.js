import ApiError from "../utils/apiError.js";
import { Appointment } from "../models/appointment-model.js";
import { extractQuery } from "../utils/extractQuery.js";
import { Doctor } from "../models/doctor-model.js";
import { Slot } from "../models/slot-model.js";

export const getAllAppointmentsService = async (query) => {
	const { sort, limit, skip, filter } = extractQuery(query, (filter) => filter);

	const appointments = await Appointment.find(filter)
		.sort(sort)
		.skip(skip)
		.limit(limit);

	if (!Object.keys(appointments).length)
		throw ApiError.notFound("Appointments are not available");

	return appointments;
};

export const getOneAppointmentService = async (appointmentId) => {
	const appointment = await Appointment.findById(appointmentId);
	if (!appointment) {
		throw ApiError.notFound("Appointment is not found");
	}
	return appointment;
};

export const createAppointmentService = async (body) => {
	const { doctor, slot } = body;

	const isDoctorExisting = await Doctor.findById(doctor);
	if (!isDoctorExisting) throw ApiError.notFound("Doctor is not found");

	const isSlotExisting = await Slot.findById(slot);
	if (!isSlotExisting) throw ApiError.notFound("Slot is not found");

	const isValidSlot = await Appointment.findOne({ slot });
	if (isValidSlot)
		throw ApiError.notFound("This slot already have an appointment!");

	const appointment = await Appointment.create(body);
	return appointment;
};

export const updateAppointmentService = async (appointmentId, body) => {
	const { doctor, slot } = body;

	// const isDoctorExisting = await Doctor.findById(doctor);
	// if (!isDoctorExisting) throw ApiError.notFound("Doctor is not found");

	const appointmentToUpdate = await Appointment.findById(appointmentId);
	if (!appointmentToUpdate) throw ApiError.notFound("Appointment not found");

	const existingAppointmentWithSlot = await Appointment.findOne({ slot });
	if (
		existingAppointmentWithSlot &&
		existingAppointmentWithSlot._id.toString() !== appointmentId
	) {
		throw ApiError.notAuthorized(
			"This slot is already assigned to another appointment.",
		);
	}

	const updatedAppointment = await Appointment.findByIdAndUpdate(
		appointmentId,
		body,
		{
			new: true,
			runValidators: true,
		},
	);

	if (!updatedAppointment)
		throw ApiError.notFound("Appointment cann't be updated");

	return updatedAppointment;
};

export const deleteAppointmentService = async (appointmentId) => {
	const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
	if (!deletedAppointment)
		throw ApiError.notFound("Appointment is not found to delete");
	return deletedAppointment;
};
