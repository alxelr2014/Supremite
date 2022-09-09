
function ClearAllPieces() {
	$(".Piece").remove();
}

function setGameBoardPieces(game) {

	ClearAllPieces();
    if (typeof game.board[0] === "undefined") {
        alert("something is undefined");
        return;
    }
	
	for(let index = 0; index < BOEARD_SIZE; index++) {
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
