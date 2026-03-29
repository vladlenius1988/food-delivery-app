import express from "express";
import { getShops } from "../controllers/shopController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;