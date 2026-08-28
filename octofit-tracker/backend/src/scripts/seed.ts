import mongoose from 'mongoose';

import { connectToDatabase, isDatabaseConnected } from '../config/database';
import {
  sampleActivities,
  sampleLeaderboard,
  sampleTeams,
  sampleUsers,
  sampleWorkouts,
} from '../data/sampleData';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      console.log('Seed the octofit_db database with test data requires a running MongoDB instance.');
      return;
    }

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany(sampleUsers.map(({ id: _id, ...user }) => user));
    const usersByEmail = new Map(users.map((user) => [user.email, user._id]));

    const teams = await Team.insertMany(
      sampleTeams.map(({ id: _id, memberEmails, ...team }) => ({
        ...team,
        members: memberEmails.map((email) => usersByEmail.get(email)),
      })),
    );
    const teamsByName = new Map(teams.map((team) => [team.name, team._id]));

    await Activity.insertMany(
      sampleActivities.map(({ id: _id, userEmail, loggedAt, ...activity }) => ({
        ...activity,
        user: usersByEmail.get(userEmail),
        loggedAt: new Date(loggedAt),
      })),
    );

    await Workout.insertMany(sampleWorkouts.map(({ id: _id, ...workout }) => workout));

    await LeaderboardEntry.insertMany(
      sampleLeaderboard.map(({ id: _id, userEmail, teamName, ...entry }) => ({
        ...entry,
        user: usersByEmail.get(userEmail),
        team: teamsByName.get(teamName),
      })),
    );

    console.log('Seed the octofit_db database with test data complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
