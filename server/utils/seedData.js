/* =========================================================
   AI GigMatch — Database Seeder
   Migrates the 26 categories from the existing frontend
   and generates realistic sample worker profiles.
   
   Usage: npm run seed
========================================================= */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import dns from 'dns';
import User from '../models/User.js';
import Category from '../models/Category.js';

dotenv.config();

if (process.env.MONGO_URI?.startsWith('mongodb+srv://')) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {}
}

// ── Category Data (migrated from existing script.js) ──────────────
const CATEGORIES = [
  { slug: 'electrician', name: 'Electrician', icon: '⚡', description: 'Wiring, switchboards, fittings', sortOrder: 1 },
  { slug: 'plumber', name: 'Plumber', icon: '🔧', description: 'Leak fix, pipe fitting, tank work', sortOrder: 2 },
  { slug: 'carpenter', name: 'Carpenter', icon: '🪚', description: 'Furniture, doors, repairs', sortOrder: 3 },
  { slug: 'painter', name: 'Painter', icon: '🎨', description: 'Interior & exterior painting', sortOrder: 4 },
  { slug: 'ac-repair', name: 'AC Repair & Service', icon: '❄️', description: 'Installation, gas fill, servicing', sortOrder: 5 },
  { slug: 'appliance-repair', name: 'Appliance Repair', icon: '🔩', description: 'Washing machine, fridge, oven', sortOrder: 6 },
  { slug: 'home-cleaning', name: 'Home Cleaning', icon: '🧹', description: 'Deep clean, sofa & carpet wash', sortOrder: 7 },
  { slug: 'pest-control', name: 'Pest Control', icon: '🐜', description: 'Cockroach, termite, rodent control', sortOrder: 8 },
  { slug: 'gardening', name: 'Gardening', icon: '🌱', description: 'Landscaping, lawn & plant care', sortOrder: 9 },
  { slug: 'mason', name: 'Mason / Construction', icon: '🧱', description: 'Tiling, brickwork, plastering', sortOrder: 10 },
  { slug: 'welder', name: 'Welder', icon: '🔥', description: 'Grills, gates, metal fabrication', sortOrder: 11 },
  { slug: 'cctv', name: 'CCTV Installation', icon: '📹', description: 'Camera setup & networking', sortOrder: 12 },
  { slug: 'computer-repair', name: 'Computer/Laptop Repair', icon: '💻', description: 'Hardware, software, virus removal', sortOrder: 13 },
  { slug: 'mobile-repair', name: 'Mobile Repair', icon: '📱', description: 'Screen, battery, software fix', sortOrder: 14 },
  { slug: 'mechanic', name: 'Vehicle Mechanic', icon: '🚗', description: 'Car & bike servicing', sortOrder: 15 },
  { slug: 'driver', name: 'Driver', icon: '🚙', description: 'On-demand & full-time drivers', sortOrder: 16 },
  { slug: 'cook', name: 'Cook / Chef', icon: '🍳', description: 'Daily meals & event catering', sortOrder: 17 },
  { slug: 'tailor', name: 'Tailor', icon: '🧵', description: 'Stitching & alterations', sortOrder: 18 },
  { slug: 'salon-men', name: 'Salon at Home (Men)', icon: '💈', description: 'Haircut, shave, grooming', sortOrder: 19 },
  { slug: 'salon-women', name: 'Salon at Home (Women)', icon: '💅', description: 'Facial, waxing, styling', sortOrder: 20 },
  { slug: 'movers', name: 'Packers & Movers', icon: '📦', description: 'Home & office shifting', sortOrder: 21 },
  { slug: 'interior', name: 'Interior Designer', icon: '🏠', description: 'Space planning & decor', sortOrder: 22 },
  { slug: 'photographer', name: 'Photographer', icon: '📷', description: 'Events, portraits, product shoots', sortOrder: 23 },
  { slug: 'tutor', name: 'Home Tutor', icon: '📚', description: 'School & competitive exam prep', sortOrder: 24 },
  { slug: 'security', name: 'Security Guard', icon: '🛡️', description: 'Residential & event security', sortOrder: 25 },
  { slug: 'babysitter', name: 'Babysitter / Nanny', icon: '🍼', description: 'Childcare, verified caregivers', sortOrder: 26 },
];

