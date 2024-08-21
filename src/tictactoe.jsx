import {useState} from 'react'

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    const winner = calculateWinner(currentSquares);
    let isListInverted = false;
    let status;
    let description;

    const [columnRowArr, setColumnRowArr] = useState([]);
    const [clickedSquare, setClickedSquare] = useState(null);
    const [cycle, setCycle] = useState(0);


    const coords = columnRowArr.map((item,index)=>{
        return <div key={index}>{'COLUMN: '+item[0]}<br/>{'ROW: '+item[1]}</div>
    });
    const moves = history.map((squares, move)=>{
        if(move > 0){
            description = <div id={'jump'+ move}>Jump to move # {move}{coords[move-1]}</div>; 
        }
        else {
            description = "Go to game start";
        };
        return(<li key={'jump'+move}><button onClick={()=>jumpTo(move)}>{description}</button></li>)
    });

    if(clickedSquare != null && cycle < currentMove){
        let column;
        let row;
            for(let i = 0, j = 1, k = 2; i < 7; i+=3,j+=3,k+=3){
                if (clickedSquare < 3){
                    row = 1;
                    if(clickedSquare == i){
                        column = 1;
                        break;
                    }
                    else if(clickedSquare == j){
                        column = 2;
                        break;
                    }
                    else if(clickedSquare == k) {
                        column = 3;
                        break;
                    };
                }
                else if (clickedSquare < 6){
                    row = 2;
                    if(clickedSquare == i){
                        column = 1;
                        break;
                    }
                    else if(clickedSquare == j){
                        column = 2;
                        break;
                    }
                    else if(clickedSquare == k) {
                        column = 3;
                        break;
                    };
                }
                else if(clickedSquare < 9) {
                    row = 3;
                    if(clickedSquare == i){
                        column = 1;
                        break;
                    }
                    else if(clickedSquare == j){
                        column = 2;
                        break;
                    }
                    else if(clickedSquare == k) {
                        column = 3;
                        break;
                    };
                };
            }
            if(columnRowArr){
                setColumnRowArr([...columnRowArr.slice(),[column,row]]);
                setCycle(cycle + 1);
            };
};

    if(winner) {
        status = (winner[0] % 2 === 0 ? 'X' : 'O') + " has won the match!";
        for(let i = 0; i < 3; i++){
            document.getElementById('square' + winner[i]).classList.add("highlight-winning-square");
        };
    }
    else {
        status = "It is now " + (xIsNext ? "X" : "O") + "'s turn.";
        if (currentSquares.every((ele)=>ele != null)){
             status = "Cat's Game";
        }
    };
    
    
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory); //spread operator unpacks arrays into individual elements
        setCurrentMove(nextHistory.length - 1);
    };

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        for(let i = 0; i < 9; i++){
            document.getElementById('square' + i).classList.remove("highlight-winning-square");
        };
    };
    function invertList(){
        if(!isListInverted){
            isListInverted = true;
            document.getElementById("move-list").classList.remove("unInvertList");
            document.getElementById("move-list").classList.add("invertList");
        }
        else{
            isListInverted = false;
            document.getElementById("move-list").classList.add("unInvertList");
            document.getElementById("move-list").classList.remove("invertList");
        }
    };
    return(
        <div className="game">
            <div className="status">{status}</div>
            <div><button>You are at move #{currentMove}</button></div>
            <Board setClickedSquare={setClickedSquare} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            <div id="game-info">
            <button id="invertBtn" onClick={invertList} className="unInvertList">Invert List</button>
                <ul id="move-list">
                    {moves}
                </ul>
            </div>
        </div>
    )
};
function Board({xIsNext,squares,onPlay,setClickedSquare}) { //props MUST be passed to child components as a single object parameter
    function handleClick(i){
        setClickedSquare(i);
        if(squares[i] || calculateWinner(squares)){
            return;
        };
        const nextSquares = squares.slice();
        
        if(xIsNext){
            nextSquares[i] = 'X';
        }
        else{
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares); 
    };
    //avoid infinite loops on react components by nesting function calls inside of uncalled functions!
    //dumb dynamically written JSX
    let rows = [];
    let tempContainer = [];
    let indexer = 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let jawa = indexer;
            tempContainer.push(<button className="square" id={'square' + indexer} key={'square' + indexer} value={squares[indexer]} onClick={()=>{handleClick(jawa)}}>{squares[indexer]}</button>)
            if(indexer < 8){
                indexer++;
            }
        };
        rows.push(<div id={'row' + i} key={'row' + i} className="board-row">{tempContainer}</div>);
        tempContainer = [];
    };
    return (
    <>
        <ColumnRowNumbers/>
        <div className="game-board">
            {rows}
        </div>
    </>
    )
  };
function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
            return lines[i];
          }
          //an else return here would break the loop
      }
      return null
};

function RowCol(row,column){
    return (<div>(Row:{row}/Column:{column})</div>)
}

function ColumnRowNumbers(){
    return(<>
        <div id="rowNumbers">
            <p className="number">1</p>
            <p className="number">2</p>
            <p className="number">3</p>
        </div>
        <div id="columnNumbers">
            <p className="number">1</p>
            <p className="number">2</p>
            <p className="number">3</p>
        </div>
    </>)
}