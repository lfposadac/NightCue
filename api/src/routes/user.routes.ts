import { Router, json } from "express";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Schema
import {
  getUserSchema,
  queryUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

// Controllers
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

// Create router
const router = Router();

// Get all users
router.get("/", schemaValidation(queryUserSchema, "query"), getUsers());

// Update user
router.put(
  "/:id",
  schemaValidation(getUserSchema, "params"),
  schemaValidation(updateUserSchema, "body"),
  updateUser()
);

// Delete user
router.delete("/:id", schemaValidation(getUserSchema, "params"), deleteUser());

// Export router
export default router;
