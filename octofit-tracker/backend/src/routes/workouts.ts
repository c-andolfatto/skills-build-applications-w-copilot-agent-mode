import { Router } from 'express';

import { sampleWorkouts } from '../data/sampleData';
import Workout from '../models/Workout';
import { resolveCollection } from './utils';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await resolveCollection(
    async () => Workout.find().sort({ difficulty: 1, title: 1 }).lean(),
    sampleWorkouts,
  );

  response.json(workouts);
});

export default router;
