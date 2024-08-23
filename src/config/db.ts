import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    const uri = 'mongodb://localhost:27017/plz-api';
    console.log('MongoDB connected...');
    const dbConnection = await mongoose.connect(uri);
    return dbConnection;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Database connection error:', err.message);
    } else {
      console.error('Unexpected error:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
