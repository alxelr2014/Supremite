
function isMoveDoublePawn(move , file){
    if (move.piece.type== PIECES.pawn && move.src.file == file && move.dest.file == file && Math.abs(move.dest.rank - move.src.rank) == 2)
        return true;
    return false;
}

function canPawnDouble(position, colour)
{
    if(colour == COLOUR.white && position.rank == 1)
        return true;
    if(colour == COLOUR.black && position.rank == 6)
        return true;
    return false;
}

function notCheck(game , position, colour)
{
    for(let index = 0 ; index < BOEARD_SIZE; index ++)
    {
        if(game.board[index].type != PIECES.empty && game.board[index].colour != colour)
        {
            let moves = possible_moves(game,index);
            for(let i = 0 ; i < moves.length ; i++)
            {
                if(moves[i].dest.file == position.file && moves[i].dest.rank == position.rank)
                    return false;
            }
        }
    }
    return true;
}

function pawnMoves(game, index)
{
    let position = indexToPosition(index);
    let moves= new Array<Move>(0);
    if(position.isValid())
            return moves;
        let forward = (game.board[index].colour == COLOUR.white) ? 1 : -1;
        let center_position = new Position(position.file,position.rank + forward);
        let left_position = new Position(position.file + 1,position.rank + forward);
        let right_position = new Position(position.file- 1,position.rank + forward);
        let double_position = new Position(position.file, position.rank + 2*forward)
        if(center_position.isValid()){
            let center_index = positionToIndex(center_position);
            if(game.board[center_index].type == PIECES.empty)
                moves.push(new Move(game.board[index],position,center_position,null, null));
        }
        if(left_position.isValid())
        {
            let left_index = positionToIndex(left_position);
            let prev_index = positionToIndex( new Position(left_position.file, position.rank));
            let take_condition = (game.board[left_index].type != PIECES.empty) && (game.board[left_index].colour != game.board[index].colour);
            let enpassant_condition = prev_index != -1 && game.board[prev_index].type == PIECES.pawn 
                            && game.board[prev_index].colour != game.board[index].colour && isMoveDoublePawn(game.moves[game.moves.length - 1],left_position.file)

            if(take_condition)
                moves.push(new Move(game.board[index],position,left_position,game.board[left_index],left_position));
            if (enpassant_condition)
                moves.push(new Move(game.board[index],position,left_position,game.board[prev_index],indexToPosition(prev_index)));
        }
        if(right_position.isValid())
        {
            let right_index = positionToIndex(right_position);
            let prev_index = positionToIndex( new Position(right_position.file, position.rank));
            let take_condition = (game.board[right_index].type != PIECES.empty) && (game.board[right_index].colour != game.board[index].colour);
            let enpassant_condition = prev_index != -1 && game.board[prev_index].type == PIECES.pawn 
                            && game.board[prev_index].colour != game.board[index].colour && isMoveDoublePawn(game.moves[game.moves.length - 1],right_position.file)

            if(take_condition)
                moves.push(new Move(game.board[index],position,right_position,game.board[right_index],right_position));
            if (enpassant_condition)
                moves.push(new Move(game.board[index],position,right_position,game.board[right_index],indexToPosition(prev_index)));   
        }
        if(double_position.isValid())
        {
            let double_index = positionToIndex(double_position);
            let center_index = positionToIndex(center_position);
            if(game.board[double_index].type == PIECES.empty && game.board[center_index].type == PIECES.empty && canPawnDouble(position,game.board[index].colour))
                moves.push(new Move(game.board[index],position, double_position, null, null));
        }
    return moves;
}

function knightMoves(game, index){
    let position = indexToPosition(index);
    let moves= new Array<Move>(0);
    if(position.isValid())
    {
        let dir = [-1,1];
        let coef = [2,1];
        for(let ind1 = 0; ind1 < 2 ; ind1++)
            for(let ind2 = 0; ind2 < 2 ; ind2++)
                for(let ind3 = 0; ind3 < 2 ; ind3++)
        {
            let next_position = new Position(position.file + dir[ind1]* coef[ind3], position.rank + dir[ind2]*coef[ind3^1]);
            let next_index = positionToIndex(next_position);
            let nonTake = next_index != -1 && game.board[next_index].type == PIECES.empty;
            let takes = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
            if(nonTake)
                moves.push(new Move(game.board[index],position,next_position,null,null));
            if(takes)
                moves.push(new Move(game.board[index],position,next_position,game.board[next_index],next_position));
        }
    }   
    return moves;
}

