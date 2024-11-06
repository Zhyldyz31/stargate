let playerRow = 2;
let playerCol = 2;
let positionsOfOases = [];
let componentsAndClues = [];
let compAndCluesRevealed = [[false, false], [false, false], [false, false]]; 
let oasesRevealed = new Array(positionsOfOases.length).fill(false); 
let allGeneratedPositions = []; 
let oasisInteractionDone = [false, false, false];
let activeNumb=1;
let timer = null;
let totalSeconds = 0;

function startGame() {
    const minutes = parseInt(document.getElementById('gameDuration').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    totalSeconds = minutes * 60;
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(updateTimer, 1000);
    activatePlayers(); 
}

function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById('timeLeft').textContent = `${pad(minutes)}:${pad(seconds)}`;

    if (totalSeconds <= 0) {
        clearInterval(timer);
        endGame();
    } else {
        totalSeconds--;
    }
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function endGame() {
    alert("Time's up! Game over.");
}

document.getElementById('setActivePl').addEventListener('click', () => {
    const activePlayersInput = document.getElementById("activePlayersInput");
    const numActivePlayers = parseInt(activePlayersInput.value);
    if (isNaN(numActivePlayers) || numActivePlayers <= 0) {
        alert("Please enter a valid number of players.");
        return;
    }
    for (let i = 0; i < numActivePlayers; i++) {
        if (i < players.length) {
            players[i].isActive = true;
        }
    }
    console.log("Players activated: ", players.filter(p => p.isActive).map(p => p.name));
});
let players = [
    { name: "Player 1", actionsRemaining: 3, waterSupply: 6, isCurrent: true, isActive:false},
    { name: "Player 2", actionsRemaining: 3, waterSupply: 6, isCurrent: true, isActive:false},
    { name: "Player 3", actionsRemaining: 3, waterSupply:6, isCurrent: true, isActive:false},
    { name: "Player 4", actionsRemaining: 3, waterSupply: 6, isCurrent: true, isActive:false},
];

while (positionsOfOases.length < 4) {
    let oasesPos = [getRandomInt(0, 4), getRandomInt(0, 4)];
    if (!sublistExists(positionsOfOases, oasesPos)){
        positionsOfOases.push(oasesPos);
    }
}
for (let i = 0; i < 3; i++) {
    componentsAndClues.push(createComponentAndCluesPositions(positionsOfOases, allGeneratedPositions));
    console.log("ComponentsPositions")
    console.log(componentsAndClues);
}
function twoPosEqual(columnPos, pos2){
    return (columnPos[0]==pos2[0] && columnPos[1]==pos2[1])
}
function activatePlayers(){
    const button=document.getElementById("setActivePl");
    const activePlayersInput= document.getElementById("activePlayersInput");
    
    button.addEventListener('click', ()=>{
        activeNumb=parseInt(activePlayersInput.value);
        console.log(activeNumb);
    })
    for(let i=0 ;i<activeNumb;i++){
        players[i].isActive=true
    }
  
}
activatePlayers();
console.log(players)
const player1=document.getElementById('player1');
const player2=document.getElementById('player2');
const player3=document.getElementById('player3');
const player4=document.getElementById('player4');


function playersData(n, cond, oasisIndex) {
    const buttonWS=document.getElementById(`buttonWS${n}`);
    const inputWS=document.getElementById(`inputWS${n}`);
    const wsValue=document.getElementById(`wsValue${n}`);
    console.log(wsValue)
    const button1=document.getElementById(`button${n}`)
    const input1=document.getElementById(`input${n}`);
    const name = document.getElementById(`player${n}Name`);
    const player = players[n - 1]; 
    const actionsRemainingElement = document.getElementById(`actRemText${n}`);
    const playerDiv = document.getElementById(`player${n}`);
    if(player.isCurrent){
        playerDiv.style.border="3px solid green"
    }
    if (cond) {
        if (!oasisInteractionDone[oasisIndex]) {
            if(wsValue==null){
                //when I try to refill the oasis, it is not really working, the element is null, I couldnot resolve it
                alert("Water Supply is unavailable, game is over((((");
            }
            let val = parseInt(wsValue.textContent);
           
            wsValue.innerText = ++val;
            oasisInteractionDone[oasisIndex] = true;
            let actionsRemaining = parseInt(actionsRemainingElement.textContent);
            if(actionsRemaining==0){
                wsValue.innerText=parseInt(wsValue.innerText)-1;
            }
            if (actionsRemaining > 0) {
                actionsRemainingElement.textContent = --actionsRemaining;
                player.actionsRemaining = actionsRemaining;

                playerDiv.classList.add('highlight');
            } else {
                playerDiv.classList.remove('highlight');
                moveToNextPlayer(n);
            }
            oasisInteractionDone[oasisIndex] = true;
        }
    }
    else {
                if (buttonWS && inputWS && wsValue) {
                    buttonWS.addEventListener('click', () => {
                        wsValue.innerText = inputWS.value;
            
                    });
                }
        
                if (button1 && input1 && name) {
                    button1.addEventListener('click', () => {
                        name.innerText = input1.value;
                        console.log(name);
                    });
                }
                
            }
           
}


playersData(1,false)
playersData(2,false)
playersData(3,false)
playersData(4,false)



function clearGrid() {
    
    const existingTable = document.querySelector("table");
    if (existingTable) {
        existingTable.remove();
    }
} 
console.log(players);
    
function displayGrid() {
    activatePlayers();
    console.log(players)
    clearGrid(); 
    let tableGrid = document.createElement("table"); 
    document.body.appendChild(tableGrid);
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let column = document.createElement("td");
            column.style.backgroundColor = "#A1830C";
            column.id = `col_${i}_${j}`;

            if (i === playerRow && j === playerCol) {
                let image = document.createElement("img");
                image.style.display="inline"
                image.src = "Assets/Assets/Player.png"; 
                image.alt = "player";
                image.className = "player-icon";
                column.appendChild(image);
                column.style.border= "solid 3px orange";
            } else if (sublistExists(positionsOfOases, [i, j]) 
        ) {
                let image = document.createElement("img");
                let indexOasis=positionsOfOases.findIndex(pos => pos[0] === i && pos[1] === j);
                console.log(indexOasis);
                let oasisIndex=positionsOfOases.findIndex(pos => pos[0] === i && pos[1] === j);
                let isRevealed = oasesRevealed[oasisIndex];
                if(isRevealed){
                    if(indexOasis === 3){
                        image.src="Assets/Assets/Drought.png";
                    }
                    else{
                      image.src = "Assets/Assets/Oasis.png";
                      let activePlayerIndex = findActivePlayer();
                      playersData(activePlayerIndex, true, oasisIndex);
                    }
                }
                else{
                    image.src= "Assets/Assets/Oasis marker.png"
                   
                }
                column.appendChild(image);
                column.style.backgroundColor = "#FFEECD";
              
            } else {
                let image = document.createElement("img");
                componentsAndClues.forEach((compClue, compIndex) => {
                compClue.forEach((pos, clueIndex) => {
                let isRevealed
                if (pos[0] === i && pos[1] === j) {
                    compAndCluesRevealed.forEach((clue, clueIndex)=>{
                        clue.forEach((pos,posIndex)=>{
                             if(pos[1] && pos[2]){
                                 pos[0]=true;
                             }
                        })
                     })
                    isRevealed = compAndCluesRevealed[compIndex][clueIndex];
                    if(isRevealed){
                        switch(compIndex){
                            case 0:
                                switch (clueIndex){
                                    case 0:
                                            console.log(clueIndex);
                                            image.src="Assets/Assets/Item 1.png"
                                        break;
                                    case 1:
                                            console.log(compClue,pos)
                                            image.src="Assets/Assets/Item 1 - clue_UP.png"
                                            console.log("Comp index and clue index");
                                            console.log(compIndex, clueIndex);
                                        break;
                                    case 2:
                                            console.log(compClue,pos)
                                            image.src="Assets/Assets/Item 1 - clue_UP.png"
                                            console.log("Comp index and clue index");
                                            console.log(compIndex, clueIndex);
                                        break;
                                }   
                                break;
                            case 1:
                                switch (clueIndex){
                                    case 0:
                                            image.src="Assets/Assets/Item 2.png"
                                        break;
                                    case 1:
                                            console.log(compClue,pos)
                                            image.src="Assets/Assets/Item 2 - clue_DOWN.png"
                                            console.log("Comp index and clue index");
                                            console.log(compIndex, clueIndex)
                                        
                                        break;
                                    case 2:
                                            console.log(compClue,pos)
                                            image.src="Assets/Assets/Item 2 - clue_DOWN.png"
                                            console.log("Comp index and clue index");
                                            console.log(compIndex, clueIndex)
                                        
                                        break;
                                } 
                                break;
                            case 2:
                                switch (clueIndex){
                                    case 0:
                                            image.src="Assets/Assets/Item 3.png"
                                        break;
                                    case 1:
                                            console.log(compClue,pos)
                                            image.src="Assets/Assets/Item 3 - clue_DOWN.png"
                                            console.log("Comp index and clue index");
                                            console.log(compIndex, clueIndex)
                                        
                                        break;
                                    case 2:
                                            console.log(compClue,pos)
                                            image.src="Assets/Assets/Item 3 - clue_DOWN.png"
                                            console.log("Comp index and clue index");
                                            console.log(compIndex, clueIndex)   
                                        break;
                                } 
                                break;
                        }
                }
            compAndCluesRevealed.forEach((clue, clueIndex)=>{
                if(clue[1] && clue[2]){
                    clue[0]=true;
                }
             })
           
            }
        });
       
    });
    column.appendChild(image);
            }
            
            row.appendChild(column);
        }
        tableGrid.appendChild(row);
        let imgCreated=false;
        if (compAndCluesRevealed[0][0] && compAndCluesRevealed[1][0] && compAndCluesRevealed[2][0]) {
        const starGate = document.getElementById('col_2_2');
        if (starGate) { 
            if(!imgCreated){
                const imgStargate = document.createElement('img');
                imgStargate.src = "Assets/Assets/Stargate.png";
                imgCreated=true;
                starGate.appendChild(imgStargate);
                alert("You won the gamee, UUUUUU!!!!!")
            }  
        }
    }
    }
}


