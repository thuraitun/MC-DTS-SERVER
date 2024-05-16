import catchAsync from "../utils/catchAsync.js";
import {
  getOneAppointmentService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  getAllAppointmentsService,
} from "../services/appointment-service.js";

export const getAllAppointmentsHandler = catchAsync(async (req, res) => {
  const getAllAppointments = await getAllAppointmentsService(req.query);
  res.status(200).json({
    status: "success",
    data: getAllAppointments,
  });
});

export const getAppointmentHandler = catchAsync(async (req, res) => {
  const getAppointment = await getOneAppointmentService(
    req.params.oppointmentId
  );
  res.status(200).json({
    status: "success",
    data: getAppointment,
  });
});

export const createAppointmentHandler = catchAsync(async (req, res) => {
  const createdAppointment = await createAppointmentService(req.body);
  res.status(201).json({
    status: "success",
    data: createdAppointment,
  });
});

export const updateAppointmentHandler = catchAsync(async (req, res) => {
	const appointment = await updateAppointmentService(
		req.params.oppointmentId,
		req.body,
	);
	res.status(200).json({
		status: "success",
		data: appointment,
	});
});

export const deleteAppointmentHandler = catchAsync(async (req, res) => {
	await deleteAppointmentService(req.params.oppointmentId);
	res.status(200).json({
		status: "success",
	});
});
