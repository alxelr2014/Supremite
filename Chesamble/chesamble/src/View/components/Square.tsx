import PieceTile  from './PieceTile';
import { Game } from '../../Model/Game';
import { PIECES } from '../../Model/Macros';

interface Props{
  index: number;
  colour: number;
}


function Square(props :Props) {
  const game = Game.getInstance();
  const piece = game.board[props.index];
  const className = "Square " + ((props.colour) ? "light" : "dark");
  return (
    <div className= {className} >
       {(piece.type !== PIECES.empty) && <PieceTile piece={piece}/>} 
    </div>
  )
}
export default Square