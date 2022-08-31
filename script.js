const dice = document.querySelectorAll(".game__dice img")
const checkboxes = document.querySelectorAll(".check")
const pointsUpper = document.querySelectorAll(".upper-section-points")
const choicesTotalUpper = document.querySelector(".upper-section-total")
const upperBonus = document.querySelector(".upper-section-bonus")
const pointsLower = document.querySelectorAll(".lower-section-points")
const choicesTotalLower = document.querySelector(".lower-section-total")


/* ------- VARIABLES ------ */

let rolledDice = [];
let rollsLeft = 3;
let sum = 0;
let round = 1;

/* --- everything related to dice rolling and returning them to the array --- */

const rollDie = (die) => {
    const rollNumber = Math.floor(Math.random() * 6) + 1;
    
    switch (rollNumber) {
        case 1:
            die.src = "./images/die-1.png";
            break;
        case 2:
            die.src = "./images/die-2.png";
            break;
        case 3:
            die.src = "./images/die-3.png";
            break;
        case 4:
            die.src = "./images/die-4.png";
            break;
        case 5:
            die.src = "./images/die-5.png";
            break;
        case 6:
            die.src = "./images/die-6.png";
            break;
    }
    return rollNumber;
}

const rollDice = () => {
    dice.forEach(die => {
        if (die.classList != "locked" && rollsLeft > 0) {
            rollDie(die);
            die.classList.add("shaking");
            setTimeout(() => {die.classList.remove("shaking")},200)
        }
    });
    if (rollsLeft > 0){
        rollsLeft--;
    }
    document.querySelector(".game__rolls-left").innerHTML = `Rolls left: ${rollsLeft}`
}

const checkDiceValues = () => {
    rolledDice = [];
    dice.forEach(die => {
        if (die.src.includes("die-1")){
            rolledDice.push(1);
        } else if (die.src.includes("die-2")){
            rolledDice.push(2);
        } else if (die.src.includes("die-3")){
            rolledDice.push(3);
        } else if (die.src.includes("die-4")){
            rolledDice.push(4);
        } else if (die.src.includes("die-5")) {
            rolledDice.push(5);
        } else if (die.src.includes("die-6")) {
            rolledDice.push(6);
        }
    });
}

dice.forEach(die => {
    die.addEventListener("click", e => {
        e.target.classList.toggle("locked");
    })
})

/* --- everything related to the scoring choices --- */
// sum up aces - sixes
const checkSum = (number) => {
    rolledDice.forEach(die => {
        if(die === number) {
            sum += die;
        }
    })
}

// return a value of the same die for checking the same kind, full house and yahtzee
const checkAmountOfTheSameValue = (value) => {
    return rolledDice.reduce((a, b) => a + (b === value), 0);
}

// sum all dice if at least 3/4 are the same
const checkAKind = (number) => {
    rolledDice.forEach(die => {
        if (checkAmountOfTheSameValue(die) >= number){
            sum = rolledDice.reduce((a, b) => a + b);
        };
    })
}

// sum = 25 if 3 dice have one value and 2 dice have second value
const checkFull = () => {
    let same = [];
    rolledDice.forEach(die => same.push(checkAmountOfTheSameValue(die)));
    if (same.includes(2) && same.includes(3)){
        sum = 25;
    }
}

// sum = 30 if at least 4 dice in sequence
const checkSmallStraight = () => {
    arr = [1,2,3,4]
    arr2 = [2,3,4,5]
    arr3 = [3,4,5,6]

    if(arr.every(die => rolledDice.includes(die)) 
        || arr2.every(die => rolledDice.includes(die)) 
        || arr3.every(die => rolledDice.includes(die))){
        sum = 30;
    }
}

// sum = 40 if all dice in sequence
const checkLargeStraight = () => {
    arr = [1,2,3,4,5]
    arr2 = [2,3,4,5,6]
    if(arr.every(die => rolledDice.includes(die)) 
        || arr2.every(die => rolledDice.includes(die))){
        sum = 40;
    }
}

