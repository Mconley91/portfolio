export default function NavBar({setPage}){
    return(
        <div id="navBar">
          <h1>Navbar</h1>
          <button className="navBtn" onClick={()=>{setPage(1)}}>Home</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(2)}}>Tic-Tac-Toe</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(3)}}>test page</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(4)}}>Button Tester</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(5)}}>Pokedex</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(6)}}>D20</button>
          <hr/>
          <button className="navBtn" onClick={()=>{setPage(7)}}>Random Name Generator</button>
        </div>
    )
};