"""Adaptateur PostgreSQL minimal utilisé par le crawler SMB."""

from __future__ import annotations

from typing import Iterable

import psycopg2
from psycopg2.extras import execute_values


class PostgreSQLAdapter:
    def __init__(self, config: dict) -> None:
        self.config = config

    def _connect(self):
        return psycopg2.connect(
            host=self.config.get('host', 'db'),
            port=int(self.config.get('port', 5432)),
            dbname=self.config.get('database', 'openindex'),
            user=self.config.get('user', 'user'),
            password=self.config.get('password', 'password'),
        )

    def initialize_database(self) -> None:
        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS files (
                        id BIGSERIAL PRIMARY KEY,
                        path TEXT UNIQUE NOT NULL,
                        name TEXT NOT NULL,
                        size BIGINT NOT NULL DEFAULT 0,
                        is_directory BOOLEAN NOT NULL DEFAULT FALSE,
                        checksum TEXT,
                        last_modified TIMESTAMP NULL,
                        created_at TIMESTAMP DEFAULT NOW(),
                        updated_at TIMESTAMP DEFAULT NOW()
                    )
                    """
                )
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS crawl_statistics (
                        id BIGSERIAL PRIMARY KEY,
                        total_files BIGINT,
                        total_directories BIGINT,
                        total_size BIGINT,
                        duplicate_files BIGINT,
                        duplicate_size BIGINT,
                        crawl_duration_seconds BIGINT,
                        server_info TEXT,
                        status TEXT,
                        created_at TIMESTAMP DEFAULT NOW()
                    )
                    """
                )

    def save_files_batch(self, batch_files: Iterable[dict]) -> int:
        rows = []
        for file_data in batch_files:
            rows.append(
                (
                    file_data.get('path'),
                    file_data.get('name'),
                    int(file_data.get('size', 0) or 0),
                    bool(file_data.get('is_directory', False)),
                    file_data.get('checksum'),
                    file_data.get('last_modified'),
                    file_data.get('created_at'),
                    file_data.get('updated_at'),
                )
            )

        if not rows:
            return 0

        with self._connect() as conn:
            with conn.cursor() as cur:
                execute_values(
                    cur,
                    """
                    INSERT INTO files (path, name, size, is_directory, checksum, last_modified, created_at, updated_at)
                    VALUES %s
                    ON CONFLICT (path) DO UPDATE SET
                        name = EXCLUDED.name,
                        size = EXCLUDED.size,
                        is_directory = EXCLUDED.is_directory,
                        checksum = EXCLUDED.checksum,
                        last_modified = EXCLUDED.last_modified,
                        updated_at = NOW()
                    """,
                    rows,
                )
        return len(rows)

    def calculate_duplicates(self) -> int:
        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT COALESCE(SUM(cnt - 1), 0)
                    FROM (
                        SELECT checksum, COUNT(*) AS cnt
                        FROM files
                        WHERE checksum IS NOT NULL AND checksum <> '' AND is_directory = FALSE
                        GROUP BY checksum
                        HAVING COUNT(*) > 1
                    ) d
                    """
                )
                row = cur.fetchone()
                return int(row[0]) if row else 0

    def save_crawl_statistics(self, stats: dict) -> None:
        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO crawl_statistics (
                        total_files,
                        total_directories,
                        total_size,
                        duplicate_files,
                        duplicate_size,
                        crawl_duration_seconds,
                        server_info,
                        status
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        stats.get('total_files', 0),
                        stats.get('total_directories', 0),
                        stats.get('total_size', 0),
                        stats.get('duplicate_files', 0),
                        stats.get('duplicate_size', 0),
                        stats.get('crawl_duration_seconds', 0),
                        stats.get('server_info', ''),
                        stats.get('status', 'completed'),
                    ),
                )
