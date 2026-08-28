import { Router } from 'express';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find()
      .sort({ rank: 1 })
      .populate('userId')
      .lean();
    res.json({ data: leaderboard });
  } catch (error) {
    next(error);
  }
});

export { leaderboardRouter };
