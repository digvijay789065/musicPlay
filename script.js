// Song list with details
const songs = [
    { 
        title: "O Meri Laila", 
        artist: "Atif Aslam", 
        src: "songs/1.mp3",
        cover: "covers/1.webp"
    },
    { 
        title: "Prem Ki Naiyya", 
        artist: "Ajab Prem ki gajab Kahani", 
        src: "songs/2.mp3",
        cover: "covers/2.webp"
    },
    { 
        title: "Dope Shope", 
        artist: "Yo Yo Honey Singh", 
        src: "songs/3.mp3",
        cover: "covers/3.webp"
    },
    { 
        title: "Gallan Goodiyan", 
        artist: "Dil Dhadakne Do", 
        src: "songs/4.mp3",
        cover: "covers/4.webp"
    },
    { 
        title: "Tu Meri", 
        artist: "Bang Bang", 
        src: "songs/5.mp3",
        cover: "covers/5.webp"
    },
    { 
        title: "Apna Bana Le", 
        artist: "Bhediya", 
        src: "songs/6.mp3",
        cover: "covers/6.webp"
    },
    { 
        title: "The Jawaani Song", 
        artist: "Student of the Year 2", 
        src: "songs/7.mp3",
        cover: "covers/7.webp"
    },
    { 
        title: "Mauja Hi Mauja", 
        artist: "Jab We Met", 
        src: "songs/8.mp3",
        cover: "covers/8.jpg"
    },
    { 
        title: "Peg 90 Ml", 
        artist: "Deep Fateh", 
        src: "songs/9.mp3",
        cover: "covers/9.jpg"
    },
    { 
        title: "Tera Rasta Chhodu Na", 
        artist: "Chennai Express", 
        src: "songs/10.mp3",
        cover: "covers/10.jpg"
    }
];

// Variables
const audioPlayer = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const albumArt = document.getElementById("albumArt");
const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const shuffleButton = document.getElementById("shuffleButton");
const repeatButton = document.getElementById("repeatButton");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistItems = document.getElementById("playlistItems");

let songIndex = 0;
let isShuffle = false;
let repeatMode = 'none'; // none, one, all

// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Load the song
function loadSong(index) {
    audioPlayer.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
    albumArt.src = songs[index].cover;
    
    // Update playlist active state
    const playlistItems = document.querySelectorAll('#playlistItems li');
    playlistItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Play or Pause song
function playPauseSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Go to next song
function nextSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === songIndex);
        songIndex = newIndex;
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    loadSong(songIndex);
    audioPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

// Go to previous song
function prevSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === songIndex);
        songIndex = newIndex;
    } else {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
    }
    loadSong(songIndex);
    audioPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleButton.style.color = isShuffle ? '#1db954' : '#fff';
}

// Toggle repeat
function toggleRepeat() {
    switch (repeatMode) {
        case 'none':
            repeatMode = 'one';
            repeatButton.style.color = '#1db954';
            break;
        case 'one':
            repeatMode = 'all';
            repeatButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
            break;
        case 'all':
            repeatMode = 'none';
            repeatButton.style.color = '#fff';
            repeatButton.innerHTML = '<i class="fas fa-redo"></i>';
            break;
    }
}

// Update progress bar
function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
}

// Set audio time based on progress bar
function setAudioProgress() {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
}

// Set volume
function setVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

// Create playlist
function createPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songIndex);
            audioPlayer.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        });
        playlistItems.appendChild(li);
    });
}

// Event Listeners
playButton.addEventListener("click", playPauseSong);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
shuffleButton.addEventListener("click", toggleShuffle);
repeatButton.addEventListener("click", toggleRepeat);
audioPlayer.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("input", setAudioProgress);
volumeSlider.addEventListener("input", setVolume);

// Handle song end
audioPlayer.addEventListener("ended", () => {
    if (repeatMode === 'one') {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else if (repeatMode === 'all' || isShuffle) {
        nextSong();
    } else if (songIndex < songs.length - 1) {
        nextSong();
    } else {
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Initialize
loadSong(songIndex);
createPlaylist();
setVolume();
