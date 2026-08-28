import mongoose from 'mongoose';
import { mongoConnectionString } from './env';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(mongoConnectionString);
  console.log('Connected to octofit_db');
}

export const db = mongoose.connection;

db.on('error', (error) => {
  console.error('connection error:', error);
});
