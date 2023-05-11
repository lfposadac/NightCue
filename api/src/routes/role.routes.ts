import { Router } from "express";

// Schemas
import {
  createRoleSchema,
  getRoleSchema,
  queryRoleSchema,
  updateRoleSchema,
} from "../schemas/role.schema";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Controller
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../controllers/role.controller";

// Create router
const router = Router();

// Get roles
router.get("/", schemaValidation(queryRoleSchema, "query"), getRoles());

// Create role
router.post("/", schemaValidation(createRoleSchema, "body"), createRole());

// Update role
router.put(
  "/:id",
  schemaValidation(getRoleSchema, "params"),
  schemaValidation(updateRoleSchema, "body"),
  updateRole()
);

// Delete role
router.delete("/:id", schemaValidation(getRoleSchema, "params"), deleteRole());

// Export router
export default router;
