import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import cookieSession from "cookie-session";
import path from "path";

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
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('Content-Type:', req.headers['content-type']);
  next();
});


app.get("/", indexRoute.get);

// Route pour Contribuer
app.get('/contribuer', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Contribuer.html'));
});

// Route nvlle randonnée
app.post('./public/Contribuer.html', (req, res) => {
  const { nom, description, depart } = req.body;
  const sql = "INSERT INTO randonnees (nom, description, adresse_depart) VALUES (?, ?, ?)"; 
  req.context.database.run(sql, [nom, description, depart], function(err) {
      if (err) {
          console.error("Erreur lors de l'enregistrement de la randonnée:", err.message);
          res.status(500).send("Erreur lors de l'enregistrement de la randonnée: " + err.message);
          return;
      }
      console.log(`Une nouvelle randonnée a été ajoutée avec l'ID ${this.lastID}`);
      res.redirect('/');
  });
});



app.post('/submit-randonnee', (req, res) => {
const { nom, description, depart } = req.body;
console.log("données recu:", { nom, description, depart });
const sql = "INSERT INTO randonnees (nom, description, adresse_depart) VALUES (?, ?, ?)";
req.context.database.run(sql, [nom, description, depart], function(err) {
  if (err) {
    console.error(err.message);
    res.status(500).send("Erreur lors de l'enregistrement de la randonnée: " + err.message);
    return;
  }
  console.log(`nouvelle ligne ajouté : ${this.lastID}`);
  res.redirect('/'); // Rediriger vers la page d'accueil après la soumission
});
});

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
 
