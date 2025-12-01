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

app.put("/clients/:id", async (req, res) => {
  try {
    const clientid = req.params.id;
    const { nom, prenom, email, telephone, statut, entreprise } = req.body;
    const result = await pool.query(
      "UPDATE clients SET nom = $1, prenom = $2, email = $3, telephone = $4, statut = $5, entreprise = $6 WHERE id = $7 RETURNING *",
      [nom, prenom, email, telephone, statut, entreprise, clientid]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/clients", async (req, res) => {
  try {
    const { nom, prenom, email, telephone, statut, entreprise } = req.body;
    const newClient = await pool.query(
      "INSERT INTO clients (nom, prenom, email, telephone, statut, entreprise) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nom, prenom, email, telephone, statut, entreprise]
    );
    res.json(newClient.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/clients/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const result = await pool.query(
      "DELETE FROM clients WHERE id = $1 RETURNING *",
      [clientId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client non trouvé" });
    }
    res.json({ message: "Client supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Le serveur run sur le port: ${process.env.PORT || 5000}`);
});
