const musicContainer = document.getElementById('music-container');
const artistContainer = document.getElementById('artist-container');
const artistEl = document.getElementById('artist');
const songContainer = document.getElementById('song-container');
const titleEl = document.getElementById('title');

const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');

const audioEl = document.getElementById('audio');
const coverEl = document.getElementById('cover');

const prevBtn = document.getElementById('prev'),
    playBtn = document.getElementById('play'),
    nextBtn = document.getElementById('next')

// Song Titles & Artist Names
const songs = [

    {
        artist: "Bob Dylan",
        title: "To be alone with you",
        fileName: "to-be-alone-with-you"
    },
    {
        artist: "Dope Lemon",
        title: "Midnight Slow",
        fileName: "midnight-slow"
    },
    {
        artist: "Deyaz",
        title: "Time",
        fileName: "time"
    },
    {
        artist: "Jay Lounge",
        title: "Snowflakes",
        fileName: "snowflakes"
    }
];


// Keep track of song
let songIndex = 1;

// Initially load song deatils into DOM
loadSong(songs[songIndex]);


// Update song details

function loadSong(song) {
    artistEl.innerHTML = song.artist;
    titleEl.innerHTML = song.title;

    audioEl.src = `./audio/${song.fileName}.mp3`;
    coverEl.src = `images/${song.fileName}.png`;

}

// Play song
function playSong() {
    musicContainer.classList.add('play');

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');

    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if(songIndex > songs.length -1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}


// Update progress bahhhr
function updateProgress(e) {
    const { duration, currentTime } = e.target;

    /* console.log(duration, currentTime); */

    const progressPercent = (currentTime/ duration) * 100;
    progress.style.width = `${progressPercent}%`

  }


// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const duration = audioEl.duration;

    audioEl.currentTime = (clickX / width) * duration;
}

// Event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time/song update event
audioEl.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audioEl.addEventListener('ended', nextSong);