import { Router } from "express";
import { schemaValidation } from "../middlewares/schemas/validation.middleware";
import {
  createBookingSchema,
  getBookingSchema,
  queryBookingSchema,
  updateBookingSchema,
} from "../schemas/booking.schema";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "../controllers/booking.controller";

const router = Router();

// Get all bookings
router.get("/", schemaValidation(queryBookingSchema, "query"), getBookings());

// Create booking
router.post(
  "/",
  schemaValidation(createBookingSchema, "body"),
  createBooking()
);

// Update booking
router.put(
  "/:id",
  schemaValidation(getBookingSchema, "params"),
  schemaValidation(updateBookingSchema, "body"),
  updateBooking()
);

// Delete booking
router.delete(
  "/:id",
  schemaValidation(getBookingSchema, "params"),
  deleteBooking()
);

// Export router
export default router;
