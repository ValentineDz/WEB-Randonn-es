const express = require('express');
const multer = require('multer'); // gère les photos
const path = require('path'); 
const database = require('./db'); 
const { doesNotMatch } = require('assert');

const app = express();

const storage = multer.diskStorage({
    destination: (request, file, cb) => { //cb=callback
      cb(null, 'photoContribuer/'); // Répertoire de stockage des photos
    },
    filename: (request, file, cb) => { 
      cb(null, Date.now() + path.extname(file.originalname)); //file.originalname = nom du fichier photo
      //Date.now() assure que les noms des fichiers upload sont distincs
    },
  });

  const upload = multer({ storage: storage });

  app.get('/randonnee/:id', (req, res) => {
    const randonneeId = req.params.id;
    database.getRandonneeById(randonneeId)
      .then((randonnee) => {
        res.render('randonnee', { randonnee });
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération de la randonnée :', err);
        res.status(500).send('Erreur interne du serveur.');
      });
  });

  //ajout de nouvelle rando 
  app.post('/contribuer', upload.single('photo'), (req, res) => { //upload.single = multer save photo dans le repertoire spécifié
    const { 'nom-randonnee': nom, 'adresse-depart': depart,'adresse-arrive': arrive,
    'distance': distance,'duree': duree,'difficulte': difficulte } = req.body;
    const photoPath = req.file ? `/photoContribuer/${req.file.filename}` : null; 

    database.addRandonnee({ nom, depart, arrive, distance, duree, difficulte, description, photoPath })
    
    .then((id) => {
      console.log('Nouvelle randonnée ajoutée avec ID:', id);
      res.redirect(`../randonnee/${id}`); // Redirection vers la nouvelle randonnée
    })
    .catch((err) => {
        console.error('Erreur lors de l\'ajout de la randonnée :', err);
      });
  });
