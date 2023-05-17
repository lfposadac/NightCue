import { Router } from "express";

// Middlewares
import { schemaValidation } from "../middlewares/schemas/validation.middleware";

// Schemas
import {
  createTablesSchema,
  getTablesSchema,
  queryTablesSchema,
  updateTablesSchema,
} from "../schemas/tables.schema";
import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from "../controllers/tables.controller";

const router = Router();

// Get all tables
router.get("/", schemaValidation(queryTablesSchema, "query"), getTables());

// Create table
router.post("/", schemaValidation(createTablesSchema, "body"), createTable());

// Update table
router.put(
  "/:id",
  schemaValidation(getTablesSchema, "params"),
  schemaValidation(updateTablesSchema, "body"),
  updateTable()
);

// Delete table
router.delete(
  "/:id",
  schemaValidation(getTablesSchema, "params"),
  deleteTable()
);

// Export router
export default router;
