
function isMoveDoublePawn(move, file) {
    if (move.piece.type == PIECES.pawn && move.src.file == file && move.dest.file == file && Math.abs(move.dest.rank - move.src.rank) == 2)
        return true;
    return false;
}

function canPawnDouble(position, pawn) {
    if (pawn.colour == COLOUR.white && position.rank == RANK.rank2 && !pawn.has_moved)
        return true;
    if (pawn.colour == COLOUR.black && position.rank == RANK.rank7 && !pawn.has_moved)
        return true;
    return false;
}

function pawnMoves(game, index) {
    let position = indexToPosition(index);
    let moves = new Array();
    if (position.isValid()) {
        let forward = (game.board[index].colour == COLOUR.white) ? 1 : -1;

        let center_position = new Position(position.file, position.rank + forward);
        let left_position = new Position(position.file + 1, position.rank + forward);
        let right_position = new Position(position.file - 1, position.rank + forward);
        let double_position = new Position(position.file, position.rank + 2 * forward);

        if (center_position.isValid()) {
            let center_index = positionToIndex(center_position);

            if (game.board[center_index].type == PIECES.empty)
                moves.push(new BasicMove(game.board[index], position, center_position));
        }
        if (double_position.isValid()) {
            let double_index = positionToIndex(double_position);
            let center_index = positionToIndex(center_position);

            if (game.board[double_index].type == PIECES.empty && game.board[center_index].type == PIECES.empty && canPawnDouble(position, game.board[index]))
                moves.push(new BasicMove(game.board[index], position, double_position));
        }
        if (left_position.isValid()) {
            let left_index = positionToIndex(left_position);
            let prev_position = new Position(left_position.file, position.rank)
            let prev_index = positionToIndex(prev_position);
            let take_condition = (game.board[left_index].type != PIECES.empty) && (game.board[left_index].colour != game.board[index].colour);

            let enpassant_condition = prev_index != -1 && game.board[prev_index].type == PIECES.pawn
                && game.board[prev_index].colour != game.board[index].colour && isMoveDoublePawn(game.moves[game.moves.length - 1], left_position.file)

            if (take_condition)
                moves.push(new CaptureMove(game.board[index], position, left_position, game.board[left_index], left_position));
            if (enpassant_condition)
                moves.push(new CaptureMove(game.board[index], position, left_position, game.board[prev_index], prev_position));
        }
        if (right_position.isValid()) {
            let right_index = positionToIndex(right_position);
            let prev_position = new Position(right_position.file, position.rank)
            let prev_index = positionToIndex(prev_position);
            let take_condition = (game.board[right_index].type != PIECES.empty) && (game.board[right_index].colour != game.board[index].colour);
            let enpassant_condition = prev_index != -1 && game.board[prev_index].type == PIECES.pawn
                && game.board[prev_index].colour != game.board[index].colour && isMoveDoublePawn(game.moves[game.moves.length - 1], right_position.file)

            if (take_condition)
                moves.push(new CaptureMove(game.board[index], position, right_position, game.board[right_index], right_position));
            if (enpassant_condition)
                moves.push(new CaptureMove(game.board[index], position, right_position, game.board[prev_index], prev_position));
        }

    }
    return moves;
}

function knightMoves(game, index) {
    let position = indexToPosition(index);
    let moves = new Array();
    if (position.isValid()) {
        let dir = [-1, 1];
        let coef = [2, 1];
        for (let ind1 = 0; ind1 < 2; ind1++)
            for (let ind2 = 0; ind2 < 2; ind2++)
                for (let ind3 = 0; ind3 < 2; ind3++) {
                    let next_position = new Position(position.file + dir[ind1] * coef[ind3], position.rank + dir[ind2] * coef[ind3 ^ 1]);
                    let next_index = positionToIndex(next_position);

                    let nonTake = next_index != -1 && game.board[next_index].type == PIECES.empty;
                    let takes = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                    if (nonTake)
                        moves.push(new BasicMove(game.board[index], position, next_position));
                    if (takes)
                        moves.push(new CaptureMove(game.board[index], position, next_position, game.board[next_index], next_position));
                }
    }
    return moves;
}