function bishopMoves(game, index)
{
    let position = indexToPosition(index);
    let moves= new Array<Move>(0);
    if(position.isValid())
    {
        let dir = [-1,1];
        for(let ind1 = 0; ind1 < 2 ; ind1++)
        for(let ind2 = 0; ind2 < 2 ; ind2++)
        {
            let next_position = new Position(position.file + dir[ind1], position.rank + dir[ind2]);
            while(next_position.isValid())
            {
                let next_index = positionToIndex(next_position);
                let nonTake = next_index != -1 && game.board[next_index].type == PIECES.empty;
                let takes = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                if(nonTake)
                    moves.push(new Move(game.board[index],position,next_position,null,null));
                if(takes)
                    {
                        moves.push(new Move(game.board[index],position,next_position,game.board[next_index],next_position));
                        break;
                    }
                next_position = new Position(next_position.file + dir[ind1], next_position.rank + dir[ind2]);
            }
        }
    }   
    return moves;
}

function rockMoves(game, index)
{
    let position = indexToPosition(index);
    let moves= new Array<Move>(0);
    if(position.isValid())
    {
        let dir = [-1,1];
        let coef = [0,1];
        for(let ind1 = 0; ind1 < 2 ; ind1++)
        for(let ind2 = 0; ind2 < 2 ; ind2++)
        {
            let next_position = new Position(position.file + dir[ind1]*coef[ind2], position.rank + dir[ind1]*coef[ind2 ^ 1]);
            while(next_position.isValid())
            {
                let next_index = positionToIndex(next_position);
                let nonTake = next_index != -1 && game.board[next_index].type == PIECES.empty;
                let takes = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                if(nonTake)
                    moves.push(new Move(game.board[index],position,next_position,null,null));
                if(takes)
                    {
                        moves.push(new Move(game.board[index],position,next_position,game.board[next_index],next_position));
                        break;
                    }
                next_position = new Position(next_position.file +  dir[ind1]*coef[ind2], next_position.rank + dir[ind1]*coef[ind2 ^ 1]);
            }
        }
    }   
    return moves;
}

function queenMoves(game, index)
{
    let position = indexToPosition(index);
    let moves= new Array<Move>(0);
    if(position.isValid())
    {
        moves.concat(rockMoves(game,index));
        moves.concat(bishopMoves(game,index));
    }   
    return moves;
}

function kingMoves(game, index)
{
    let position = indexToPosition(index);
    let moves= new Array<Move>(0);
    if(position.isValid())
    {
        for(let rank = -1; rank < 2 ; rank++)
            for(let file = -1; file < 2 ; file++)
            {
                if(file == 0 && rank == 0)
                    continue;
                let next_position = new Position(position.file + file, position.rank + rank);
                let next_index = positionToIndex(next_position);
                let nonTake = game.board[next_index].type == PIECES.empty;
                let take = game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                if(nonTake)
                {
                    moves.push(new Move(game.board[index],position,next_position, null,null));
                }
                if(take)
                {
                    moves.push(new Move(game.board[index],position,next_position, game.board[next_index] ,next_position));
                }
            }

            
        if(!game.board[index].has_moved)
        {
            let king_rock_index = positionToIndex(new Position(FILE.fileH,position.rank));
            let queen_rock_index = positionToIndex( new Position(FILE.fileA, position.rank));
            let kingside_castle = king_rock_index != -1 && game.board[king_rock_index].colour == game.board[index].colour 
                    && game.board[king_rock_index].type == PIECES.rock && !game.board[king_rock_index].has_moved;

            let queenside_castle = queen_rock_index != -1 && game.board[queen_rock_index].colour == game.board[index].colour 
                    && game.board[queen_rock_index].type == PIECES.rock && !game.board[queen_rock_index].has_moved;
            if (kingside_castle)
            {
                moves.push(new Move(game.board[index],position, new Position(FILE.fileG, position.rank),-1,null));
                moves.push(new Move(game.board[king_rock_index],new Position(FILE.fileH, position.rank), new Position(FILE.fileF, position.rank),null,null));
            }
            if (queenside_castle)
            {
                moves.push(new Move(game.board[index],position, new Position(FILE.fileC, position.rank),-1,null));
                moves.push(new Move(game.board[queen_rock_index],new Position(FILE.fileA, position.rank), new Position(FILE.fileD, position.rank),null,null));

            }
        }
    }   
    return moves;
}

function possible_moves(game ,index )
{
    if (game.board[index].type == PIECES.pawn)
    {
        return pawnMoves(game,index);
    }
    else if(game.board[index].type == PIECES.knight)
    {
        return knightMoves(game,index);
    }
    else if(game.board[index].type == PIECES.bishop)
    {
        return bishopMoves(game,index);
    }
    else if(game.board[index].type == PIECES.rock)
    {
        return rockMoves(game,index);
    }
    else if(game.board[index].type == PIECES.queen)
    {
        return queenMoves(game,index);
    }
    else if(game.board[index].type == PIECES.king)
    {
        return knightMoves(game,index);
    }
        return new  Array<Move>(0);

}