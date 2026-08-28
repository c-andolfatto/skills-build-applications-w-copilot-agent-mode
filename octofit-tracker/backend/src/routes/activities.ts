import { Router } from 'express';

import { sampleActivities, sampleUsers } from '../data/sampleData';
import Activity from '../models/Activity';
import { resolveCollection } from './utils';

const router = Router();

const fallbackActivities = sampleActivities.map((activity) => ({
  ...activity,
  user: sampleUsers.find((user) => user.email === activity.userEmail),
}));

router.get('/', async (_request, response) => {
  const activities = await resolveCollection(
    async () => Activity.find().populate('user').sort({ loggedAt: -1 }).lean(),
    fallbackActivities,
  );

  response.json(activities);
});

export default router;
