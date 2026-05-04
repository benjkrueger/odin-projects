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

function playGame() {
    let humanScore = 0
    let computerScore = 0

    function playRound(humanChoice, computerChoice) {
        let answer_string = ""
        if ((humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "scissors" && computerChoice === "paper") ||
            (humanChoice === "paper" && computerChoice === "rock")) {
                answer_string = "You win! " + humanChoice + " beats " + computerChoice;
                humanScore += 1
            }
        else if ((humanChoice === "rock" && computerChoice === "scissors") ||
                (humanChoice === "rock" && computerChoice === "scissors") ||
                (humanChoice === "rock" && computerChoice === "scissors")) {
                    answer_string = "You lose! " + computerChoice + " beats " + computerChoice;
                    computerScore += 1
            }
        else {answer_string = "Tie game!"}
        console.log(answer_string)
        return answer_string
    }

    
    for (let i = 0; i < 5; i++) {
        let humanSelection = getHumanChoice()
        let computerSelection = getComputerChoice()
        playRound(humanSelection, computerSelection)
        console.log(i)
    }
    printFinalScore(humanScore, computerScore)
}


playGame()