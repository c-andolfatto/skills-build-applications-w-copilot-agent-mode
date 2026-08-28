import { isDatabaseConnected } from '../config/database';

export async function resolveCollection<T>(query: () => Promise<T>, fallback: T) {
  if (!isDatabaseConnected()) {
    return fallback;
  }

  try {
    return await query();
  } catch (error) {
    console.warn('Falling back to sample data for collection request.', error);
    return fallback;
  }
}
