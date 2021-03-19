const data = [];
const dates = {};
const datesArray = [];
const game = [];
const picks = [];
const gameContainerEl = document.querySelector("#games-container");
const gamesListEl = document.querySelector("#games-list");

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
    // console.log(data);
    // Filter daily games
    // let today = moment().format("MMM Do YY");
    game = data.filter((games) => games.Day === "2021-03-19" /*today*/);
    // console.log(game);
    // console.log(game[0].HomeTeam, game[0].AwayTeam)
    // console.log(datesArray);
    datesArray = Object.entries(dates);
    // Add buttons for teams
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
    // User picks to localStorage
    $("button").click(function () {
      let team = $(this).data("team");
      picks.push(team)
      localStorage.setItem("My Pick", JSON.stringify(picks));
      console.log(team);
    });
  })

  .catch((err) => {
    console.error(err);
  });

// api key: a608c9ea43e14291881e0e8e6617941e
