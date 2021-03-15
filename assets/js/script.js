let startBtn = document.getElementById("start");
let playBtn = document.getElementById("how-to-play");
let introSectionEl = document.getElementById("intro-section");
let playSectionEl = document.getElementById("play-section");
let startSectionEl = document.getElementById("start-section");


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

})
