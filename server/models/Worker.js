import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    // 1. User Relationship (1-to-1 link with User model)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Worker must belong to a valid User ID'],
      unique: true, // Guarantees 1-to-1 relationship between User and Worker
    },

    // 2. Professional Information & Category Classification
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Worker must be assigned to a service category'],
    },
    skills: {
      type: [String],
      validate: {
        validator: function (val) {
          return val && val.length > 0;
        },
        message: 'Worker must specify at least one skill',
      },
      set: (skills) => skills.map((s) => s.trim().toLowerCase()), // Normalize skills to lowercase
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: '',
    },
    experienceYears: {
      type: Number,
      required: [true, 'Please specify years of experience'],
      min: [0, 'Years of experience cannot be negative'],
      default: 0,
    },
    servicesOffered: [
      {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        estimatedPrice: { type: Number, min: 0 },
      },
    ],

    // 3. Pricing Details
    basePrice: {
      type: Number,
      required: [true, 'Please provide a base visit fee'],
      min: [0, 'Base price cannot be negative'],
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Please provide an hourly rate'],
      min: [0, 'Hourly rate cannot be negative'],
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
      trim: true,
    },

    // 4. Availability & Working Hours
    isAvailable: {
      type: Boolean,
      default: true,
    },
    workingDays: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    workingHours: {
      start: { type: String, default: '09:00' }, // 24-hour format HH:mm
      end: { type: String, default: '18:00' },
    },

    // 5. Location (GeoJSON Point for 2DSphere Spatial Indexing)
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // Format: [longitude, latitude]
        required: [true, 'Location coordinates [longitude, latitude] are required'],
        validate: {
          validator: function (coords) {
            if (!Array.isArray(coords) || coords.length !== 2) return false;
            const [lng, lat] = coords;
            return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
          },
          message: 'Invalid coordinates format. Longitude must be between -180 and 180, Latitude between -90 and 90.',
        },
      },
      address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true, required: true },
        state: { type: String, trim: true },
        pincode: { type: String, trim: true },
      },
    },

    // 6. Identity Verification & Compliance
    verificationStatus: {
      type: String,
      enum: {
        values: ['unverified', 'pending', 'verified', 'rejected'],
        message: '{VALUE} is not a valid verification status',
      },
      default: 'unverified',
    },
    verificationDocuments: [
      {
        documentType: {
          type: String,
          enum: ['aadhaar', 'pan', 'driving_license', 'trade_certificate'],
          required: true,
        },
        documentUrl: { type: String, required: true }, // Store secure Cloudinary/S3 URL only
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    verifiedAt: {
      type: Date,
    },

    // 7. Aggregate Performance & Reputation Metrics
    averageRating: {
      type: Number,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot be above 5'],
      default: 0,
      set: (val) => Math.round(val * 10) / 10, // Round rating to 1 decimal place (e.g. 4.8)
    },
    totalReviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    completedJobs: {
      type: Number,
      min: 0,
      default: 0,
    },
    responseRate: {
      type: Number,
      min: [0, 'Response rate cannot be negative'],
      max: [100, 'Response rate cannot exceed 100%'],
      default: 100, // Percentage (e.g., 95 means 95% response rate)
    },

    // 8. Profile Status Toggles
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Database Indexes for High-Performance Queries & Spatial Searching
workerSchema.index({ userId: 1 }, { unique: true });
workerSchema.index({ categoryId: 1, isAvailable: 1, verificationStatus: 1 });
workerSchema.index({ location: '2dsphere' }); // GeoJSON spatial 2dsphere index
workerSchema.index({ skills: 1 });
workerSchema.index({ averageRating: -1, completedJobs: -1 });

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
