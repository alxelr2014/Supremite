

export class Position{
    file:number ;
    rank:number ;
    constructor(file :number , rank :number)
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
    isEqual(other_position : Position){
        return (this.file === other_position.file) && (this.rank === other_position.rank);
    }
    toString()
    {
        return "(file: " + this.file + ", rank: "+ this.rank + ")";
    }
}