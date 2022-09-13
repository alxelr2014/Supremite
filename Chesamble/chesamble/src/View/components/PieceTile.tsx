import '../styles/chessboard.css';
import { Piece } from '../../Model/Piece';
import { getFileName } from '../../Model/HelperFunctions';

interface Props{
    piece : Piece;
}

function PieceTile(props : Props) {
    const piece_char = getFileName(props.piece);
  return (
    <div className='PieceTile'> 
    <div className = {'PieceTile ' + piece_char}/>
     </div>
  )
}

export default PieceTile
