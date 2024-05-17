import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import cookieSession from "cookie-session";

const databaseFile = "database.sqlite";
const PORT = 3000; 
import * as indexRoute from "./routes/index.js";

function start(database) {
  const app = express();

// Gestionnaire d'erreur de base
 // app.use((req, res, next) => {
 //   res.status(404).send("Désolé, cette page n'existe pas !");
//}); ca fonctionne pas pour l'instant laisser de coté

//log la méthode et l'url de chaque requete recu par le serveur
app.use((request, response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.use((request, response, next) => {
  request.context = request.context ?? {}; // Create a context object for the request if it doesn't exist.
  request.context.database = database;
  next();
});

//permet d'utiliser le css dans index.js par exemple
app.use(express.static("public"));
app.use(express.static("public", { extensions: ["html"] }));
app.use(express.json());

app.get("/", indexRoute.get);

// Démarrage du serveur
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
  });
}

open({ filename: databaseFile, driver: sqlite3.Database })
  .then(start)
  .catch((error) => {
    console.error("Error opening database", error);
    process.exit(1);
  });


// Route pour Contribuer
app.get('/contribuer', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contribuer.html'));
});

// Route nvlle randonnée
router.post('/Contribuer', (req, res) => {
  const { nom, description, depart } = req.body;
  const sql = "INSERT INTO randonnees (nom, description, adresse_depart) VALUES (?, ?, ?)"; 
  db.run(sql, [nom, description, depart], function(err) {
      if (err) {
          console.error("Erreur lors de l'enregistrement de la randonnée:", err.message);
          res.status(500).send("Erreur lors de l'enregistrement de la randonnée: " + err.message);
          return;
      }
      console.log(`Une nouvelle randonnée a été ajoutée avec l'ID ${this.lastID}`);
      res.redirect(`/randonnee/${this.lastID}`);
  });
});



app.post('/submit-randonnee', (req, res) => {
const { nom, description, depart } = req.body;
const sql = "INSERT INTO randonnees (nom, description, adresse_depart) VALUES (?, ?, ?)";
db.run(sql, [nom, description, depart], function(err) {
  if (err) {
    console.error(err.message);
    res.status(500).send("Erreur lors de l'enregistrement de la randonnée: " + err.message);
    return;
  }
  console.log(`A new row has been created with rowid ${this.lastID}`);
  res.redirect('/'); // Rediriger vers la page d'accueil après la soumission
});
});





/*
const path = require('path');

// EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Assurez-vous que ce chemin est correct


const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.use('/', indexRouter);

  });
  */
 
