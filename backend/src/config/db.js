import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,          // обязательно для Render
      rejectUnauthorized: false // Render использует самоподписанный сертификат
    }
  },
  logging: false // можешь включить для дебага
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected ✅");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error);
  }
};

