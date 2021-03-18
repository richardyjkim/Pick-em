let startBtn = document.getElementById("start");
let mypicksBtn = document.getElementById("mypicks");
let matchupBtn = document.getElementById("match-ups")
let playBtn = document.getElementById("how-to-play");
let introSectionEl = document.getElementById("intro-section");
let playSectionEl = document.getElementById("play-section");
let startSectionEl = document.getElementById("start-section");
let matchupSectionEl = document.getElementById("matchup-section");
let mypicksSectionEl = document.getElementById("mypicks-section");



startBtn.addEventListener("click", function(event) {
  event.preventDefault();
  introSectionEl.classList.add("display-none");
  startSectionEl.classList.remove("display-none");
});

playBtn.addEventListener("click", function(event) {
  event.preventDefault();
  startSectionEl.classList.add("display-none");
  introSectionEl.classList.add("display-none");
  playSectionEl.classList.remove("display-none");
  matchupSectionEl.classList.add("display-none");
  mypicksSectionEl.classList.add("display-none");
});

matchupBtn.addEventListener("click", function(event){
  event.preventDefault();
  matchupSectionEl.classList.remove("display-none");
  playSectionEl.classList.add("display-none");
  startSectionEl.classList.add("display-none");
  introSectionEl.classList.add("display-none");
  mypicksSectionEl.classList.add("display-none");
});

mypicksBtn.addEventListener("click", function(event){
  event.preventDefault();
  matchupSectionEl.classList.add("display-none");
  playSectionEl.classList.add("display-none");
  startSectionEl.classList.add("display-none");
  introSectionEl.classList.add("display-none");
  mypicksSectionEl.classList.remove("display-none");
});
