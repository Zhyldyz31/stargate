const tableGrid = document.getElementById("tableGrid");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sublistExists(listOfLists, sublist) {
    return listOfLists.some(list => {
        if (list.length < 2 || sublist.length < 2) {
            return false;
        }
        return list[0] === sublist[0] && list[1] === sublist[1];
    });
}

function movePlayer(row, column, oasesPos) {
    if (row >= 0 && row < 5 && column >= 0 && column < 5) {
        let currPlayerCell = document.querySelector(".player");
        currPlayerCell.removeChild(currPlayerCell.firstChild);
        currPlayerCell.classList.remove("player");
        currPlayerCell.style.border="solid 1px black";
        let newCell = document.querySelector(`#col_${row}_${column}`);
        let image = document.createElement("img");
        image.src = "Assets/Assets/Player.png";
        image.alt = "player";
        newCell.appendChild(image);
        newCell.style.border = "solid 3px orange";
        newCell.classList.add("player");
        console.log(newCell.className, newCell.id)
    }
}

function createComponentAndCluesPositions(positionsOfOases) {
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
    } while (sublistExists(positionsOfOases, [compRow, compCol]) || sublistExists(positionsOfOases, clueRow) || sublistExists(positionsOfOases, clueColumn) || sublistExists(positionsOfOases, oasesRow) || sublistExists(positionsOfOases, oasesColumn)|| twoPosEqual(clueRow, clueColumn) || twoPosEqual([compRow, compCol], clueRow) || twoPosEqual([compRow, compCol], clueColumn));

    componentAndCluePos.push([compRow, compCol]);
    componentAndCluePos.push(clueRow);
    componentAndCluePos.push(clueColumn);
    return componentAndCluePos;
}



function twoPosEqual(columnPos, pos2){
    return (columnPos[0]==pos2[0] && columnPos[1]==pos2[1])
}

