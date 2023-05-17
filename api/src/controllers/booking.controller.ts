import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { createError } from "../utils/errors/createError";
import {
  CreateBookingDto,
  QueryBookingDto,
  UpdateBookingDto,
} from "../dtos/booking.dto";
import { BookingDocument } from "../interfaces/booking.interface";
import bookingService from "../services/booking.service";

export const getBookings = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const { id, ...rest } = query;
      const queryDto: QueryBookingDto = {
        ...(id && { _id: id as string }),
        ...rest,
      };
      const bookings: BookingDocument[] = await bookingService.getBookings(
        queryDto
      );
      return res.status(200).json({
        message: "Bookings found",
        status: 200,
        data: bookings,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const createBooking = () => {
  return async (req: Request, res: Response) => {
    try {
      const bookingBody: CreateBookingDto = req.body;
      const booking: BookingDocument = await bookingService.createBooking(
        bookingBody
      );
      return res.status(200).json({
        message: "Booking created",
        status: 200,
        data: booking,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const updateBooking = () => {
  return async (req: Request, res: Response) => {
    try {
      const bookingBody: UpdateBookingDto = req.body;
      const { id } = req.params;
      const booking: BookingDocument = await bookingService.updateBooking(
        id,
        bookingBody
      );
      return res.status(201).json({
        message: "Booking updated",
        status: 201,
        data: booking,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const deleteBooking = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const booking = await bookingService.deleteBooking(id);
      return res.status(200).json({
        message: "Booking deleted",
        status: 200,
        data: booking,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
