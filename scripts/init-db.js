const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.sqlite', (createDbError) => {
  if (createDbError) {
    console.error('Erreur lors de l\'ouverture de la base de données ' + createDbError.message);
  } else {
    console.log('Connexion à la base de données pour initialisation réussie.');
    db.run('CREATE TABLE IF NOT EXISTS hikes (id INTEGER PRIMARY KEY, name TEXT, description TEXT)', [], (err) => {
      if (err) {
        console.error('Erreur lors de la création de la table ' + err.message);
      } else {
        console.log('Table créée ou existe déjà.');
      }
      db.close();
    });
  }
});
