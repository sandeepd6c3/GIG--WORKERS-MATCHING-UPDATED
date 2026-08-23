import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    customerId: req.user._id,
    customerName: req.user.name,
    ...req.body
  });
  res.status(201).json(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    $or: [{ customerId: req.user._id }, { workerId: req.user._id }]
  });
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(booking);
};
