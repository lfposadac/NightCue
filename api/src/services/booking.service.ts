import {
  CreateBookingDto,
  QueryBookingDto,
  UpdateBookingDto,
} from "../dtos/booking.dto";
import { BookingDocument } from "../interfaces/booking.interface";
import BookingModel from "../models/booking.model";

class BookingService {
  async getBookings(query: QueryBookingDto): Promise<BookingDocument[]> {
    try {
      const bookings = await BookingModel.find(query);
      return bookings;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createBooking(bookingDto: CreateBookingDto): Promise<BookingDocument> {
    try {
      const booking = new BookingModel(bookingDto);
      const savedBooking = await booking.save();
      return savedBooking;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateBooking(
    id: string,
    bookingDto: UpdateBookingDto
  ): Promise<BookingDocument> {
    try {
      const bookingUpdated = await BookingModel.findByIdAndUpdate(
        id,
        bookingDto,
        {
          new: true,
        }
      );
      if (!bookingUpdated) throw new Error("Booking not found");
      return bookingUpdated;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteBooking(id: string): Promise<BookingDocument> {
    try {
      const bookingDeleted = await BookingModel.findByIdAndDelete(id);
      if (!bookingDeleted) throw new Error("Booking not found");
      return bookingDeleted;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

const bookingService = new BookingService();

export default bookingService;
