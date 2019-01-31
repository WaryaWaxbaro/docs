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
var numOfClicks = 0;
var proceed = true;

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
	return checkUpperLowerLimit(prevRow - 1);
}

function rowDown(){
	return checkUpperLowerLimit(prevRow + 1);
}

function colRight(){
	return checkUpperLowerLimit(prevCol + 1);
}

function colLeft(){
	return checkUpperLowerLimit(prevCol - 1);
}

function moveUpRight(){
	return squres.rows[rowUp()].cells[colRight()].textContent;
}

function moveUpLeft(){
	return squres.rows[rowUp()].cells[colLeft()].textContent;
}

function moveDownRight(){
	return squres.rows[rowDown()].cells[colRight()].textContent;
}

function moveDownLeft(){
	return squres.rows[rowDown()].cells[colLeft()].textContent;
}

function moveUp(){
	if(rowUp() >= 0 && prevCol === currentCol)
	return squres.rows[rowUp()].cells[currentCol].textContent;
}

function moveDown(){
	if(rowDown() >= 0 && prevCol === currentCol)
		return squres.rows[rowDown()].cells[currentCol].textContent;
}

function moveRight(){
	if(colRight() >= 0 && prevRow === currentRow)
		return squres.rows[currentRow].cells[colRight()].textContent;
}

function moveLeft(){
	if(colLeft() >= 0 && prevRow === currentRow){
		return squres.rows[currentRow].cells[colLeft()].textContent;
	}
}

