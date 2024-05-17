import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import cookieSession from "cookie-session";
import path from "path";
import multer from "multer";

const databaseFile = "database.sqlite";
const PORT = 3000; 

import * as indexRoute from "./routes/index.js";

// Configuration de multer pour stocker les fichiers dans le dossier 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

function start(database) {
  const app = express();
  // Gestionnaire d'erreur de base
  // app.use((req, res, next) => {
  //   res.status(404).send("Désolé, cette page n'existe pas !");
  // }); ca fonctionne pas pour l'instant laisser de coté
    // Log la méthode et l'URL de chaque requête reçue par le serveur
    app.use((request, response, next) => {
      console.log(`${request.method} ${request.url}`);
      next();
    });
    app.use((request, response, next) => {
      request.context = request.context ?? {}; // Créez un objet context pour la requête si ce n'est pas déjà fait.
      request.context.database = database;
      next();
    });
      // Permet d'utiliser le CSS dans index.js par exemple
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
    res.sendFile(path.join(__dirname, 'public/Contribuer.html'));
  });
    // Route pour soumettre une nouvelle randonnée
    app.post('/submit-randonnee', upload.single('photo'), (req, res) => {
      const { nom, description, depart } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      console.log("données reçues:", { nom, description, depart, imagePath });
    const sql = "INSERT INTO randonnees (nom, description, adresse_depart, image) VALUES (?, ?, ?, ?)";
    req.context.database.run(sql, [nom, description, depart, imagePath], function(err) {
      if (err) {
        console.error("Erreur lors de l'enregistrement de la randonnée:", err.message);
        res.status(500).send("Erreur lors de l'enregistrement de la randonnée: " + err.message);
        return;
      }
      console.log(`Une nouvelle randonnée a été ajoutée avec l'ID ${this.lastID}`);
      res.redirect(`/randonnee/${this.lastID}`);
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