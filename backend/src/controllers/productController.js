import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { shopId } = req.query;

    const where = {};
    if (shopId) {
      where.shopId = shopId;
    }

    const products = await Product.findAll({
  where,
  order: [["name", "ASC"]]
});
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch products", error: error.message });
  }
};