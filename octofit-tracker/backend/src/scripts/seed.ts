import mongoose from 'mongoose';
import { UserModel } from '../models/User';
import { TeamModel } from '../models/Team';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { WorkoutModel } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    // Clear existing data
    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({})
    ]);

    console.log('Cleared existing collections');

    // Seed Users
    const users = await UserModel.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com', fitnessLevel: 'advanced' },
      { name: 'Bob Smith', email: 'bob@example.com', fitnessLevel: 'intermediate' },
      { name: 'Carol White', email: 'carol@example.com', fitnessLevel: 'beginner' },
      { name: 'David Brown', email: 'david@example.com', fitnessLevel: 'advanced' },
      { name: 'Emma Davis', email: 'emma@example.com', fitnessLevel: 'intermediate' }
    ]);
    console.log(`Seeded ${users.length} users`);

    // Seed Workouts
    const workouts = await WorkoutModel.insertMany([
      { title: 'Morning Run', targetLevel: 'beginner', durationMinutes: 30 },
      { title: 'HIIT Session', targetLevel: 'advanced', durationMinutes: 20 },
      { title: 'Yoga Flow', targetLevel: 'beginner', durationMinutes: 45 },
      { title: 'Strength Training', targetLevel: 'intermediate', durationMinutes: 60 },
      { title: 'Marathon Training', targetLevel: 'advanced', durationMinutes: 90 }
    ]);
    console.log(`Seeded ${workouts.length} workouts`);

    // Seed Teams
    const teams = await TeamModel.insertMany([
      { name: 'Fitness Warriors', members: [users[0]._id, users[3]._id] },
      { name: 'Health Enthusiasts', members: [users[1]._id, users[2]._id, users[4]._id] }
    ]);
    console.log(`Seeded ${teams.length} teams`);

    // Seed Activities
    const now = new Date();
    const activities = await ActivityModel.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        caloriesBurned: 450,
        occurredAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[0]._id,
        type: 'Cycling',
        durationMinutes: 60,
        caloriesBurned: 500,
        occurredAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[1]._id,
        type: 'Swimming',
        durationMinutes: 30,
        caloriesBurned: 300,
        occurredAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[2]._id,
        type: 'Walking',
        durationMinutes: 30,
        caloriesBurned: 150,
        occurredAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: users[3]._id,
        type: 'Weight Training',
        durationMinutes: 60,
        caloriesBurned: 400,
        occurredAt: now
      },
      {
        userId: users[4]._id,
        type: 'Yoga',
        durationMinutes: 45,
        caloriesBurned: 200,
        occurredAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log(`Seeded ${activities.length} activities`);

    // Seed Leaderboard Entries
    const leaderboardEntries = await LeaderboardEntryModel.insertMany([
      { userId: users[0]._id, points: 950, rank: 1 },
      { userId: users[3]._id, points: 850, rank: 2 },
      { userId: users[1]._id, points: 600, rank: 3 },
      { userId: users[4]._id, points: 450, rank: 4 },
      { userId: users[2]._id, points: 300, rank: 5 }
    ]);
    console.log(`Seeded ${leaderboardEntries.length} leaderboard entries`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
