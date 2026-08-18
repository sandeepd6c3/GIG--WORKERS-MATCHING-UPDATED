import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a customer'],
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: [true, 'Booking must be assigned to a worker'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Booking must be associated with a category'],
    },
    jobDescription: {
      type: String,
      required: true,
      maxlength: 500,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledTimeSlot: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: {
        type: String,
        required: true,
      },
      state: String,
      pincode: String,
      landmark: String,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled', 'expired'],
      default: 'pending',
    },
    statusHistory: [
      {
        status: String,
        changedBy: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
    estimatedCost: {
      type: Number,
      required: true,
    },
    finalCost: Number,
    platformFee: Number,
    workerPayout: Number,
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    paymentId: String,
    paidAt: Date,
    cancelledBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    cancellationReason: String,
  },
  { timestamps: true }
);

bookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Auto-generate booking ID based on count
    const count = await mongoose.model('Booking').countDocuments({
      createdAt: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999))
      }
    });
    
    const countStr = (count + 1).toString().padStart(3, '0');
    this.bookingId = `BK-${dateStr}-${countStr}`;
    
    this.statusHistory.push({
      status: this.status,
      changedBy: this.customerId,
      note: 'Booking created',
    });
  }
  next();
});

bookingSchema.index({ customerId: 1, status: 1 });
bookingSchema.index({ workerId: 1, status: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ bookingId: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
