const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const path = require('path');

// Configuration de la base de données
app.use(session({
  secret: 'votre_secret_ici',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./data/database.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error('Erreur lors de l\'ouverture de la base de données: ' + err.message);
  } else {
      console.log('Connecté à la base de données SQLite.');
      // Assurez-vous que la table existe, ou créez-la ici
      db.run('CREATE TABLE IF NOT EXISTS hikes (id INTEGER PRIMARY KEY, name TEXT, description TEXT)', (err) => {
          if (err) {
              console.error('Erreur lors de la création de la table hikes: ' + err.message);
          }
      });
  }
});

// Importation des routeurs
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Utilisation des routeurs
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Gestionnaire d'erreur de base
app.use((req, res, next) => {
    res.status(404).send("Désolé, cette page n'existe pas !");
});
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
});


// Configurer EJS comme moteur de rendu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Importer les routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});