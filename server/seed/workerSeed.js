import connectDB from '../config/db.js';
import Worker from '../models/Worker.js';

const seedWorkers = async () => {
  await connectDB();
  console.log('Worker seed script initialized.');
  process.exit();
};

seedWorkers();
