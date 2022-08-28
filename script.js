const dices = document.querySelectorAll(".game__dices img")
const checkboxes = document.querySelectorAll(".check")

let rolledDices = [];
let rollsLeft = 3;
let sum = 0;


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

const checkDices = () => {
    rolledDices = [];
    dices.forEach(dice => {
        if (dice.src.includes("dice-1")){
            rolledDices.push(1);
        } else if (dice.src.includes("dice-2")){
            rolledDices.push(2);
        } else if (dice.src.includes("dice-3")){
            rolledDices.push(3);
        } else if (dice.src.includes("dice-4")){
            rolledDices.push(4);
        } else if (dice.src.includes("dice-5")) {
            rolledDices.push(5);
        } else if (dice.src.includes("dice-6")) {
            rolledDices.push(6);
        }

    });
}

const rollAllDices = () => {
    dices.forEach(dice => {
        if (dice.classList != "locked" && rollsLeft > 0) {
            rollDice(dice);
        }
    });
    rollsLeft--;
}


dices.forEach(dice => {
    // console.log(dice)
    dice.addEventListener("click", e => {
        e.target.classList.toggle("locked");
    })
})

window.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        rollAllDices()
    }
})

const checkSum = (number) => {
    checkDices();
    rolledDices.forEach(dice => {
        if(dice === number) {
            sum += dice;
        }
    })
}

const countInArray = (value) => {
    return rolledDices.reduce((a, b) => a + (b === value), 0);
  }

const checkAKind = (number) => {
    checkDices()
    rolledDices.forEach(dice => {
        console.log(countInArray(rolledDices, dice));
        if (countInArray(dice) >= number){
            sum = rolledDices.reduce((a, b) => a + b);
        };
    })
}

const checkYahtzee = () => {
    checkDices();
    if (countInArray(rolledDices[0]) == 5){
        sum = 50;
    }
}

const checkLargeStraight = () => {
    checkDices();
    arr = [1,2,3,4,5]
    arr2 = [2,3,4,5,6]
    if(arr.every(dice => rolledDices.includes(dice)) || arr2.every(dice => rolledDices.includes(dice))){
        sum = 40;
    }
}

const checkSmallStraight = () => {
    checkDices();
    arr = [1,2,3,4]
    arr2 = [2,3,4,5]
    arr3 = [3,4,5,6]

    if(arr.every(dice => rolledDices.includes(dice)) || arr2.every(dice => rolledDices.includes(dice)) || arr3.every(dice => rolledDices.includes(dice))){
        sum = 30;
    }
}


checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", e => {
        sum = 0;
        switch(e.target.value){
            case "aces":
                checkSum(1)
                break;
            case "twos":
                checkSum(2)
                break;
            case "threes":
                checkSum(3)
                break;
            case "fours":
                checkSum(4)
                break;
            case "fives":
                checkSum(5)
                break;
            case "sixes":
                checkSum(6)
                break;
            case "threeAKind":
                checkAKind(3);
                break;
            case "fourAKind":
                checkAKind(4);
                break;
            case "smStraight":
                checkSmallStraight();
                break;
            case "lgStraight":
                checkLargeStraight();
                break;
            case "yahtzee":
                checkYahtzee();
                break;
                
        }
        e.target.parentNode.parentNode.lastElementChild.textContent = sum;
    });
})