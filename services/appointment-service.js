import ApiError from "../utils/apiError.js";
import { Appointment } from "../models/appointment-model.js";

export const getAllAppointmentService = async () => {
      const appointments = await Appointment.find();
      if (!appointments) {
            throw ApiError.notFound();
      }
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
      const { } = body;
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