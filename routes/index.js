export async function get(request, response) {
  const db = request.context.database;

  try {
    const randonnees = await db.all("SELECT * FROM randonnees");
    console.log("donnée recupéré dans index", randonnees);

    let randonneesHTML = "<ul>";
    randonnees.forEach(randonnee => {
      randonneesHTML += `<li>${randonnee.nom} : ${randonnee.description}</li>`;
    });
    randonneesHTML += "</ul>";

    response.send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head lang="fr">
        <meta charset="utf-8" />
        <link rel="stylesheet" href="./csscommun.css">
        <link rel="stylesheet" href="./Randonner.css">
      </head>
      <body>
        <!-- le menu de navigation -->
        <div id="banniere" >
          <img src="./dessin-rando.png" alt="Logo du site">
          <div id="titre" > RandoIsère </div>
          <div id="connexion" >
            <img src="./connexion.png" alt="Logo connexion">
            <li><a href="sign-up.html"  >S'inscrire</a></li>
            <li><a href="login.html"  >Se connecter</a></li>
          </div>
        </div>
        <nav>
          <ul class="barre-de-menu">
            <li><a href="/" class="actuel" >Accueil</a></li>
            <li><a href="Contribuer.html">Contribuer</a></li>
          </ul>
        </nav>
        <main>
          <section>
            <h4>Liste des Randonnées</h4>
            <h1>Liste des Randonnées</h1>
            ${randonneesHTML}
          </section>
        </main>
      </body>
      </html> 
    `);
  } catch (error) {
    console.error("Error retrieving data from database", error);
    response.status(500).send("Erreur lors de la récupération des données depuis la base de données");
  }
}
