CREATE DATABASE erp_sep;

\connect erp_sep;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(100) NOT NULL
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(15),
    entreprise VARCHAR(100),
    statut  VARCHAR(20) CHECK (statut IN ('prospect', 'actif', 'inactif')) DEFAULT 'prospect'
);

INSERT INTO clients (nom, prenom, email, telephone, entreprise, statut) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com', '0601020304', 'Acme Corp', 'actif'),
('Martin', 'Claire', 'claire.martin@email.com', '0605060708', 'Beta SARL', 'prospect'),
('Durand', 'Paul', 'paul.durand@email.com', '0611223344', 'Gamma SAS', 'inactif');