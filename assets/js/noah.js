// standings
// fetch("https://api.sportsdata.io/v3/mlb/scores/json/Standings/%7B2021%7D?key=a608c9ea43e14291881e0e8e6617941e")
// .then(response =>
//     response.json())
//     .then(response=>{
//     console.log(response)})

// .catch(err => {
// 	console.error(err);
// });
// console.log(moment("20111031").format());
var data = [];
var dates = {};
var datesArray = [];
var game = [];
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
        });
    });
    console.log(data);

    game = data.filter((games) => games.Day === "2021-03-16");
    console.log(game);
    console.log(datesArray);
    datesArray = Object.entries(dates);
    for (i = 0; i < datesArray.length; i++) {
    //   console.log(datesArray[i][0]);
    //   console.log(datesArray[i][1]);
    }
  })
  .catch((err) => {
    console.error(err);
  });

// box score
// fetch("https://api.sportsdata.io/v3/mlb/stats/json/BoxScores/%7Bdate%7D?key=a608c9ea43e14291881e0e8e6617941e")
// .then(response =>
//     response.json())
//     .then(response=>{
//     console.log(response)})

// .catch(err => {
// 	console.error(err);
// });

// api key: a608c9ea43e14291881e0e8e6617941e
// schedule: https://sportsdata.io/developers/api-documentation/mlb#/scores/schedules
// standings: https://sportsdata.io/developers/api-documentation/mlb#/base/standings
// wins, losses, teamID, season (pre),
// box scores: https://sportsdata.io/developers/api-documentation/mlb#/player-stats/box-scores-by-date
