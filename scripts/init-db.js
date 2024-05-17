const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, './randonnee.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (createDbError) {
    console.error('Erreur lors de l\'ouverture de la base de données ' + createDbError.message);
  } else {
    console.log('Connexion à la base de données pour initialisation réussie.');
    db.run('CREATE TABLE IF NOT EXISTS randonnees (id INTEGER PRIMARY KEY, name TEXT, description TEXT, adresse-depart TEXT)', [], (err) => {
      if (err) {
        console.error('Erreur lors de la création de la table ' + err.message);
      } else {
        console.log('Table créée ou existe déjà.');
      }
      db.close();
    });
  }
});

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS randonnees (id INTEGER PRIMARY KEY, nom TEXT, description TEXT, adresse-depart TEXT)");

  db.run("INSERT INTO randonnees (nom, description, adresse-depart) VALUES (?, ?, ?)", ['Petit train de la mure', 'Peu de diffuclté', 'La mure']);
});

db.close();


module.exports = db;

