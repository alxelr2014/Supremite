const BOEARD_SIZE = 64;
const RANK = {rank1:0, rank2: 1, rank3:2, rank4:3, rank5:4, rank6:5, rank7:6, rank8:7};
const FILE = {fileA:0, fileB: 1, fileC:2, fileD:3, fileE:4, fileF:5, fileG:6, fileH:7};
const COLOUR = {white :0 , black : 1};
const PIECES = {empty :0 , pawn :1 , rock : 2, knight :3, bishop :4, queen :5 , king:6};



class Position{
    file ;
    rank ;
    constructor(file , rank)
    {
        this.file = file;
        this.rank = rank;
    }
    isValid() {
        if(this.file < 0 || this.file >= 8)
            return false;
        if(this.rank < 0 || this.file >= 8)
            return false;
        return true;
    }
}

class Piece{
    type;
    colour;
    has_moved;
    constructor(type,colour){
        this.type = type;
        this.colour = colour;
        this.has_moved = false;
    }
}

class Move{
    piece;
    src ;
    dest;
    takes;
    takes_position ;
    constructor(piece,src,dest,takes,takes_position)
    {
        this.piece = piece;
        this.src = src;
        this.dest = dest;
        this.takes = takes;
        this.takes_position = takes_position;
    }
}
class Game{
    board;
    moves;
    turn;
    constructor()
    {
        this.board = new Array<Piece>(BOEARD_SIZE);
        this.moves = new Array<Move>(0);
        this.turn = COLOUR.white;
    }

}
