import { Router } from "express";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Schemas
import {
  createPropiertySchema,
  paramsPropiertySchema,
} from "../schemas/propierty.schema";

// Controllers
import {
  createProperty,
  getPropierty,
} from "../controllers/propierty.controller";

// Create router
const router = Router();

// Get propierty
router.get(
  "/",
  schemaValidation(paramsPropiertySchema, "query"),
  getPropierty()
);

// Create propierty
router.post(
  "/",
  schemaValidation(createPropiertySchema, "body"),
  createProperty()
);

// Export router
export default router;
