import { Router } from 'express';

import { sampleLeaderboard, sampleTeams, sampleUsers } from '../data/sampleData';
import LeaderboardEntry from '../models/LeaderboardEntry';
import { resolveCollection } from './utils';

const router = Router();

const fallbackLeaderboard = sampleLeaderboard.map((entry) => ({
  ...entry,
  user: sampleUsers.find((user) => user.email === entry.userEmail),
  team: sampleTeams.find((team) => team.name === entry.teamName),
}));

router.get('/', async (_request, response) => {
  const leaderboard = await resolveCollection(
    async () => LeaderboardEntry.find().populate('user').populate('team').sort({ rank: 1 }).lean(),
    fallbackLeaderboard,
  );

  response.json(leaderboard);
});

export default router;
