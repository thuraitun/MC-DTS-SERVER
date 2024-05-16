import { Router } from "express";
const slotRoute = Router();
import validate from "../middlewares/validate.js";
import {
  createSlotHandler,
  deleteSlotHandler,
  getAllSlotsHandler,
  getSlotHandler,
  updateSlotHandler,
} from "../controllers/slot-controller.js";
import { CREATE_SLOT, UPDATE_SLOT } from "../schema/slot-schema.js";

slotRoute
  .route("/")
  .get(getAllSlotsHandler)
  .post(validate(CREATE_SLOT), createSlotHandler);
slotRoute
  .route("/:slotId")
  .get(getSlotHandler)
  .patch(validate(UPDATE_SLOT),updateSlotHandler)
  .delete(deleteSlotHandler);

export default slotRoute;
