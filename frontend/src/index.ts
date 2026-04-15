// HTTP server bootstrap for frontend (for SSR or API proxy if needed)
// Not used in SPA, but created to satisfy missing entry point
import { createApp } from './app';

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
