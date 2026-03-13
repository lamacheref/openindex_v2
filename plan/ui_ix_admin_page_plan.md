# Plan de développement — Page UI/UX Administrateur

## 1) Objectif produit
Créer une page dédiée aux administrateurs pour piloter, surveiller et configurer le crawler SMB depuis une interface claire, rapide et sûre.

### Résultats attendus
- Réduire le temps d'accès aux actions critiques (configuration, relance crawl, diagnostic).
- Rendre les états système explicites (santé, erreurs, progression, performances).
- Encadrer les actions sensibles par des garde-fous UX (confirmation, rôles, audit).

---

## 2) Périmètre fonctionnel (MVP)

### A. Vue d'ensemble administrateur
- KPI clés : fichiers indexés, répertoires explorés, volume total, doublons.
- État du crawler : `Idle`, `Running`, `Paused`, `Error`.
- Dernières exécutions : durée, statut, date de fin, erreurs principales.

### B. Gestion de configuration
- Création/modification/suppression des configurations SMB.
- Validation UI : champs requis, format hôte/partage, prévisualisation du chemin.
- Test de connexion avant sauvegarde.

### C. Exécution & supervision
- Boutons d'action : démarrer, arrêter, relancer crawl.
- Journal synthétique en temps réel (niveau info/warn/error).
- Filtre par configuration/serveur.

### D. Sécurité & gouvernance
- Accès réservé aux administrateurs.
- Confirmation des actions destructrices (suppression config, arrêt forcé).
- Historique d'audit des actions admin.

---

## 3) Architecture UI/UX de la page

## Sections recommandées
1. **Header** : titre, état global, actions rapides.
2. **Bandeau KPI** : 4–6 cartes métriques.
3. **Panneau “Crawler Control”** : commandes de run + statut d'exécution.
4. **Panneau “Configurations SMB”** : table + modal formulaire.
5. **Panneau “Logs & alertes”** : flux récent, filtres, export.

### Principes UX
- Priorité visuelle aux signaux critiques (erreurs, indisponibilité, surcharge).
- Minimum de clics pour les opérations fréquentes.
- Feedback immédiat après chaque action (toast + état persistant).
- Libellés orientés action administrateur (ex: “Tester la connexion”).

---

## 4) Plan d’exécution technique (itératif)

## Sprint 0 — Cadrage (0,5 à 1 jour)
- Lister les besoins admin prioritaires.
- Définir les API backend nécessaires à la page.
- Produire wireframe basse fidélité.

**Livrables** : user stories, schéma de navigation, backlog priorisé.

## Sprint 1 — Structure de page + KPI (1 à 2 jours)
- Créer la page admin (HTML/CSS/JS) dans le style existant.
- Intégrer chargement des KPI via endpoint stats.
- Gérer états UI : loading, vide, erreur.

**Critères d’acceptation** : KPI visibles, robustesse des états, responsive desktop/tablette.

## Sprint 2 — Module Configurations SMB (2 à 3 jours)
- Table des configurations (liste + recherche).
- Modal/formulaire création & édition.
- Validation front stricte + messages d’erreur explicites.

**Critères d’acceptation** : CRUD complet, validations, confirmations suppression.

## Sprint 3 — Contrôle d’exécution + logs (2 jours)
- Actions run/pause/stop avec feedback immédiat.
- Timeline des exécutions récentes.
- Zone logs avec auto-refresh et filtres.

**Critères d’acceptation** : actions fiables, logs lisibles, erreurs actionnables.

## Sprint 4 — Sécurité + finition UX (1 à 2 jours)
- Restreindre l’accès à la page admin.
- Ajouter audit des actions.
- Améliorer accessibilité (focus, contraste, labels, clavier).

**Critères d’acceptation** : permissions fonctionnelles, audit exploitable, UX conforme.

---

## 5) Spécification UX détaillée (à formaliser)

### Composants
- **Cards KPI** avec delta (tendance / variation).
- **Data table** configurations avec tri/filtre/pagination.
- **Modals** de confirmation sensibles.
- **Toasts** succès/erreur uniformisés.
- **Bannière d’alerte** pour incidents majeurs.

### États d’interface obligatoires
- Chargement initial.
- Erreur API temporaire.
- Aucun résultat (empty state guidé).
- Action en cours (bouton disabled + spinner).

---

## 6) Contraintes non fonctionnelles
- **Performance** : affichage initial < 2s sur dataset standard.
- **Sécurité** : aucun secret SMB en clair dans l’UI ou les logs.
- **Accessibilité** : navigation clavier complète + contrastes AA.
- **Traçabilité** : chaque action admin critique est historisée.

---

## 7) Définition of Done (DoD)
- Maquette validée par les parties prenantes.
- Implémentation page admin intégrée au menu.
- Tous les flux MVP testés (manuel + tests JS ciblés si présents).
- Messages d’erreur compréhensibles côté utilisateur.
- Documentation admin courte (usage + limites connues).

---

## 8) Backlog post-MVP (optionnel)
- Gestion multi-environnements (dev/recette/prod).
- Dashboard avancé (tendances, heatmaps, anomalies).
- Alerting externe (mail/webhook/Slack).
- RBAC fin (super-admin vs opérateur).
- Export CSV/JSON des logs et configurations.
