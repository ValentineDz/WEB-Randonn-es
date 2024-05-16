export function get(request, response) {
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
              </div>
            </div>
            <nav>
              <ul class="barre-de-menu">
                <li><a href="Randonner.html" class="actuel" >Accueil</a></li>
                <li><a href="Contribuer.html">Contribuer</a></li>
              </ul>
            </nav>
    
            <main>
              <section>
                <h4>Liste des Randonnées</h4>
                <h1>Liste des Randonnées</h1>
            <ul>
                <% hikes.forEach(function(hike) { %>
                    <li><strong><%= hike.name %></strong> - Départ : <%= hike.start_address %></li>
                <% }); %>
            </ul>
            </section>
    
            </main>
            
          </body>
    </html> 
    `);
}