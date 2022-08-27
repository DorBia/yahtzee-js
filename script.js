const dices = document.querySelectorAll(".game__dices img")


let rolledDices = [];

const rollDice = (dice) => {
    const rollNumber = Math.floor(Math.random() * 6) + 1;
    
    switch (rollNumber) {
        case 1:
            dice.src = "./images/dice-1.svg";
            break;
        case 2:
            dice.src = "./images/dice-2.svg";
            break;
        case 3:
            dice.src = "./images/dice-3.svg";
            break;
        case 4:
            dice.src = "./images/dice-4.svg";
            break;
        case 5:
            dice.src = "./images/dice-5.svg";
            break;
        case 6:
            dice.src = "./images/dice-6.svg";
            break;
    }

    return rollNumber;
}

const rollAllDices = () => {
    dices.forEach(dice => {
        if (dice.classList != "locked") {
            const rolledNumber = rollDice(dice);
            rolledDices.push(rolledNumber);
            console.log(rolledDices)
        }
    });
}


dices.forEach(dice => {
    dice.addEventListener("click", e => {
        e.target.classList.toggle("locked");
    })
})

window.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        rollAllDices()
    }
})

