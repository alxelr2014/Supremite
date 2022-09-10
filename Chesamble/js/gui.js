
function ClearAllPieces() {
	$(".Piece").remove();
}

function setGameBoardPieces() {

	ClearAllPieces();

	let game = Game.getInstance();
	for(let index = 0; index < BOARD_SIZE; index++) {
		let position = indexToPosition(index);
        let rankname = "rank" + (position.rank + 1);
        let filename = "file" + (position.file + 1);

		if(game.board[index].type != PIECES.empty) {
			let pieceFileName = "images/" + getFileName(game.board[index]) + ".png";
			let imageString = "<image src=\"" + pieceFileName + "\" class=\"Piece " + rankname + " " + filename + " \"/>";
			$("#Board").append(imageString);
		}
	}

}

let user_action_state = {possibleMoves : -1};


function isFileRankEqual(file,rank)
{
	return function(cell)
	{
		let cellSize = $(".Square").width();
		let cell_rank = 7 - Math.round($(cell).position().top/cellSize);
		let cell_file = Math.round($(cell).position().left/cellSize);
		return (cell_file == file) && (cell_rank == rank);
	};
}

function isCellNextMove(cell_position,moves){

	for(let i = 0 ; i < moves.length ; i++)
		{
			if (moves[i].dest.isEqual(cell_position)){
				return i;
			}
		}
		return -1;
}

function isNextMove(moves)
{
	return function(cell)
	{
		let cellSize = $(".Square").width();
		let cell_rank = 7 - Math.round($(cell).position().top/cellSize);
		let cell_file = Math.round($(cell).position().left/cellSize);
		let cell_position = new Position(cell_file, cell_rank);
		return isCellNextMove(cell_position,moves) != -1;
	};
}

function exclusiveAddClass(cond_funct,css_class){
	$(".Square").each( function(index) {
		if( cond_funct(this)){
			$(this).addClass(css_class);
		}
	} );
}


function clearSquares(){
	$(".Square").each( function(index) {
			$(this).removeClass("SquareSelected");
			$(this).removeClass("SquareNextMove");
	} );
}

function clickedSquare(pageX, pageY){
	// console.log("The clicked at (" + pageX + ", " + pageY + ").");
	let boardPosition = $("#Board").position();
	let cellSize = $(".Square").width();
	let file =  Math.floor((pageX - boardPosition.left) / cellSize);
	let rank = 7- Math.floor((pageY - boardPosition.top) / cellSize);
	let position = new Position(file,rank);
	if(user_action_state.possibleMoves != -1 ){
		let ind = isCellNextMove(position,user_action_state.possibleMoves);
		if(ind != -1)
		{
			let game = Game.getInstance();
			game.makeMove(user_action_state.possibleMoves[ind]);
		}
		user_action_state.possibleMoves = -1;
	}
	return position;
}	

function clickedPiece(position){
	let game = Game.getInstance();
	let index = positionToIndex(position);
	if(user_action_state.possibleMoves != -1 ){
		let ind = isCellNextMove(position,user_action_state.possibleMoves);
		if(ind != -1)
		{
			game.makeMove(user_action_state.possibleMoves[ind]);
		}
		user_action_state.possibleMoves = -1;
	}
	else if(game.board[index].colour == game.turn)
	{
		exclusiveAddClass(isFileRankEqual(position.file,position.rank),"SquareSelected");
		user_action_state.possibleMoves = game.possibleMoves(index);
		exclusiveAddClass(isNextMove(user_action_state.possibleMoves),"SquareNextMove");
	}
}

$(document).on("click" ,".Piece", function(e){
	clearSquares();
	clickedPiece(clickedSquare(e.pageX, e.pageY));
	setGameBoardPieces();
});


$(document).on("click", ".Square", function(e){
	clearSquares();
	clickedSquare(e.pageX, e.pageY);
	setGameBoardPieces();
});