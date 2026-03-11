# Changelog

## [2.0.0] - 2026-03-11

### Ajouté

- Intégration de PostgreSQL pour le stockage des données
- Gestion des gros fichiers avec checksum partiel
- Statistiques détaillées sur le crawl
- Calcul des fichiers en double
- Gestion des erreurs et des accès refusés

### Modifié

- Architecture complète du crawler pour utiliser PostgreSQL au lieu de SQLite
- Optimisation des performances avec des workers parallèles
- Amélioration de la gestion des queues et des lots

### Corrigé

- Problèmes de connexion SMB
- Gestion des erreurs de lecture de fichiers
- Problèmes de calcul des checksums

### Supprimé

- Dépendance à SQLite

## [1.0.0] - 2026-03-10

### Ajouté

- Crawler SMB de base avec SQLite
- Fonctionnalités de base de crawling et d'indexation
- Configuration de base
- Logging de base

### Modifié

- Aucune modification significative

### Corrigé

- Aucune correction significative

### Supprimé

- Aucune suppression significative