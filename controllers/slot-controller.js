import {
  createSlotService,
  updateSlotService,
  deleteSlotService,
  getAllSlotsService,
  getSlotService,
} from "../services/slot-service.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllSlots = catchAsync(async (req, res) => {
  const slots = await getAllSlotsService(req.query);
  res.status(200).json({
    status: "success",
    data: slots,
  });
});

export const getSlotHandler = catchAsync(async (req, res) => {
  const slot = await getSlotService(req.params.slotId);

  res.status(200).json({
    status: "success",
    data: slot,
  });
});

export const createSlot = catchAsync(async (req, res) => {
  // console.log("Doctor ID:", req.params);
  console.log("Request body:", req.body);
  const slot = await createSlotService(req.body);
  res.status(201).json({
    status: "success",
    data: slot,
  });
});

export const updateSlot = catchAsync(async (req, res) => {
  const slot = await updateSlotService(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: slot,
  });
});

export const deleteSlot = catchAsync(async (req, res) => {
  await deleteSlotService(req.params.id);
  res.status(200).json({
    status: "success",
  });
});
