import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDB, sequelize } from "./src/config/db.js";
import shopRoutes from "./src/routes/shops.js";
import productRoutes from "./src/routes/products.js";
import orderRoutes from "./src/routes/orders.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
testDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/shops", shopRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Serve frontend build
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// Any other route goes to index.html
app.all("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Unable to connect to DB:", err);
  }
};

start();