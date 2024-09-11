import dotenv from "dotenv";

dotenv.config();

interface DbHostConfig {
  host: string;
  dialect: string;
  port: string;
  schema: string;
  logging: boolean;
}

interface Config {
  PORT: string;
  database: string;
  username: string;
  password: string;
  db_host: DbHostConfig;
  EXP: string;
  SECRETE: string;
}

const config: Config = {
  PORT: process.env.URL_PORT || "3000",
  database: process.env.DATABASE || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  db_host: {
    host: process.env.DB_HOST || "",
    dialect: process.env.DB_DIALECT || "",
    port: process.env.DBPORT || "",
    schema: process.env.DB_SCHEMA || "",
    logging: process.env.LOGGING === "true",
  },
  EXP: process.env.EXP || "",
  SECRETE: process.env.SECRETE || "eaofajir234rdasf",
};

export default config;
