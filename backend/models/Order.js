import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    items: { type: DataTypes.JSON, allowNull: false } 
}, {
    tableName: "orders",
    timestamps: true
});