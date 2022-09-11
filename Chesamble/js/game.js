class Game {
  board;
  moves;
  turn;
  takens;
  static static_game;
  constructor() {}
  static getInstance() {
    if (this.static_game == null) {
      this.static_game = new Game();
      this.static_game.reset();
      return this.static_game;
    }
    return this.static_game;
  }

  reset() {
    this.board = new Array();
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.board.push(new Piece(PIECES.empty, -1));
    }
    this.initGameBoard();
    this.moves = new Array();
    this.takens = [new Array(), new Array()];
    this.turn = COLOUR.white;
  }
  initGameBoard() {
    this.board[positionToIndex(new Position(FILE.fileA, RANK.rank1))] =
      new Piece(PIECES.rock, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileB, RANK.rank1))] =
      new Piece(PIECES.knight, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileC, RANK.rank1))] =
      new Piece(PIECES.bishop, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileD, RANK.rank1))] =
      new Piece(PIECES.queen, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileE, RANK.rank1))] =
      new Piece(PIECES.king, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileF, RANK.rank1))] =
      new Piece(PIECES.bishop, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileG, RANK.rank1))] =
      new Piece(PIECES.knight, COLOUR.white);
    this.board[positionToIndex(new Position(FILE.fileH, RANK.rank1))] =
      new Piece(PIECES.rock, COLOUR.white);
    for (let i = FILE.fileA; i <= FILE.fileH; i++) {
      this.board[positionToIndex(new Position(i, RANK.rank2))] = new Piece(
        PIECES.pawn,
        COLOUR.white
      );
    }

    for (let i = FILE.fileA; i <= FILE.fileH; i++) {
      this.board[positionToIndex(new Position(i, RANK.rank7))] = new Piece(
        PIECES.pawn,
        COLOUR.black
      );
    }
    this.board[positionToIndex(new Position(FILE.fileA, RANK.rank8))] =
      new Piece(PIECES.rock, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileB, RANK.rank8))] =
      new Piece(PIECES.knight, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileC, RANK.rank8))] =
      new Piece(PIECES.bishop, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileD, RANK.rank8))] =
      new Piece(PIECES.queen, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileE, RANK.rank8))] =
      new Piece(PIECES.king, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileF, RANK.rank8))] =
      new Piece(PIECES.bishop, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileG, RANK.rank8))] =
      new Piece(PIECES.knight, COLOUR.black);
    this.board[positionToIndex(new Position(FILE.fileH, RANK.rank8))] =
      new Piece(PIECES.rock, COLOUR.black);
  }

  testGameBoard() {
    this.board[positionToIndex(new Position(FILE.fileD, RANK.rank4))] =
      new Piece(PIECES.king, COLOUR.white);
  }
  

  possibleMoves(index,check_filter) {
    let next_moves = new Array();
    if (this.board[index].colour == this.turn) {
      if (this.board[index].type == PIECES.pawn) {
        next_moves = pawnMoves(this, index);
      } else if (this.board[index].type == PIECES.knight) {
        next_moves = knightMoves(this, index);
      } else if (this.board[index].type == PIECES.bishop) {
        next_moves = bishopMoves(this, index);
      } else if (this.board[index].type == PIECES.rock) {
        next_moves = rockMoves(this, index);
      } else if (this.board[index].type == PIECES.queen) {
        next_moves = queenMoves(this, index);
      } else if (this.board[index].type == PIECES.king) {
        next_moves = kingMoves(this, index);
      }
      if(check_filter)
        next_moves = next_moves.filter((element) => !isChecked(this, element,this.board[index].colour));
    }
    return next_moves;
  }


  makeMove(move) {
    let piece_index = positionToIndex(move.src);
    let possible_moves = this.possibleMoves(piece_index,true);
    possible_moves = possible_moves.filter(function (value) {
      return value.isEqual(move);
    });
    if (possible_moves.length == 1) {
      this.moveProcessing(move);
      this.moves.push(move);
      this.turn ^= 1;
    }
  }

  moveProcessing(move){
    moveDo(move,this.board,this.takens);
  }
}
