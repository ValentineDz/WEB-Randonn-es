const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Assurez-vous que le chemin est correct

// Route pour afficher les détails d'une randonnée
router.get('/randonnee/:id', (req, res) => {
    const randonneeId = req.params.id;
    
    const sql = "SELECT * FROM randonnees WHERE id = ?";
    db.get(sql, [randonneeId], (err, row) => {
        if (err) {
            console.error("Erreur lors de la récupération des détails de la randonnée:", err.message);
            res.status(500).send("Erreur lors de la récupération des détails de la randonnée: " + err.message);
            return;
        }
        if (!row) {
            res.status(404).send("Randonnée non trouvée");
            return;
        }
        res.render('randonnee', { randonnee: row });
    });
});

module.exports = router;