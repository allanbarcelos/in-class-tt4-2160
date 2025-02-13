const express = require("express");
const mysql = require("mysql2/promise"); // TAKE A NOTE "PROMISE"
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const dbConfig = {
  // host: "127.0.0.1",
  host: 'db',
  port: 3306,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
};

app.use(express.json());

// Main route of API
app.get("/api", async (req, res) => {
  res.status(200).json({ message: "API is working" });
});

app.post("/api/message", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required " });
  }
  try {
    const conn = await mysql.createConnection(dbConfig);
    const query =
      " INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    await conn.execute(query, [name, email, message]);
    await conn.end();
  } catch (error) {
    res.status(500).json({ error: "Somenthing happens in the server" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute("SELECT * FROM users");
    await conn.end();
    res.status(200).json(rows); // array of messages objects
  } catch (error) {
    res.status(500).json({ error: "Fail" });
  }
});

app.listen(process.env.API_PORT, () => {
  console.log(`The server is runnin, PORT: ${process.env.API_PORT}`);
});
