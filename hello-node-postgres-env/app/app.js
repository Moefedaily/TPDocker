const express = require("express");
const { Client } = require("pg");
const app = express();

const greeting = process.env.GREETING_MSG;

const dbConfig = {
  host: "db",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
};

app.get("/", async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query("SELECT NOW()");
    res.send(
      `${greeting}<br>Connected to PostgreSQL! Time: ${result.rows[0].now}`
    );
    await client.end();
  } catch (err) {
    res.status(500).send(`Database connection failed: ${err.message}`);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
