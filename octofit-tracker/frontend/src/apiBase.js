/**
 * Returns the base URL for the OctoFit API.
 *
 * Requires VITE_CODESPACE_NAME to be defined (e.g. in .env.local):
 *   VITE_CODESPACE_NAME=your-codespace-name
 *
 * When running outside a Codespace the variable will be undefined and the
 * helper falls back to http://localhost:8000 so local development still works.
 */
export function getApiBase() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (!codespaceName) {
    return 'http://localhost:8000';
  }
  return `https://${codespaceName}-8000.app.github.dev`;
}
