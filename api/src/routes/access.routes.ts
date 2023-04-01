import { Router } from "express";

// Schemas
import { createAccessSchema } from "../schemas/access.schema";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Controller
import { createAccess, getAccess } from "../controllers/access.controller";

const router = Router();

// Get access
router.get("/", getAccess());

// Create access
router.post("/", schemaValidation(createAccessSchema, "body"), createAccess());

export default router;
