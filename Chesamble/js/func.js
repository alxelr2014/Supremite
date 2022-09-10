

function indexToPosition(index)
{
    if(index >= 64 || index < 0)
    {
        return new Position(-1,-1);
    }
    return new Position(index % 8, Math.floor(index /8));
}
function positionToIndex(position)
{
    if(position.rank < 0 || position.rank >= 8)
        return -1;
    if(position.file < 0 || position.file >= 8)
        return -1;
    let index  = 8*position.rank + position.file;
    return index;
}

function getFileName(piece)
{
    let result = "";
    if(piece.colour == COLOUR.white)
        result = result.concat("w");
    else if (piece.colour == COLOUR.black)
        result = result.concat("b");
    if(piece.type == PIECES.pawn)
    {
        result = result.concat("P");
    }
    else if (piece.type == PIECES.knight){
        result = result.concat("N");
    }
    else if (piece.type == PIECES.bishop){
        result = result.concat("B");
    }
    else if (piece.type == PIECES.rock){
        result = result.concat("R");
    }
    else if (piece.type == PIECES.queen){
        result = result.concat("Q");
    }
    else if (piece.type == PIECES.king){
        result = result.concat("K");
    }

    return result;
}