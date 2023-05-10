import { Router, json } from "express";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Schema
import { createUserSchema } from "../schemas/user.schema";

// Create router
const router = Router();

// Export router
export default router;
