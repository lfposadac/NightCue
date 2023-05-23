import { Router } from "express";
import { schemaValidation } from "../middlewares/schemas/validation.middleware";
import {
  createAlertSchema,
  getAlertSchema,
  queryAlertSchema,
  updateAlertSchema,
} from "../schemas/alert.schema";
import {
  createAlert,
  deleteAlert,
  getAlert,
  updateAlert,
} from "../controllers/alert.controller";

const router = Router();

router.get("/", schemaValidation(queryAlertSchema, "query"), getAlert());

router.post("/", schemaValidation(createAlertSchema, "body"), createAlert());

router.put(
  "/:id",
  schemaValidation(updateAlertSchema, "body"),
  schemaValidation(getAlertSchema, "params"),
  updateAlert()
);

router.delete(
  "/:id",
  schemaValidation(getAlertSchema, "params"),
  deleteAlert()
);

export default router;
