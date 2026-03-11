-- Initialisation de la base de données PostgreSQL pour OpenIndex

-- Création de la table documents
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    content TEXT,
    last_modified TIMESTAMP
);

-- Création de la table crawl_statistics
CREATE TABLE IF NOT EXISTS crawl_statistics (
    id SERIAL PRIMARY KEY,
    total_files INTEGER,
    total_directories INTEGER,
    total_size BIGINT,
    duplicate_files INTEGER,
    duplicate_size BIGINT,
    crawl_duration_seconds INTEGER,
    server_info TEXT,
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création d'un index sur le chemin des documents
CREATE INDEX IF NOT EXISTS idx_documents_path ON documents(path);

-- Création d'un index sur le contenu des documents
CREATE INDEX IF NOT EXISTS idx_documents_content ON documents USING GIN (to_tsvector('french', content));

-- Création d'une fonction pour calculer les doublons
CREATE OR REPLACE FUNCTION calculate_duplicates()
RETURNS INTEGER AS $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT checksum, COUNT(*)
        FROM documents
        WHERE checksum IS NOT NULL
        GROUP BY checksum
        HAVING COUNT(*) > 1
    ) AS duplicates;
    RETURN duplicate_count;
END;
$$ LANGUAGE plpgsql;

-- Création d'une vue pour les statistiques de crawl
CREATE OR REPLACE VIEW crawl_stats_view AS
SELECT
    id,
    total_files,
    total_directories,
    total_size,
    duplicate_files,
    duplicate_size,
    crawl_duration_seconds,
    server_info,
    status,
    created_at
FROM crawl_statistics;

-- Création d'une vue pour les documents avec doublons
CREATE OR REPLACE VIEW duplicate_documents AS
SELECT
    d1.id,
    d1.path,
    d1.checksum,
    d1.last_modified
FROM documents d1
JOIN (
    SELECT checksum
    FROM documents
    GROUP BY checksum
    HAVING COUNT(*) > 1
) d2 ON d1.checksum = d2.checksum
ORDER BY d1.checksum, d1.path;

-- Création d'une vue pour les statistiques des doublons
CREATE OR REPLACE VIEW duplicate_stats AS
SELECT
    COUNT(*) AS total_duplicates,
    SUM(size) AS total_duplicate_size
FROM documents
WHERE checksum IN (
    SELECT checksum
    FROM documents
    GROUP BY checksum
    HAVING COUNT(*) > 1
);