import cors from 'cors';
import express from 'express';
import { apiBaseUrl, frontendBaseUrl } from './config/env';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { teamsRouter } from './routes/teams';
import { usersRouter } from './routes/users';
import { workoutsRouter } from './routes/workouts';

const app = express();

app.use(
  cors({
    origin: [frontendBaseUrl, 'http://localhost:5173']
  })
);
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({
    name: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: 'Unknown server error' });
});

export { app };
