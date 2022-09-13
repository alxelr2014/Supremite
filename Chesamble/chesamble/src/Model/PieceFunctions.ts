import { Game } from './Game';
import { indexToPosition, positionToIndex } from './HelperFunctions';
import {BasicMove, CaptureMove, CastleMove, Move, PromoteMove} from './Move';
import { Piece } from './Piece';
import { Position } from './Position';
import { BOARD_SIZE, COLOUR, FILE, PIECES, RANK } from "./Macros";


export function isMoveDoublePawn(move : Move, file : number) {
    if (move.piece.type === PIECES.pawn && move.src.file === file && move.dest.file === file && Math.abs(move.dest.rank - move.src.rank) === 2)
        return true;
    return false;
}

export function canPawnDouble(position : Position, pawn : Piece) {
    if (pawn.colour === COLOUR.white && position.rank === RANK.rank2 && !pawn.has_moved)
        return true;
    if (pawn.colour === COLOUR.black && position.rank === RANK.rank7 && !pawn.has_moved)
        return true;
    return false;
}

export function canPawnPromote(position : Position, pawn : Piece)
{
    if(pawn.colour === COLOUR.white && position.rank === RANK.rank8)
        return true;
    if(pawn.colour === COLOUR.black && position.rank === RANK.rank1)
        return true;
    return false;
}

export function promoteMoves(game : Game,index : number){
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (canPawnPromote(position, game.board[index])) {
        moves.push(new PromoteMove(game.board[index],position, position,new Piece(PIECES.bishop,game.board[index].colour)));
        moves.push(new PromoteMove(game.board[index],position, position,new Piece(PIECES.knight,game.board[index].colour)));
        moves.push(new PromoteMove(game.board[index],position, position,new Piece(PIECES.rock,game.board[index].colour)));
        moves.push(new PromoteMove(game.board[index],position, position,new Piece(PIECES.queen,game.board[index].colour)));
    }
    return moves;
}

export function pawnMoves(game : Game, index : number) {
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (position.isValid()) {
        let forward = (game.board[index].colour === COLOUR.white) ? 1 : -1;

        let center_position = new Position(position.file, position.rank + forward);
        let left_position = new Position(position.file + 1, position.rank + forward);
        let right_position = new Position(position.file - 1, position.rank + forward);
        let double_position = new Position(position.file, position.rank + 2 * forward);

        if (center_position.isValid()) {
            let center_index = positionToIndex(center_position);

            if (game.board[center_index].type === PIECES.empty) {
                    moves.push(new BasicMove(game.board[index], position, center_position));
            }
        }
        if (double_position.isValid()) {
            let double_index = positionToIndex(double_position);
            let center_index = positionToIndex(center_position);

            if (game.board[double_index].type === PIECES.empty && game.board[center_index].type === PIECES.empty && canPawnDouble(position, game.board[index]))
                moves.push(new BasicMove(game.board[index], position, double_position));
        }
        if (left_position.isValid()) {
            let left_index = positionToIndex(left_position);
            let prev_position = new Position(left_position.file, position.rank)
            let prev_index = positionToIndex(prev_position);
            let take_condition = (game.board[left_index].type !== PIECES.empty) && (game.board[left_index].colour !== game.board[index].colour);

            let enpassant_condition = prev_index !== -1 && game.board[prev_index].type === PIECES.pawn
                && game.board[prev_index].colour !== game.board[index].colour && isMoveDoublePawn(game.moves[game.moves.length - 1], left_position.file)

            if (take_condition)
                moves.push(new CaptureMove(game.board[index], position, left_position, game.board[left_index], left_position));
            if (enpassant_condition)
                moves.push(new CaptureMove(game.board[index], position, left_position, game.board[prev_index], prev_position));
        }
        if (right_position.isValid()) {
            let right_index = positionToIndex(right_position);
            let prev_position = new Position(right_position.file, position.rank)
            let prev_index = positionToIndex(prev_position);
            let take_condition = (game.board[right_index].type !== PIECES.empty) && (game.board[right_index].colour !== game.board[index].colour);
            let enpassant_condition = prev_index !== -1 && game.board[prev_index].type === PIECES.pawn
                && game.board[prev_index].colour !== game.board[index].colour && isMoveDoublePawn(game.moves[game.moves.length - 1], right_position.file)

            if (take_condition)
                moves.push(new CaptureMove(game.board[index], position, right_position, game.board[right_index], right_position));
            if (enpassant_condition)
                moves.push(new CaptureMove(game.board[index], position, right_position, game.board[prev_index], prev_position));
        }

    }
    return moves;
}

