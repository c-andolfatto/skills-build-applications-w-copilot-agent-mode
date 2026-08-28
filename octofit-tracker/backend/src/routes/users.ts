import { Router } from 'express';

import { sampleUsers } from '../data/sampleData';
import { isDatabaseConnected } from '../config/database';
import User from '../models/User';
import { resolveCollection } from './utils';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await resolveCollection(
    async () => User.find().sort({ name: 1 }).lean(),
    sampleUsers,
  );

  response.json(users);
});

router.post('/register', async (request, response) => {
  const { name, email, fitnessLevel, goal, favoriteActivity } = request.body ?? {};

  if (!name || !email || !fitnessLevel || !goal || !favoriteActivity) {
    return response.status(400).json({
      message: 'name, email, fitnessLevel, goal, and favoriteActivity are required.',
    });
  }

  if (!isDatabaseConnected()) {
    return response.status(503).json({
      message: 'User registration requires an active MongoDB connection.',
    });
  }

  try {
    const user = await User.create({ name, email, fitnessLevel, goal, favoriteActivity });
    return response.status(201).json(user);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return response.status(409).json({
        message: 'A user with that email already exists.',
      });
    }

    return response.status(500).json({
      message: 'Unable to save the user profile.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
