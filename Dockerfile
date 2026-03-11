FROM node:18-alpine

# Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]