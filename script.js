// Song list with details
const songs = [
    { title: "O Meri Laila", artist: "Atif Aslam", src: "songs/1.mp3" },
    { title: "Gallan Goodiyan", artist: "Dil Dhadakne Do", src: "songs/2.mp3" },
    { title: "Apna Bana Le", artist: "Arijit Singh", src: "songs/3.mp3" },
    { title: "Mauja Hi Mauja", artist: "Pritam", src: "songs/4.mp3" },
    { title: "Peg 90ML", artist: "Honey Singh", src: "songs/5.mp3" },
];

// Variables
const audioPlayer = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");

let songIndex = 0;

// Load the first song initially
function loadSong(index) {
    audioPlayer.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
}

// Play or Pause song
function playPauseSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playButton.textContent = "▶";
    }
}

// Go to next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audioPlayer.play();
    playButton.textContent = "⏸";
}

// Go to previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audioPlayer.play();
    playButton.textContent = "⏸";
}

// Update progress bar
function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
}

// Set audio time based on progress bar
function setAudioProgress() {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
}

// Event Listeners
playButton.addEventListener("click", playPauseSong);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
audioPlayer.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("input", setAudioProgress);

// Load the first song on page load
loadSong(songIndex);
