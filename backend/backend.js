const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/clients", async (req, res) => {
  try {
    const allClients = await pool.query("SELECT * FROM clients");
    res.json(allClients.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/clients/:id", async (req, res) => {
  try {
    const clientid = req.params.id;
    const client = await pool.query("SELECT * FROM clients WHERE id = $1", [
      clientid,
    ]);
    res.json(client.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Le serveur run sur le port: ${process.env.PORT || 5000}`);
});
