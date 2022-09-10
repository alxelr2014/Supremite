$(function(){
    init();
    console.log("Main init called.");
});



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
	let game = Game.getInstance();
	game.reset();
    initGUIBoardSquares();
	setGameBoardPieces();
}