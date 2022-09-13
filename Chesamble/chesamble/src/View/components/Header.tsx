
interface Props{
    subtitle : string;
}

const Header = (props:Props ) =>{
    return (
        <header>
            <h1> Chess and Gamble</h1>
            <h1 style = {{color: 'yellow', backgroundColor : 'black'}}>Wassup {props.subtitle}</h1>
        </header>
    );
}


// const headingSytle={
//     color: 'yellow',
//     backgroundColor : 'black'
// }

export default Header;