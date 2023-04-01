import { Router } from "express";

// Schemas
import { createRoleSchema } from "../schemas/role.schema";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Controller
import { createRole, getRoles } from "../controllers/role.controller";

// Create router
const router = Router();

// Get roles
router.get("/", getRoles());

// Create role
router.post("/", schemaValidation(createRoleSchema, "body"), createRole());

// Export router
export default router;
