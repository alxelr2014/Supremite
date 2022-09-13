import { Piece } from "./Piece";
import { Position } from "./Position";

export class Move{
    piece : Piece;
    src : Position ;
    dest : Position;
    constructor(piece : Piece,src : Position,dest : Position)
    {
        this.piece = piece;
        this.src = src;
        this.dest = dest;
    }
    isEqual(other_move : Move){
        return this.piece.isEqual(other_move.piece) && this.src.isEqual(other_move.src) && this.dest.isEqual(other_move.dest);
    }
    toString()
    {
        return "(piece: " + this.piece.toString() +", src: " + this.src.toString() + ", dest: "+ this.dest.toString() +  ")";
    }
}
export class BasicMove extends Move{
    constructor(piece : Piece ,src: Position,dest : Position)
    {
        super(piece,src,dest);
    }
}
export class CaptureMove extends Move{
    taken : Piece;
    taken_position : Position;
    constructor(piece : Piece ,src: Position,dest : Position, taken : Piece, taken_position : Position){
        super(piece,src,dest);
        this.taken = taken;
        this.taken_position = taken_position;
    }
}
export class CastleMove extends Move{
    rock_piece : Piece;
    rock_src : Position;
    rock_dest : Position;
    constructor(piece : Piece ,src: Position,dest : Position,rock_piece : Piece,rock_src : Position,rock_dest : Position)
    {
        super(piece,src,dest);
        this.rock_piece = rock_piece;
        this.rock_src = rock_src;
        this.rock_dest = rock_dest;
    }
}

export class PromoteMove extends Move{
    promote_piece : Piece;
    constructor(piece : Piece ,src: Position,dest : Position,promote_piece : Piece){
        super(piece,src,dest);
        this.promote_piece = promote_piece;
    }
}
