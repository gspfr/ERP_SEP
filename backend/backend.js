const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

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

app.post("/login", async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await pool.query(
      "INSERT INTO users (nom, prenom, email, mot_de_passe) VALUES ($1, $2, $3, $4) RETURNING *",
      [nom, prenom, email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Le serveur run sur le port: ${process.env.PORT || 5000}`);
});
