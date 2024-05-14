import { Slot } from "../models/slot-model.js";
import ApiError from "../utils/apiError.js";
import { extractQuery } from "../utils/extractQuery.js";

export const getAllSlotsService = async (query) => {
  const { sort, limit, skip, filter } = extractQuery(query, (filter) => filter);

  const slots = await Promise.all([
    Slot.find(filter).sort(sort).skip(skip).limit(limit),
  ]);

  if (!Object.keys(slots).length)
    throw ApiError.notFound("Slots are not available");

  return slots;
};

export const getSlotService = async (slotId) => {
  const slot = await Slot.findById(slotId);

  if (!slot) throw ApiError.notFound("Slot is not available");

  return slot;
};

export const createSlotService = async (body) => {
  const { start_date, end_date, doctor } = body;

  const isExistingSot = await Slot.findOne({ start_date, end_date, doctor });

  if (isExistingSot) throw ApiError.badRequest("Sot is already exists");

  const createdSlot = await Slot.create(body);
  return createdSlot;
};

export const updateSlotService = async (slotId, body) => {
  if (!slotId) throw ApiError.notFound();

  const { start_date, end_date, doctor } = body;

  const isExistingSot = await Slot.findOne({ start_date, end_date, doctor });

  if (isExistingSot) throw ApiError.badRequest("Sot is already exists");

  const updatedSlot = await Slot.findByIdAndUpdate({ _id: slotId, ...body });

  if (!updatedSlot) throw ApiError.notFound("Updated is not available");

  return updatedSlot;
};

export const deleteSlotService = async (slotId) => {
  if (!slotId) throw ApiError.notFound();

  const deletedSlot = await Slot.findByIdAndDelete({ _id: slotId });

  if (!deletedSlot) throw ApiError.notFound("Slot is not available to delete");

  return deletedSlot;
};
