
import Square from './Square';
import { BOARD_SIZE,RANK_SIZE } from '../../Model/Macros';
import '../styles/chessboard.css';



function Board() {
    const tiles = [];
    for(let i =  0 ; i < BOARD_SIZE; i++)
    {
      const rank = 8-  Math.floor(i/RANK_SIZE);
      const file = i % RANK_SIZE;
      tiles.push(< Square key = {squareString(rank,file)} colour = {(file + rank + 1 ) % 2} index = {8*(rank-1) + file} />);
    }
  return (
    <div id="Board">{tiles}</div>
  )
}

function squareString(rank : number,file : number){
  const code = 'A'.charCodeAt(0);
  return String.fromCharCode(code + file) + rank.toString(); 
}

export default Board
