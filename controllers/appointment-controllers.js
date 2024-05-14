import catchAsync from "../utils/catchAsync.js";
import {
  getAllAppointmentService,
  getOneAppointmentService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
} from "../services/appointment-service.js";

export const getAllAppointment = catchAsync(async (req, res) => {
  const appointments = await getAllAppointmentService();
  res.status(200).json({
    status: "success",
    data: appointments,
  });
});

export const getOneAppointment = catchAsync(async (req, res) => {
  const appointment = await getOneAppointmentService(req.params.oppointmentId);
  res.status(200).json({
    status: "success",
    data: appointment,
  });
});

export const createAppointment = catchAsync(async (req, res) => {
  const appointment = await createAppointmentService(req.body);
  res.status(200).json({
    status: "success",
    data: appointment,
  });
});

export const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await updateAppointmentService(
    req.params.oppointmentId,
    req.body
  );
  res.status(200).json({
    status: "success",
    data: appointment,
  });
});

export const deleteAppointment = catchAsync(async (req, res) => {
  await deleteAppointmentService(req.params.oppointmentId);
  res.status(200).json({
    status: "success",
  });
});
