/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, activePlayer, currentScore, stateGame
const SCORE_WINNER = 100

initialisation()

document.querySelector('.btn-new').addEventListener('click', function(){
    initialisation()
})


document.querySelector('.btn-roll').addEventListener('click', function(){

    if(stateGame == true){
        // Gestion de l'affichage du dé

            // Génère un nombre aléatore compris entre 1 et 6
            let numberRand = Math.floor(Math.random() * 6) + 1 

            // Correspondance entre le nombre aléatoire et l'image à afficher
            document.querySelector('.dice').style.display = 'block'
            document.querySelector('.dice').src = "dice-" + numberRand + ".png"


        // Gestion de l'incrémentation du currentScore du joueur actif 

            // Si le joueur lance 1 alors il perd score courant et il passe la main

            if (numberRand == 1 ){
                // Passe la main
                nextPlayer()
            }else{
                currentScore += numberRand
                document.querySelector('#current-'+activePlayer).textContent = currentScore        
            }
    }

})

function initialisation(){
    // initialisation des compteurs à zéro
    stateGame = true
    scores = [0, 0]
    currentScore = 0

    // initialisation de la vue 
    let score_Player_1 = document.getElementById("score-0")
    score_Player_1.textContent = 0
    let score_Player_2 = document.getElementById("score-1")
    score_Player_2.textContent = 0
    let current_Player_1 = document.getElementById("current-0")
    current_Player_1.textContent = 0
    let current_Player_2 = document.getElementById("current-1")
    current_Player_2.textContent = 0
    document.querySelector(".player-0-panel").classList.remove('winner')
    document.querySelector(".player-1-panel").classList.remove('winner')
    document.querySelector('#name-0').textContent = " Player 1"
    document.querySelector('#name-1').textContent = " Player 2"

    // Donner la main a un joueur
    activePlayer = 0
    document.querySelector(".player-0-panel").classList.remove('active')
    document.querySelector(".player-1-panel").classList.remove('active')

    document.querySelector(".player-"+ activePlayer +"-panel").classList.add('active')

    // Cacher le dé
    document.querySelector('.dice').style.display = 'none'
}

function nextPlayer()
{
    // initialiser le currentScore à 0 back/vue
    currentScore = 0
    let current_Player_1 = document.getElementById("current-0")
    current_Player_1.textContent = 0
    let current_Player_2 = document.getElementById("current-1")
    current_Player_2.textContent = 0

    // Changer le activePlayer
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0 // Structure ternaire

    // if (activePlayer == 0){
    //     activePlayer = 1
    // }else{
    //     activePlayer = 0
    // }
    
    // Changer au niveau de la vue 
    document.querySelector(".player-0-panel").classList.toggle('active')
    document.querySelector(".player-1-panel").classList.toggle('active')

    // Cache le dé
    document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-hold').addEventListener('click', function(){
    //la logique

    if(stateGame == true){
        // Sauvegarde le currentSocre du joueur actif dans son nombre total de points back/vue
        scores[activePlayer] += currentScore
            
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer]

        if(scores[activePlayer] >= SCORE_WINNER){
            // Gagne
            stateGame = false
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner')
            document.querySelector('#name-'+activePlayer).textContent = "WINNER :)"
        }else{
            // Passe la main
            nextPlayer()
        }
    }
})





