"""Utilitaires de configuration logging pour le crawler."""

from __future__ import annotations

import logging
import logging.handlers
import os
from pathlib import Path


class LoggerManager:
    """Gestionnaire simple de loggers applicatifs."""

    def __init__(self, log_dir: str = "logs") -> None:
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(parents=True, exist_ok=True)

    def get_logger(self, name: str) -> logging.Logger:
        logger = logging.getLogger(name)

        if logger.handlers:
            return logger

        logger.setLevel(logging.INFO)
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
        )

        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

        file_name = os.getenv('OPENINDEX_LOG_FILE', 'openindex.log')
        file_handler = logging.handlers.RotatingFileHandler(
            self.log_dir / file_name,
            maxBytes=10 * 1024 * 1024,
            backupCount=5,
        )
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

        return logger


def get_logger_manager() -> LoggerManager:
    """Fabrique de LoggerManager."""
    return LoggerManager()
