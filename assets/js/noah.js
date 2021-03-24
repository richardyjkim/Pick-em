var data = [];
var dates = {};
var datesArray = [];
var game = [];
var picks = [];
var gameContainerEl = document.querySelector("#games-container");

// Modal
window.onload = function () {
  document.getElementById("close").onclick = function () {
    document.getElementById("modal").style.display = "none"
  };
};

// schedule
fetch(
  "https://api.sportsdata.io/v3/mlb/scores/json/Games/%7B2021PRE%7D?key=a608c9ea43e14291881e0e8e6617941e"
)
  .then((response) => response.json())
  .then((response) => {
    // Sort data from API to data we need
    response.forEach((item) => {
      dates[item.Day.split("T")[0]]
        ? dates[item.Day.split("T")[0]]++
        : (dates[item.Day.split("T")[0]] = 1);
      data.push({
        Day: item.Day.split("T")[0],
        AwayTeam: item.AwayTeam,
        HomeTeam: item.HomeTeam,
        ForcastTempHigh: item.ForcastTempHigh,
        ForecastWindSpeed: item.ForecastWindSpeed,
      });
    });
    // Filter daily games
    let today     
    let displayGames = function () {
      today = $("#gameday").val()
      game = data.filter((games) => games.Day === today);
      console.log(game);

      datesArray = Object.entries(dates);
      // Add buttons for teams
      game.map((teams) => {
        // Buttons for teams into cards
        const div = $("<div>").addClass("card")
        const teamInfo = $("<div>").addClass("card-content level")
        const awayTeamEl = $("<button>");
        const homeTeamEl = $("<button>");
        awayTeamEl.addClass("list-item away-team mlb button is-medium is-danger");
        homeTeamEl.addClass("list-item home-team mlb button is-medium is-link");
        awayTeamEl.data("team", teams.AwayTeam);
        homeTeamEl.data("team", teams.HomeTeam);
        console.log(homeTeamEl.data("team"));
        awayTeamEl.text(teams.AwayTeam);
        homeTeamEl.text(teams.HomeTeam);
        teamInfo.append(awayTeamEl);
        teamInfo.append(homeTeamEl);
        div.append(teamInfo)
        $("#gameCards").append(div)
        // User picks to localStorage
        awayTeamEl.click(function () {
          let team = $(this).data("team");
          console.log(this)
          picks.push(team)
          localStorage.setItem("My Pick", JSON.stringify(picks));
          console.log(team);
        });
        homeTeamEl.click(function () {
          let team = $(this).data("team");
          console.log(this)
          picks.push(team)
          localStorage.setItem("My Pick", JSON.stringify(picks));
          console.log(team);
        });
      });
    }
    $(".submit").on("click", displayGames)
  })

  .catch((err) => {
    console.error(err);
  });

// api key: a608c9ea43e14291881e0e8e6617941e