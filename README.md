# OpenIndexV2

## Description

OpenIndexV2 est un outil de crawler SMB qui permet de parcourir un partage SMB et d'indexer les fichiers et répertoires. Il utilise PostgreSQL pour stocker les informations sur les fichiers et les répertoires.

## Fonctionnalités

- Crawling récursif d'un partage SMB
- Stockage des informations sur les fichiers et répertoires dans PostgreSQL
- Détection des fichiers en double
- Calcul des checksums pour les fichiers
- Gestion des gros fichiers
- Statistiques détaillées sur le crawl

## Prérequis

- Python 3.10+
- PostgreSQL 17
- Bibliothèques Python: smbprotocol (module `smbclient`), psycopg2, python-dotenv

## Installation

1. Cloner le dépôt:

```bash
git clone https://github.com/votre-utilisateur/openindexv2.git
cd openindexv2
```

2. Installer les dépendances:

```bash
pip install -r requirements.txt
```

3. Configurer les variables d'environnement dans un fichier `.env`:

```env
SMB_SERVER=adresse_du_serveur
SMB_SHARE=nom_du_partage
SMB_USERNAME=nom_utilisateur
SMB_PASSWORD=mot_de_passe
SMB_DOMAIN=domaine
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=openindex
POSTGRES_USER=openindex_user
POSTGRES_PASSWORD=openindex_secure_password
```

## Utilisation

## Exécution avec Docker

```bash
docker build -t openindexv2:local .
docker run --rm -p 3000:3000 openindexv2:local
```

> ⚠️ Utilisez toujours le nom d'image (`openindexv2:local`) après `docker run --rm` pour éviter l'erreur `Unable to find image 'sh:latest' locally`.


Pour démarrer le crawler, exécutez:

```bash
python src/smb_crawler_postgresql.py
```

## Configuration

Le fichier `config.ini` permet de configurer les paramètres du crawler:

```ini
[DEFAULT]
max_workers = 4
delay_between_requests = 0.1
max_queue_size = 1000
max_depth = None
large_file_threshold = 104857600
```

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence

Ce projet est sous licence AGPL-3.0.


## Images Docker publiées

Les services `web` et `crawler` sont buildés par GitHub Actions via `.github/workflows/docker-build.yml` puis publiés dans GHCR :

- `ghcr.io/lamacheref/openindex_v2-web:latest`
- `ghcr.io/lamacheref/openindex_v2-crawler:latest`

Le `docker-compose.yml` consomme ces images directement (pas de build local des Dockerfiles).
