import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    specialist: {
        type: String,
        required: true
    },   
    email: {
        type: String,
        required: true,
        unique: true
    },
    fee: {
        type: Number,
        required: true
    }
})

export const Doctor = mongoose.module('Doctor', doctorSchema);