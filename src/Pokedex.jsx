import './styles/Pokedex.css'

export default function Pokedex(){
    const inputElement = document.getElementById("search-input");
    const searchButtonElement = document.getElementById("search-button");
    const nameElement = document.getElementById("pokemon-name");
    const idElement = document.getElementById("pokemon-id");
    const weightElement = document.getElementById("weight");
    const heightElement = document.getElementById("height");
    const typesElement = document.getElementById("types");
    const type1Element = document.getElementById("type1");
    const type2Element = document.getElementById("type2");
    const hpElement = document.getElementById("hp");
    const attackElement = document.getElementById("attack");
    const defenseElement = document.getElementById("defense");
    const specialAttackElement = document.getElementById("special-attack");
    const specialDefenseElement = document.getElementById("special-defense");
    const speedElement = document.getElementById("speed");
    const picture = document.getElementById("sprite");
    let type1Value;
    let type2Value;

    //event listeners are reading null and not working, changed to JSX element onClick property
    /*inputElement.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        search()
    };
    });
    searchButtonElement.addEventListener("click", ()=> search()); */

    const search = async function() {
    nameElement.innerText = "";
    idElement.innerText = "";
    weightElement.innerText = ""; 
    heightElement.innerText = "";
    type1Element.innerText = "";
    type1Element.className = "";
    type2Element.innerText = "";
    type2Element.className = "";
    hpElement.innerText = "";
    attackElement.innerText = "";
    defenseElement.innerText = "";
    specialAttackElement.innerText = "";
    specialDefenseElement.innerText = "";
    speedElement.innerText = "";
    picture.src = "";
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await response.json();
    //added reverse name detection per cynthia's request
    const foundPokemon = data.results.find((i)=>i.name === inputElement.value.toLowerCase() || i.id === Number(inputElement.value) || i.name === inputElement.value.split('').reverse().join('').toLowerCase());
    if (foundPokemon){
        nameElement.innerText = foundPokemon.name.charAt(0).toUpperCase()+ foundPokemon.name.slice(1);
        idElement.innerText = foundPokemon.id;
        const response2 = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${foundPokemon.name}`);
        const data2 = await response2.json();
        weightElement.innerText = data2.weight; 
        heightElement.innerText = data2.height;
        //type logic block
        type1Value = data2.types[0].type.name.toUpperCase();
        type1Element.innerText = type1Value;
        typeColors(type1Element);
        if(data2.types[1]){
        type2Value = data2.types[1].type.name.toUpperCase();
        type2Element.innerText = type2Value;
        typeColors(type2Element);
        };
        //
        hpElement.innerText = data2.stats[0].base_stat;
        attackElement.innerText = data2.stats[1].base_stat;
        defenseElement.innerText = data2.stats[2].base_stat;
        specialAttackElement.innerText = data2.stats[3].base_stat;
        specialDefenseElement.innerText = data2.stats[4].base_stat;
        speedElement.innerText = data2.stats[5].base_stat;
        picture.src = data2.sprites.front_default;
    }
    else {
        alert("Pokémon not found")
    };
    };

    const typeColors = (element)=>{
        let type;
        if(element === type1Element){
        type = type1Value;
        }
        else{
        type = type2Value;
        };
        element.classList.add("type");
        switch (type){
        case "NORMAL":
            element.classList.add("normal");
        break;
        case "FIGHTING":
            element.classList.add("fighting");
        break;
        case "FLYING":
            element.classList.add("flying");
        break;
        case "POISON":
            element.classList.add("poison");
        break;
        case "GROUND":
            element.classList.add("ground");
        break;
        case "ROCK":
            element.classList.add("rock");
        break;
        case "BUG":
            element.classList.add("bug");
        break;
        case "GHOST":
            element.classList.add("ghost");
        break;
        case "STEEL":
            element.classList.add("steel");
        break;
        case "FIRE":
            element.classList.add("fire");
        break;
        case "WATER":
            element.classList.add("water");
        break;
        case "GRASS":
            element.classList.add("grass");
        break;
        case "ELECTRIC":
            element.classList.add("electric");
        break;
        case "PSYCHIC":
            element.classList.add("psychic");
        break;
        case "ICE":
            element.classList.add("ice");
        break;
        case "DRAGON":
            element.classList.add("dragon");
        break;
        case "DARK":
            element.classList.add("dark");
        break;
        case "FAIRY":
            element.classList.add("fairy");
        break;
        case "STELLAR":
            element.classList.add("stellar");
        break;
        case "???":
            element.classList.add("unknown");
        break;
        }
    };
    return(
    <main id="pokedex">
      <div id="search-container">
        <input id="search-input" placeholder="insert PKMN name or ID" required></input>
        <button id="search-button" onClick={search}>Search</button>
      </div>
      <div id="readout">
        <img src="" id="sprite"/>
        <div className="item"><span>Name:</span> <span className="attributes" id="pokemon-name"></span></div>
        <div className="item"><span>ID: </span><span className="attributes" id="pokemon-id"></span></div>
        <div className="item"><span>Weight: </span><span className="attributes" id="weight"></span></div>
        <div className="item"><span>Height: </span><span className="attributes" id="height"></span></div>
        <div className="item"><span>Types: </span>
          <span className="attributes" id="types">
            <span id="type1"></span>
            <span id="type2"></span>
          </span>
        </div>
        <div className="item"><span>HP: </span><span className="attributes" id="hp"></span></div>
        <div className="item"><span>Attack: </span><span className="attributes" id="attack"></span></div>
        <div className="item"><span>Defense: </span><span className="attributes" id="defense"></span></div>
        <div className="item"><span>SA: </span><span className="attributes" id="special-attack"></span></div>
        <div className="item"><span>SD: </span><span className="attributes" id="special-defense"></span></div>
        <div className="item"><span>Speed: </span><span className="attributes" id="speed"></span></div>
      </div>
    </main>
    )
}