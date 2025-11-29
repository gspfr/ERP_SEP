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
('Durand', 'Paul', 'paul.durand@email.com', '0611223344', 'Gamma SAS', 'inactif'),
('Lefevre', 'Sophie', 'sophie.lefevre@email.com', '0602030405', 'Delta SARL', 'actif'),
('Bernard', 'Luc', 'luc.bernard@email.com', '0603040506', 'Epsilon SAS', 'prospect'),
('Petit', 'Emma', 'emma.petit@email.com', '0604050607', 'Zeta Corp', 'actif'),
('Robert', 'Louis', 'louis.robert@email.com', '0605060708', 'Eta SARL', 'inactif'),
('Richard', 'Julie', 'julie.richard@email.com', '0606070809', 'Theta SAS', 'actif'),
('Durand', 'Marc', 'marc.durand@email.com', '0607080910', 'Iota Corp', 'prospect'),
('Moreau', 'Nina', 'nina.moreau@email.com', '0608091011', 'Kappa SARL', 'actif'),
('Simon', 'Pauline', 'pauline.simon@email.com', '0609101112', 'Lambda SAS', 'inactif'),
('Laurent', 'Hugo', 'hugo.laurent@email.com', '0610111213', 'Mu Corp', 'actif'),
('Michel', 'Chloé', 'chloe.michel@email.com', '0611121314', 'Nu SARL', 'prospect');