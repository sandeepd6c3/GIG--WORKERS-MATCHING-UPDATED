import Booking from '../models/Booking.js';

export const createNewBooking = async (data) => {
  return await Booking.create(data);
};
