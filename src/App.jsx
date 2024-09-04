import { useState } from 'react'
import Game from './tictactoe'
import './styles/App.css'
import NavBar from './NavBar.jsx'
import ButtonTests from './TestButtons'
import TestFunction from './TestFunctions'
import Pokedex from './Pokedex'
import D20 from './D20.jsx'
import RandomNameGenerator from './RandomNameGenerator.jsx'
import HomePage from './HomePage.jsx'

export default function App() {
  const [page, setPage] = useState(1); //tried using let var instead, does not trigger UI re-render
  if(page === 1){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <div id="example" className="test">React-Vite</div>
        <NavBar setPage={setPage}/>
        <HomePage/>
      </div>)
  }
  else if(page === 2){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <NavBar setPage={setPage}/>
        <Game/>
      </div>)
  }
  else if(page === 3){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <TestFunction/>
        <NavBar setPage={setPage}/>
      </div>)
  }
  else if(page === 4){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <ButtonTests/>
        <NavBar setPage={setPage}/>
      </div>)
  }
  else if(page === 5){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <Pokedex/>
        <NavBar setPage={setPage}/>
      </div>)
  }
  else if(page === 6){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <D20/>
        <NavBar setPage={setPage}/>
      </div>)
  }
  else if(page === 7){
    return(
      <div id="page">
        <p>You Are On Page: {page}</p>
        <RandomNameGenerator/>
        <NavBar setPage={setPage}/>
      </div>)
  };
};