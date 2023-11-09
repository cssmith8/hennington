"use strict";
require("dotenv/config"); // Load environment variables
exports.default = {
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,  },
};
