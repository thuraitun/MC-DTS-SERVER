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
    experience: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
    }
})

export const Doctor = mongoose.model('Doctor', doctorSchema);