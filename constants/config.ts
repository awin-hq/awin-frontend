/**
 * Base URL for the Àwìn backend API. Override with the
 * `NEXT_PUBLIC_API_BASE_URL` environment variable in each environment.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://awin-backend.onrender.com";
