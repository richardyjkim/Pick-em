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


var data = [];
var dates = {};
var datesArray = [];
var game = [];

// list of games from localStorage
var myGames = [63882, "Min"]; // winning team

// Fetch the Winning Team Data
fetch(
  "https://api.sportsdata.io/v3/mlb/scores/json/Games/%7B2021PRE%7D?key=a608c9ea43e14291881e0e8e6617941e"
).then(function(response) {
  response.json()
    .then(function(data) {
      var game = data.filter(data => data.GameID === 63882);
      gameDay = game[0].DateTime.split("T")[0];
      gameTime = game[0].DateTime.split("T")[1];
      awayTeam = game[0].AwayTeam;
      homeTeam = game[0].HomeTeam;
      awayTeamRuns = game[0].AwayTeamRuns;
      homeTeamRuns = game[0].HomeTeamRuns;

      if (HomeTeamRuns => AwayTeamRuns) {
        winningTeam = homeTeam;
      } else {
        winningTeam = awayTeam;
      }
      console.log(gameDay, gameTime, winningTeam, awayTeam, awayTeamRuns, homeTeam, homeTeamRuns);
    });
});
