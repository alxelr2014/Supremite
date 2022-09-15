import { Position } from "../Model/Position";
import { Game } from "../Model/Game";
import { BasicMove, Move } from "../Model/Move";

export function ControllerMakeMove(newRank : number, newFile: number, oldRank: number , oldFile: number) : Move | null{
    const src = new Position(oldFile,oldRank);
    const dest = new Position(newFile, newRank);


    const index = 8*oldRank + oldFile;
    const game = Game.getInstance();
    const piece = game.board[index];
    const move = new Move(piece,src,dest);
    const possile_moves = game.possibleMoves(index,true);
    for(let possible_move of possile_moves){
        if(move.isEqual(possible_move)){
            game.makeMove(possible_move);
            console.log("Move: ", possible_move, " is done.");
            return possible_move;
        }
    }
    return null;
}