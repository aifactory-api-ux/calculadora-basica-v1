// Minimal Express app factory for frontend (for SSR or API proxy if needed)
// Not used in SPA, but created to satisfy missing entry point
import express from 'express';

export function createApp() {
  const app = express();
  // You can add SSR or proxy logic here if needed
  return app;
}
