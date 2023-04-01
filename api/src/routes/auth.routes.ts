import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { schemaValidation } from "../middlewares/schemas/validation.middleware";
import { createUserSchema } from "../schemas/user.schema";

// Create router
const router = Router();

// Sign up
router.post("/sign-up", schemaValidation(createUserSchema, 'body'), signUp());

// Sign in
router.post("/sign-in", signIn());

// Export router
export default router;