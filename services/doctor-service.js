import { Doctor } from "../models/doctor-model.js";
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
		if(isEmail) throw ApiError.badRequest("This email is already in use");
		
        const doctor = await Doctor.create(body);
        return doctor;
    } catch (error) {
        throw ApiError.notFound(error);
    }
};

export const updateDoctorService = async (id, data) => {
	if (!id) throw ApiError.notFound();
	console.log("id: ", id, ", data: ", data);
	const doctor = await Doctor.updateOne({ _id: id }, data);
	return doctor;
};

export const deleteDoctorService = async (id) => {
	if (!id) throw ApiError.notFound();
	const doctor = await Doctor.findByIdAndDelete({ _id: id });
	return doctor;
};

export const getDoctorSlotsService = async (id) => {
	
	const doctorSlots = await Doctor.findById(id);

	if (!doctorSlots) throw ApiError.notFound("Doctor is not found");

	return doctorSlots;
};
