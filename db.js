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


async function getAllHikesOrderedAlphabetically() {
  const db = require('BD_rando.db'); 
  try {
      const result = await db.all("SELECT name, starting_point FROM hikes ORDER BY name ASC");
      return result;
  } catch (error) {
      throw error;
  }
}

const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

async function openDb() {
    return open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
}

  
  module.exports = {
    addRandonnee,
  };
  