// ── Worker Data ───────────────────────────────────────────────────
const FIRST_NAMES = ['Ramesh', 'Suresh', 'Anita', 'Pooja', 'Vikram', 'Sanjay', 'Kavita', 'Deepak', 'Manoj', 'Rekha', 'Arjun', 'Neha', 'Rajesh', 'Sunita', 'Ajay', 'Priya', 'Mohit', 'Geeta', 'Naveen', 'Shalini'];
const LAST_NAMES = ['Sharma', 'Verma', 'Yadav', 'Kumar', 'Singh', 'Gupta', 'Mehta', 'Joshi', 'Patel', 'Reddy'];
const CITIES = ['Jaipur', 'Delhi', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad'];
const TIERS = ['none', 'bronze', 'silver', 'gold'];
const VERIFICATION_MAP = { none: 'unverified', bronze: 'verified', silver: 'verified', gold: 'verified' };

// Deterministic random (matches existing frontend logic)
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ── Seed Function ─────────────────────────────────────────────────
async function seedDatabase() {
  try {
    // Connect
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Categories
    const createdCategories = await Category.insertMany(CATEGORIES);
    console.log(`📂 Seeded ${createdCategories.length} categories`);

    // Build category lookup map (slug → _id)
    const catMap = {};
    createdCategories.forEach(cat => {
      catMap[cat.slug] = cat._id;
    });

    // Seed Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gigmatch.com',
      phone: '9999999999',
      password: 'password123',
      role: 'admin',
      isEmailVerified: true,
    });
    console.log(`👨‍💼 Created admin: admin@gigmatch.com / password123`);

    // Seed Demo Customer
    const customer = await User.create({
      name: 'Rahul Gupta',
      email: 'customer@gigmatch.com',
      phone: '9876543210',
      password: 'password123',
      role: 'customer',
      isEmailVerified: true,
    });
    console.log(`👤 Created demo customer: customer@gigmatch.com / password123`);

    // Seed Inactive User for Auth Guard Testing
    await User.create({
      name: 'Inactive User',
      email: 'inactive@gigmatch.com',
      phone: '9876543299',
      password: 'password123',
      role: 'customer',
      isActive: false,
    });
    console.log(`🚫 Created inactive user: inactive@gigmatch.com / password123`);

    // Seed Workers (3-4 per category, matching existing frontend logic)
    const workers = [];
    CATEGORIES.forEach((cat, ci) => {
      const count = 3 + Math.floor(seededRandom(ci + 1) * 2);
      for (let i = 0; i < count; i++) {
        const seed = ci * 13 + i * 7;
        const fn = FIRST_NAMES[Math.floor(seededRandom(seed) * FIRST_NAMES.length)];
        const ln = LAST_NAMES[Math.floor(seededRandom(seed + 1) * LAST_NAMES.length)];
        const city = CITIES[Math.floor(seededRandom(seed + 2) * CITIES.length)];
        const tier = TIERS[Math.floor(seededRandom(seed + 3) * TIERS.length)];
        const rating = parseFloat((3.8 + seededRandom(seed + 4) * 1.2).toFixed(1));
        const jobs = 20 + Math.floor(seededRandom(seed + 5) * 380);
        const rate = 250 + Math.floor(seededRandom(seed + 6) * 550);
        const years = 1 + Math.floor(seededRandom(seed + 7) * 12);
        const available = seededRandom(seed + 8) > 0.25;

        workers.push({
          name: `${fn} ${ln}`,
          email: `worker_${cat.slug}_${i}@gigmatch.com`,
          phone: `${6 + Math.floor(seededRandom(seed + 9) * 4)}${String(Math.floor(seededRandom(seed + 10) * 1000000000)).padStart(9, '0')}`,
          password: 'password123', // Pre-save will hash once
          role: 'worker',
          isEmailVerified: true,
          isActive: true,
          workerProfile: {
            categoryId: catMap[cat.slug],
            bio: `${fn} ${ln} is a ${years}-year experienced ${cat.name.toLowerCase()} professional based in ${city}, known for reliable and on-time work.`,
            skills: [cat.name, 'On-time service', 'Own tools', 'Verified ID'],
            yearsOfExperience: years,
            ratePerVisit: rate,
            city: city,
            serviceArea: [city],
            isAvailable: available,
            trustTier: tier,
            verificationStatus: VERIFICATION_MAP[tier],
            documents: [],
            portfolio: [],
            totalJobsDone: jobs,
            averageRating: rating,
            totalReviews: Math.floor(jobs * 0.3),
            earnings: {
              total: jobs * rate * 0.9,
              pending: 0,
              withdrawn: jobs * rate * 0.9,
            },
          },
        });
      }
    });

    const createdWorkers = await User.insertMany(workers);
    console.log(`👷 Seeded ${createdWorkers.length} workers`);

    // Update worker counts on categories
    for (const cat of createdCategories) {
      const count = await User.countDocuments({
        role: 'worker',
        'workerProfile.categoryId': cat._id,
        isActive: true,
      });
      await Category.findByIdAndUpdate(cat._id, { workerCount: count });
    }
    console.log('📊 Updated category worker counts');

    console.log('\n🎉 Database seeded successfully!');
    console.log('──────────────────────────────────');
    console.log('Admin:    admin@gigmatch.com / admin123');
    console.log('Customer: customer@gigmatch.com / customer123');
    console.log('Workers:  worker_<category>_<n>@gigmatch.com / admin123');
    console.log('──────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
