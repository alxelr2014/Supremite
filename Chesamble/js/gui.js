
function ClearAllPieces() {
	$(".Piece").remove();
}

function setGameBoardPieces(game) {

	ClearAllPieces();

	
	for(let index = 0; index < BOARD_SIZE; index++) {
		let position = indexToPosition(index);
        console.log(position.rank + " " + position.file);
        let rankname = "rank" + (position.rank + 1);
        let filename = "file" + (position.file + 1);

		if(game.board[index].type != PIECES.empty) {
            console.log(getFileName(game.board[index]));
			let pieceFileName = "images/" + getFileName(game.board[index]) + ".png";
			let imageString = "<image src=\"" + pieceFileName + "\" class=\"Piece " + rankname + " " + filename + " \"/>";
			$("#Board").append(imageString);
		}
	}

}
