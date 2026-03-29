import Shop from "../models/Shop.js";

export const getShops = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch shops", error: error.message });
  }
};