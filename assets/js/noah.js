var data = [];
var dates = {};
var datesArray = [];
var game = [];
var gameContainerEl = document.querySelector("#games-container");
var gamesListEl = document.querySelector("#games-list");

// schedule
fetch(
  "https://api.sportsdata.io/v3/mlb/scores/json/Games/%7B2021PRE%7D?key=a608c9ea43e14291881e0e8e6617941e"
)
  .then((response) => response.json())
  .then((response) => {
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
    // console.log(data);

    game = data.filter((games) => games.Day === "2021-03-18");
    // console.log(game);
    // console.log(game[0].HomeTeam, game[0].AwayTeam)
    // console.log(datesArray);
    datesArray = Object.entries(dates);
    game.map((teams) => {
      // console.log(teams.HomeTeam, teams.AwayTeam)
      const awayTeamEl = $("<button>");
      const homeTeamEl = $("<button>");
      awayTeamEl.addClass("list-item away-team mlb");
      homeTeamEl.addClass("list-item home-team mlb");
      awayTeamEl.data("team", teams.AwayTeam);
      homeTeamEl.data("team", teams.HomeTeam);
      awayTeamEl.text(teams.AwayTeam);
      homeTeamEl.text(teams.HomeTeam);
      $("#games-container").append(awayTeamEl);
      $("#games-container").append(homeTeamEl);
    });
    $("button").click(function () {
      let team = $(this).data("team");
      localStorage.setItem("My Pick", team);
      console.log(team);
    });
  })

  .catch((err) => {
    console.error(err);
  });

// api key: a608c9ea43e14291881e0e8e6617941e
