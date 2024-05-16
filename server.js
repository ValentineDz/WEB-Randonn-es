import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import cookieSession from "cookie-session";

const PORT = 3000; 
import * as indexRoute from "./routes/index.js";


function start() {
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

start();