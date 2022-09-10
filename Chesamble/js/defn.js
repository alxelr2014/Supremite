const BOARD_SIZE = 64;
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
        if(this.rank < 0 || this.rank >= 8)
            return false;
        return true;
    }
    isEqual(other_position){
        return (this.file == other_position.file) && (this.rank == other_position.rank);
    }
    print()
    {
        return "(file: " + this.file + ", rank: "+ this.rank + ")";
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
    isEqual(other_piece)
    {
        return (this.type == other_piece.type )&& (this.colour == other_piece.colour )&& (this.has_moved == other_piece.has_moved);
    }
    print()
    {
        return "(type: " + this.type + ", colour: " +  this.colour + ", has_moved: "+ this.has_moved + ")";
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
    isEqual(other_move){
        return this.piece.isEqual(other_move.piece) && this.src.isEqual(other_move.src) && this.dest.isEqual(other_move.dest);
    }
    print()
    {
        return "(piece: " + this.piece.print() +", src: " + this.src.print() + ", dest: "+ this.dest.print() + 
        ", takes: "+ this.takes.print() + ", takes_position: "+ this.takes_position.print()+ ")";
    }
}

