function getComputerChoice() {
    let num = Math.random()
    console.log(num)
    if (num < 0.33) {return "paper"}
    if (num > 0.66) {return "scissors"}
    return "rock"
}

function getHumanChoice() {
    let s = prompt("Pick one: rock, paper, scissors").toLowerCase()
    console.assert(s === "rock" || s === "scissors" || s === "paper", "Invalid choice!")
    return s
}

function printFinalScore(humanScore, computerScore) {
    let s = ""
    if (humanScore > computerScore) {s = "You win! "}
    else if (humanScore < computerScore) {s = "You lose! "}
    else {s = "You tied! "}
    s += humanScore.toString() + " to " + computerScore.toString()
    console.log(s)
    return s
}

function playRound(humanChoice, computerChoice) {
        let answer_string = ""
        if (humanChoice === computerChoice) {answer_string = "Tie game! " + humanChoice + " and " + computerChoice}
        else if ((humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "scissors" && computerChoice === "paper") ||
            (humanChoice === "paper" && computerChoice === "rock")) {
                answer_string = "You win! " + humanChoice + " beats " + computerChoice;
                humanScore += 1
            }
        else if ((humanChoice === "rock" && computerChoice === "paper") ||
                (humanChoice === "paper" && computerChoice === "scissors") ||
                (humanChoice === "scissors" && computerChoice === "rock")) {
                    answer_string = "You lose! " + humanChoice + " loses to  " + computerChoice;
                    computerScore += 1
            }
        else {answer_string = "FAILURE" + humanChoice + " " + computerChoice}
        console.log(answer_string)
        return answer_string
    }

function playGame() {
    function addTextToParagraph(s) {
        document.getElementById('p').innerText += "\n" + s
    }

    /*for (let i = 0; i < 5; i++) {
        let humanSelection = getHumanChoice()
        let computerSelection = getComputerChoice()
        addTextToParagraph(playRound(humanSelection, computerSelection))
        console.log(i)
    }
    addTextToParagraph(printFinalScore(humanScore, computerScore))*/
}

function showScore(p) {
    if (humanScore === 5) {
        p.innerText = "You Win! " + humanScore.toString() + " to " + computerScore.toString()
    } else if (computerScore === 5) {
        p.innerText = "You Lose! " + humanScore.toString() + " to " + computerScore.toString()
    } else {
        p.innerText = "The score is " + humanScore.toString() + " to " + computerScore.toString()
    }

}

function createUi() {
    const rps = ["rock", "paper", "scissors"]
    const play_container = document.querySelector("#play_container")
    let play_p = document.createElement("p")
    play_p.innerText = "Start the Game already!"
    play_container.appendChild(play_p)
    const score_container = document.querySelector("#score_container")
    let score_p = document.createElement("p")
    showScore(score_p)
    score_container.appendChild(score_p)
    const button_container = document.querySelector("#button_container")
    rps.forEach((rps_move) => {
        let btn = document.createElement("button")
        btn.textContent = rps_move
        btn.onclick = (e) => {
            if (humanScore < 5 && computerScore < 5) {
                play_p.innerText = playRound(rps_move, getComputerChoice())
                showScore(score_p)
            }
            
        }
        button_container.appendChild(btn)
    })
    
}

let humanScore = 0
let computerScore = 0
createUi()
playGame()