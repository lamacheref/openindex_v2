const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = Number(process.env.PORT || 3000);

// Configuration de la base de données PostgreSQL
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'user',
    host: process.env.POSTGRES_HOST || 'db',
    database: process.env.POSTGRES_DB || 'openindex',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: Number(process.env.POSTGRES_PORT || 5432),
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/configurations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM configurations');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des configurations' });
    }
});

app.post('/api/configurations', async (req, res) => {
    const { server, share, username, password, domain, path } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO configurations (server, share, username, password, domain, path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [server, share, username, password, domain, path]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde de la configuration' });
    }
});

app.put('/api/configurations/:id', async (req, res) => {
    const { id } = req.params;
    const { server, share, username, password, domain, path } = req.body;
    try {
        const result = await pool.query(
            'UPDATE configurations SET server = $1, share = $2, username = $3, password = $4, domain = $5, path = $6 WHERE id = $7 RETURNING *',
            [server, share, username, password, domain, path, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la configuration' });
    }
});

app.delete('/api/configurations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM configurations WHERE id = $1', [id]);
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression de la configuration' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
