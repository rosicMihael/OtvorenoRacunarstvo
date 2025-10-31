const pkg = require("pg");
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "OtvorenoRacunarstvo",
  password: "12345678",
  port: 5432,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL!");
    client.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

module.exports = { pool, connectDB };
