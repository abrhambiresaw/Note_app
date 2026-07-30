import express from "express";
import { fileURLToPath } from "url";

const router = express.Router();

router.get(["/", "/index.html"], (req, res) => {
  res.sendFile(
    fileURLToPath(new URL("../views/index.html", import.meta.url))
  );
});

export default router;