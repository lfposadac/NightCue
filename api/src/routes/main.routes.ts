import { Router } from "express";
import AccessRoutes from "./access.routes";
import RoleRoutes from "./role.routes";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import PropiertyRoutes from "./propierty.routes";
import TableRoutes from "./tables.routes";
import BookingRotes from "./booking.routes";
import AlertRoutes from "./alert.routes";
import MusicRoutes from "./music.routes";

const router = Router();

router.use("/access", AccessRoutes);
router.use("/role", RoleRoutes);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/propierty", PropiertyRoutes);
router.use("/table", TableRoutes);
router.use("/booking", BookingRotes);
router.use("/alert", AlertRoutes);
router.use("/music", MusicRoutes);

export default router;
