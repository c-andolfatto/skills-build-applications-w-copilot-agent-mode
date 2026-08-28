import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().populate('userId').lean();
    res.json({ data: activities });
  } catch (error) {
    next(error);
  }
});

export { activitiesRouter };
