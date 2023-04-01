import { Router } from "express";
import { schemaValidation } from "../middlewares/schemas/validation.middleware";
import { createUserSchema } from "../schemas/user.schema";

// Create router
const router = Router();

// Export router
export default router;
