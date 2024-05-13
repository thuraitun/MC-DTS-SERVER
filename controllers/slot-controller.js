import { createSlotService, getAllSlotService, updateSlotService, deleteSlotService } from "../services/slot-service.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllSlots = catchAsync(async (req, res) => {
      const slots = await getAllSlotService();
      res.status(200).json({
            status: "success",
            data: slots
      })
});

export const createSlot = catchAsync(async (req, res) => {
      const slot = await createSlotService(req.body);
      res.status(201).json({
            status: "success",
            data: slot
      });
});

export const updateSlot = catchAsync(async (req, res) => {
      const slot = await updateSlotService(req.params.id, req.body);
      res.status(200).json({
            status: "success",
            data: slot
      })
});

export const deleteSlot = catchAsync(async (req, res) => {
      await deleteSlotService(req.params.id);
      res.status(200).json({
            status: "success"
      })
});