var humanPlayer = "O";
var compPlayer = "X";
var humanPoints = 0;
var compPoints = 0;

var gameFinnished = false;

var tabCols = document.querySelectorAll("#col");
var tabRows = document.querySelectorAll("#row");
var htmlTable = document.getElementsByTagName("table");
var squres = document.getElementById("square");
var turner = document.querySelector(".whoseturn");
var humanP = document.getElementById("humanPoints");
var compP = document.getElementById("compPoints");

//var turnerBackground = document.querySelector(".whoseturn");

let currentRow = 0;
let currentCol = 0;

var cellClicked = false;
var canMove = false;

var rowTracker = [];
var colTracker = [];

var prevRow = null;
var prevCol = null;

const tabCounts = 25;

var aiTurn = false;
var huTurn = false;

var yes = "y";
var no = "n";

var aiBases = [];
var moveChecker = false;
var aiBaseConts = [];

var myTimer = null;

var choice = prompt("Do you want try the game yes(y)").toUpperCase();
startingCommand(choice);
getCellPosition();
//populateTable();

function startingCommand(choice){
	if(choice === yes.toUpperCase()){
		populateTable();
		huTurn = true;
		turner.classList.add("yourturn");
		turner.textContent = "Your turn, move faster";
	}else if(choice === null){
		clearInterval(myTimer);
		tabCounts = 0;
	}
	else{
		alert("Your choise is unknown, " + 
			"\nplease refresh the page and choose yes(y)");
		clearInterval(myTimer);
	}
}

function populateTable(){
	for (var i = 0; i < tabCounts; i++) {
		humanPoints = 0;
		compPoints = 0;		
		if(i < 10){
			tabCols[i].textContent = compPlayer;
		}else if(i > 9 && i < 15){
			tabCols[i].textContent = "";
		}else {
			tabCols[i].textContent = humanPlayer;
		}
	}
}

//Click listerner for the position of the table
function getCellPosition(){
	for (var i = 0; i < squres.rows.length; i++) {
		for (var j = 0; j < squres.rows[i].cells.length; j++) {
			squres.rows[i].cells[j].onclick = function(){
				currentRow = this.parentElement.rowIndex;
				currentCol = this.cellIndex;
				prevCol = colPosition(currentCol);
				prevRow = rowPosition(currentRow);
			};
			console.log("click not working");
		}
	}
}

function humanTurnBackground(row, col){
	squres.rows[row].cells[col].textContent = "";
	setTimeout(function(){
		squres.rows[row].cells[col].style.background= "#FF7F50";
	}, 400);
	squres.rows[row].cells[col].style.background= "#7dd378";
}

function checkUpperLowerLimit(num){
	if(num > 4){
		num = 4;
	}
	if(num < 0){
		num = 0;
	}

	return num;
}

function colPosition(x){
	colTracker.push(x);
		if(colTracker.length > 2){
		  	colTracker.shift();
		}

		return colTracker[0];
}

function rowPosition(y){
	rowTracker.push(y);
		if(rowTracker.length > 2){
		  	rowTracker.shift();
		}

		return rowTracker[0];
}

function getPrevContent(){
	return squres.rows[prevRow].cells[prevCol].textContent;
}

function getCurContent(){
	return squres.rows[currentRow].cells[currentCol].textContent;
}

function getJumpedOverContent(row, col){
	return squres.rows[row].cells[col].textContent;
}

function getContentByRowColumn(row, col){
	return squres.rows[row].cells[col].textContent;
}

function rowUp(){
	return prevRow - 1;
}

function rowDown(){
	return prevRow + 1;
}

function colRight(){
	return prevCol + 1;
}

function colLeft(){
	return prevCol - 1;
}

function moveUpRight(){
	var rowRightUp = checkUpperLowerLimit(rowUp());
	var colRightUp = checkUpperLowerLimit(colRight()); //colRight();
	if(rowRightUp >= 0 && colRightUp >= 0){
		return squres.rows[rowRightUp].cells[colRightUp].textContent;
	}
}

