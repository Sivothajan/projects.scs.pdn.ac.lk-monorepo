import express from "express";
import cors from "cors";
import { json } from "express";

const router = express();

// Middleware
router.use(cors());
router.use(json());

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
