import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json({ data: workouts });
  } catch (error) {
    next(error);
  }
});

export { workoutsRouter };
