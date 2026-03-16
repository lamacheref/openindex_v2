"""Gestion de configuration pour le crawler SMB."""

from __future__ import annotations

import os
from dataclasses import dataclass

import psycopg2


@dataclass
class ConfigManager:
    """Expose la configuration SMB/crawler via variables d'environnement."""

    def get_smb_credentials(self) -> dict:
        return {
            'server': os.getenv('SMB_SERVER', ''),
            'share_name': os.getenv('SMB_SHARE', ''),
            'username': os.getenv('SMB_USERNAME', ''),
            'password': os.getenv('SMB_PASSWORD', ''),
            'domain': os.getenv('SMB_DOMAIN', ''),
        }

    def get_crawler_config(self) -> dict:
        max_depth = os.getenv('MAX_DEPTH', '').strip()
        parsed_max_depth = int(max_depth) if max_depth.isdigit() else None

        return {
            'max_workers': int(os.getenv('MAX_WORKERS', '4')),
            'delay_between_requests': float(os.getenv('DELAY_BETWEEN_REQUESTS', '0.1')),
            'max_queue_size': int(os.getenv('MAX_QUEUE_SIZE', '1000')),
            'max_depth': parsed_max_depth,
            'large_file_threshold': int(os.getenv('LARGE_FILE_THRESHOLD', str(100 * 1024 * 1024))),
        }


def save_configuration(server: str, share: str, username: str, password: str, domain: str, path: str = '') -> int:
    """Persist la configuration courante dans PostgreSQL et retourne son id."""
    conn = psycopg2.connect(
        host=os.getenv('POSTGRES_HOST', 'localhost'),
        port=int(os.getenv('POSTGRES_PORT', '5432')),
        dbname=os.getenv('POSTGRES_DB', 'openindex'),
        user=os.getenv('POSTGRES_USER', 'openindex_user'),
        password=os.getenv('POSTGRES_PASSWORD', 'openindex_secure_password'),
    )

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS configurations (
                        id SERIAL PRIMARY KEY,
                        server TEXT NOT NULL,
                        share TEXT NOT NULL,
                        username TEXT NOT NULL,
                        password TEXT NOT NULL,
                        domain TEXT,
                        path TEXT,
                        created_at TIMESTAMP DEFAULT NOW()
                    )
                    """
                )
                cur.execute(
                    """
                    INSERT INTO configurations (server, share, username, password, domain, path)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    (server, share, username, password, domain, path),
                )
                row = cur.fetchone()
                return int(row[0]) if row else 0
    finally:
        conn.close()
