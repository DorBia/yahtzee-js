const dices = document.querySelectorAll(".game__dices img")
const checkboxes = document.querySelectorAll(".check")
const pointsUpper = document.querySelectorAll(".upper-section-points")
const choicesTotalUpper = document.querySelector(".upper-section-total")
const upperBonus = document.querySelector(".upper-section-bonus")
const pointsLower = document.querySelectorAll(".lower-section-points")
const choicesTotalLower = document.querySelector(".lower-section-total")

let rolledDices = [];
let rollsLeft = 3;
let sum = 0;
let round = 1;

const rollDice = (dice) => {
    const rollNumber = Math.floor(Math.random() * 6) + 1;
    
    switch (rollNumber) {
        case 1:
            dice.src = "./images/dice-1.png";
            break;
        case 2:
            dice.src = "./images/dice-2.png";
            break;
        case 3:
            dice.src = "./images/dice-3.png";
            break;
        case 4:
            dice.src = "./images/dice-4.png";
            break;
        case 5:
            dice.src = "./images/dice-5.png";
            break;
        case 6:
            dice.src = "./images/dice-6.png";
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
            dice.classList.add("shaking");
            setTimeout(() => {dice.classList.remove("shaking")},200)
        }
    });
    if (rollsLeft > 0){
        rollsLeft--;
    }
    document.querySelector(".game__rolls").innerHTML = `Rolls left: ${rollsLeft}`
}

dices.forEach(dice => {
    // console.log(dice)
    dice.addEventListener("click", e => {
        e.target.classList.toggle("locked");
    })
})

const checkSum = (number) => {
    checkDices();
    rolledDices.forEach(dice => {
        if(dice === number) {
            sum += dice;
        }
    })
}

const sameInArray = (value) => {
    return rolledDices.reduce((a, b) => a + (b === value), 0);
}

const checkAKind = (number) => {
    checkDices()
    rolledDices.forEach(dice => {
        if (sameInArray(dice) >= number){
            sum = rolledDices.reduce((a, b) => a + b);
        };
    })
}

const checkFull = () => {
    checkDices()
    let same = [];
    rolledDices.forEach(dice => same.push(sameInArray(dice)));
    if (same.includes(2) && same.includes(3)){
        sum = 25;
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

const checkLargeStraight = () => {
    checkDices();
    arr = [1,2,3,4,5]
    arr2 = [2,3,4,5,6]
    if(arr.every(dice => rolledDices.includes(dice)) || arr2.every(dice => rolledDices.includes(dice))){
        sum = 40;
    }
}

const checkYahtzee = () => {
    checkDices();
    if (sameInArray(rolledDices[0]) == 5){
        sum = 50;
    }
}

const checkChance = () => {
    checkDices();
    sum = rolledDices.reduce((a, b) => a + b);
}

const checkEnd = () => {
    let end = false
    if (round === 13){
        alert(`Your score was ${document.querySelector(".grand-score").textContent}`);
        end = true;
    }
    return end;
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

            dices.forEach(dice => {
                dice.classList.remove("locked");
            });
            round++;
            rollAllDices();
        }
    });
})

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

const bonus = () => {
    if(Number(choicesTotalUpper.textContent) >= 63) {
        upperBonus.textContent = 35;
    } else {
        upperBonus.textContent = 0;
    }
}

const totalUpper = () => {
    bonus();
    const total = Number(choicesTotalUpper.textContent) + Number(upperBonus.textContent)
    document.querySelector(".total-score-upper").textContent = total;
    return total;
}

const grandTotal = () => {
    totalFromChoices();
    totalUpper();
    const totalUp = totalUpper()
    const totalLow = Number(choicesTotalLower.textContent);
    document.querySelector(".grand-score").textContent = totalUp + totalLow;
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
    dices.forEach(dice => dice.classList.remove("locked"));
    rollsLeft = 3;
    round = 1;
    rollAllDices();
})

document.querySelector(".start__game").addEventListener("click", () => {
    document.querySelector("body").classList.remove("paper");
    document.querySelector(".game").classList.remove("hidden");
    document.querySelector(".start").classList.add("hidden");
    rollAllDices();
})

document.querySelector(".game__roll").addEventListener("click", rollAllDices)

window.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        rollAllDices();
    }
})

document.querySelectorAll(".choice-name").forEach(choice => {
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

document.querySelector(".ok").addEventListener("click", () => {
    document.querySelector(".start").classList.remove("hidden");
    document.querySelector(".how-to-play").classList.add("hidden");
})