
import Square from './Square';
import { BOARD_SIZE, RANK_SIZE } from '../../Model/Macros';
import '../styles/chessboard.css';
import { useRef } from 'react';
import { isInBoard, placePieceTile, restorePieceTile, setPieceTilePosition, squareString } from '../functions/BoardFuncs';



function Board() {
  const board_ref = useRef<HTMLDivElement>(null);
  const tiles = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const rank = 8 - Math.floor(i / RANK_SIZE);
    const file = i % RANK_SIZE;
    tiles.push(< Square key={squareString(rank, file)} name={squareString(rank, file)}
      colour={(file + rank + 1) % 2} index={8 * (rank - 1) + file} />);
  }
  return (
    <div onMouseDown={refBoardMouseDown(board_ref)} onMouseMove={refBoardMouseMove(board_ref)} onMouseUp={refBoardMouseUp(board_ref)}
      onMouseLeave={refBoardMouseLeave(board_ref)}
      ref={board_ref} id="Board">{tiles}</div>
  )
}

let activePiece: HTMLElement | null = null;
function refBoardMouseDown(board_ref: React.RefObject<HTMLDivElement>) {
  return (function (e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("PieceTile")) {
      activePiece = element;
    }
  });
}


function refBoardMouseMove(board_ref: React.RefObject<HTMLDivElement>) {
  return (function (e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("PieceTile")) {
      const board = board_ref.current;
      if (activePiece !== null && board !== null) {
        const x = e.clientX;
        const y = e.clientY;
        setPieceTilePosition(x,y,activePiece,board);
    }
  }});
}



function refBoardMouseUp(board_ref: React.RefObject<HTMLDivElement>) {
  return (function (e: React.MouseEvent) {
    const board = board_ref.current;
    if (activePiece !== null && board !== null) {
      const x = e.clientX;
      const y = e.clientY;
      if (isInBoard(x,y,board))
      {
        placePieceTile(activePiece,x,y,board); 
      }
      else {
        restorePieceTile(activePiece,board);
      } 
    }
    activePiece = null;
  });
}

function  refBoardMouseLeave(board_ref : React.RefObject<HTMLDivElement>){
  return (function (e: React.MouseEvent) {
    const board = board_ref.current;
    if (activePiece !== null && board !== null) {
        restorePieceTile(activePiece,board);
    }
    activePiece = null;
  });
}
     


export default Board
