const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('textarea');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [
    {
        image: './img/thirsty.jpg',
        title: "I'm Thirsty",
    },
    {
        image: './img/hungry.jpg',
        title: "I'm Hungry",
    },
    {
        image: './img/sleep.jpg',
        title: "I'm Tired",
    },
    {
        image: './img/hurt.jpg',
        title: "I'm Hurt",
    },
    {
        image: './img/happy.jpg',
        title: "I'm Happy",
    },
    {
        image: './img/mad.jpg',
        title: "I'm Angry",
    },
    {
        image: './img/sad.jpg',
        title: "I'm Sad",
    },
    {
        image: './img/spooked.jpg',
        title: "I'm Scared",
    },
    {
        image: './img/outside.jpg',
        title: "I want to go outside",
    },
    {
        image: './img/home.jpg',
        title: "I want to go home",
    },
    {
        image: './img/school.jpg',
        title: "I want to go to school",
    },
    {
        image: './img/grandma.jpg',
        title: "I want to go to grandmas",
    }
];

data.forEach(createBox);


// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');
    
    const { image, title } = item

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${title}" />
        <p class="info">${title}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(title);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active')
        }, 800);
    });

    main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option)
    });
}

// Set text
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Event listeners

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();