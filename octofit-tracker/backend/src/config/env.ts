import dotenv from 'dotenv';

dotenv.config();

const codespaceName = process.env.CODESPACE_NAME;

export const PORT = 8000;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
export const frontendBaseUrl = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';
export const mongoConnectionString =
  process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
