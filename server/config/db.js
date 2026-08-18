import mongoose from 'mongoose';
import dns from 'dns';
import 'colors';

const connectDB = async () => {
  try {
    // Set fallback public DNS servers to resolve MongoDB Atlas SRV records
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (e) {
      // Ignore if environment prevents modifying DNS servers
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;


