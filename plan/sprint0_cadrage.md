# Sprint 0 — Cadrage initial

## Réponses déjà fournies

1. **Objectif principal**
   - Produit prêt à tester en état de fonctionnement réel.

2. **Utilisateurs envisagés (actuellement)**
   - Administrateurs uniquement.

3. **Problème prioritaire à résoudre**
   - Gestion du crawler avec :
     - démarrage à une heure programmée,
     - capacité à poursuivre le travail de manière autonome (sans présence humaine permanente).

4. **Hors périmètre**
   - Aucun travail sur l'accès aux utilisateurs finaux.

## Questions restantes (à compléter)

### A) Livrables concrets attendus
- Quels livrables exacts sont attendus en sortie de Sprint 0 ?
- Quel format souhaité pour chaque livrable ?

### B) Spécification fonctionnelle du crawler
- Quelle granularité de planification (heure fixe, cron libre, multiples fenêtres) ?
- Quelle stratégie de reprise en cas d'échec (retry, checkpoint, relance manuelle) ?
- Quelles contraintes d'exécution (durée max, parallélisme, limites ressources) ?

### C) Pilotage administrateur
- Quelles actions admin sont indispensables en Sprint 0 (start/stop, logs, statut, replanification, relance) ?
- Quelles alertes doivent être en place (mail, Slack, webhook, aucune) ?

### D) Validation et planning
- Date cible de fin de Sprint 0 ?
- Critères de validation go/no-go du « prêt à tester » ?
- Qui valide (métier/tech) ?
