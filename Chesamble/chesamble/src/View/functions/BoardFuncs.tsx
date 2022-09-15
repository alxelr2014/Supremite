import { ControllerMakeMove } from "../../Controller/MainController";
import { BasicMove, CaptureMove, CastleMove, Move, PromoteMove } from "../../Model/Move";

export function squareString(rank: number, file: number) {
    const code = 'A'.charCodeAt(0);
    return String.fromCharCode(code + file) + rank.toString();
}


export function getSquareElement(rank: number, file: number, board: HTMLDivElement): HTMLElement | null {
    const string_key = squareString(rank, file);
    const children = board.children;
    for(let child of Array.from(children)){
        if (child.getAttribute('data-name') === string_key)
        {
            if (!(child instanceof HTMLElement)) {
                return null;
            }
            else
            {
                return child;
            }
        }   
    }
    return null;
}

export function isInBoard(x : number , y : number , board: HTMLDivElement){
    const min_x = board.offsetLeft;
    const min_y = board.offsetTop;
    const max_x = board.offsetLeft + board.clientWidth;
    const max_y = board.offsetTop + board.clientHeight;
    return (x <= max_x) && (x >= min_x) && (y <= max_y) && (y >= min_y);
}

export function setPieceTilePosition(x: number, y: number, pieceTileElement: HTMLElement, board: HTMLDivElement, center:boolean = true) {
    const min_x = board.offsetLeft;
    const min_y = board.offsetTop;
    const max_x = board.offsetLeft + board.clientWidth;
    const max_y = board.offsetTop + board.clientHeight;
  
    const piece_half_width = (center) ? Math.floor(pieceTileElement.offsetWidth / 2) : 0;
    const piece_half_height = (center) ? Math.floor(pieceTileElement.offsetHeight / 2) : 0;
  
    pieceTileElement.style.position = "absolute";
  
    if (x < min_x) {
      pieceTileElement.style.left = `${min_x - piece_half_width}px`;
    }
    else if (x > max_x) {
      pieceTileElement.style.left = `${max_x - piece_half_width}px`;
    }
    else {
      pieceTileElement.style.left = `${x - piece_half_width}px`;
    }
    if (y < min_y) {
      pieceTileElement.style.top = `${min_y - piece_half_height}px`;
    }
    else if (y > max_y) {
      pieceTileElement.style.top = `${max_y - piece_half_height}px`;
    }
    else {
      pieceTileElement.style.top = `${y - piece_half_height}px`;
    }
  }
  

export function placePieceTile(pieceTileElement : HTMLElement, x : number , y : number, board : HTMLDivElement ){
    const min_x = board.offsetLeft;
    const min_y = board.offsetTop;
    const square_size = 60;

    const file = Math.floor((x - min_x) / square_size);
    const rank =  8 -Math.floor((y - min_y) / square_size);

    const old_square_element = pieceTileElement?.parentElement;
    const new_square_element = getSquareElement(rank, file, board);


    if (pieceTileElement != undefined && old_square_element != undefined && new_square_element != undefined) {
       GUIMovePieceTile(pieceTileElement,old_square_element,new_square_element,board);
    }
    else if(pieceTileElement != undefined){
        restorePieceTile(pieceTileElement,board);
    }

}

export function restorePieceTile(pieceTileElement : HTMLElement, board : HTMLDivElement ){
    const old_square_element = pieceTileElement.parentElement;
      if(pieceTileElement  != undefined && old_square_element != undefined){
        setPieceTilePosition(old_square_element.offsetLeft, old_square_element.offsetTop,pieceTileElement,board,false);
      }
}

export function GUIMovePieceTile(pieceTileElement: HTMLElement, oldSquareElement: HTMLElement, newSquareElement: HTMLElement,
    board: HTMLDivElement) {

    const min_x = board.offsetLeft;
    const min_y = board.offsetTop;
    const square_size = 60;
    const old_rank = 8 - Math.floor((oldSquareElement.offsetTop - min_y) / square_size);
    const old_file = Math.floor((oldSquareElement.offsetLeft - min_x) / square_size);
    const new_rank = 8 - Math.floor((newSquareElement.offsetTop - min_y) / square_size);
    const new_file = Math.floor((newSquareElement.offsetLeft - min_x) / square_size);

    const move = ControllerMakeMove( new_rank - 1, new_file, old_rank - 1, old_file);

    if (move !== null) {
        GUIMakeMove(move,board);
    }
    restorePieceTile(pieceTileElement,board);
}

export function getSquarePieceTile(square: HTMLElement): HTMLElement | null {
    for (let child of Array.from(square.children)) {
        if (child.className === 'PieceTile') {
            if (!(child instanceof HTMLElement)) {
                return null;
            }
            else {
                return child;
            }
        }
    }
    return null;
}

export function GUIMakeMove(move : Move, board : HTMLDivElement)
{
    const src_square = getSquareElement(move.src.rank + 1,move.src.file,board);
    const dest_square = getSquareElement(move.dest.rank + 1,move.dest.file,board);
    if(src_square === null || dest_square === null) return;
    const piece_tile = getSquarePieceTile(src_square);
    if(piece_tile === null) return;
    if (move instanceof BasicMove) {
        src_square.removeChild(piece_tile);
        dest_square.appendChild(piece_tile);
    }
    else if (move instanceof CaptureMove) {
        const taken_square = getSquareElement(move.taken_position.rank + 1,move.taken_position.file,board);
        if(taken_square === null) return;
        const taken_tile = getSquarePieceTile(taken_square);
        if(taken_tile === null) return;
        taken_square.removeChild(taken_tile);
        src_square.removeChild(piece_tile);
        dest_square.appendChild(piece_tile);
    }
    else if (move instanceof CastleMove) {
        const rock_src_square = getSquareElement(move.rock_src.rank + 1,move.rock_src.file,board);
        const rock_dest_square = getSquareElement(move.rock_dest.rank + 1,move.rock_dest.file,board);
        if(rock_dest_square === null || rock_src_square === null) return;
        const rock_piece = getSquarePieceTile(rock_src_square);
        if(rock_piece === null) return;

        rock_src_square.removeChild(rock_piece);
        rock_dest_square.appendChild(rock_piece);
        restorePieceTile(rock_piece,board);

        src_square.removeChild(piece_tile);
        dest_square.appendChild(piece_tile);
    }
    else if (move instanceof PromoteMove) {

    }
    else {
        console.log("Move's instance is not recognized!");
    }
}

  