function moveUpLeft(){
	var rowLeftUp = checkUpperLowerLimit(rowUp()) //rowUp();
	var colLeftUp = checkUpperLowerLimit(colLeft()) //colLeft();
	if(rowLeftUp >= 0 && colLeftUp >= 0){
		return squres.rows[rowLeftUp].cells[colLeftUp].textContent;
	}
}

function moveDownRight(){
	var rowRightDown = checkUpperLowerLimit(rowDown());
	var colRightDown = checkUpperLowerLimit(colRight()); //colRight();
	if(rowRightDown >= 0 && colRightDown >= 0){
		return squres.rows[rowRightDown].cells[colRightDown].textContent;
	}
}

function moveDownLeft(){
	var rowLeftDown = checkUpperLowerLimit(rowDown()) //rowUp();
	var colLeftDown = checkUpperLowerLimit(colLeft()) //colLeft();
	if(rowLeftDown >= 0 && colLeftDown >= 0){
		return squres.rows[rowLeftDown].cells[colLeftDown].textContent;
	}
}

function moveUp(){
	var upSide = checkUpperLowerLimit(rowUp());
	if((upSide >= 0 && upSide < 5) && prevCol === currentCol)
		return squres.rows[upSide].cells[currentCol].textContent;
}

function moveDown(){
	var downSide = checkUpperLowerLimit(rowDown());
	if(downSide >= 0 || downSide < 5 && prevCol === currentCol)
		return squres.rows[downSide].cells[currentCol].textContent;
}

function moveRight(){
	var righSide = checkUpperLowerLimit(colRight());
	if(righSide >= 0 || righSide < 5 && prevRow === currentRow)
		return squres.rows[currentRow].cells[righSide].textContent;
}

function moveLeft(){
	var leftSide = checkUpperLowerLimit(colLeft());
	if(leftSide >= 0 || leftSide < 5 && prevRow === currentRow){
		return squres.rows[currentRow].cells[leftSide].textContent;
	}
}

