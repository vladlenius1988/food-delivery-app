import express from "express";
import { Product } from "../models/Product.js"; 
import Shop from "../models/Shop.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const shopId = req.query.shopId;
  try {
    const where = shopId ? { shopId } : {};
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;