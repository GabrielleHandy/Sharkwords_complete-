const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
const createDivsForChars = word => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true. `buttonEl` is an `HTMLElement` object.
const disableLetterButton = buttonEl => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
const isLetterInWord = letter => document.querySelector(`div.${letter}`) !== null;


// Called when `letter` is in word. Update contents of divs with `letter`.
const handleCorrectGuess = letter => {
  const filledDivs = document.querySelectorAll(`div.${letter}`);
  for (const correctDiv of filledDivs) {
    correctDiv.innerHTML = letter;
  }
  const allDivs = document.querySelectorAll("div");
  const lengthAllDivs = allDivs.length;
  let counter = 0;

  for (const div of allDivs){
    if (div.innerHTML !== '' ){
      counter += 1;
    }
  }
  if (counter === lengthAllDivs) {
    const section = document.querySelectorAll("button");
    
    for (const button of section) {
      disableLetterButton(button);
    }
    document.querySelector("#win").style.display = "";
  }  
};


// Called when `letter` is not in word. 
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable all buttons and show the "play again" message.
const handleWrongGuess = () => {
  numWrong += 1;
  document.querySelector('img').setAttribute('src', `/static/images/guess${numWrong}.png`);
  if (numWrong >= 5) {
    const section = document.querySelectorAll("button");
    
    for (const button of section) {
      disableLetterButton(button);
    }
    document.querySelector("#play-again").style.display = '';
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  // add an event handler to handle clicking on a letter
  //variable, loop and add event listener
  const allButtons = document.querySelectorAll('button');
  for (const button of allButtons) {
    button.addEventListener('click', (evt) => {
      const clickedBtn = evt.target;
      console.log(clickedBtn);
      disableLetterButton(clickedBtn);
      
      if (isLetterInWord(clickedBtn.innerHTML)) {
        handleCorrectGuess(clickedBtn.innerHTML);
      } else {
        handleWrongGuess();
        console.log(numWrong);
      }
    });
  }

  // add an event handler to handle clicking on the Play Again button
  const playAgain = document.querySelectorAll('a');
  for (const choice of playAgain) {
    choice.addEventListener('click', (evt) => {
      const startOver = evt.target;
      resetGame();
    });
  }
})();