function canMoveUp(){
	if(moveUp() === "" && currentCol === prevCol 
		&& currentRow === checkUpperLowerLimit(rowUp())
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveDown(){
	if(moveDown() === "" && currentCol === prevCol
		&& currentRow === checkUpperLowerLimit(rowDown())
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveRight(){
	if(moveRight() === "" && currentRow === prevRow
		&& currentCol === checkUpperLowerLimit(colRight())
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveLeft(){
	if(moveLeft() === "" && currentRow === prevRow
		&& currentCol === checkUpperLowerLimit(colLeft())
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveUpRight(){
	if(moveUpRight() === "" && (checkUpperLowerLimit(rowUp()) === currentRow)
		&& checkUpperLowerLimit(colRight()) === currentCol
		&& getCurContent() === "" && getPrevContent() === humanPlayer) {
		return true;
	}else{
		return false;
	}
}

function canMoveUpLeft(){
	if(moveUpLeft() === "" && (checkUpperLowerLimit(rowUp()) === currentRow) 
		&& checkUpperLowerLimit(colLeft()) === currentCol
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveDownRight(){
	if(moveDownRight() === "" && (checkUpperLowerLimit(rowDown()) === currentRow)
		&& checkUpperLowerLimit(colRight()) === currentCol
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveDownLeft(){
	if(moveDownLeft() === "" && (checkUpperLowerLimit(rowDown()) === currentRow)
		&& checkUpperLowerLimit(colLeft()) === currentCol
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function jumpUp(){
	return checkUpperLowerLimit(prevRow - 2);
}

function canJumpUpOver(){
	if(getPrevContent() !== getJumpedOverContent(checkUpperLowerLimit(currentRow + 1), currentCol) &&
		getJumpedOverContent(checkUpperLowerLimit(currentRow + 1), currentCol) !== "" &&
		getCurContent() === "" && currentRow === checkUpperLowerLimit(jumpUp())  && getPrevContent() === "O")
	{
		return true;
	}else{
		return false;
	}
}

function jumpUpSucceess(){
	if(canJumpUpOver()){
		squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
		humanTurnBackground(prevRow, prevCol);
		squres.rows[checkUpperLowerLimit(currentRow + 1)].cells[currentCol].textContent = "";
		humanPoints++;
	}else{
		console.log("Jumping over was not successfull");
	}
}

function jumpDown(){
	return checkUpperLowerLimit(prevRow + 2);
}

function canJumpDownOver(){
	if(getPrevContent() !== getJumpedOverContent(checkUpperLowerLimit(currentRow - 1), currentCol) &&
		getJumpedOverContent(checkUpperLowerLimit(currentRow - 1), currentCol) !== "" &&
		getCurContent() === "" && currentRow === checkUpperLowerLimit(jumpDown())  && getPrevContent() === "O")
	{
		return true;
	}else{
		return false;
	}
}

function jumpDownSucceess(){
	if(canJumpDownOver()){
		squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
		humanTurnBackground(prevRow, prevCol);
		squres.rows[checkUpperLowerLimit(currentRow - 1)].cells[currentCol].textContent = "";
		humanPoints++;
	}
}

function changeDirectionUp(){

	if(canMoveUp() ||
		canMoveDown() ||
		canMoveRight() ||
		canMoveLeft() ||
		canMoveUpRight() ||
		canMoveUpLeft() ||
		canMoveDownRight() ||
		canMoveDownLeft()){
		squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
		humanTurnBackground(prevRow, prevCol);
		rowTracker = [];
		colTracker = [];
	}else{
		console.log("move is not possible");
	}
}

function getLocationOfAiBases(){
	aiBases.length = 0;
	//var aiBaseConts = [];
	for (var i = 0; i < squres.rows.length; i++) {
		for (var j = 0; j < squres.rows[i].cells.length; j++) {
			if(squres.rows[i].cells[j].textContent === compPlayer){
				aiBaseConts.push(i, j);
				aiBases.push(aiBaseConts);
			}
			aiBaseConts = [];
		}
	}
}

function getBasesByRandom(arr){
	var counter = 0;
	var jumperFound = false;
	//var num = Math.floor(Math.random() * (arr.length - 1));
	//var row = arr[num][0];
	//var col = arr[num][1]
	while(true){
		var num = Math.floor(Math.random() * (arr.length - 1));
		var row = arr[num][0];
		var col = arr[num][1]
		while(counter < arr.length){
			if(aiCanJumpUpOver(row, col) || aiCanJumpDownOver(row, col)){
				jumpingUpDownPossible(row, col);
				jumperFound = true;
				compPoints++;
				break;
			}
			num = Math.floor(Math.random() * (arr.length - 1));
			row = arr[num][0];
			col = arr[num][1]
			counter++;
			console.log("Row: " + row + " col: " + col + " counter: " + counter);
		}

		if(jumperFound){
			break;
		}else{
			if(aiCanMoveDown(row, col) || aiCanMoveUp(row, col)
				|| aiCanMoveRight(row, col) || aiCanMoveLeft(row, col)){
				moveIsPossibleUpDown(row, col);
				break;
			}
		}
	}
}

function compTurnBackground(row, col){
	squres.rows[row].cells[col].textContent = "";
	setTimeout(function(){
		squres.rows[row].cells[col].style.background= "#FF7F50";
	}, 800);
	squres.rows[row].cells[col].style.background= "#FF6347";
}

function aiCellContent(row, col){
	return squres.rows[row].cells[col].textContent;
}

function aiCanMoveDown(row, col){
	var r = checkUpperLowerLimit(row + 1);
	if(aiCellContent(r, col) === "" && r > row 
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingDown(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row + 1)].cells[col].textContent = previousContent;
}

function aiCanMoveUp(row, col){
	var r = checkUpperLowerLimit(row - 1);
	if(aiCellContent(r, col) === "" && r < row 
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingUp(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row - 1)].cells[col].textContent = previousContent;
}

function aiCanMoveRight(row, col){
	var c = checkUpperLowerLimit(col + 1);
	if(aiCellContent(row, c) === "" && c > col 
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingRight(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row].cells[checkUpperLowerLimit(col + 1)].textContent = previousContent;
}

function aiCanMoveLeft(row, col){
	var c = checkUpperLowerLimit(col - 1);
	if(aiCellContent(row, c) === "" && c < col 
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingLeft(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row].cells[checkUpperLowerLimit(col - 1)].textContent = previousContent;
}

function aiCanJumpUpOver(row, col){
	var j = checkUpperLowerLimit(row - 2);
	if(aiCellContent(row, col) !== getJumpedOverContent(checkUpperLowerLimit(row - 1), col) &&
		getJumpedOverContent(checkUpperLowerLimit(row - 1), col) !== "" &&
		aiCellContent(j, col) === "" && j < row)
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingUp(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row - 1)].cells[col].textContent = "";
	squres.rows[checkUpperLowerLimit(row - 2)].cells[col].textContent = previousContent;	
}

function aiCanJumpDownOver(row, col){
	var j = checkUpperLowerLimit(row + 2);
	if(aiCellContent(row, col) !== getJumpedOverContent(checkUpperLowerLimit(row + 1), col) &&
		getJumpedOverContent(checkUpperLowerLimit(row + 1), col) !== "" &&
		aiCellContent(j, col) === "" && j > row)
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingDown(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row + 1)].cells[col].textContent = "";
	squres.rows[checkUpperLowerLimit(row + 2)].cells[col].textContent = previousContent;
}

function moveIsPossibleUpDown(row, col){
	/*if(aiCanMoveUp(row, col) && aiCanMoveDown(row, col)
		&& aiCanMoveLeft(row, col) && aiCanMoveRight(row, col) 
		&& aiTurn && moveChecker === false){
		aiIsMovingDown(row, col);
	}else*/ if(aiCanMoveLeft(row, col) && aiTurn){
		aiIsMovingLeft(row, col);
	}else if(aiCanMoveRight(row, col) && aiTurn){
		aiIsMovingRight(row, col);
	}else if(aiCanMoveDown(row, col) && aiTurn){
		aiIsMovingDown(row, col);
	}else if(aiCanMoveUp(row, col) && aiTurn){
		aiIsMovingUp(row, col);
	}
}

function jumpingUpDownPossible(row, col){
	if(aiCanJumpUpOver(row, col) && aiTurn){
		aiIsJumpingUp(row, col);
	}else if(aiCanJumpDownOver(row, col) && aiTurn){
		aiIsJumpingDown(row, col);
	}
}

document.onclick = function(){
	if(huTurn){
		//getCellPosition();
		changeDirectionUp();
		jumpUpSucceess();
		jumpDownSucceess();
		humanP.textContent = humanPoints;
	}else{

	}
}


function myFunction() {
  myTimer = setInterval(turnFunc, 5000);
}

function turnFunc() {
	huTurn = !huTurn;
	aiTurn = !aiTurn;

	if(aiTurn){
		//turnerBackground.classList.remove("actionTurn");
		turner.classList.remove("yourturn");
		turner.classList.add("myturn");
		turner.textContent = "My turn, Please wait";
		getLocationOfAiBases();
		getBasesByRandom(aiBases);
		compP.textContent = compPoints;
	}else{
		turner.classList.remove("myturn");
		turner.classList.add("yourturn");
		turner.textContent = "Your turn, Move faster";
		//turnerBackground.classList.add("actionTurn");
	}
	checkLooseOrWin(humanPoints, compPoints);
}

function checkLooseOrWin(x, y){
	if(x >= 9 && y < 9){
		gameFinnished = true;
		alert("congratulations you won");
		result();
	}else if(y >= 9 && x < 9){
		gameFinnished = true;
		alert("Sorry, I am the winner");
		result();
	}
}
var again = null;
function result(){
	if(gameFinnished){
		huTurn = false;
		aiTurn = false;
		humanPoints = 0;
		compPoints = 0;
		humanP.textContent = humanPoints;
		compP.textContent = compPoints;
		clearInterval(myTimer);
		turner.textContent = "GAME OVER!";
		/*again = prompt("Do you want try the game again yes(y)").toUpperCase();
		if(again === null || again === ""){
			clearInterval(myTimer);
			tabCounts = 0;
		}else{
			startingCommand(again);
		}*/
		//populateTable();
	}
}

myFunction();