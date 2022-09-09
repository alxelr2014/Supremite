
function indexToPosition(index)
{
    if(index >= 64 || index < 0)
    {
        return new Position(-1,-1);
    }
    return new Position(index / 8, index % 8);
}
function positionToIndex(position)
{
    if (typeof position === "undefined") {
        alert("something is damn undefined");
        return -2;
    }
    if(position.rank < 0 || position.rank >= 8)
        return -1;
    if(position.file < 0 || position.file >= 8)
        return -1;
    let index  = 8*position.rank + position.file;
    console.log("The index is " + index + ".");
    return index;
}

function getFileName(piece)
{
    var result = "";
    if(piece.colour == COLOUR.white)
        result.concat("w");
    else if (piece.colour == COLOUR.black)
        result.concat("b");
    if(piece.type == PIECES.pawn)
    {
        result.concat("P");
    }
    else if (piece.type == PIECES.knight){
        result.concat("N");
    }
    else if (piece.type == PIECES.bishop){
        result.concat("B");
    }
    else if (piece.type == PIECES.rock){
        result.concat("R");
    }
    else if (piece.type == PIECES.queen){
        result.concat("Q");
    }
    else if (piece.type == PIECES.king){
        result.concat("K");
    }
    
}