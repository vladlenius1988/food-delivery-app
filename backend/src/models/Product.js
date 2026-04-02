import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import  Shop  from "./Shop.js";

export const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    shopId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Shop, key: "id" }, field: "shop_id" },
    imageUrl: { type: DataTypes.STRING, allowNull: false, field: "image_url" }
}, {
    tableName: "products",
    timestamps: false
});

Shop.hasMany(Product, { foreignKey: "shopId" });
Product.belongsTo(Shop, { foreignKey: "shopId" });