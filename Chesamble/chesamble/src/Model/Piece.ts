

export class Piece{
    type : number;
    colour : number;
    has_moved : boolean ;
    constructor(type : number ,colour : number, has_moved = false ){
        this.type = type;
        this.colour = colour;
        this.has_moved = has_moved;
    }
    isEqual(other_piece : Piece)
    {
        return (this.type === other_piece.type )&& (this.colour === other_piece.colour )&& (this.has_moved === other_piece.has_moved);
    }
    toString()
    {
        return "(type: " + this.type + ", colour: " +  this.colour + ", has_moved: "+ this.has_moved + ")";
    }
}