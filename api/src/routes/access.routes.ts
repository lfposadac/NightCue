import { Router } from "express";

// Schemas
import {
  createAccessSchema,
  queryAccessSchema,
  getAccessSchema,
  updateAccessSchema,
} from "../schemas/access.schema";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Controller
import {
  createAccess,
  deleteAccess,
  getAccess,
  updateAccess,
} from "../controllers/access.controller";

const router = Router();

// Get access
router.get("/", schemaValidation(queryAccessSchema, "query"), getAccess());

// Create access
router.post("/", schemaValidation(createAccessSchema, "body"), createAccess());

// Update access
router.put(
  "/:id",
  schemaValidation(getAccessSchema, "params"),
  schemaValidation(updateAccessSchema, "body"),
  updateAccess()
);

// Delete access
router.delete(
  "/:id",
  schemaValidation(getAccessSchema, "params"),
  deleteAccess()
);

// Export router
export default router;