function canMoveUpAndDown(x, y){
	if(x === "" && currentCol === prevCol 
		&& currentRow === y
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function canMoveRightAndLeft(x, y){
	if(x === "" && currentRow === prevRow
		&& currentCol === y
		&& getCurContent() === "" && getPrevContent() === humanPlayer){
		return true;
	}else{
		return false;
	}
}

function moveDiagonal(x, y, z){
	if(x === "" && y === currentRow && z === currentCol
		&& getCurContent() === "" && getPrevContent() === humanPlayer) {
		return true;
	}else{
		return false;
	}
}

function curRowPlusOne(){
	return checkUpperLowerLimit(currentRow + 1);
}

function curRowMinOne(){
	return checkUpperLowerLimit(currentRow - 1);
}

function curColPlusOne(){
	return checkUpperLowerLimit(currentCol + 1);
}

function curColMinOne(){
	return checkUpperLowerLimit(currentCol - 1);
}

function prevRowPlusOne(){
	return checkUpperLowerLimit(prevRow + 1);
}

function prevRowMinOne(){
	return checkUpperLowerLimit(prevRow - 1);
}

function prevColPlusOne(){
	return checkUpperLowerLimit(prevCol + 1);
}

function prevColMinOne(){
	return checkUpperLowerLimit(prevCol - 1);
}

//x --> currentRow + 1
//y --> jumpUp()
function jumpUpDownPossible(x, y){
	if(getPrevContent() !== getJumpedOverContent(x, currentCol) &&
		getJumpedOverContent(x, currentCol) !== "" &&
		getCurContent() === "" && currentRow === y  && getPrevContent() === "O"
		&& prevCol == currentCol)
	{
		return true;
	}else{
		return false;
	}
}

function jumpUp(){
	return checkUpperLowerLimit(prevRow - 2);
}

function yesJumpsUpDown(x){
	squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
	humanTurnBackground(prevRow, prevCol);
	squres.rows[x].cells[currentCol].textContent = "";
	humanPoints++;
}

function jumpUpSucceess(){
	if(jumpUpDownPossible(curRowPlusOne(), jumpUp())){
		yesJumpsUpDown(curRowPlusOne());
	}
}

function jumpDown(){
	return checkUpperLowerLimit(prevRow + 2);
}

function jumpDownSucceess(){
	if(jumpUpDownPossible(curRowMinOne(), jumpDown())){
		yesJumpsUpDown(curRowMinOne());
	}
}

function jumpRight(){
	return checkUpperLowerLimit(prevCol + 2);
}

function jumpRightLeftPos(x, y){
	if(getPrevContent() !== getJumpedOverContent(currentRow, x) &&
		getJumpedOverContent(currentRow, x) !== "" &&
		getCurContent() === "" && currentCol === y 
		&& prevRow === currentRow && getPrevContent() === "O")
	{
		return true;
	}else{
		return false;
	}
}

function yesJumpRightLeft(x){
	squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
	squres.rows[prevRow].cells[prevCol].textContent = "";
	squres.rows[currentRow].cells[x].textContent = "";
	humanPoints++;
}

function jumpRightSucceess(){
	if(jumpRightLeftPos(prevColPlusOne(), jumpRight())){
		yesJumpRightLeft(prevColPlusOne());
	}
}


function jumpLeft(){
	return checkUpperLowerLimit(prevCol - 2);
}

function jumpLeftSucceess(){
	if(jumpRightLeftPos(prevColMinOne(), jumpLeft())){
		yesJumpRightLeft(prevColMinOne());
	}
}

//x --> prevRow - 1
//y --> prevCol + 1
//z --> jumpRight()
//w --> jumpUp()
function canJumpDiagonal(x, y, z, w){
	if(getPrevContent() !== getJumpedOverContent(x, y) &&
		getJumpedOverContent(x, y) !== "" &&
		getCurContent() === "" && currentCol === z
		&& currentRow === w && getPrevContent() === "O")
	{
		return true;
	}else{
		return false;
	}
}

//x --> prevRow - 1
//y --> prevCol + 1
function yesJumpDiagonal(x, y){
	squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
	squres.rows[prevRow].cells[prevCol].textContent = "";
	squres.rows[x].cells[y].textContent = "";
	humanPoints++;
}

function jumpUpRightSucceess(){
	if(canJumpDiagonal(prevRowMinOne(), prevColPlusOne(), jumpRight(), jumpUp())){
		yesJumpDiagonal(prevRowMinOne(), prevColPlusOne());
	}
}

function jumpDownRightSucceess(){
	if(canJumpDiagonal(prevRowPlusOne(), prevColPlusOne(), jumpRight(), jumpDown())){
		yesJumpDiagonal(prevRowPlusOne(), prevColPlusOne());
	}
}

function jumpUpLeftSucceess(){
	if(canJumpDiagonal(prevRowMinOne(), prevColMinOne(), jumpLeft(), jumpUp())){
		yesJumpDiagonal(prevRowMinOne(), prevColMinOne());
	}
}

function jumpDownLeftSucceess(){
	if(canJumpDiagonal(prevRowPlusOne(), prevColMinOne(), jumpLeft(), jumpDown())){
		yesJumpDiagonal(prevRowPlusOne(), prevColMinOne());
	}
}

function changeDirectionUp(){
	if(canMoveUpAndDown(moveUp(), rowUp()) ||
	canMoveUpAndDown(moveDown(), rowDown()) ||
		canMoveRightAndLeft(moveRight(), colRight()) ||
		canMoveRightAndLeft(moveLeft(), colLeft()) ||
		moveDiagonal(moveUpRight(), rowUp(), colRight()) ||
		moveDiagonal(moveUpLeft(), rowUp(), colLeft()) ||
		moveDiagonal(moveDownRight(), rowDown(), colRight()) ||
		moveDiagonal(moveDownLeft(), rowDown(), colLeft())){
		squres.rows[currentRow].cells[currentCol].textContent = getPrevContent();
		humanTurnBackground(prevRow, prevCol);
		rowTracker = [];
		colTracker = [];
	}else{
		console.log("move is not possible");
	}
}

/************************/

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
	var moveCounter = 0;
	var counter = 0;
	var jumperFound = false;
	//var num = Math.floor(Math.random() * (arr.length - 1));
	//var row = arr[num][0];
	//var col = arr[num][1]
	while(moveCounter < 9){
		var num = Math.floor(Math.random() * (arr.length - 1));
		var row = arr[num][0];
		var col = arr[num][1]
		while(counter < 9){
			if(aiCanJumpUpOver(row, col) || aiCanJumpDownOver(row, col) ||
				aiCanJumpRightOver(row, col) || aiCanJumpLeftOver(row, col) ||
				aiCanJumpUpRightOver(row, col) || aiCanJumpUpLeftOver(row, col)
				|| aiCanJumpDownRightOver(row, col) || aiCanJumpDownLeftOver(row, col)){
				jumpingUpDownPossible(row, col);
				jumperFound = true;
				compPoints++;
				console.log("jump succeeded");
				break;
			}
			num = Math.floor(Math.random() * (arr.length - 1));
			row = arr[num][0];
			col = arr[num][1]
			counter++;
			//console.log("Row: " + row + " col: " + col + " counter: " + counter);
		}

		if(jumperFound){
			break;
		}else{
			if(aiCanMoveDown(row, col) || aiCanMoveUp(row, col)
				|| aiCanMoveRight(row, col) || aiCanMoveLeft(row, col) ||
				aiCanMoveUpRight(row, col) || aiCanMoveUpLeft(row, col) ||
				aiCanMoveDownRight(row, col) || aiCanMoveDownLeft(row, col)){
				moveIsPossibleUpDown(row, col);
				break;
			}
		}

		moveCounter++;
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
	var c = checkUpperLowerLimit(col);
	if(aiCellContent(r, col) === "" && r > row 
		&& aiCellContent(row, col) === compPlayer && c === col){
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
	var c = checkUpperLowerLimit(col);
	if(aiCellContent(r, col) === "" && r < row 
		&& aiCellContent(row, col) === compPlayer && c === col){
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
	var r = checkUpperLowerLimit(row);
	var c = checkUpperLowerLimit(col + 1);
	if(aiCellContent(row, c) === "" && c > col 
		&& aiCellContent(row, col) === compPlayer
		&& r === row){
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
	var r = checkUpperLowerLimit(row);
	var c = checkUpperLowerLimit(col - 1);
	if(aiCellContent(row, c) === "" && c < col 
		&& aiCellContent(row, col) === compPlayer
		&& r === row){
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

function aiCanMoveUpRight(row, col){
	var c = checkUpperLowerLimit(col + 1);
	var r  = checkUpperLowerLimit(row - 1);
	if(aiCellContent(r, c) === "" && c > col && r < row
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingUpRight(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row - 1].cells[checkUpperLowerLimit(col + 1)].textContent = previousContent;
}

function aiCanMoveUpLeft(row, col){
	var c = checkUpperLowerLimit(col - 1);
	var r  = checkUpperLowerLimit(row - 1);
	if(aiCellContent(r, c) === "" && c < col && r < row
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingUpLeft(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row - 1].cells[checkUpperLowerLimit(col - 1)].textContent = previousContent;
}

function aiCanMoveDownRight(row, col){
	var c = checkUpperLowerLimit(col + 1);
	var r  = checkUpperLowerLimit(row + 1);
	if(aiCellContent(r, c) === "" && c > col && r > row
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingDownRight(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row + 1].cells[checkUpperLowerLimit(col + 1)].textContent = previousContent;
}

function aiCanMoveDownLeft(row, col){
	var c = checkUpperLowerLimit(col - 1);
	var r  = checkUpperLowerLimit(row + 1);
	if(aiCellContent(r, c) === "" && c < col && r > row
		&& aiCellContent(row, col) === compPlayer){
		return true;
	}else{
		return false;
	}
}

function aiIsMovingDownLeft(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row + 1].cells[checkUpperLowerLimit(col - 1)].textContent = previousContent;
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
	var k = checkUpperLowerLimit(col);
	if(aiCellContent(row, col) !== getJumpedOverContent(checkUpperLowerLimit(row + 1), col) &&
		getJumpedOverContent(checkUpperLowerLimit(row + 1), col) !== "" &&
		aiCellContent(j, col) === "" && k === col);
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

function aiCanJumpRightOver(row, col){
	var i = checkUpperLowerLimit(col + 2);
	if(aiCellContent(row, col) !== getJumpedOverContent(row, checkUpperLowerLimit(col + 1)) &&
		getJumpedOverContent(row, checkUpperLowerLimit(col + 1)) !== "" &&
		aiCellContent(row, i) === "" && i > col)
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingRight(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row].cells[checkUpperLowerLimit(col + 1)].textContent = "";
	squres.rows[row].cells[checkUpperLowerLimit(col + 2)].textContent = previousContent;
}

function aiCanJumpLeftOver(row, col){
	var i = checkUpperLowerLimit(col - 2);
	if(aiCellContent(row, col) !== getJumpedOverContent(row, checkUpperLowerLimit(col - 1)) &&
		getJumpedOverContent(row, checkUpperLowerLimit(col - 1)) !== "" &&
		aiCellContent(row, i) === "" && i < col)
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingLeft(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[row].cells[checkUpperLowerLimit(col - 1)].textContent = "";
	squres.rows[row].cells[checkUpperLowerLimit(col - 2)].textContent = previousContent;
}

function aiCanJumpUpRightOver(row, col){
	var i = checkUpperLowerLimit(row - 2);
	var j = checkUpperLowerLimit(col + 2);
	if(aiCellContent(row, col) !== 
		getJumpedOverContent(checkUpperLowerLimit(row - 1), checkUpperLowerLimit(col + 1)) &&
		getJumpedOverContent(checkUpperLowerLimit(row - 1), checkUpperLowerLimit(col + 1)) !== "" &&
		aiCellContent(i, j) === "" && i < row && j > col)
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingUpRight(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row - 1)].cells[checkUpperLowerLimit(col + 1)].textContent = "";
	squres.rows[checkUpperLowerLimit(row - 2)].cells[checkUpperLowerLimit(col + 2)].textContent = previousContent;
}

function aiCanJumpUpLeftOver(row, col){
	var i = checkUpperLowerLimit(row - 2);
	var j = checkUpperLowerLimit(col - 2);
	if(aiCellContent(row, col) !== 
		getJumpedOverContent(checkUpperLowerLimit(row - 1), checkUpperLowerLimit(col - 1)) &&
		getJumpedOverContent(checkUpperLowerLimit(row - 1), checkUpperLowerLimit(col - 1)) !== "" &&
		aiCellContent(i, j) === "" && i < row && j < col)
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingUpLeft(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row - 1)].cells[checkUpperLowerLimit(col - 1)].textContent = "";
	squres.rows[checkUpperLowerLimit(row - 2)].cells[checkUpperLowerLimit(col - 2)].textContent = previousContent;
}


function aiCanJumpDownRightOver(row, col){
	var i = checkUpperLowerLimit(row + 2);
	var j = checkUpperLowerLimit(col + 2);
	if(aiCellContent(row, col) !== 
		getJumpedOverContent(checkUpperLowerLimit(row + 1), checkUpperLowerLimit(col + 1)) &&
		getJumpedOverContent(checkUpperLowerLimit(row + 1), checkUpperLowerLimit(col + 1)) !== "" &&
		aiCellContent(i, j) === "")
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingDownRight(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row + 1)].cells[checkUpperLowerLimit(col + 1)].textContent = "";
	squres.rows[checkUpperLowerLimit(row + 2)].cells[checkUpperLowerLimit(col + 2)].textContent = previousContent;
}

function aiCanJumpDownLeftOver(row, col){
	var i = checkUpperLowerLimit(row + 2);
	var j = checkUpperLowerLimit(col - 2);
	if(aiCellContent(row, col) !== 
		getJumpedOverContent(checkUpperLowerLimit(row + 1), checkUpperLowerLimit(col - 1)) &&
		getJumpedOverContent(checkUpperLowerLimit(row + 1), checkUpperLowerLimit(col - 1)) !== "" &&
		aiCellContent(i, j) === "")
	{
		return true;
	}else{
		return false;
	}
}

function aiIsJumpingDownLeft(row, col){
	var previousContent = aiCellContent(row, col);
	compTurnBackground(row, col);
	squres.rows[checkUpperLowerLimit(row + 1)].cells[checkUpperLowerLimit(col - 1)].textContent = "";
	squres.rows[checkUpperLowerLimit(row + 2)].cells[checkUpperLowerLimit(col - 2)].textContent = previousContent;
}

function moveIsPossibleUpDown(row, col){
	/*if(aiCanMoveUp(row, col) && aiCanMoveDown(row, col)
		&& aiCanMoveLeft(row, col) && aiCanMoveRight(row, col) 
		&& aiTurn && moveChecker === false){
		aiIsMovingDown(row, col);
	}else*/ 
	if(aiCanMoveDown(row, col) && aiTurn){
		aiIsMovingDown(row, col);
	}else if(aiCanMoveLeft(row, col) && aiTurn){
		aiIsMovingLeft(row, col);
	}else if(aiCanMoveRight(row, col) && aiTurn){
		aiIsMovingRight(row, col);
	}else if(aiCanMoveDownRight(row, col) && aiTurn){
		aiIsMovingDownRight(row, col);
	}else if(aiCanMoveDownLeft(row, col) && aiTurn){
		aiIsMovingDownLeft(row, col);
	}else if(aiCanMoveUpRight(row, col) && aiTurn){
		aiIsMovingUpRight(row, col);
	}else if(aiCanMoveUpLeft(row, col) && aiTurn){
		aiIsMovingUpLeft(row, col);
	}else if(aiCanMoveUp(row, col) && aiTurn){
		aiIsMovingUp(row, col);
	}
}

function jumpingUpDownPossible(row, col){
	if(aiCanJumpUpOver(row, col) && aiTurn){
		aiIsJumpingUp(row, col);
	}else if(aiCanJumpDownOver(row, col) && aiTurn){
		aiIsJumpingDown(row, col);
	}else if(aiCanJumpRightOver(row, col) && aiTurn){
		aiIsJumpingRight(row, col);
	}else if(aiCanJumpLeftOver(row, col) && aiTurn){
		aiIsJumpingLeft(row, col);
	}else if(aiCanJumpUpRightOver(row, col) && aiTurn){
		aiIsJumpingUpRight(row, col);
	}else if(aiCanJumpUpLeftOver(row, col) && aiTurn){
		aiIsJumpingUpLeft(row, col);
	}else if(aiCanJumpDownRightOver(row, col) && aiTurn){
		aiIsJumpingDownRight(row, col);
	}else if(aiCanJumpDownLeftOver(row, col) && aiTurn){
		aiIsJumpingDownLeft(row, col);
	}
}

document.onclick = function(){
	if(huTurn && proceed){
		//getCellPosition();
		changeDirectionUp();
		jumpUpSucceess();
		jumpDownSucceess();
		jumpRightSucceess();
		jumpLeftSucceess();
		jumpUpRightSucceess()
		jumpUpLeftSucceess();
		jumpDownRightSucceess();
		jumpDownLeftSucceess();
		humanP.textContent = humanPoints;
		numOfClicks++;
	}

	if(numOfClicks === 3){
		proceed = false;
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
	proceed = true;
	numOfClicks = 0;
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