import { Router } from "express";
const slotRoute = Router();
import {
  createSlotHandler,
  deleteSlotHandler,
  getAllSlotsHandler,
  getSlotHandler,
  updateSlotHandler,
} from "../controllers/slot-controller.js";

slotRoute.route("/").get(getAllSlotsHandler).post(createSlotHandler);
slotRoute
  .route("/:slotId")
  .get(getSlotHandler)
  .patch(updateSlotHandler)
  .delete(deleteSlotHandler);

export default slotRoute;
