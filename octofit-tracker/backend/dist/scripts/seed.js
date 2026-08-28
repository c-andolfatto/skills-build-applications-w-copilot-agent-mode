"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        // Clear existing data
        await Promise.all([
            User_1.UserModel.deleteMany({}),
            Team_1.TeamModel.deleteMany({}),
            Activity_1.ActivityModel.deleteMany({}),
            LeaderboardEntry_1.LeaderboardEntryModel.deleteMany({}),
            Workout_1.WorkoutModel.deleteMany({})
        ]);
        console.log('Cleared existing collections');
        // Seed Users
        const users = await User_1.UserModel.insertMany([
            { name: 'Alice Johnson', email: 'alice@example.com', fitnessLevel: 'advanced' },
            { name: 'Bob Smith', email: 'bob@example.com', fitnessLevel: 'intermediate' },
            { name: 'Carol White', email: 'carol@example.com', fitnessLevel: 'beginner' },
            { name: 'David Brown', email: 'david@example.com', fitnessLevel: 'advanced' },
            { name: 'Emma Davis', email: 'emma@example.com', fitnessLevel: 'intermediate' }
        ]);
        console.log(`Seeded ${users.length} users`);
        // Seed Workouts
        const workouts = await Workout_1.WorkoutModel.insertMany([
            { title: 'Morning Run', targetLevel: 'beginner', durationMinutes: 30 },
            { title: 'HIIT Session', targetLevel: 'advanced', durationMinutes: 20 },
            { title: 'Yoga Flow', targetLevel: 'beginner', durationMinutes: 45 },
            { title: 'Strength Training', targetLevel: 'intermediate', durationMinutes: 60 },
            { title: 'Marathon Training', targetLevel: 'advanced', durationMinutes: 90 }
        ]);
        console.log(`Seeded ${workouts.length} workouts`);
        // Seed Teams
        const teams = await Team_1.TeamModel.insertMany([
            { name: 'Fitness Warriors', members: [users[0]._id, users[3]._id] },
            { name: 'Health Enthusiasts', members: [users[1]._id, users[2]._id, users[4]._id] }
        ]);
        console.log(`Seeded ${teams.length} teams`);
        // Seed Activities
        const now = new Date();
        const activities = await Activity_1.ActivityModel.insertMany([
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
        const leaderboardEntries = await LeaderboardEntry_1.LeaderboardEntryModel.insertMany([
            { userId: users[0]._id, points: 950, rank: 1 },
            { userId: users[3]._id, points: 850, rank: 2 },
            { userId: users[1]._id, points: 600, rank: 3 },
            { userId: users[4]._id, points: 450, rank: 4 },
            { userId: users[2]._id, points: 300, rank: 5 }
        ]);
        console.log(`Seeded ${leaderboardEntries.length} leaderboard entries`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
