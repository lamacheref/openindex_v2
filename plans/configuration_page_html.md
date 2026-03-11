<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuration du Crawler</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="configuration-container">
        <h1>Configuration du Crawler</h1>
        <div class="crawler-config">
            <h2>Configuration du Crawler</h2>
            <form id="crawlerForm">
                <label for="server">Serveur SMB:</label>
                <input type="text" id="server" name="server" required>

                <label for="share">Partage:</label>
                <input type="text" id="share" name="share" required>

                <label for="username">Login:</label>
                <input type="text" id="username" name="username" required>

                <label for="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required>

                <label for="domain">Domaine:</label>
                <input type="text" id="domain" name="domain">

                <label for="path">Chemin:</label>
                <input type="text" id="path" name="path">

                <button type="submit">Sauvegarder</button>
            </form>
        </div>
        <div class="config-management">
            <h2>Gestion des Configurations</h2>
            <button id="addConfig">Ajouter une Configuration</button>
            <div id="configList">
                <!-- Liste des configurations sera ajoutée ici -->
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>