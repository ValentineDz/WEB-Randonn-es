const express = require('express');
const router = express.Router();
const db = require('../config/database');  // Assurez-vous que le chemin est correct

// Route pour la page d'accueil
const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    let sql = "SELECT * FROM hikes";
    if (req.query.sort === 'popularity') {
        sql += " ORDER BY popularity_score DESC"; // Tri par score
    } else {
        sql += " ORDER BY name ASC"; // Tri alphab
    }

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération des randonnées: " + err.message);
            return;
        }
        res.render('home', { hikes: rows });
    });
});

module.exports = router;

///garder le meilleur 
router.get('/', (req, res) => {
    let sql = "SELECT * FROM hikes ORDER BY name ASC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des randonnées: " + err.message);
            res.status(500).send("Erreur lors de la récupération des randonnées: " + err.message);
            return;
        }
        console.log("Randonnées récupérées : ", rows);
        res.render('home', { hikes: rows });
    });
});
