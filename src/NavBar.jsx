export default function NavBar({setPage}){
    return(
        <div id="navBar">
          <h1>Navbar</h1>
          <h3>W.I.P.</h3>
          <button className="navBtn" onClick={()=>{setPage(1)}}>Tic-Tac-Toe</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(2)}}>test page</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(3)}}>Button Tester</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(4)}}>Pokedex</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(5)}}>D20</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(6)}}>Random Name Generator</button>
        </div>
    )
};