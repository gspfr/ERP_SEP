# Mise en situation 2: Création d'un ERP interne à la SEP

## Contexte

Ce projet est réalisé dans le contexte de la deuxième mise en situation de la SEP.
Il a pour vocation de proposer un début d'ERP interne à la JE pour remplacer SIAJE (peut-être).

Cela nous permets d'être évalué en montrant une application concrète de nos compétences techniques de dev.

Nous pouvions choisir un module à developper de bout en bout parmi:

- Gestion des clients
- Suivi des études
- Intervenants et disponibilités

J'ai personnelement choisi le module gestion des clients.

## Description du projet

Mon projet permets d'accéder au site sur lequel aucun contenu n'est disponible au début. Il faut soit se connecter soit créer un compte
avant de pouvoir accéder à la page qui nous intéresse: clients.
On peut alors voir un dashboard assez simple contenant tous les clients avec leurs informations (Nom, Prénom, Email, Téléphone, Entreprise,
Statut) et affichés dans un tableau.
On peut filtrer les clients de trois manières:

- Par nom, prénom ou entreprise via un champ de texte
- Par status (actif, inactif et prospect)
- Par ordre alphabétique (croissant et décroissant)

On a aussi un graphique en donut qui est affiché en haut de la page pour montrer le nombre total de clients dans la base de données ainsi
que leurs répartitions en fonction de leurs statuts.

On a la possibilité d'ajouter un utilisateur en cliquant sur le bouton et en remplissant le form associé.
Pour modifier les informations d'un client on peut tout d'abord modifier son statut en cliquant sur le statut et le modifiant ou alors
en survolant le nom et en cliquant sur l'icone à gauche du nom pour modifier n'importe quelle information, supprimer le client ou alors annuler
les modifications.

Ce projet est divisé en trois parties: le backend, le frontend et une base de données qui tournent dans trois conteneurs docker différents.

## Instructions d'éxécutions

1. Cloner le dépôt github

```bash
git clone https://github.com/gspfr/ERP_SEP
```

2. Se placer dans le dossier du projet

```bash
cd ERP_SEP
```

3. Créer le fichier .env.docker avec les variables d'environnements nécessaires (voir exemples fournis) dans le fichier .env.docker-example

4. Créer le fichier /backend/.env pour préciser le port du backend sur 3000 (voir example fourni dans le fichier /backend/.env.example)

5. Lancer les conteneurs docker

```bash
docker-compose up --build
```

4. Accéder à l'application via le navigateur

```bash
http://localhost:8080
```

## Justifications des choixs techniques

### Backend

Pour le backend, j'ai choisi d'utiliser NodeJS et Express car ce sont deux outils que je maitrise bien et qui sont adaptés pour ce projet.
Tout le code contenenant les routes sont dans le dossier /backend/backend.js

Concernant la base de données j'ai choisie d'utiliser Postgres car j'ai déjà des bases en
SQL et que c'est une base de données robuste, performante et utilisée en entreprise.
Le fichier /backend/bdd.sql contient la création de la table clients avec les champs nécessaires.
Le fichier /backend/db.js contient la connexion à la base de données.

Enfin pour toutes les dépenances utilisées dans le backend (elles sont dans le package.json):

- bcrypt pour le hash de mots de passe des utilisateurs
- cors pour autoriser les requêtes entre le frontend et le backend
- dotenv pour la gestion des variables d'environnements
- express pour le framework web
- jsonwebtoken pour la gestion des tokens d'authentification
- nodemon pour le redémarrage automatique du serveur en dev
- pg pour la connexion à la base de données Postgres

Pour les Tests j'ai utilisé jest et supertest afin de faire un test unitaire sur la route pour get tous les clients.

Il y a trois scripts de lancement:

- "start": pour lancer le serveur en production (utilisé par docker)
- "dev": pour lancer le serveur en développement avec nodemon et ne pas avoir à le relancer à chaque modification
- "test": pour lancer les tests

Pour la contenérisation j'ai utilisé un Dockerfile dans le dossier /backend qui installe node, copie les fichiers, installe les dépandances et lance le serveur.

### Frontend

Pour le frontend j'ai choisi d'utiliser VueJS car c'est un framework que je maitrise et qui est adapté pour ce projet. Cela permets de faire des composants qui s'actualisent dynamiquement notamment pour le tableau des clients et les filtres.

Pour les dépendances j'ai utilisé:

- vue pour le framework et pour les composants reactifs
- vue router pour la gestion des routes
- chart.js pour le graphique en donut

## Propositions d'améliorations ou d'industrialisations

Voici quelques propositions que je vois actuellement:

- Protéger les routes (seulement les personnes identifiées peuvent accéder aux pages)
- Autoriser seulement les adresses @sepefrei.fr
- Mettre une pagination sur le tableau des clients
- Améliorer le comportement de la modification du status des clients (en cliquant directement dessus)
- Ajouter des notifications avec la bibliothèque toaster pour indiquer le succès ou l'échec des actions
- Ajouter un système d'export des clients (csv, excel ...)
- Faire les deux autres modules
- Ajouter des tests unitaires et d'intégration
- Documenter plus précisément
- Commenter le code
- Faire des branches git plutôt que de tout push sur la branche main comme j'étais seul et n'avais pas beaucoup de temps
