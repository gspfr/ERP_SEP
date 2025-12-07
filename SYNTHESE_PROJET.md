# Ce que j'ai livré

J'ai livré un site assez fonctionnel pour le moment. J'ai implémenté les fonctionnalités demandées dans le cahier des charges ainsin qu'une simple visualisation des stats.
Les fonctionnalités CRUD marches sur les clients ainsi que plusieurs options de filtrages.

J'ai commmencé à immplémenter l'authentification mais elle n'est pas encore fonctionnelle car pas assez contrôlée mais cela permets de se rendre compte de comment cela pourrait marcher.

J'ai aussi mis en place une architecture avec docker pour faciliter le déploiement chez n'importe qui ou alors en production.

J'ai implémenté des testes unitaires pour le backend avec Jest et supertest.

Enfin j'ai commencé à documenter ce projet avec le README.md et ce fichier de sytnhèse.

# Ce que j'aurais aimé faire avec une semaine de plus

Avec une semaine de plus j'aurais aimé:

- ajouter des notifications avec toaster plutôt que des alert javascript
- paginer le tableau des clients car il aura beaucoup plus de clients en production
- ajouter des tests unitaires et d'intégration pour le frontend/backend
- améliorer le design avec plus de CSS
- plus pousser sur la partie docker
- continuer la documentation et les commentaires

# Comment je le déploierais chez SEPEFREI

Pour déployer le projet chez SEPEFREI, je suivrais les étapes suivantes:

- Utiliser le gitlab interne de sepefrei pour héberger le projet
- J'utilise déjà les conteneurs pour la base de données, le backend et le frontend et j'ai un fichier docker-compose.yml donc c'est déjà fait mais il faudrait surement le revoir
- Il faudrait ajouter les variables d'environnements nécessaires dans le gitlab
- Enfin automatiser le déploiement en surveillant la branche prod par exemple
