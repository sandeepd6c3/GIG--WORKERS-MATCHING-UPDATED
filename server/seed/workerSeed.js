import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Worker from '../models/Worker.js';
import Category from '../models/Category.js';
import bcrypt from 'bcryptjs';

const seedWorkers = async () => {
  try {
    await connectDB();
    
    // Seed default admin and sample users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const usersData = [
      { name: 'Admin User', email: 'admin@gigmatch.com', password: hashedPassword, role: 'admin' },
      { name: 'John Customer', email: 'customer@gigmatch.com', password: hashedPassword, role: 'customer' },
      { name: 'Sarah Jenkins', email: 'sarah.j@gigmatch.com', password: hashedPassword, role: 'worker', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
      { name: 'David Rodriguez', email: 'david.r@gigmatch.com', password: hashedPassword, role: 'worker', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
      { name: 'Elena Rostova', email: 'elena.r@gigmatch.com', password: hashedPassword, role: 'worker', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
      { name: 'Rajesh Sharma', email: 'rajesh.s@gigmatch.com', password: hashedPassword, role: 'worker', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
      { name: 'Vikram Singh', email: 'vikram.s@gigmatch.com', password: hashedPassword, role: 'worker', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
      { name: 'Amit Verma', email: 'amit.v@gigmatch.com', password: hashedPassword, role: 'worker', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400' }
    ];

    for (const u of usersData) {
      await User.findOneAndUpdate({ email: u.email }, u, { upsert: true, new: true });
    }

    const sarahUser = await User.findOne({ email: 'sarah.j@gigmatch.com' });
    const davidUser = await User.findOne({ email: 'david.r@gigmatch.com' });
    const elenaUser = await User.findOne({ email: 'elena.r@gigmatch.com' });
    const rajeshUser = await User.findOne({ email: 'rajesh.s@gigmatch.com' });
    const vikramUser = await User.findOne({ email: 'vikram.s@gigmatch.com' });
    const amitUser = await User.findOne({ email: 'amit.v@gigmatch.com' });

    if (sarahUser) {
      await Worker.findOneAndUpdate(
        { userId: sarahUser._id },
        {
          userId: sarahUser._id,
          title: 'Master Electrician & Smart Home Tech',
          categoryName: 'Electrical & Wiring',
          skills: ['Wiring', 'EV Chargers', 'Circuit Panels', 'Smart Lighting', 'Emergency Wiring'],
          bio: 'Licensed electrician with 8+ years experience specializing in high-efficiency residential wiring and emergency electrical troubleshooting.',
          hourlyRate: 45,
          isAvailable: true,
          trustTier: 'Gold Tier',
          location: 'Downtown',
          averageRating: 4.9,
          experienceYears: 8,
          isVerified: true,
          completedJobs: 184
        },
        { upsert: true }
      );
    }

    if (rajeshUser) {
      // Perfect Match: Electrician in Jaipur, Available, Verified, 10 yrs exp
      await Worker.findOneAndUpdate(
        { userId: rajeshUser._id },
        {
          userId: rajeshUser._id,
          title: 'Senior Emergency Electrician',
          categoryName: 'Electrical & Wiring',
          skills: ['Emergency Wiring', 'Short Circuit Repair', 'Wiring', 'Switchboard Repair'],
          bio: 'Expert electrician providing immediate 24/7 emergency wiring and panel repairs in Jaipur.',
          hourlyRate: 35,
          isAvailable: true,
          trustTier: 'Gold Tier',
          location: 'Jaipur, Rajasthan',
          averageRating: 4.95,
          experienceYears: 10,
          isVerified: true,
          completedJobs: 240
        },
        { upsert: true }
      );
    }

    if (vikramUser) {
      // Partial Match: Electrician in Jaipur, BUT Unavailable
      await Worker.findOneAndUpdate(
        { userId: vikramUser._id },
        {
          userId: vikramUser._id,
          title: 'Residential Electrician',
          categoryName: 'Electrical & Wiring',
          skills: ['Wiring', 'Appliance Installation'],
          bio: 'General electrician available on advance booking.',
          hourlyRate: 50,
          isAvailable: false,
          trustTier: 'Silver Tier',
          location: 'Jaipur, Rajasthan',
          averageRating: 4.4,
          experienceYears: 4,
          isVerified: true,
          completedJobs: 65
        },
        { upsert: true }
      );
    }

    if (amitUser) {
      // Unverified Worker: Should be excluded from matches
      await Worker.findOneAndUpdate(
        { userId: amitUser._id },
        {
          userId: amitUser._id,
          title: 'Apprentice Electrician',
          categoryName: 'Electrical & Wiring',
          skills: ['Wiring Repair'],
          bio: 'Junior technician.',
          hourlyRate: 20,
          isAvailable: true,
          trustTier: 'Bronze Tier',
          location: 'Jaipur, Rajasthan',
          averageRating: 4.0,
          experienceYears: 1,
          isVerified: false,
          completedJobs: 5
        },
        { upsert: true }
      );
    }

    if (davidUser) {
      await Worker.findOneAndUpdate(
        { userId: davidUser._id },
        {
          userId: davidUser._id,
          title: 'Certified Master Plumber',
          categoryName: 'Home Plumbing & Repairs',
          skills: ['Leak Detection', 'Pipe Replacement', 'Water Heaters', 'Drain Cleaning'],
          bio: 'Fast, reliable plumbing solutions for home emergencies, bathroom fittings, and sewer line inspections.',
          hourlyRate: 40,
          isAvailable: true,
          trustTier: 'Gold Tier',
          location: 'Westside Heights',
          averageRating: 4.8,
          experienceYears: 7,
          isVerified: true,
          completedJobs: 120
        },
        { upsert: true }
      );
    }

    if (elenaUser) {
      await Worker.findOneAndUpdate(
        { userId: elenaUser._id },
        {
          userId: elenaUser._id,
          title: 'Eco-Friendly Deep Cleaning Expert',
          categoryName: 'House Cleaning & Deep Sanitize',
          skills: ['Deep Cleaning', 'Sanitization', 'Move-in/Move-out', 'Window Washing'],
          bio: 'Passionate about non-toxic eco cleaning services that keep your home sparkling clean and safe for children and pets.',
          hourlyRate: 30,
          isAvailable: true,
          trustTier: 'Gold Tier',
          location: 'North Park',
          averageRating: 4.95,
          experienceYears: 6,
          isVerified: true,
          completedJobs: 310
        },
        { upsert: true }
      );
    }

    console.log('Worker & User seed data created successfully.');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    process.exit();
  }
};

seedWorkers();
