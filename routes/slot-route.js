import { Router } from "express";
const slotRoute = Router();
import {
  createSlot,
  deleteSlot,
  getAllSlots,
  getSlotHandler,
  updateSlot,
} from "../controllers/slot-controller.js";

slotRoute.route("/").get(getAllSlots).post(createSlot);
slotRoute
  .route("/:slotId")
  .get(getSlotHandler)
  .patch(updateSlot)
  .delete(deleteSlot);

export default slotRoute;
