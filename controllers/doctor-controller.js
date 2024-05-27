import {
	createDoctorService,
	deleteDoctorService,
	getAllDoctorService,
	getDoctorSlotsService,
	getOneDoctorService,
	updateDoctorService,
} from "../services/doctor-service.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllDoctors = catchAsync(async (req, res) => {
	const doctors = await getAllDoctorService(req.query);
	res.status(200).json({
		status: "success",
		data: doctors
	})
});
export const getOneDoctor = catchAsync(async (req, res) => {
	const doctor = await getOneDoctorService(req.params.doctorId);
	res.status(200).json({
		status: "success",
		data: doctor,
	});
});
export const createDoctor = catchAsync(async (req, res) => {
	console.log(req.body);
	const doctor = await createDoctorService(req.body);
	res.status(200).json({
		status: "success",
		data: doctor,
	});
});
export const updateDoctor = catchAsync(async (req, res) => {
	const doctor = await updateDoctorService(req.params.doctorId, req.body);
	res.status(200).json({
		status: "success",
		data: doctor,
	});
});
export const deleteDoctor = catchAsync(async (req, res) => {
	await deleteDoctorService(req.params.doctorId);
	res.status(200).json({
		status: "success",
	});
});

export const getDoctorSlotsHandler = catchAsync(async (req, res) => {
	const doctorSlots = await getDoctorSlotsService(req.params.doctorId);

	res.status(200).json({
		status: "success",
		data: doctorSlots,
	});
});
