import { Slot } from "../models/slot-model.js";
import ApiError from "../utils/apiError.js";

export const getAllSlotService = async () => {
      const slots = await Slot.find();
      if (!Object.keys(slots).length) {
            return ApiError.notFound("Not Found Page!");
      }
      return slots;
}

export const createSlotService = async (data) => {
      const { time, day } = data;
      await Slot.create(data);
      return;
};

export const updateSlotService = async (id, data) => {
      if (!id) return ApiError.notFound();
      await Slot.updateOne({ _id: id }, data);
      return;
};
export const deleteSlotService = async (id) => {
      if (!id) return ApiError.notFound();
      await Slot.deleteOne({ _id: id });
      return;
};
