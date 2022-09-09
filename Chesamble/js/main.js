$(function(){
    init();
    console.log("Main init called.");
});

function initGameBoard()
{
	let game = new Game();
	game.board[positionToIndex(new Position(FILE.fileA,RANK.rank1))] = new Piece(PIECES.rock,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileB,RANK.rank1))] = new Piece(PIECES.bishop,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileC,RANK.rank1))] = new Piece(PIECES.knight,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileD,RANK.rank1))] = new Piece(PIECES.queen,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileE,RANK.rank1))] = new Piece(PIECES.king,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileF,RANK.rank1))] = new Piece(PIECES.bishop,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileG,RANK.rank1))] = new Piece(PIECES.knight,COLOUR.white);
	game.board[positionToIndex(new Position(FILE.fileH,RANK.rank1))] = new Piece(PIECES.rock,COLOUR.white);
	for(let i = FILE.fileA ; i <=FILE.fileH;i++)
	{
		game.board[positionToIndex(new Position(i,RANK.rank2))] = new Piece(PIECES.pawn, COLOUR.white);
	}

	for(let i = FILE.fileA ; i <=FILE.fileH;i++)
	{
		game.board[positionToIndex(new Position(i,RANK.rank7))] = new Piece(PIECES.pawn, COLOUR.black);
	}
	game.board[positionToIndex(new Position(FILE.fileA,RANK.rank8))] = new Piece(PIECES.rock,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileB,RANK.rank8))] = new Piece(PIECES.bishop,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileC,RANK.rank8))] = new Piece(PIECES.knight,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileD,RANK.rank8))] = new Piece(PIECES.queen,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileE,RANK.rank8))] = new Piece(PIECES.king,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileF,RANK.rank8))] = new Piece(PIECES.bishop,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileG,RANK.rank8))] = new Piece(PIECES.knight,COLOUR.black);
	game.board[positionToIndex(new Position(FILE.fileH,RANK.rank8))] = new Piece(PIECES.rock,COLOUR.black);

	return game;
}

function initGUIBoardSquares() {
	var light = 0;
	var rankName;
	var fileName;
	var divString;
	var lastLight = 0;
	var rankIter = 0;
	var fileIter = 0;
	var lightString;
	
	for(rankIter = RANK.rank8; rankIter >= RANK.rank1; rankIter--) {
		light = lastLight ^ 1;
		lastLight ^= 1;
		rankName = "rank" + (rankIter+1);
		for(fileIter = FILE.fileA; fileIter <= FILE.fileH; fileIter++) {
			fileName = "file" + (fileIter+1);
			
			if(light==0) lightString="Light";
			else lightString = "Dark";
			divString = "<div class=\"Square " + rankName + " " + fileName + " " + lightString + "\"/>";
			light^=1;
			$("#Board").append(divString);
 		}
 	}
}

function init(){
    console.log("init called.");
	let game = initGameBoard();
    initGUIBoardSquares();
	setGameBoardPieces(game);
}