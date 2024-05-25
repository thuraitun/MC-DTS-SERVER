import { Slot } from "../models/slot-model.js";
import ApiError from "../utils/apiError.js";
import { extractQuery } from "../utils/extractQuery.js";
import { Doctor } from "../models/doctor-model.js";
import { Appointment } from "../models/appointment-model.js";

export const getAllSlotsService = async (query) => {
	const { sort, limit, skip, filter } = extractQuery(query, (filter) => filter);

	const slots = await Promise.all([
		Slot.find(filter).sort(sort).skip(skip).limit(limit),
	]);

	if (!Object.keys(slots).length)
		throw ApiError.notFound("Slots are not available");

	return slots;
};

export const getSlotService = async (slotId) => {
	const slot = await Slot.findById(slotId);

	if (!slot) throw ApiError.notFound("Slot is not available");

	return slot;
};

export const createSlotService = async (body) => {
	const { start_date, end_date, doctor } = body;

	const isValidDate = () => {
		const isValidStartDate = start_date > Date.now();
		const isValidEndDate = end_date > start_date;

		return { isValidStartDate, isValidEndDate };
	};
	if (isValidDate) throw ApiError.notAuthorized("Slot Date is not available");

	const existingDoctor = await Doctor.findById(doctor);

	if (!existingDoctor) throw ApiError.notFound("Doctor is not available");

	const existingSlots = await Slot.find({
		doctor,
		$or: [
			{ start_date: { $lte: start_date }, end_date: { $gte: start_date } },
			{ start_date: { $lte: end_date }, end_date: { $gte: end_date } },
			{ start_date: { $gte: start_date }, end_date: { $lte: end_date } },
		],
	});

	if (existingSlots.length > 0) {
		throw ApiError.badRequest("Slot overlaps with existing slots");
	}

	const createdSlot = await Slot.create(body);

	return createdSlot;
};

export const updateSlotService = async (slotId, updateData) => {
	console.log("Req Data", updateData);
	if (!slotId) throw ApiError.notFound("This slot is not available");

	const { start_date, end_date, doctor } = updateData;

	const isAppointmentSlot = await Appointment.findOne({ slot: slotId });

	if (isAppointmentSlot)
		throw ApiError.notAuthorized(
			"You can't update this slot due to an appointment already being",
		);

	const isValidDate = () => {
		const isValidStartDate = start_date > Date.now();
		const isValidEndDate = end_date > start_date;

		return { isValidStartDate, isValidEndDate };
	};
	if (isValidDate) throw ApiError.notAuthorized("Slot Date is not available");

	const existingSlots = await Slot.find({
		doctor,
		_id: { $ne: slotId },
		$or: [
			{ start_date: { $lte: start_date }, end_date: { $gte: start_date } },
			{ start_date: { $lte: end_date }, end_date: { $gte: end_date } },
			{ start_date: { $gte: start_date }, end_date: { $lte: end_date } },
		],
	});

	console.log("Existing Slots", existingSlots);

	if (existingSlots.length > 0) {
		throw ApiError.badRequest("Slot overlaps with existing slots");
	}

	const updatedSlot = await Slot.findByIdAndUpdate(slotId, updateData, {
		new: true,
		runValidators: true,
	});

	if (!updatedSlot) throw ApiError.notFound("Slot cann't be updated");

	return updatedSlot;
};

export const deleteSlotService = async (slotId) => {
	const isAppointmentSlot = await Appointment.findOne({ slot: slotId });

	if (isAppointmentSlot)
		throw ApiError.notAuthorized(
			"You can't delete this slot due to an appointment already being",
		);

	const deletedSlot = await Slot.findByIdAndDelete({ _id: slotId });

	if (!deletedSlot) throw ApiError.notFound("Slot is not available to delete");

	return deletedSlot;
};