function updateGrid() {
    displayGrid(); 
}
function moveToNextPlayer(currentPlayerIndex) {
    let currentWaterSupply = document.getElementById(`waterSupply${currentPlayerIndex + 1}`);
    if (parseInt(currentWaterSupply.textContent) > 0) {
        currentWaterSupply.textContent = parseInt(currentWaterSupply.textContent) - 1;
    } else {
        console.log("Player " + (currentPlayerIndex + 1) + " has run out of water!");
        alert("Game over");
        return; // Stop the game
    }

    players[currentPlayerIndex].isCurrent = false;

    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    while (!players[nextPlayerIndex].isActive) {  
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }
    players[nextPlayerIndex].isCurrent = true;
    document.getElementById(`player${currentPlayerIndex + 1}`).classList.remove('highlight');
    document.getElementById(`player${nextPlayerIndex + 1}`).classList.add('highlight');

    console.log("Moving to player", nextPlayerIndex + 1);
    
    if (nextPlayerIndex === 0) { 
        resetActionsForAllActivePlayers();
    }
}

function resetActionsForAllActivePlayers() {
    console.log("Resetting actions for all active players");
    players.forEach((player, index) => {
        if (player.isActive) {
            // if(player.waterSupply <= 0){
            //     console.log("Player " + (index + 1) + " has no water left. Game over.");
            //     alert("Game over");
            //     return; // Stop the game
            // }
            player.actionsRemaining = 3;
            document.getElementById(`actRemText${index + 1}`).textContent = "3"; 
        }
    });
}

