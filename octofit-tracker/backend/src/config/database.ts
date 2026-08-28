import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return db;
  }

  try {
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to octofit_db');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown connection error';
    console.warn(`Unable to connect to octofit_db, serving sample data instead. ${message}`);
  }

  return db;
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

export default db;
