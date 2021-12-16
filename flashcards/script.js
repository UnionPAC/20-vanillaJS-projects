const cardsContainer = document.getElementById('cards-container'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    currentEl = document.getElementById('current'),
    showBtn = document.getElementById('show'),
    hideBtn = document.getElementById('hide'),
    questionEl = document.getElementById('question'),
    answerEl = document.getElementById('answer'),
    addCardBtn = document.getElementById('add-card'),
    clearBtn = document.getElementById('clear'),
    addContainer = document.getElementById('add-container')


// Keep track of current card
let currentActiveCard = 0;


// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

/* const cardsData = [
    {
        question: 'Which cryptocurrency has the highest market cap?',
        answer: 'Bitcoin (BTC)'
    },
    {
        question: 'Who created Bitcoin?',
        answer: 'Satoshi Nakamoto'
    },
    {
        question: 'Which category of cryptocurrencies offer financial services?',
        answer: 'Decentralized Finance (DeFi)'
    },
]; */


// Create all cards
const createCards = () => {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show current card number out of total
const updateCurrentText = () => {
    currentEl.innerText = `${currentActiveCard + 1} /${cardsEl.length}`
}

// Get cards from local storage
function getCardsData () {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

// Event listeners

// Next Button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText();
});


// Prev Button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    /* console.log(question, answer); */

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer};

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        cardsData.push(newCard);

        setCardsData(cardsData);
    }
});


// Clear all cards
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});