function displayGrid() {
    let positionsOfOases = [];
    while (positionsOfOases.length < 4) {
        let oasesPos = [];
        let rowPos = getRandomInt(0, 4);
        let columnPos = getRandomInt(0, 4);
        oasesPos.push(rowPos);
        oasesPos.push(columnPos);
        if (!sublistExists(positionsOfOases, oasesPos)){
            positionsOfOases.push(oasesPos);
        }
    }
    let comp1AndCluePos=createComponentAndCluesPositions(positionsOfOases)
    let comp2AndCluePos=createComponentAndCluesPositions(positionsOfOases)
    let comp3AndCluePos=createComponentAndCluesPositions(positionsOfOases)
    console.log("Clue and comp1: " + comp1AndCluePos);
  
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let column = document.createElement("td");
            column.style.backgroundColor = "#A1830C";
            column.id = `col_${i}_${j}`;
            if (i === 2 && j === 2) {
                let image = document.createElement("img");
                image.src = "Assets/Assets/Player.png";
                image.alt = "player";
                column.classList.add("player");
                column.style.border = "solid 3px orange";
                column.appendChild(image);
            } else if (sublistExists(positionsOfOases, [i, j])) {
                column.classList.add("oases")
                let image = document.createElement("img");
                image.src = "Assets/Assets/Oasis marker.png";
                image.alt = "oases";
                column.appendChild(image);
                column.style.backgroundColor="#FFEECD";
            } 
            column.addEventListener("click", () => {
                console.log(column.id);
                let currColumnId=column.id.split("_");
                let currColumnPos=[parseInt(currColumnId[1]),parseInt(currColumnId[2])]
                console.log("curr column pos"+ currColumnPos);
                let currPlayerPosition = document.querySelector(".player").id.split("_");
                let currentPlayerRow = parseInt(currPlayerPosition[1]);
                let currentPlayerCol = parseInt(currPlayerPosition[2]);
                if ((Math.abs(currentPlayerRow - i) === 1 && currentPlayerCol === j) ||
                (Math.abs(currentPlayerCol - j) === 1 && currentPlayerRow === i)) {
                    movePlayer(i, j, positionsOfOases);
                }
              
                document.addEventListener("keydown", function(event){
                    console.log( event.code.toString());
                    console.log("Dig up action " + (event.code.toString() == "Space"));
                    let comp1ClueRowRev=false;
                    let comp1ClueColumnRev=false;
                    if(event.code == "Space"){
                        console.log("Row")
                        console.log(twoPosEqual(currColumnPos, comp1AndCluePos[1]), comp1AndCluePos[1],currColumnPos);
                        console.log("Column")
                        console.log(twoPosEqual(currColumnPos, comp1AndCluePos[2]), comp1AndCluePos[2], currColumnPos);
                        let imageCompRow=document.createElement("img");
                        column.addEventListener("click", () => {
                        
                            if (event.code == "Space") {

                                switch (true) {
                                    case (twoPosEqual(currColumnPos, comp1AndCluePos[1]) && (!comp1ClueRowRev)):
                                        console.log("Comp1 row");
                                                comp1ClueRowRev = true;
                                                
                                                if(comp1AndCluePos[1][1]>currColumnPos[1]){
                                                    imageCompRow.src="Assets/Assets/Item 1 - clue_RIGHT.png"
                                                }
                                                else{
                                                    imageCompRow.src="Assets/Assets/Item 1 - clue_LEFT.png"
                                                }
                                                column.appendChild(imageCompRow);
                                                break;
                                    case (twoPosEqual(currColumnPos, comp1AndCluePos[2]) && (!comp1ClueColumnRev) ):
                                        let imageCompCol=document.createElement("img");
                                        if(comp1AndCluePos[2][0]>currColumnPos[0]){
                                            imageCompCol.src="Assets/Assets/Item 1 - clue_UP.png"
                                        }
                                        else{
                                            imageCompCol.src="Assets/Assets/Item 1 - clue_DOWN.png"
                                            }
                                        column.appendChild(imageCompCol);
                                        comp1ClueColumnRev = true;
                                        break;
                                    
                                }
                            }
                        });
                        if(comp1ClueRowRev && comp1ClueColumnRev){
                            console.log("Comp1, yeaah");
                            imageComp.src="Assets/Assets/Item 1.png"
                                        
                        }
                        // switch (true) {
                        //     case (twoPosEqual(currColumnPos, comp1AndCluePos[1]) && (!comp1ClueRowRev)):
                        //         console.log("Comp1 row");
                        //         comp1ClueRowRev = true;
                        //         let imageCompRow=document.createElement("img");
                        //         if(comp1AndCluePos[1][1]>currColumnPos[1]){
                        //             imageCompRow.src="Assets/Assets/Item 1 - clue_LEFT.png"
                        //         }
                        //         else{
                        //             imageCompRow.src="Assets/Assets/Item 1 - clue_RIGHT.png"
                        //         }
                        //         column.appendChild(imageCompRow);
                        //         break;
                        //     case (twoPosEqual(currColumnPos, comp1AndCluePos[2]) && (!comp1ClueColumnRev)):
                        //         let imageCompCol=document.createElement("img");
                        //         console.log("Comp1 column");
                        //         if(comp1AndCluePos[2][0]>currColumnPos[0]){
                        //             imageCompCol.src="Assets/Assets/Item 1 - clue_DOWN.png"
                        //         }
                        //         else{
                        //             imageCompCol.src="Assets/Assets/Item 1 - clue_UP.png"
                        //         }
                        //         column.appendChild(imageCompCol);
                        //         comp1ClueColumnRev = true;
                        //         break;
                        //     case comp1ClueRowRev && comp1ClueColumnRev:
                        //         console.log("Comp1, yeaah");
                        //         imageComp.src="Assets/Assets/Item 1.png"
                        //         break;
                        // }
                         
                    }
                    
                })
            });
            row.append(column);
        }
        tableGrid.append(row);
    }
}

displayGrid();

              