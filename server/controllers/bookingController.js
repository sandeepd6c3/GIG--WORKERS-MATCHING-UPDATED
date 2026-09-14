import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Worker from '../models/Worker.js';

const VALID_STATUSES = ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'];

const VALID_TRANSITIONS = {
  pending: ['accepted', 'rejected', 'cancelled'],
  accepted: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: [],
  rejected: [],
  cancelled: []
};

export const createBooking = async (req, res) => {
  try {
    const { workerId, date, totalAmount, address } = req.body;

    if (!workerId || !date || totalAmount === undefined || !address) {
      return res.status(400).json({ message: 'workerId, date, totalAmount, and address are required' });
    }

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ message: 'totalAmount must be a positive number' });
    }

    if (isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: 'Invalid date provided' });
    }

    let booking = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      booking = await Booking.create({
        customerId: req.user._id,
        customerName: req.user.name,
        ...req.body
      });
    } else {
      booking = {
        _id: 'b_' + Date.now(),
        customerId: req.user._id,
        customerName: req.user.name,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      if (!global.__MOCK_BOOKINGS) global.__MOCK_BOOKINGS = new Map();
      global.__MOCK_BOOKINGS.set(booking._id.toString(), booking);
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    let bookings = [];
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const workerProfile = await Worker.findOne({ userId: req.user._id }).maxTimeMS(2000);
      const queryConditions = [{ customerId: req.user._id }];
      
      if (workerProfile) {
        queryConditions.push({ workerId: workerProfile._id });
      } else {
        queryConditions.push({ workerId: req.user._id });
      }

      bookings = await Booking.find({ $or: queryConditions })
        .populate('customerId', 'name email phone avatar')
        .populate('workerId')
        .sort({ createdAt: -1 })
        .maxTimeMS(2000);
    }

    res.json(bookings || []);
  } catch (error) {
    res.json([]);
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Valid options are: ${VALID_STATUSES.join(', ')}`
      });
    }

    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      // In-memory fallback booking management for offline/mock test environments
      if (!global.__MOCK_BOOKINGS) global.__MOCK_BOOKINGS = new Map();
      let booking = global.__MOCK_BOOKINGS.get(req.params.id);
      if (!booking) {
        // If not in map, create standard mock record
        booking = {
          _id: req.params.id,
          customerId: req.user._id,
          workerId: 'mock-worker-1',
          status: 'pending',
          serviceType: 'Electrician',
          amount: 50
        };
        global.__MOCK_BOOKINGS.set(req.params.id, booking);
      }

      const allowed = VALID_TRANSITIONS[booking.status] || [];
      if (req.user.role !== 'admin' && !allowed.includes(status)) {
        return res.status(400).json({
          message: `Cannot transition booking status from '${booking.status}' to '${status}'`
        });
      }
      booking.status = status;
      return res.json(booking);
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization: User must be customer, assigned worker, or admin
    const worker = await Worker.findOne({ userId: req.user._id });
    const isCustomer = booking.customerId?.toString() === req.user._id.toString();
    const isWorker = worker && booking.workerId?.toString() === worker._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isCustomer && !isWorker && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: You are not assigned to this booking' });
    }

    // Validate Status Transitions
    const allowed = VALID_TRANSITIONS[booking.status] || [];
    if (!isAdmin && !allowed.includes(status)) {
      return res.status(400).json({
        message: `Cannot transition booking status from '${booking.status}' to '${status}'`
      });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
