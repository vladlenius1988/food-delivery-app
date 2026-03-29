import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Shop = sequelize.define("Shop", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  tableName: "shops",
  timestamps: false
});         

export default Shop;