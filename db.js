const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données
const db = new sqlite3.Database('database.sqlite', (err) => {
  if (err) {
    console.error('Erreur :', err);
  } else {
    console.log('Connexion à la base de données réussie');
  }
});

module.exports = db;

function addRandonnee({ nom, depart, arrive, distance, duree, difficulte, description, photoPath }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO randonnées (nom, depart, arrive, distance, duree, difficulte, description, photoPath)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [nom, depart, arrive, distance, duree, difficulte, description, photoPath];
      
      db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Retourne l'ID de la nouvelle randonnée
        }
      });
    });
  }
  
  module.exports = {
    addRandonnee,
  };
  