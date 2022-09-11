function isMoveDoublePawn(move, file) {
  if (
    move.piece.type == PIECES.pawn &&
    move.src.file == file &&
    move.dest.file == file &&
    Math.abs(move.dest.rank - move.src.rank) == 2
  )
    return true;
  return false;
}

function canPawnDouble(position, pawn) {
  if (
    pawn.colour == COLOUR.white &&
    position.rank == RANK.rank2 &&
    !pawn.has_moved
  )
    return true;
  if (
    pawn.colour == COLOUR.black &&
    position.rank == RANK.rank7 &&
    !pawn.has_moved
  )
    return true;
  return false;
}

function pawnMoves(game, index) {
  let position = indexToPosition(index);
  let moves = new Array();
  if (position.isValid()) {
    let forward = game.board[index].colour == COLOUR.white ? 1 : -1;
    let center_position = new Position(position.file, position.rank + forward);
    let left_position = new Position(
      position.file + 1,
      position.rank + forward
    );
    let right_position = new Position(
      position.file - 1,
      position.rank + forward
    );
    let double_position = new Position(
      position.file,
      position.rank + 2 * forward
    );
    if (center_position.isValid()) {
      let center_index = positionToIndex(center_position);
      if (game.board[center_index].type == PIECES.empty)
        moves.push(
          new Move(
            game.board[index],
            position,
            center_position,
            game.board[center_index],
            center_position
          )
        );
    }
    if (double_position.isValid()) {
      let double_index = positionToIndex(double_position);
      let center_index = positionToIndex(center_position);
      if (
        game.board[double_index].type == PIECES.empty &&
        game.board[center_index].type == PIECES.empty &&
        canPawnDouble(position, game.board[index])
      )
        moves.push(
          new Move(
            game.board[index],
            position,
            double_position,
            game.board[double_index],
            double_position
          )
        );
    }
    if (left_position.isValid()) {
      let left_index = positionToIndex(left_position);
      let prev_position = new Position(left_position.file, position.rank);
      let prev_index = positionToIndex(prev_position);
      let take_condition =
        game.board[left_index].type != PIECES.empty &&
        game.board[left_index].colour != game.board[index].colour;
      let enpassant_condition =
        prev_index != -1 &&
        game.board[prev_index].type == PIECES.pawn &&
        game.board[prev_index].colour != game.board[index].colour &&
        isMoveDoublePawn(game.moves[game.moves.length - 1], left_position.file);

      if (take_condition)
        moves.push(
          new Move(
            game.board[index],
            position,
            left_position,
            game.board[left_index],
            left_position
          )
        );
      if (enpassant_condition)
        moves.push(
          new Move(
            game.board[index],
            position,
            left_position,
            game.board[prev_index],
            prev_position
          )
        );
    }
    if (right_position.isValid()) {
      let right_index = positionToIndex(right_position);
      let prev_position = new Position(right_position.file, position.rank);
      let prev_index = positionToIndex(prev_position);
      let take_condition =
        game.board[right_index].type != PIECES.empty &&
        game.board[right_index].colour != game.board[index].colour;
      let enpassant_condition =
        prev_index != -1 &&
        game.board[prev_index].type == PIECES.pawn &&
        game.board[prev_index].colour != game.board[index].colour &&
        isMoveDoublePawn(
          game.moves[game.moves.length - 1],
          right_position.file
        );

      if (take_condition)
        moves.push(
          new Move(
            game.board[index],
            position,
            right_position,
            game.board[right_index],
            right_position
          )
        );
      if (enpassant_condition)
        moves.push(
          new Move(
            game.board[index],
            position,
            right_position,
            game.board[prev_index],
            prev_position
          )
        );
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
          let next_position = new Position(
            position.file + dir[ind1] * coef[ind3],
            position.rank + dir[ind2] * coef[ind3 ^ 1]
          );
          let next_index = positionToIndex(next_position);
          let nonTake =
            next_index != -1 && game.board[next_index].type == PIECES.empty;
          let takes =
            next_index != -1 &&
            game.board[next_index].type != PIECES.empty &&
            game.board[next_index].colour != game.board[index].colour;
          if (nonTake)
            moves.push(
              new Move(
                game.board[index],
                position,
                next_position,
                game.board[next_index],
                next_position
              )
            );
          if (takes)
            moves.push(
              new Move(
                game.board[index],
                position,
                next_position,
                game.board[next_index],
                next_position
              )
            );
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
        let next_position = new Position(
          position.file + dir[ind1],
          position.rank + dir[ind2]
        );
        while (next_position.isValid()) {
          let next_index = positionToIndex(next_position);
          let nonTake =
            next_index != -1 && game.board[next_index].type == PIECES.empty;
          let takes =
            next_index != -1 &&
            game.board[next_index].type != PIECES.empty &&
            game.board[next_index].colour != game.board[index].colour;
          let block =
            next_index != -1 &&
            game.board[next_index].type != PIECES.empty &&
            game.board[next_index].colour == game.board[index].colour;
          if (block) break;
          if (nonTake)
            moves.push(
              new Move(
                game.board[index],
                position,
                next_position,
                game.board[next_index],
                next_position
              )
            );
          if (takes) {
            moves.push(
              new Move(
                game.board[index],
                position,
                next_position,
                game.board[next_index],
                next_position
              )
            );
            break;
          }
          next_position = new Position(
            next_position.file + dir[ind1],
            next_position.rank + dir[ind2]
          );
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
        let next_position = new Position(
          position.file + dir[ind1] * coef[ind2],
          position.rank + dir[ind1] * coef[ind2 ^ 1]
        );
        while (next_position.isValid()) {
          let next_index = positionToIndex(next_position);
          let nonTake =
            next_index != -1 && game.board[next_index].type == PIECES.empty;
          let takes =
            next_index != -1 &&
            game.board[next_index].type != PIECES.empty &&
            game.board[next_index].colour != game.board[index].colour;
          let block =
            next_index != -1 &&
            game.board[next_index].type != PIECES.empty &&
            game.board[next_index].colour == game.board[index].colour;
          if (block) break;
          if (nonTake)
            moves.push(
              new Move(
                game.board[index],
                position,
                next_position,
                game.board[next_index],
                next_position
              )
            );
          if (takes) {
            moves.push(
              new Move(
                game.board[index],
                position,
                next_position,
                game.board[next_index],
                next_position
              )
            );
            break;
          }
          next_position = new Position(
            next_position.file + dir[ind1] * coef[ind2],
            next_position.rank + dir[ind1] * coef[ind2 ^ 1]
          );
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
        if (file == 0 && rank == 0) continue;
        let next_position = new Position(
          position.file + file,
          position.rank + rank
        );
        let next_index = positionToIndex(next_position);
        let nonTake =
          next_index != -1 && game.board[next_index].type == PIECES.empty;
        let take =
          next_index != -1 &&
          game.board[next_index].type != PIECES.empty &&
          game.board[next_index].colour != game.board[index].colour;
        if (nonTake) {
          moves.push(
            new Move(
              game.board[index],
              position,
              next_position,
              game.board[next_index],
              next_position
            )
          );
        }
        if (take) {
          moves.push(
            new Move(
              game.board[index],
              position,
              next_position,
              game.board[next_index],
              next_position
            )
          );
        }
      }

    if(!game.board[index].has_moved)
        {
            let king_rock_index = positionToIndex(new Position(FILE.fileH,position.rank));
            let kingside_pos =  new Position(FILE.fileG, position.rank);
            let queen_rock_index = positionToIndex( new Position(FILE.fileA, position.rank));
            let queenside_pos = new Position(FILE.fileC, position.rank);

            let kingside_castle = king_rock_index != -1 && game.board[king_rock_index].colour == game.board[index].colour 
            && game.board[king_rock_index].type == PIECES.rock && !game.board[king_rock_index].has_moved; 
            for(let i = king_rock_index - 1; (i > index  )&& kingside_castle;i--)
            {
                kingside_castle = kingside_castle && game.board[i].type == PIECES.empty;
            }
            for(let i = index + 1 ; (i <= positionToIndex(kingside_pos)) && kingside_castle; i++)
            {
                kingside_castle = kingside_castle && !isChecked(game,
                    new Move(game.board[index],position,indexToPosition(i),game.board[i],indexToPosition(i)),game.board[index].colour);
            }
            kingside_castle = kingside_castle && !isChecked(game,
                new Move(game.board[index],position,position,new Piece(PIECES.empty,-1),position),game.board[index].colour);
        
            /*let queenside_castle = queen_rock_index != -1 && game.board[queen_rock_index].colour == game.board[index].colour 
                    && game.board[queen_rock_index].type == PIECES.rock && !game.board[queen_rock_index].has_moved;

            for(let i = queen_rock_index + 1; (i < index  )&& queenside_castle;i++)
            {
                queenside_castle = queenside_castle && game.board[i].type == PIECES.empty;
            }
            for(let i = index ; (i >= positionToIndex(queenside_pos)) && queenside_castle; i--)
            {
                queenside_castle = queenside_castle && !isChecked(game,
                    new Move(game.board[index],position,indexToPosition(i),game.board[i],indexToPosition(i)),game.board[index].colour);
            }*/

            if (kingside_castle)
            {
                // moves.push(new Move(game.board[index],position,kingside_pos,new Piece(-1,-1),game.board[king_rock_index]));
                // moves.push(new Move(game.board[king_rock_index],new Position(FILE.fileH, position.rank), new Position(FILE.fileF, position.rank),null,null));
            }
            /*if (queenside_castle)
            {
                moves.push(new Move(game.board[index],position, queenside_pos,new Piece(-1,-2),game.board[king_rock_index]));
                // moves.push(new Move(game.board[queen_rock_index],new Position(FILE.fileA, position.rank), new Position(FILE.fileD, position.rank),null,null));

            }*/
        }
  }
  return moves;
}

function moveDo(move, board, takens) {
  let src_index = positionToIndex(move.src);
  let dest_index = positionToIndex(move.dest);
  if (move.takes.type == PIECES.empty) {
    board[dest_index] = move.piece;
    board[src_index] = new Piece(PIECES.empty, -1);
  } else if (move.takes.type == -1) { //castles
    if(move.takes.colour == -1){ //kingside  
        console.log("Kingside Castle do.");        
        board[src_index] = new Piece(PIECES.empty, - 1);
        board[dest_index] = move.piece;
        board[src_index + 1] = move.takes_position;
        board[src_index + 3] = new Piece(PIECES.empty, -1);
    }
    else {
        console.log("Queenside Castle do.");        
        board[src_index] = new Piece(PIECES.empty, - 1);
        board[dest_index] = move.piece;
        board[src_index - 1] = move.takes_position;
        board[src_index - 4] = new Piece(PIECES.empty, -1);

    }}
     else {
  let taken_index = positionToIndex(move.takes_position);

    takens[board[taken_index].colour].push(board[taken_index]);
    board[taken_index] = new Piece(PIECES.empty, -1);
    board[dest_index] = move.piece;
    board[src_index] = new Piece(PIECES.empty, -1);
  }
}
function moveUndo(move, board, takens) {
  let src_index = positionToIndex(move.src);
  let dest_index = positionToIndex(move.dest);
  if (move.takes.type == PIECES.empty) {
    board[src_index] = move.piece;
    board[dest_index] = new Piece(PIECES.empty, -1);
  } else if (move.takes.type == -1) { //castles
    console.log("Kingside Castle undo.");        
    if(move.takes.colour == -1){ //kingside          
        board[src_index] = move.piece;
        board[dest_index] = new Piece(PIECES.empty ,- 1);
        board[src_index + 1] = new Piece(PIECES.empty ,- 1);
        board[src_index + 3] =move.takes_position;
    }
    else {
        console.log("Queenside Castle undo.");        
        board[src_index] = move.piece;
        board[dest_index] = new Piece(PIECES.empty, - 1);
        board[src_index - 1] = new Piece(PIECES.empty, - 1) ;
        board[src_index - 4] =  move.takes_position;

    }
  } else {
  let taken_index = positionToIndex(move.takes_position);
    board[src_index] = move.piece;
    board[dest_index] = new Piece(PIECES.empty, -1);
    board[taken_index] = move.takes;
    takens[board[taken_index].colour].filter((element) =>
      element.isEqual(board[taken_index])
    );
  }
}

function isChecked(game, move, colour) {
  moveDo(move, game.board, game.takens);
  game.turn ^= 1;
  let king_position = -1;
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (game.board[i].colour == colour && game.board[i].type == PIECES.king) {
      king_position = i;
    }
  }
  if (king_position == -1) return true;
  let result = false;
  for (let i = 0; i < BOARD_SIZE && !result; i++) {
    if (game.board[i].colour != colour) {
      let possible_moves = game.possibleMoves(i, false);
      for (let pmove of possible_moves) {
        if (positionToIndex(pmove.dest) == king_position) {
          result = true;
        }
      }
    }
  }
  game.turn ^= 1;
  moveUndo(move, game.board, game.takens);
  return result;
}

function isCheckmate(game, colour) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (game.board[i].colour == colour) {
      let possible_moves = game.possibleMoves(i, false);
      if (possible_moves.length != 0) return false;
    }
  }
  return true;
}
