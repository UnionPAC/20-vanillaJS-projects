const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and pause video
toggleVideoStatus = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update play/pause icon
updatePlayIcon = () => {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>'
    }
}

// Update progress and timestamp
updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    // Get seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }

    timestamp.innerHTML = `${mins}:${seconds}`

}

// Stop video
stopVideo = () => {
    video.currentTime = 0;
    video.pause();
}

// Set video time to progress 
setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100;
}


// Event listeners

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);