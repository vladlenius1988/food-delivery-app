import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDB } from "./src/config/db.js";
import { sequelize } from "./src/config/db.js";
import shopRoutes from "./src/routes/shops.js";
import productRoutes from "./src/routes/products.js";
import orderRoutes from "./src/routes/orders.js";

dotenv.config();
testDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/shops", shopRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
    console.log("DB connected");
    app.listen(process.env.PORT, () => console.log(`Server on ${process.env.PORT}`));
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
};

start();

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

