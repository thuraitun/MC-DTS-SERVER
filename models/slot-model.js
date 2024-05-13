import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
      time: [
            {
                  timeSlot: {
                        type: String,
                        required: true
                  }
            }
      ],
      day: {
            type: String,
            required: true
      },
      date: {
            type: String,
            required: true
      }
});

export const Slot = mongoose.model('Slot', slotSchema);