export function knightMoves(game : Game, index : number) {
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (position.isValid()) {
        let dir = [-1, 1];
        let coef = [2, 1];
        for (let ind1 = 0; ind1 < 2; ind1++)
            for (let ind2 = 0; ind2 < 2; ind2++)
                for (let ind3 = 0; ind3 < 2; ind3++) {
                    let next_position = new Position(position.file + dir[ind1] * coef[ind3], position.rank + dir[ind2] * coef[ind3 ^ 1]);
                    let next_index = positionToIndex(next_position);

                    let nonTake = next_index !== -1 && game.board[next_index].type === PIECES.empty;
                    let takes = next_index !== -1 && game.board[next_index].type !== PIECES.empty && game.board[next_index].colour !== game.board[index].colour;
                    if (nonTake)
                        moves.push(new BasicMove(game.board[index], position, next_position));
                    if (takes)
                        moves.push(new CaptureMove(game.board[index], position, next_position, game.board[next_index], next_position));
                }
    }
    return moves;
}

export function bishopMoves(game : Game, index : number) {
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (position.isValid()) {
        let dir = [-1, 1];
        for (let ind1 = 0; ind1 < 2; ind1++)
            for (let ind2 = 0; ind2 < 2; ind2++) {
                let next_position = new Position(position.file + dir[ind1], position.rank + dir[ind2]);
                while (next_position.isValid()) {
                    let next_index = positionToIndex(next_position);
                    let nonTake = next_index !== -1 && game.board[next_index].type === PIECES.empty;
                    let takes = next_index !== -1 && game.board[next_index].type !== PIECES.empty && game.board[next_index].colour !== game.board[index].colour;
                    let block = next_index !== -1 && game.board[next_index].type !== PIECES.empty && game.board[next_index].colour === game.board[index].colour;
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

export function rockMoves(game : Game, index : number) {
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (position.isValid()) {
        let dir = [-1, 1];
        let coef = [0, 1];
        for (let ind1 = 0; ind1 < 2; ind1++)
            for (let ind2 = 0; ind2 < 2; ind2++) {
                let next_position = new Position(position.file + dir[ind1] * coef[ind2], position.rank + dir[ind1] * coef[ind2 ^ 1]);
                while (next_position.isValid()) {
                    let next_index = positionToIndex(next_position);
                    let nonTake = next_index !== -1 && game.board[next_index].type === PIECES.empty;
                    let takes = next_index !== -1 && game.board[next_index].type !== PIECES.empty && game.board[next_index].colour !== game.board[index].colour;
                    let block = next_index !== -1 && game.board[next_index].type !== PIECES.empty && game.board[next_index].colour === game.board[index].colour;
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

export function queenMoves(game : Game, index : number) {
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (position.isValid()) {
        let rock_moves = rockMoves(game, index);
        let bishop_moves = bishopMoves(game, index);
        moves = rock_moves.concat(bishop_moves);
    }
    return moves;
}

export function kingMoves(game : Game, index : number) {
    let position = indexToPosition(index);
    let moves = new Array<Move>();
    if (position.isValid()) {
        for (let rank = -1; rank < 2; rank++)
            for (let file = -1; file < 2; file++) {
                if (file === 0 && rank === 0)
                    continue;

                let next_position = new Position(position.file + file, position.rank + rank);
                let next_index = positionToIndex(next_position);

                let nonTake = next_index !== -1 && game.board[next_index].type === PIECES.empty;
                let take = next_index !== -1 && game.board[next_index].type !== PIECES.empty && game.board[next_index].colour !== game.board[index].colour;
                if (nonTake) {
                    moves.push(new BasicMove(game.board[index], position, next_position));
                }
                if (take) {
                    moves.push(new CaptureMove(game.board[index], position, next_position, game.board[next_index], next_position));
                }
            }


        if (!game.board[index].has_moved) {
            let kingside_rock_position = new Position(FILE.fileH, position.rank);
            let kingside_rock_index = positionToIndex(kingside_rock_position);
            let kingside_rock_dest = new Position(FILE.fileF, position.rank);
            let kingside_king_dest = new Position(FILE.fileG, position.rank);

            let kingside_castle = kingside_rock_index !== -1 && game.board[kingside_rock_index].colour === game.board[index].colour
                && game.board[kingside_rock_index].type === PIECES.rock && !game.board[kingside_rock_index].has_moved;

            for (let i = kingside_rock_index - 1; (i > index) && kingside_castle; i--) {
                kingside_castle = kingside_castle && game.board[i].type === PIECES.empty;
            }
            for (let i = index; (i <= positionToIndex(kingside_king_dest)) && kingside_castle; i++) {
                kingside_castle = kingside_castle && !isChecked(game,
                    new BasicMove(game.board[index], position, indexToPosition(i)), game.board[index].colour);
            }

            if (kingside_castle) {
                moves.push(new CastleMove(game.board[index], position, kingside_king_dest, game.board[kingside_rock_index], kingside_rock_position, kingside_rock_dest));
            }


            let queenside_rock_position = new Position(FILE.fileA, position.rank);
            let queenside_rock_index = positionToIndex(queenside_rock_position);
            let queenside_rock_dest = new Position(FILE.fileD, position.rank);
            let queenside_king_dest = new Position(FILE.fileC, position.rank);

            let queenside_castle = queenside_rock_index !== -1 && game.board[queenside_rock_index].colour === game.board[index].colour
                && game.board[queenside_rock_index].type === PIECES.rock && !game.board[queenside_rock_index].has_moved;

            for (let i = queenside_rock_index + 1; (i < index) && queenside_castle; i++) {
                queenside_castle = queenside_castle && game.board[i].type === PIECES.empty;
            }
            for (let i = index; (i >= positionToIndex(queenside_king_dest)) && queenside_castle; i--) {
                queenside_castle = queenside_castle && !isChecked(game,
                    new BasicMove(game.board[index], position, indexToPosition(i)), game.board[index].colour);
            }

            if (queenside_castle) {
                moves.push(new CastleMove(game.board[index], position, queenside_king_dest, game.board[queenside_rock_index], queenside_rock_position, queenside_rock_dest));
            }

        }
    }
    return moves;
}

export function moveDo(move : Move, board : Array<Piece>, takens : Array<Array<Piece>>) {
    let src_index = positionToIndex(move.src);
    let dest_index = positionToIndex(move.dest);

    if (move instanceof BasicMove) {
        board[dest_index] = move.piece;
        board[src_index] = new Piece(PIECES.empty, -1);
    }
    else if (move instanceof CaptureMove) {
        let taken_index = positionToIndex(move.taken_position);
        takens[move.taken.colour].push(move.taken);
        board[taken_index] = new Piece(PIECES.empty, -1);
        board[dest_index] = move.piece;
        board[src_index] = new Piece(PIECES.empty, -1);
    }
    else if (move instanceof CastleMove) {
        let rock_dest_index = positionToIndex(move.rock_dest);
        let rock_src_index = positionToIndex(move.rock_src);
        board[rock_dest_index] = move.rock_piece;
        board[rock_src_index] = new Piece(PIECES.empty, -1);
        board[dest_index] = move.piece;
        board[src_index] = new Piece(PIECES.empty, -1);
    }
    else if (move instanceof PromoteMove) {

    }
    else {
        console.log("Move's instance is not recognized!");
    }
}
export function moveUndo(move : Move, board : Array<Piece>, takens : Array<Array<Piece>>) {
    let src_index = positionToIndex(move.src);
    let dest_index = positionToIndex(move.dest);

    if (move instanceof BasicMove) {
        board[src_index] = move.piece;
        board[dest_index] = new Piece(PIECES.empty, -1);

    }
    else if (move instanceof CaptureMove) {
        let taken_index = positionToIndex(move.taken_position);


        board[src_index] = move.piece;
        board[dest_index] = new Piece(PIECES.empty, -1);
        board[taken_index] = move.taken;
        takens[move.taken.colour] = takens[move.taken.colour].filter((element) => !element.isEqual(move.taken));
    }
    else if (move instanceof CastleMove) {
        let rock_dest_index = positionToIndex(move.rock_dest);
        let rock_src_index = positionToIndex(move.rock_src);

        board[src_index] = move.piece;
        board[dest_index] = new Piece(PIECES.empty, -1);

        board[rock_src_index] = move.rock_piece;

        board[rock_dest_index] = new Piece(PIECES.empty, -1);
    }
    else if (move instanceof PromoteMove) {

    }
    else {
        console.log("Move's instance is not recognized!");
    }
}

export function isCheckCondition(game :Game, colour : number) {
    game.turn ^= 1;
    let king_position = -1;
    for (let i = 0; i < BOARD_SIZE; i++) {
        if ((game.board[i].colour === colour) && (game.board[i].type === PIECES.king)) {
            king_position = i;
        }
    }
    let result = false;
    if (king_position === -1){
        console.log("King was not found!");
         result = true;
    }
    for (let i = 0; i < BOARD_SIZE && !result; i++) {
        if (game.board[i].colour !== colour) {
            let possible_moves = game.possibleMoves(i, false);
            for (let pmove of possible_moves) {
                if (pmove instanceof CaptureMove) {
                    if (positionToIndex(pmove.dest) === king_position) {
                        result = true;
                    }
                }
            }
        }
    }
    game.turn ^= 1;
    return result;
}

export function isChecked(game : Game, move : Move, colour : number) {
    moveDo(move, game.board, game.takens);
    /*console.log("isChecked!");
    console.log(move.constructor.name);
    console.log(move.print());*/
    let result = isCheckCondition(game, colour);
    moveUndo(move, game.board, game.takens);
    return result;
}

export function isCheckmate(game : Game, colour : number) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (game.board[i].colour === colour) {
            let possible_moves = game.possibleMoves(i, false);
            if (possible_moves.length !== 0) return false;
        }
    }
    return true;
}
