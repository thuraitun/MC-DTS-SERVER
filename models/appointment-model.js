import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    slot : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);