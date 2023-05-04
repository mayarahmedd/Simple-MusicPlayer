let allSongs = [
  {

    name: "Sorry",
    artist: "Halsey",
    img: "img/Halsey - Sorry.jpg",
    src: "Halsey-Sorry"

  },

  {

    name: "Happier",
    artist: "Ed Sheeran",
    img: "img/Ed Sheeran - Happier.jpg",
    src: "EdSheeran-Happier"

  },

  {

    name: "lovely",
    artist: "BillieEilish-Khalid",
    img: "img/BillieEilish-Khalid-lovely.jpg",
    src: "BillieEilish-Khalid-lovely"

  },
 

];



const container = document.querySelector(".wrapper-container"),
  img_Music = container.querySelector(".img-container img"),
  name_Music = container.querySelector(".song-details .name"),
  artist_Music = container.querySelector(".song-details .artist"),
  audio_Music = container.querySelector("#main-audio"),
  playpauseBtn = container.querySelector(".play-pause"),
  nextBtn = container.querySelector("#next"),
  prevBtn = container.querySelector("#prev");
progressBar = container.querySelector(".progress-bar"),
  progressArea = container.querySelector(".progress-area");
musicList = container.querySelector(".music-list"),
  moreMusicBtn = container.querySelector("#more-music"),
  closemoreMusic = container.querySelector("#close");

  let fileInput = container.querySelector('#fileInput');


  let musicIndex = 0;


fileInput.addEventListener('change', function(event) {
  let file = event.target.files[0];
  let fileName = file.name.split('.').slice(0, -1).join('.');
  let Name = fileName.split('-')
  let Aname = Name[0];
  let MName = Name[1];
  let songObject = {
    name: MName,
    artist: Aname,
    img: 'img/default.jpg',
    src: fileName
  };
  allSongs.push(songObject);
  getAllmusic(musicIndex);
  //musicListValues();
  playingSong();
  
  console.log(allSongs);

});






window.addEventListener("load", () => {

  getAllmusic(musicIndex);
  playingSong();
})


function getAllmusic(index) {
  name_Music.innerText = allSongs[index].name;

  artist_Music.innerText = allSongs[index].artist;
  img_Music.src = allSongs[index].img;
  audio_Music.src = `audio/${allSongs[index].src}.mp3`;
}

function playMusic() {
  container.classList.add("paused");
  playpauseBtn.querySelector("i").innerText = "pause";
  audio_Music.play();
}


function pauseMusic() {
  container.classList.remove("paused");
  playpauseBtn.querySelector("i").innerText = "play_arrow";
  audio_Music.pause();
}


playpauseBtn.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("paused");

  isMusicPlay ?  pauseMusic() :playMusic()  ;
})

nextBtn.addEventListener("click", () => {
  nextMusic();
})

prevBtn.addEventListener("click", () => {
  prevMusic();
})



function nextMusic() {

  musicIndex++;
  musicIndex > allSongs.length ? musicIndex = 0 : musicIndex = musicIndex;
  getAllmusic(musicIndex);
  playMusic();
  playingSong();
}

function prevMusic() {

  musicIndex--;
  musicIndex < 0 ? musicIndex = allSongs.length : musicIndex = musicIndex;
  getAllmusic(musicIndex);
  playMusic();
  playingSong();
}

audio_Music.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;




  let musicCurrentTime = container.querySelector(".current-time"),
    musicduration = container.querySelector(".max-duration");

  audio_Music.addEventListener("loadeddata", () => {


    let mainDuration = audio_Music.duration;
    let tMin = Math.floor(mainDuration / 60);
    let tsec = Math.floor(mainDuration % 60);

    if (tsec < 10) {
      tsec = `0${tsec}`;
    }


    musicduration.innerText = `${tMin}:${tsec}`;


  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio_Music.duration;

  audio_Music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();

});

const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});


audio_Music.addEventListener("ended", () => {

  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      audio_Music.currentTime = 0;
      getAllmusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allSongs.length));
      do {
        randIndex = Math.floor((Math.random() * allSongs.length));
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      getAllmusic(musicIndex);
      playMusic();
      break;
  }
});


moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
  // musicListValues();
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});





const ulTag = container.querySelector("ul");

//function musicListValues(){
for (let i = 0; i < allSongs.length; i++) {
  let liTag = `<li li-index="${i}">
                <div class="row">
                  <span>${allSongs[i].name}</span>
                  <p>${allSongs[i].artist}</p>
                </div>
                <span id="${allSongs[i].src}" class="audio-duration"></span>
                <audio class="${allSongs[i].src}" src="audio/${allSongs[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); 
  let liAudioDuartionTag = ulTag.querySelector(`#${allSongs[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allSongs[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let tMin = Math.floor(duration / 60);
    let tSec = Math.floor(duration % 60);
    if(tSec < 10){ 
      tSec = `0${tSec}`;
    };
    liAudioDuartionTag.innerText = `${tMin}:${tSec}`; 
    liAudioDuartionTag.setAttribute("t-duration", `${tMin}:${tSec}`);
  });
}
//}


const liTagsAll = ulTag.querySelectorAll("li")
  function playingSong(){
  for (let j = 0; j < liTagsAll.length; j++) {
    let audioTag = liTagsAll[j].querySelector(".audio-duration");
    
    if(liTagsAll[j].classList.contains("playing")){
      liTagsAll[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    
    if(liTagsAll[j].getAttribute("li-index") == musicIndex){
      liTagsAll[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    liTagsAll[j].setAttribute("onclick", "clicked(this)");
  }

  }


function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  getAllmusic(musicIndex);
  playMusic();
  playingSong();
}






