import { useState } from 'react'
import './styles/Pokedex.css'


export default function Pokedex(){
    
    const searchButtonElement = document.getElementById("search-button");
    const [nameElement, setNameElement] = useState("");
    const [idElement,setIdElement] = useState("");
    const [weightElement,setWeightElement] = useState("");
    const [heightElement,setHeightElement] = useState("");
    //const [typesElement,setTypesElement] = useState("");
    const [hpElement,setHpElement] = useState("");
    const [attackElement,setAttackElement] = useState("");
    const [defenseElement,setDefenseElement] = useState("");
    const [specialAttackElement,setSpecialAttackElement] = useState("");
    const [specialDefenseElement,setSpecialDefenseElement] = useState("");
    const [speedElement,setSpeedElement] = useState("");
    const [picture,setPicture] = useState("");
    let type1Element = document.getElementById('type1');
    let type2Element= document.getElementById('type2');
    //let type1;
    //let type2;

    //event listeners are reading null and not working, changed to JSX element onClick property
    /*inputElement.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        search()
    };
    });
    searchButtonElement.addEventListener("click", ()=> search()); */

async function search() {
    const inputElement = document.getElementById("search-input")
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await response.json();
    //added reverse name detection per cynthia's request
    const foundPokemon = data.results.find((i)=>i.name === inputElement.value.toLowerCase() || i.id === Number(inputElement.value) || i.name === inputElement.value.split('').reverse().join('').toLowerCase());
    if (foundPokemon){
        setNameElement(foundPokemon.name.charAt(0).toUpperCase() + foundPokemon.name.slice(1));
        setIdElement(foundPokemon.id);
        const response2 = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${foundPokemon.name}`);
        const data2 = await response2.json();
        setWeightElement(data2.weight); 
        setHeightElement(data2.height);
        //type logic block
        const type1 = data2.types[0].type.name.toUpperCase(); 
        type1Element.innerText = type1;
        typeColors(type1);
        if(data2.types[1]){ 
        const type2 = data2.types[1].type.name.toUpperCase();
        type2Element.innerText = type2
        typeColors(type2);
        }
        else{
            type2Element.innerText = ""
            type2Element.className= "";
        };
        setHpElement(data2.stats[0].base_stat);
        setAttackElement(data2.stats[1].base_stat);
        setDefenseElement(data2.stats[2].base_stat);
        setSpecialAttackElement(data2.stats[3].base_stat);
        setSpecialDefenseElement(data2.stats[4].base_stat);
        setSpeedElement(data2.stats[5].base_stat);
        setPicture(data2.sprites.front_default);
    }
    else {
        alert("Pokémon not found")
    };
};
 //working here: HTML elements are rendering after JSX resulting in null values
    function typeColors(type) {
        let currentElement;
        if(type === type1Element.innerText){
            currentElement = type1Element;
            classAssigner(currentElement);
        }
        else if(type === type2Element.innerText){ 
            currentElement = type2Element;
            classAssigner(currentElement);
        };
        function classAssigner(currentElement){
            currentElement.className= "";
            currentElement.classList.add("type");
            switch (currentElement.innerText){
            case "NORMAL":
                currentElement.classList.add("normal");
            break;
            case "FIGHTING":
                currentElement.classList.add("fighting");
            break;
            case "FLYING":
                currentElement.classList.add("flying");
            break;
            case "POISON":
                currentElement.classList.add("poison");
            break;
            case "GROUND":
                currentElement.classList.add("ground");
            break;
            case "ROCK":
                currentElement.classList.add("rock");
            break;
            case "BUG":
                currentElement.classList.add("bug");
            break;
            case "GHOST":
                currentElement.classList.add("ghost");
            break;
            case "STEEL":
                currentElement.classList.add("steel");
            break;
            case "FIRE":
                currentElement.classList.add("fire");
            break;
            case "WATER":
                currentElement.classList.add("water");
            break;
            case "GRASS":
                currentElement.classList.add("grass");
            break;
            case "ELECTRIC":
                currentElement.classList.add("electric");
            break;
            case "PSYCHIC":
                currentElement.classList.add("psychic");
            break;
            case "ICE":
                currentElement.classList.add("ice");
            break;
            case "DRAGON":
                currentElement.classList.add("dragon");
            break;
            case "DARK":
                currentElement.classList.add("dark");
            break;
            case "FAIRY":
                currentElement.classList.add("fairy");
            break;
            case "STELLAR":
                currentElement.classList.add("stellar");
            break;
            case "???":
                currentElement.classList.add("unknown");
            break;
            }
        };
    };
    return(
    <main id="pokedex">
      <div id="search-container">
        <input id="search-input" placeholder="insert PKMN name or ID" required></input>
        <button id="search-button" onClick={search}>Search</button>
      </div>
      <div id="readout">
        <img src={picture} id="sprite"/>
        <div className="item"><span>Name:</span> <span className="attributes" id="pokemon-name">{nameElement}</span></div>
        <div className="item"><span>ID: </span><span className="attributes" id="pokemon-id">{idElement}</span></div>
        <div className="item"><span>Weight: </span><span className="attributes" id="weight">{weightElement}</span></div>
        <div className="item"><span>Height: </span><span className="attributes" id="height">{heightElement}</span></div>
        <div className="item"><span>Types: </span>
          <span className="attributes" id="types">
            <span id="type1"></span>
            <span id="type2"></span>
          </span>
        </div>
        <div className="item"><span>HP: </span><span className="attributes" id="hp">{hpElement}</span></div>
        <div className="item"><span>Attack: </span><span className="attributes" id="attack">{attackElement}</span></div>
        <div className="item"><span>Defense: </span><span className="attributes" id="defense">{defenseElement}</span></div>
        <div className="item"><span>SA: </span><span className="attributes" id="special-attack">{specialAttackElement}</span></div>
        <div className="item"><span>SD: </span><span className="attributes" id="special-defense">{specialDefenseElement}</span></div>
        <div className="item"><span>Speed: </span><span className="attributes" id="speed">{speedElement}</span></div>
      </div>
    </main>
    )
};