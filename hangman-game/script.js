const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ["blind","rod","thick","syllable","detail","pair","managed","people","joy","system","window","early","thus","fine","slope","mind","act","halfway","reader","pen","community","even","ready","brush","trail","telephone","wait","seems","separate","shown","leaf","porch","than","kitchen","nothing","hard","stage","movie","shut","establish","fog","taken","perfect","harder","fruit","nearby","trunk","come","became","surface","dust","layers","typical","explanation","gravity","mother","average","dot","function","discover","mice","difficult","slight","weight","possible","characteristic","getting","guess","jar","garden","people","public","stems","goes","solve","earth","blew","deep","headed","so","you","library","prize","separate","next","film","typical","salt","consist","jack","different","remove","market","grew","area","spider","seven","tank","hat","become","cell","relationship","slept","class","tape","spell","five","dead","famous","doubt","vote","return","tail","rubber","lion","sink","its","build","pale","block","salmon","percent","minute","date","real","settle","grandfather","ants","sun","border","stop","exclaimed","poet","everybody","board","feature","machine","art","blanket","citizen","drawn","shape","come","vowel","let","slide","tree","above","bowl","however","plastic","settlers","just","mathematics","online","fastened","particular","population","change","planet","tip","member","home","someone","sad","silver","story","coat","breath","his","disappear","easier","doctor","short","roof","stopped","distant","beyond","took",
"skill","jar","door","command","quickly","lucky","sign","writer","come","solve","depend","weather","basket","mostly","joy","nor","newspaper","quickly","moon","brother","field","package","tiny","principal","noon","twelve","poetry","those","guess","refer","industrial","nothing","steady","wait","obtain","hill","children","journey","ride","our","softly","south","wave","same","instrument","price","matter","tobacco","invented","bound","fallen","heading","bill","region","good","reader","mad","mark","select"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

/* let selectedWord = 'journey'; */

const correctLetters = [];
const wrongLetters = [];


// Show hidden word
const displayWord = () => {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
        )
        .join('')
    }
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congrats! You won! 😁 🎉 ';
        popup.style.display = 'flex';
    } 
}


// Update wrong letter element
const updateWrongLettersEl = () => {
    // display wrong letters
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? `<p>Wrong Letters</p>` : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if you've lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Tough break, you lost 😕';
        popup.style.display = 'flex';
    }

}


// Show notification
const showNotification = () => {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


// Keydown letter press
window.addEventListener('keydown', e => {
    /* console.log(e.keyCode); */
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();



