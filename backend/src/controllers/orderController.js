import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { email, phone, address, items } = req.body;

    if (!email || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }
    if (!email.includes("@")) {
  return res.status(400).json({ message: "Invalid email" });
}

    const order = await Order.create({
      email,
      phone,
      address,
      items
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Unable to create order", error: error.message });
  }
};