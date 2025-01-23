let randomNumber = parseInt(Math.random()*100 + 1);

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.result');

const startButton = document.createElement('button');

let prevGuess = [];
let numOfGuesses = 1;

let playGame = true;

if(playGame){
    submit.addEventListener('click', function(event){
        event.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number');
    }
    else if(guess < 1){
        alert("Please enter a number greater than 1");
    }
    else if(guess > 100){
        alert("please enter a number leas than 100");
    }
    else{
        prevGuess.push(guess);
        if(numOfGuesses == 10){
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess == randomNumber){
        displayMessage(`You guessed it right! You win.`);
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`guess is TOO low`);
    }
    else if(guess > randomNumber){
        displayMessage('guess is TOO high');
    }
}

function displayGuess(guess){
    userInput.value = "";
    guessSlot.innerHTML += `${guess}, `;
    numOfGuesses++;
    remaining.innerHTML = `${11-numOfGuesses}`;
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h3>${message}</h3>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    startButton.classList.add('button');
    startButton.innerText = "Start Again";
    startOver.appendChild(startButton);
    playGame = false;
    newGame(); 
}

function newGame(){
    const newGameButton = document.querySelector('.button');
    newGameButton.addEventListener('click', function (e){
        randomNumber = parseInt(Math.random()*100 + 1);
        prevGuess = [];
        numOfGuesses = 1;
        guessSlot.innerHTML = "";
        remaining.innerHTML = `${10}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(startButton);
        displayMessage("");
        playGame = true;
    });
}