import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});

export const Slot = mongoose.model("Slot", slotSchema);
