import { Slot } from "../models/slot-model.js";
import ApiError from "../utils/apiError.js";
import { extractQuery } from "../utils/extractQuery.js";

export const getAllSlotsService = async (query) => {
  const { sort, limit, skip, filter } = extractQuery(query, (filter) => filter);

  const slots = await Promise.all([
    Slot.find(filter).sort(sort).skip(skip).limit(limit),
  ]);

  if (!Object.keys(slots).length) {
    throw ApiError.notFound("Slots are not available");
  }
  return slots;
};

export const getSlotService = async (slotId) => {
  const slot = await Slot.findById(slotId);

  if (!slot) {
    throw ApiError.notFound("Slot is not available");
  }
  return slot;
};

export const createSlotService = async (body) => {
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