// sum = 50 when all dice the same
const checkYahtzee = () => {
    if (checkAmountOfTheSameValue(rolledDice[0]) == 5){
        sum = 50;
    }
}

// sum all dice
const checkChance = () => {
    sum = rolledDice.reduce((a, b) => a + b);
}

// check if the game has ended
const checkEnd = () => {
    let end = false;
    if (round === 13){
        document.querySelector(".pop-up__score").innerHTML = `Your score was: ${document.querySelector(".grand-score").textContent}`;
        document.querySelector(".pop-up-container").style.display = "block";
        end = true;
    }
    return end;
}

// logic for what happens when checkbox is checked



checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", e => {
        sum = 0;
        checkDiceValues();
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
            case "fullHouse":
                checkFull();
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
            case "chance":
                checkChance();
                break; 
        }
        const td = e.target.parentNode.parentNode
        td.parentNode.lastElementChild.textContent = sum;
        td.nextElementSibling.classList.add("crossed-out");
        e.target.disabled = true;
        grandTotal();

        if(!checkEnd()) {
            rollsLeft = 3;

            dice.forEach(dice => {
                dice.classList.remove("locked");
            });
            round++;
            rollDice();
        }
    });
})

// total points for each section without bonus
const totalFromChoices = () => {
    let upperTotal = 0;
    pointsUpper.forEach(score => {
        upperTotal += Number(score.textContent);
    });
    choicesTotalUpper.textContent = upperTotal;

    let lowerTotal = 0;
    pointsLower.forEach(score => {
        lowerTotal += Number(score.textContent);
    });
    choicesTotalLower.textContent = lowerTotal;
}

// bonus for upper section
const bonus = () => {
    if(Number(choicesTotalUpper.textContent) >= 63) {
        upperBonus.textContent = 35;
    } else {
        upperBonus.textContent = 0;
    }
}

// upper section with bonus
const totalUpper = () => {
    bonus();
    const total = Number(choicesTotalUpper.textContent) + Number(upperBonus.textContent)
    document.querySelector(".total-score-upper").textContent = total;
    return total;
}

// total of everything
const grandTotal = () => {
    totalFromChoices();
    totalUpper();
    const totalUp = totalUpper()
    const totalLower = Number(choicesTotalLower.textContent);
    document.querySelector(".grand-score").textContent = totalUp + totalLower;
}

document.querySelector(".game__again").addEventListener("click", () => {
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.disabled = false;
            checkbox.checked = false;
        }
    });
    document.querySelectorAll(".points").forEach(p => p.innerHTML = "");
    document.querySelectorAll("td").forEach(p => p.classList.remove("crossed-out"));
    dice.forEach(die => die.classList.remove("locked"));
    rollsLeft = 3;
    round = 1;
    rollDice();
})

document.querySelector(".start__button").addEventListener("click", () => {
    document.querySelector("body").classList.remove("paper");
    document.querySelector(".game").classList.remove("hidden");
    document.querySelector(".start").classList.add("hidden");
    rollDice();
})

document.querySelector(".game__roll").addEventListener("click", rollDice)

window.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        rollDice();
    }
})

document.querySelectorAll(".game__choice").forEach(choice => {
    choice.addEventListener("click", e => {
        if (e.target.firstElementChild) {
            e.target.firstElementChild.classList.toggle("hidden");
        }
    });
})

document.querySelectorAll(".instruction").forEach(instruction => {
    instruction.addEventListener("click", e => {
        e.target.classList.add("hidden");
    });
});

document.querySelector(".start__how").addEventListener("click", () => {
    document.querySelector(".how-to-play").classList.remove("hidden");
    document.querySelector(".start").classList.add("hidden");

});

document.querySelector(".how-to-play__ok").addEventListener("click", () => {
    document.querySelector(".start").classList.remove("hidden");
    document.querySelector(".how-to-play").classList.add("hidden");
})

document.querySelector(".pop-up__ok").addEventListener("click", () => {
    document.querySelector(".pop-up-container").style.display = "none";

})