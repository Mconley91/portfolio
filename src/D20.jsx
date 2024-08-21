import './styles/D20.css'

export default function D20(){
    function roll() {
        let element = document.getElementById("dice");
        let diceAudio = new Audio("src/assets/sounds/sfx_generate_random_world.wav");
        diceAudio.volume=0.25;
        diceAudio.play();
        let intervalId = setInterval(rolling,65);
        setTimeout(()=>{clearInterval(intervalId)},400);
        setTimeout(()=>{
            let result = Math.floor(Math.random() * 20) + 1;
            document.getElementById('dice').src = "src/assets/dice/dice" + result + ".png";
            element.classList.remove("shaker");
            document.getElementById("roll-output").innerHTML += "Rolled " + result + "\n";
            document.getElementById("roll-output").scrollTo(0,50000);
            sessionStorage.setItem("diceOutput", document.getElementById("roll-output").innerHTML);
            if (result === 20) {
                element.classList.add("green");
            };
            if (result === 1) {
                element.classList.add("red"); 
            }
            if (result != 20 && result != 1) {
                element.classList.remove("green");
                element.classList.remove("red");
            }
        }, 400);
    };
    function rolling() {
        let rolling = Math.floor(Math.random() * 20) + 1;
        document.getElementById('dice').src = "src/assets/dice/dice" + rolling + ".png";
        let element = document.getElementById("dice");
        element.classList.add("shaker");
        return rolling;
    };
    function resetDice () {
        document.getElementById("roll-output").innerHTML = "";
        sessionStorage.setItem("diceOutput", document.getElementById("roll-output").innerHTML);
    }
    //code reads null
    /*document.getElementById("roll-output").innerHTML = sessionStorage.getItem("diceOutput");
    document.getElementById("roll-output").scrollTo(0,50000);*/
    
    return(
        <div id='dice-container'>
            <img src="src/assets/dice/dice20.png" alt="picture" id="dice" onClick={roll}/>
                <textarea id="roll-output" rows="6" cols="10" readOnly={true}></textarea>
                <button id="reset-dice" onClick={resetDice}>Reset</button>
        </div>
    );
};