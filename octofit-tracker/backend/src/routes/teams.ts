import { Router } from 'express';

import { sampleTeams, sampleUsers } from '../data/sampleData';
import Team from '../models/Team';
import { resolveCollection } from './utils';

const router = Router();

const fallbackTeams = sampleTeams.map((team) => ({
  ...team,
  members: team.memberEmails
    .map((email) => sampleUsers.find((user) => user.email === email))
    .filter(Boolean),
}));

router.get('/', async (_request, response) => {
  const teams = await resolveCollection(
    async () => Team.find().populate('members').sort({ name: 1 }).lean(),
    fallbackTeams,
  );

  response.json(teams);
});

export default router;
