import express from "express";
import cors from "cors";
import { json } from "express";

const router = express();

// Middleware
router.use(cors());
router.use(json());

const linkHeaderValue =
  '/favicon.ico; rel="icon", ' +
  '/favicon/apple-touch-icon.webp; rel="apple-touch-icon" sizes="180x180", ' +
  '/favicon/favicon-32x32.webp; rel="icon" type="image/webp" sizes="32x32", ' +
  '/favicon/favicon-16x16.webp; rel="icon" type="image/webp" sizes="16x16", ' +
  '/favicon/site.webmanifest; rel="manifest"';

router.use((_req, res, next) => {
  res.setHeader("Link", linkHeaderValue);
  next();
});

// Root route
router.get(/.*/, (req, res) => {
  res.json({
    message: "Projects API",
    versions: {
      v1: "/v1",
      v2: "/v2",
    },
  });
});

const PORT = process.env.PORT || 3000;
router.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default router;
