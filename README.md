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

## Propositions d'améliorations ou d'industrialisations
