import { Slot } from "../models/slot-model.js";
import ApiError from "../utils/apiError.js";
import { extractQuery } from "../utils/extractQuery.js";

export const getAllSlotsService = async (query) => {
  const { sort, limit, skip, filter } = extractQuery(query, (filter) => filter);

  const slots = await Promise.all([
    Slot.find(filter).sort(sort).skip(skip).limit(limit),
    // Slot.count(filter),
  ]);
  if (!Object.keys(slots).length) {
    return ApiError.notFound("Not Found Page!");
  }
  return slots;
};

export const createSlotService = async (body) => {
  // const { start_date, end_date } = data;
  console.log(body);
  const createdSlot = await Slot.create(body);
  return createdSlot;
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
