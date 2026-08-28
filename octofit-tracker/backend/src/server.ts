import { app } from './app';
import { connectDatabase } from './config/database';
import { PORT, apiBaseUrl } from './config/env';

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`OctoFit API listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
