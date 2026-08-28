import { Router } from 'express';
import { TeamModel } from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().populate('members').lean();
    res.json({ data: teams });
  } catch (error) {
    next(error);
  }
});

export { teamsRouter };
