let startBtn = document.getElementById("start");
let mypicksBtn = document.getElementById("mypicks");
let matchupBtn = document.getElementById("match-ups")
let playBtn = document.getElementById("how-to-play");
let introSectionEl = document.getElementById("intro-section");
let playSectionEl = document.getElementById("play-section");
let startSectionEl = document.getElementById("start-section");
let matchupSectionEl = document.getElementById("matchup-section");
let mypicksSectionEl = document.getElementById("mypicks-section");
let myPicksContainerEl = document.querySelector(".mypicks-container");
let accuracyEl = document.getElementById("accuracy");
let accColorEl = document.getElementById("acc-color");

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

// Sample list of games from localStorage. Required to mock demo the My Picks Page
var myGames = {63797: 'PIT',
               63805: 'OAK',
               63808: 'MIL',
               63815: 'MIA',
               63812: 'DET',
               63861: 'PIT',
               63859: 'SEA',
               63865: 'NYY'
};

let accArray = [];

// Fetch the My Picks Section Winning Team Data
fetch(
  "https://api.sportsdata.io/v3/mlb/scores/json/Games/%7B2021PRE%7D?key=a608c9ea43e14291881e0e8e6617941e"
).then(function(response) {
  response.json()
    .then(function(data) {

      for (i = 0; i < Object.keys(myGames).length; i++) {

        // Grab game details
        let gameNum = Object.keys(myGames)[i];
        let myPickTeam = myGames[gameNum];

        // Get Game JSON data
        let game = data.filter(data => data.GameID === Number(gameNum));
        let gameDay = moment(game[0].DateTime.split("T")[0]).format("L");
        let gameTime = moment(game[0].DateTime).format("LT");
        let awayTeam = game[0].AwayTeam;
        let homeTeam = game[0].HomeTeam;
        let awayRuns = game[0].AwayTeamRuns;
        let homeRuns = game[0].HomeTeamRuns;

        if (homeRuns >= awayRuns) {
          winningTeam = homeTeam;
        } else {
          winningTeam = awayTeam;
        }

        // Log past games only 
        if (gameDay < moment().format("L")) {

          // Add Date Element to U/I
          let myPickDate = document.createElement("div");
          let myPickDateText = document.createElement("p");
          let myPickTimeText = document.createElement("p");
          myPickDateText.textContent = gameDay;
          myPickTimeText.textContent = gameTime;
          myPickDate.appendChild(myPickDateText);
          myPickDate.appendChild(myPickTimeText);
          myPickDate.classList = "mypicks-date";
          myPicksContainerEl.appendChild(myPickDate);

          // Add Match Ups to U/I
          let myPickTeams = document.createElement("div");
          let myPickTeamsHomeText = document.createElement("p");
          let myPickTeamsAwayText = document.createElement("p");
          myPickTeamsHomeText.textContent = homeTeam;
          myPickTeamsAwayText.textContent = awayTeam;
          myPickTeams.appendChild(myPickTeamsHomeText);
          myPickTeams.appendChild(myPickTeamsAwayText);
          myPickTeams.classList = "mypicks-teams";
          myPicksContainerEl.appendChild(myPickTeams);

          // Add My Pick Element to U/I
          let myPick = document.createElement("div");
          let myPickText = document.createElement("p");
          myPickText.textContent = myPickTeam;
          // Color Picks
          if (myPickTeam === winningTeam) {
            myPickText.classList = "mypick-correct-color";
            accArray.push(1);
          } else {
            myPickText.classList = "mypick-incorrect-color";
            accArray.push(0);
          }
          myPick.appendChild(myPickText);
          myPick.classList = "mypicks-mypick";
          myPicksContainerEl.appendChild(myPick);

          // Add Winning Team Element to U/I
          let myPickWinningTeam = document.createElement("div");
          let myPickWinningTeamText = document.createElement("p");
          myPickWinningTeamText.textContent = winningTeam;
          myPickWinningTeam.appendChild(myPickWinningTeamText);
          myPickWinningTeam.classList = "mypicks-winning-team";
          myPicksContainerEl.appendChild(myPickWinningTeam);
        }
      }

      // Accuracy Calculation
      let sum = 0;
      if (accArray.length > 0) {
        for (i = 0; i < accArray.length; i++) {
          sum += accArray[i];
        }
        accPerc = sum / accArray.length*100; 
        accuracyEl.textContent = accPerc;
      }

      // Color the Accuracy
      if (accPerc >= 50) {
        accColorEl.classList = "acc-color-good";
      } else {
        accColorEl.classList = "acc-color-bad";
      }
    });
});