import Booking from '../models/Booking.js';
import Worker from '../models/Worker.js';

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      customerId: req.user._id,
      customerName: req.user.name,
      ...req.body
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const workerProfile = await Worker.findOne({ userId: req.user._id });
    const queryConditions = [{ customerId: req.user._id }];
    
    if (workerProfile) {
      queryConditions.push({ workerId: workerProfile._id });
    } else {
      queryConditions.push({ workerId: req.user._id });
    }

    const bookings = await Booking.find({ $or: queryConditions })
      .populate('customerId', 'name email phone avatar')
      .populate('workerId')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
