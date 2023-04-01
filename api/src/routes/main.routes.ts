import { Router } from "express";
import AccessRoutes from "./access.routes";
import RoleRoutes from "./role.routes";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";

const router = Router();

router.use("/access", AccessRoutes);
router.use("/role", RoleRoutes);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
