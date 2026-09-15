import mongoose from 'mongoose';
import dns from 'dns';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gigmatch';
    
    // Ensure robust DNS resolution for MongoDB Atlas SRV records on Windows/Node.js
    if (mongoUri.startsWith('mongodb+srv://')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      } catch (dnsErr) {
        console.warn('DNS server override notice:', dnsErr.message);
      }
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`.red);
  }
};

export default connectDB;
