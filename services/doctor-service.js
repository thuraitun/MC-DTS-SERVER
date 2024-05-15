import { Doctor } from "../models/doctor-model.js";
import ApiError from "../utils/apiError.js";
import { extractQuery } from "../utils/extractQuery.js";

export const getAllDoctorService = async (query) => {
      const { limit, sort, skip, filter } = extractQuery(query, filter => filter);
      const doctors = await Promise.all([
            Doctor.find(filter).sort(sort).skip(skip).limit(limit),
      ]);
      if (!doctors) {
            throw ApiError.notFound();
      }
      return doctors;
};

export const getOneDoctorService = async (id) => {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
            throw ApiError.notFound();
      }
      return doctor;
};

export const createDoctorService = async (body) => {
      const doctor = await Doctor.create(body);
      return doctor;
};

export const updateDoctorService = async (id, data) => {
      if (!id) throw ApiError.notFound();
      console.log("id: ", id, ", data: ", data);
      const doctor = await Doctor.updateOne({ _id: id }, data);
      return doctor;
};

export const deleteDoctorService = async (id) => {
      if (!id) throw ApiError.notFound();
      const doctor = await Doctor.deleteOne({ _id: id });
      return doctor;
}