const settingsBtn = document.getElementById('settings-btn'),
    settings = document.getElementById('settings'),
    settingsForm = document.getElementById('settings-form'),
    difficultySelect = document.getElementById('difficulty'),
    word = document.getElementById('word'),
    text = document.getElementById('text'),
    timeEl = document.getElementById('time'),
    scoreEl = document.getElementById('score'),
    endGameEl = document.getElementById('end-game-container')

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficult to vale in LocalStorage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'): 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'): 'medium';

// Focus on text on start
text.focus();

// Start countdown
const timeInterval = setInterval(updateTime, 1000);


// Fetch random word from API and add to DOM
// API LINK: https://random-word-api.herokuapp.com/home
function getRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1&swear=0')
    .then(res => res.json())
    .then(data => {
        randomWord = data.toString();
        /* console.log(randomWord); */
        word.innerHTML = randomWord
        
    });
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);

        // End game
        gameOver();
    }
}

// Game over, show end screen
function gameOver() {
    endGameEl.innerHTML = `
    <h1>Game Over</h1>
    <p>Your final score is ${score}</p>
    <button onClick="window.location.reload()">Play Again</button>
    `;

    endGameEl.style.display = "flex";
}

getRandomWord();


// Event listeners

// Typing
text.addEventListener('input', e => {
    let inputText = e.target.value;

    if (inputText === randomWord) {
        getRandomWord();
        updateScore();
        
        // Clear
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else if (difficulty === 'easy') {
            time += 5;
        }
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})