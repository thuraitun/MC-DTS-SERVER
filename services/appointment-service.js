import ApiError from "../utils/apiError.js";
import { Appointment } from "../models/appointment-model.js";
import { extractQuery } from "../utils/extractQuery.js";
import { Doctor } from "../models/doctor-model.js";

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
  console.log("Hello world service");
  const { username, phone_number, doctor, slot, description } = body;
  const isDoctorExisting = await Doctor.findById(doctor);
  console.log(isDoctorExisting);
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

