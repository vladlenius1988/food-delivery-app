import express from "express";
import { createOrder } from "../controllers/orderController.js";
import {Order} from "../models/Order.js";

const router = express.Router();

router.post('/', async (req, res) => {
    console.log("Request body:", req.body);
  try {
    const { email, phone, address, items } = req.body;
    const order = await Order.create({ email, phone, address, items });
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;