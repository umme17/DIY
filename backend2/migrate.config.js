import dotenv from "dotenv";

dotenv.config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  migrationsTable: "pgmigrations",
  dir: "migrations",
};