function handlePlayerActions(playerId) {
    const actionsRemaining = document.getElementById(`actRemText${playerId}`);
    if (parseInt(actionsRemaining.textContent) > 0) {
        actionsRemaining.textContent = parseInt(actionsRemaining.textContent) - 1;
    } else {
        console.log("Player " + playerId + " has no actions left.");
        moveToNextPlayer(playerId - 1);
    }
}

document.addEventListener('keydown', function(event) {
    let currentPlayerIndex = players.findIndex(p => p.isCurrent); 
    console.log(currentPlayerIndex);
   
    switch(event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            movePlayer(event.key === "ArrowUp" ? -1 : (event.key === "ArrowDown" ? 1 : 0), 
                       event.key === "ArrowLeft" ? -1 : (event.key === "ArrowRight" ? 1 : 0)); 
            handlePlayerActions(currentPlayerIndex + 1); 
            break;
        case "d":
            digUp();
            handlePlayerActions(currentPlayerIndex+1);
            break;
    }
    updateGrid(); 
});

function movePlayer(deltaRow, deltaCol) {
    let newRow = playerRow + deltaRow;
    let newCol = playerCol + deltaCol;
    
  
    if (newRow >= 0 && newRow < 5) {
        playerRow = newRow;
    }
    if (newCol >= 0 && newCol < 5) {
        playerCol = newCol;
    }
}
function findActivePlayer() {
    return players.findIndex(p => p.isCurrent) + 1;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sublistExists(mainList, subList) {
    return mainList.some((item) => item[0] === subList[0] && item[1] === subList[1]);
}

function createComponentAndCluesPositions(positionsOfOases, allGeneratedPositions) {
    let componentAndCluePos = [];
    let compRow, compCol;
    let clueRow, clueColumn;
    let oasesRow, oasesColumn;
    
    do {
        compRow = getRandomInt(0, 4);
        compCol = getRandomInt(0, 4);
        clueRow = [compRow, getRandomInt(0, 4)];
        clueColumn = [getRandomInt(0, 4), compCol];
        oasesRow = [getRandomInt(0, 4), getRandomInt(0, 4)];
        oasesColumn = [getRandomInt(0, 4), getRandomInt(0, 4)];
    } while (
        sublistExists(positionsOfOases, [compRow, compCol]) 
        || sublistExists(positionsOfOases, clueRow) 
        || sublistExists(positionsOfOases, clueColumn) 
        || sublistExists(positionsOfOases, oasesRow) 
        || sublistExists(positionsOfOases, oasesColumn)
        || twoPosEqual(clueRow, clueColumn) 
        || twoPosEqual([compRow, compCol], clueRow) 
        || twoPosEqual([compRow, compCol], clueColumn) 
        || sublistExists(allGeneratedPositions, [compRow, compCol]) 
        || sublistExists(allGeneratedPositions, clueRow) 
        || sublistExists(allGeneratedPositions, clueColumn) || (compRow==2 && compCol==2));

    componentAndCluePos.push([compRow, compCol]);
    componentAndCluePos.push(clueRow);
    componentAndCluePos.push(clueColumn);
    allGeneratedPositions.push([compRow, compCol], clueRow, clueColumn); 
    return componentAndCluePos;
}

function digUp() {

    let oasisIndex = positionsOfOases.findIndex(pos => pos[0] === playerRow && pos[1] === playerCol);
    if (oasisIndex !== -1) {
        oasesRevealed[oasisIndex] = true; 
        updateGrid();
    }

   componentsAndClues.forEach((component, compIndex)=>{
        component.forEach((pos, posIndex)=>{
            if((posIndex === 1 || posIndex === 2) && pos[0] === playerRow && pos[1] === playerCol){
                revealClueAtPosition(compIndex,posIndex);
            }
        })
   })

}

function revealClueAtPosition(revCompIndex,revPosIndex) {
    componentsAndClues.forEach((component, compIndex) => {
        component.forEach((clue, clueIndex) => {
                if(revCompIndex === compIndex && revPosIndex === clueIndex){
                    compAndCluesRevealed[compIndex][clueIndex] = true;
                    console.log(compAndCluesRevealed);
                }

            }
        );
    });
    console.log(compAndCluesRevealed);
}
//possible to call, but the data will be from saved then
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        playerRow = gameState.playerRow;
        playerCol = gameState.playerCol;
        positionsOfOases = gameState.positionsOfOases;
        componentsAndClues = gameState.componentsAndClues;
        compAndCluesRevealed = gameState.compAndCluesRevealed;
        oasesRevealed = gameState.oasesRevealed;
        allGeneratedPositions = gameState.allGeneratedPositions;
        oasisInteractionDone = gameState.oasisInteractionDone;
      
        
      
    }
}
displayGrid();
function saveGameState() {
    const gameState = {
        playerRow: playerRow,
        playerCol: playerCol,
        positionsOfOases: positionsOfOases,
        componentsAndClues: componentsAndClues,
        compAndCluesRevealed: compAndCluesRevealed,
        oasesRevealed: oasesRevealed,
        allGeneratedPositions: allGeneratedPositions,
        oasisInteractionDone: oasisInteractionDone,
        players: players
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}




