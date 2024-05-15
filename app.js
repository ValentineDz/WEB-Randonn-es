const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Configuration de la base de données
const db = new sqlite3.Database('./data/database.sqlite', (err) => {
  if (err) {
    console.error('Erreur lors de l\'ouverture de la base de données ' + err.message);
  } else {
    console.log('Connexion à la base de données réussie !');
    db.run('CREATE TABLE IF NOT EXISTS hikes (id INTEGER PRIMARY KEY, name TEXT, description TEXT)', [], (err) => {
      if (err) {
        console.error('Erreur lors de la création de la table ' + err.message);
      }
    });
  }
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Définissez ici vos routes

const PORT = 3000; // Fixé ici ou pourrait être configuré via process.env.PORT si défini manuellement dans l'environnement
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
