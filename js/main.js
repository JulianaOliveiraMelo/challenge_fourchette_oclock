// l'objet game, qui respecte la "structure app"
// donc tout ce qu'on a besoin de savoir, c'est qu'il a une méthode init
var game = {
    // quand vous savez que l'objet aura des propriétés supplémentaires dans son cycle de vie, vous pouvez les ajouter en commentaire pour mieux vous représenter la structure exacte de l'objet ;-)
    // minBoundary,
    // maxBoundary,
    // randomNumber,
    // tries,
    scores: [],
    // on retrouve nos fonctions directement "branchées" sur l'objet game
    // elles deviennent des méthodes (c'est comme ça qu'on dit, j'y peux rien)
    askNumber: function(phrase, prefill = "") {
        var number = parseInt(prompt(phrase, prefill), 10);
    
        while (isNaN(number)) {
            number = parseInt(prompt("Saisie invalide. " + phrase, prefill), 10);
        }
    
        return number;
    },
    getRandom: function(minValue, maxValue) {
        // le mot clé return va se charger de retourner à quiconque appelle la fonction le résultat de ce charmant calcul
        return Math.round(Math.random() * (maxValue - minValue)) + minValue;
    },
    // notre méthode play est là aussi, mais son petit bonus à elle, c'est qu'on a plus besoin de lui passer l'objet game...
    // parce qu'elle est dans l'objet game :-)
    // c'est parti pour modifier tous les "fourchette" et mettre "game" à la place :-D
    // Ctrl + D est ton ami
    play: function() {

        // ici, on demande systématiquement, au début de la partie, la borne inférieure
        game.minBoundary = game.askNumber("Indiquez une borne inférieure", 0);
    
        // et la supérieure => du coup, plus besoin de les initialiser dans mon objet game
        game.maxBoundary = game.askNumber("Indiquez une borne supérieure", 100);
    
    
    
        
        game.randomNumber = game.getRandom(game.minBoundary, game.maxBoundary);
        console.log(game.randomNumber);
    
        // on demande à l'utilisateur un nombre
        var proposition = game.askNumber("Choisissez un nombre entre " + game.minBoundary + " et " + game.maxBoundary);
    
        // on initialise le compteur à 1 plutôt que 0, parce qu'on ne peut essayer 0 fois
        game.tries = 1;
    
        // tant que le nombre n'est pas le bon, on redemande
        while (proposition !== game.randomNumber) {
            // je prépare ma variable indication car je sais que je vais en avoir besoin
            // et je l'initialise avec une chaîne vide, comme ça je sais déjà que c'est une string
            var indication = '';
    
            // après avoir indiqué si c'est plus petit ou plus grand
            if (proposition > game.randomNumber) {
                indication = "C'est plus petit que " + proposition;
            } else {
                indication = "C'est plus grand que " + proposition;
            }
    
            // on redemande un nombre à l'utilisateur
            proposition = game.askNumber(indication + ". Choisissez un nombre entre " + game.minBoundary + " et " + game.maxBoundary);
    
            // on incrémente le compteur d'essais
            game.tries++;
        }
    
        alert("Bravo ! Vous avez trouvé en " + game.tries + " essai(s)");
    
        // allons rechercher notre tableau de scores pour y ajouter le score de cette nouvelle partie qui vient de se terminer
        game.scores.push(game.tries);
    
    },
    // et cette méthode, c'est le dernier petit coup de baguette magique de la structure app
    // on en met toujours une, elle s'appelle toujours pareil et elle ne prend jamais de paramètre
    // du coup, c'est plus ou moins l'équivalent d'un gros bouton rouge avec marqué au desssus "pour lancer l'application, appuyez là"
    init: function() {
        do {
            game.play();
        
            // ici on a terminé la partie, c'est le moment de demander si on veut rejouer
        } while (confirm("Rejouer ?"));
        
        
        //console.log(game.scores);
        
        var scoresList = document.querySelector("#highscore > tbody");
        
        // parcourir les scores
        for (var index = 0; index < game.scores.length; index++) {
            // afficher : Partie X : Y essais
            var gameIndex = index + 1;
            var tries = game.scores[index];
        
            // on crée les deux cellules qu'on va ajouter pour chaque score
            var leftCell = document.createElement("td");
            var rightCell = document.createElement("td");
        
            // on les remplit
            leftCell.textContent = gameIndex;
            rightCell.textContent = tries;
        
            // on crée la ligne qui va contenir les 2 cellules
            var row = document.createElement("tr");
        
            // on lui ajoute les 2 cellules
            row.appendChild(leftCell);
            row.appendChild(rightCell);
        
            // et on la branche dans le tableau
            scoresList.appendChild(row);
        }
    }
};

// hop, y'a plus qu'à
game.init();