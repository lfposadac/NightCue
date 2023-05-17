import { Router } from "express";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Schemas
import {
  createPropiertySchema,
  getPropiertySchema,
  queryPropiertySchema,
  updatePropiertySchema,
} from "../schemas/propierty.schema";

// Controllers
import {
  createProperty,
  deletePropierty,
  getPropierty,
  updatePropierty,
} from "../controllers/propierty.controller";

// Create router
const router = Router();

// Get propierty
router.get(
  "/",
  schemaValidation(queryPropiertySchema, "query"),
  getPropierty()
);

// Create propierty
router.post(
  "/",
  schemaValidation(createPropiertySchema, "body"),
  createProperty()
);

// Update propierty
router.put(
  "/:id",
  schemaValidation(getPropiertySchema, "params"),
  schemaValidation(updatePropiertySchema, "body"),
  updatePropierty()
);

// Delete propierty
router.delete(
  "/:id",
  schemaValidation(getPropiertySchema, "params"),
  deletePropierty()
);

// Export router
export default router;
