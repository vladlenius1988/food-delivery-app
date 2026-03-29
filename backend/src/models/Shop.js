import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Shop = sequelize.define("Shop", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: "shops",
    timestamps: false
});