function bishopMoves(game, index) {
    let position = indexToPosition(index);
    let moves = new Array();
    if (position.isValid()) {
        let dir = [-1, 1];
        for (let ind1 = 0; ind1 < 2; ind1++)
            for (let ind2 = 0; ind2 < 2; ind2++) {
                let next_position = new Position(position.file + dir[ind1], position.rank + dir[ind2]);
                while (next_position.isValid()) {
                    let next_index = positionToIndex(next_position);
                    let nonTake = next_index != -1 && game.board[next_index].type == PIECES.empty;
                    let takes = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                    let block = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour == game.board[index].colour;
                    if (block)
                        break;
                    if (nonTake)
                        moves.push(new BasicMove(game.board[index], position, next_position));
                    if (takes) {
                        moves.push(new CaptureMove(game.board[index], position, next_position, game.board[next_index], next_position));
                        break;
                    }
                    next_position = new Position(next_position.file + dir[ind1], next_position.rank + dir[ind2]);
                }
            }
    }
    return moves;
}

function rockMoves(game, index) {
    let position = indexToPosition(index);
    let moves = new Array();
    if (position.isValid()) {
        let dir = [-1, 1];
        let coef = [0, 1];
        for (let ind1 = 0; ind1 < 2; ind1++)
            for (let ind2 = 0; ind2 < 2; ind2++) {
                let next_position = new Position(position.file + dir[ind1] * coef[ind2], position.rank + dir[ind1] * coef[ind2 ^ 1]);
                while (next_position.isValid()) {
                    let next_index = positionToIndex(next_position);
                    let nonTake = next_index != -1 && game.board[next_index].type == PIECES.empty;
                    let takes = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                    let block = next_index != -1 && game.board[next_index].type != PIECES.empty && game.board[next_index].colour == game.board[index].colour;
                    if (block)
                        break;
                    if (nonTake)
                        moves.push(new BasicMove(game.board[index], position, next_position));
                    if (takes) {
                        moves.push(new CaptureMove(game.board[index], position, next_position, game.board[next_index], next_position));
                        break;
                    }
                    next_position = new Position(next_position.file + dir[ind1] * coef[ind2], next_position.rank + dir[ind1] * coef[ind2 ^ 1]);
                }
            }
    }
    return moves;
}

function queenMoves(game, index) {
    let position = indexToPosition(index);
    let moves = new Array();
    if (position.isValid()) {
        let rock_moves = rockMoves(game, index);
        let bishop_moves = bishopMoves(game, index);
        moves = rock_moves.concat(bishop_moves);
    }
    return moves;
}

function kingMoves(game, index) {
    let position = indexToPosition(index);
    let moves = new Array();
    if (position.isValid()) {
        for (let rank = -1; rank < 2; rank++)
            for (let file = -1; file < 2; file++) {
                if (file == 0 && rank == 0)
                    continue;

                let next_position = new Position(position.file + file, position.rank + rank);
                let next_index = positionToIndex(next_position);

                let nonTake = game.board[next_index].type == PIECES.empty;
                let take = game.board[next_index].type != PIECES.empty && game.board[next_index].colour != game.board[index].colour;
                if (nonTake) {
                    moves.push(new BasicMove(game.board[index], position, next_position));
                }
                if (take) {
                    moves.push(new CaptureMove(game.board[index], position, next_position, game.board[next_index], next_position));
                }
            }


        if(!game.board[index].has_moved)
        {
            let kingRock_position = new Position(FILE.fileH,position.rank);
            let kingRrock_index = positionToIndex(king_rock_position);
            let kingrock_dest = new Position(File.fileF,position.rank);
            let king_
            
            let queen_rock_index = positionToIndex( new Position(FILE.fileA, position.rank));
            let kingside_castle = king_rock_index != -1 && game.board[king_rock_index].colour == game.board[index].colour 
                    && game.board[king_rock_index].type == PIECES.rock && !game.board[king_rock_index].has_moved;

            let queenside_castle = queen_rock_index != -1 && game.board[queen_rock_index].colour == game.board[index].colour 
                    && game.board[queen_rock_index].type == PIECES.rock && !game.board[queen_rock_index].has_moved;
            if (kingside_castle)
            {
                moves.push(new CastleMove(game.board[index],position, new Position(FILE.fileG, position.rank),game.board[king_rock_index],king_rock_position,));
            }
            if (queenside_castle)
            {
                moves.push(new CastleMove(game.board[index],position, new Position(FILE.fileC, position.rank),game.board[queen_rock_index],queen_rock_index,new Position(File.fileD,position.rank)));
            }
        }
    }
    return moves;
}

function checkCondFunct(index) {
    return function (move) {
        return isChecked(index, move);
    };
}


function isChecked(index, move) {
    return false;
}
