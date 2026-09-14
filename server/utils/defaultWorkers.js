// Realistic Fallback Verified Workers
export const DEFAULT_VERIFIED_WORKERS = [
  {
    _id: 'w_rajesh',
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
    completedJobs: 240,
    userId: {
      name: 'Rajesh Sharma',
      email: 'rajesh.s@gigmatch.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    }
  },
  {
    _id: 'w_sarah',
    title: 'Master Electrician & Smart Home Tech',
    categoryName: 'Electrical & Wiring',
    skills: ['Wiring', 'EV Chargers', 'Circuit Panels', 'Smart Lighting', 'Emergency Wiring'],
    bio: 'Licensed electrician with 8+ years experience specializing in high-efficiency residential wiring.',
    hourlyRate: 45,
    isAvailable: true,
    trustTier: 'Gold Tier',
    location: 'Downtown, Delhi',
    averageRating: 4.9,
    experienceYears: 8,
    isVerified: true,
    completedJobs: 184,
    userId: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@gigmatch.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    }
  },
  {
    _id: 'w_vikram',
    title: 'Residential Electrician',
    categoryName: 'Electrical & Wiring',
    skills: ['Wiring', 'Appliance Installation'],
    bio: 'General electrician available on advance booking.',
    hourlyRate: 50,
    isAvailable: false, // UNAVAILABLE SCENARIO
    trustTier: 'Silver Tier',
    location: 'Jaipur, Rajasthan',
    averageRating: 4.4,
    experienceYears: 4,
    isVerified: true,
    completedJobs: 65,
    userId: {
      name: 'Vikram Singh',
      email: 'vikram.s@gigmatch.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
    }
  },
  {
    _id: 'w_amit',
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
    isVerified: false, // UNVERIFIED SCENARIO
    completedJobs: 5,
    userId: {
      name: 'Amit Verma',
      email: 'amit.v@gigmatch.com',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400'
    }
  },
  {
    _id: 'w_david',
    title: 'Certified Master Plumber',
    categoryName: 'Home Plumbing & Repairs',
    skills: ['Leak Detection', 'Pipe Replacement', 'Water Heaters', 'Drain Cleaning'],
    bio: 'Fast, reliable plumbing solutions for home emergencies, bathroom fittings, and sewer line inspections.',
    hourlyRate: 40,
    isAvailable: true,
    trustTier: 'Gold Tier',
    location: 'Jaipur, Rajasthan',
    averageRating: 4.8,
    experienceYears: 7,
    isVerified: true,
    completedJobs: 120,
    userId: {
      name: 'David Rodriguez',
      email: 'david.r@gigmatch.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
    }
  },
  {
    _id: 'w_elena',
    title: 'Eco-Friendly Deep Cleaning Expert',
    categoryName: 'House Cleaning & Deep Sanitize',
    skills: ['Deep Cleaning', 'Sanitization', 'Move-in/Move-out', 'Window Washing'],
    bio: 'Passionate about non-toxic eco cleaning services.',
    hourlyRate: 30,
    isAvailable: true,
    trustTier: 'Gold Tier',
    location: 'North Park, Delhi',
    averageRating: 4.95,
    experienceYears: 6,
    isVerified: true,
    completedJobs: 310,
    userId: {
      name: 'Elena Rostova',
      email: 'elena.r@gigmatch.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'
    }
  }
];
