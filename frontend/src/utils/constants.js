export const ROLES = {
  CUSTOMER: 'customer',
  WORKER: 'worker',
  ADMIN: 'admin'
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const WORKER_TIERS = {
  GOLD: 'Gold Tier',
  SILVER: 'Silver Tier',
  BRONZE: 'Bronze Tier'
};

export const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Home Plumbing & Repairs', slug: 'plumbing', icon: 'Wrench', count: 124, description: 'Fix leaks, install fixtures, and repair piping.' },
  { id: '2', name: 'Electrical & Wiring', slug: 'electrical', icon: 'Zap', count: 98, description: 'Safety inspections, panel upgrades, and wiring.' },
  { id: '3', name: 'House Cleaning & Deep Sanitize', slug: 'cleaning', icon: 'Sparkles', count: 210, description: 'Residential, office, and post-construction cleaning.' },
  { id: '4', name: 'Carpentry & Furniture Assembly', slug: 'carpentry', icon: 'Hammer', count: 85, description: 'Custom woodwork, repairs, and furniture setups.' },
  { id: '5', name: 'Appliance Repair', slug: 'appliance-repair', icon: 'Cpu', count: 64, description: 'Refrigerators, washing machines, ovens & HVAC.' },
  { id: '6', name: 'Lawn Care & Gardening', slug: 'gardening', icon: 'Trees', count: 112, description: 'Mowing, landscaping, pruning, and garden design.' },
  { id: '7', name: 'Painting & Interior Decor', slug: 'painting', icon: 'Paintbrush', count: 77, description: 'Interior/exterior painting and wallpaper installation.' },
  { id: '8', name: 'Moving & Hauling Support', slug: 'moving', icon: 'Truck', count: 140, description: 'Packing, heavy lifting, and local transport.' }
];

export const MOCK_WORKERS = [
  {
    _id: 'w1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    title: 'Master Electrician & Smart Home Tech',
    category: 'Electrical & Wiring',
    categorySlug: 'electrical',
    rating: 4.9,
    reviewsCount: 142,
    hourlyRate: 45,
    location: 'Downtown, Sector 14',
    distance: '1.2 km away',
    trustTier: 'Gold Tier',
    isAvailable: true,
    isVerified: true,
    completedJobs: 184,
    skills: ['Wiring', 'EV Chargers', 'Circuit Panels', 'Smart Lighting'],
    bio: 'Licensed electrician with 8+ years experience specializing in high-efficiency residential wiring, smart home automation, and emergency electrical troubleshooting.'
  },
  {
    _id: 'w2',
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    title: 'Certified Master Plumber',
    category: 'Home Plumbing & Repairs',
    categorySlug: 'plumbing',
    rating: 4.8,
    reviewsCount: 96,
    hourlyRate: 40,
    location: 'Westside Heights',
    distance: '2.5 km away',
    trustTier: 'Gold Tier',
    isAvailable: true,
    isVerified: true,
    completedJobs: 120,
    skills: ['Leak Detection', 'Pipe Replacement', 'Water Heaters', 'Drain Cleaning'],
    bio: 'Fast, reliable plumbing solutions for home emergencies, bathroom fittings, and sewer line inspections.'
  },
  {
    _id: 'w3',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    title: 'Eco-Friendly Deep Cleaning Expert',
    category: 'House Cleaning & Deep Sanitize',
    categorySlug: 'cleaning',
    rating: 4.95,
    reviewsCount: 215,
    hourlyRate: 30,
    location: 'North Park',
    distance: '0.8 km away',
    trustTier: 'Gold Tier',
    isAvailable: true,
    isVerified: true,
    completedJobs: 310,
    skills: ['Deep Cleaning', 'Sanitization', 'Move-in/Move-out', 'Window Washing'],
    bio: 'Passionate about non-toxic eco cleaning services that keep your home sparkling clean and safe for children and pets.'
  },
  {
    _id: 'w4',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    title: 'Custom Carpenter & Cabinet Specialist',
    category: 'Carpentry & Furniture Assembly',
    categorySlug: 'carpentry',
    rating: 4.7,
    reviewsCount: 54,
    hourlyRate: 50,
    location: 'Oakridge Suburb',
    distance: '4.1 km away',
    trustTier: 'Silver Tier',
    isAvailable: false,
    isVerified: true,
    completedJobs: 68,
    skills: ['Furniture Assembly', 'Custom Shelving', 'Door Fitting', 'Deck Repair'],
    bio: 'Craftsman dedicated to solid wood restoration, IKEA furniture assembly, and custom storage solutions.'
  }
];
