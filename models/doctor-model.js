import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },

    specialist: {
        type: "string",
        required: true
    },   
    email: {
        type: "string",
        required: true,
        unique: true
    }
})

export const Doctor = mongoose.module('Doctor', doctorSchema);