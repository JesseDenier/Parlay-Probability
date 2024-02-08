// Establishes default variables that can be changed later.
let playerId;
let compareValue;
var leg1Array = [];

// Toggle visibility based on the "In Use" selection for each leg.
for (let i = 1; i <= 6; i++) {
  $(`#leg${i}Use`).on("change", function () {
    if ($(`#leg${i}Use`).val() === "noUse") {
      $(`#leg${i}FormAfterUse`).hide();
      $(`#leg${i}ResultBtn`).hide();
      $(`#leg${i}Result`).hide();
    } else {
      $(`#leg${i}FormAfterUse`).show();
      $(`#leg${i}ResultBtn`).show();
      $(`#leg${i}Result`).show();
    }
  });
}

// Discovers player ID by name inputed by user.
function getPlayerId() {
  // Converts user input into first and last name strings ready for the parameter insertion.
  var fullName = $("#leg1PlayerName").val();
  var words = fullName.split(" ");
  if (words.length === 2) {
    var firstName = words[0];
    var lastName = words[1];
  } else {
    alert('Names must formatted as "FirstName LastName."');
    return;
  }
  // Fetches the BallDon'tLie ID Search API.
  return (
    fetch(
      `https://www.balldontlie.io/api/v1/players?search=${firstName} ${lastName}`
    )
      // Creates a JSON file of the data.
      .then(function (response) {
        return response.json();
      })
      // Assigns player ID to var playerID and logs it to the console.
      // TODO: Make it so var playerID can be referenced by other functions.
      .then(function (data) {
        if (data.data.length > 0) {
          playerId = data.data[0].id;
          console.log(
            `The playerId is set to ${playerId} for ${firstName} ${lastName}.`
          );
        } else {
          alert(`No player found for ${firstName} ${lastName}`);
          return;
        }
      })
  );
}

// Alerts the user if they haven't entered a player name.
function checkPlayer() {
  if (playerId === undefined) {
    alert("A player must be entered into Player Name.");
    return;
  }
}

// Discovers PPG for the last 15 games of a specific player.
// Note: The end_date= parameter did not work at all so seasons had to be used.
// TODO: Parameters seasons= and playerid= are static and need to be dynamic based on current/past year, and user inputs.
// TODO: Currently filtering out 0 point games but this may not be accurate. Chose to do so due to inaccurate 0 point games being returned by the API.
function getlast15games() {
  return (
    fetch(
      `https://www.balldontlie.io/api/v1/stats?per_page=100&seasons[]=2023&player_ids[]=${playerId}`
    )
      // Creates a JSON file of the data.
      .then(function (response) {
        return response.json();
      })
      // Logs the most recent 15 PPG for player to Console.
      .then(function (data) {
        // Deletes any previous array held within.
        leg1Array = [];
        if ($("#leg1StatCategory").val() === "points") {
          var games = data.data
            .filter((game) => game.pts !== null) // Filter out games with null points.
            .filter((game) => game.pts !== 0) // Filter out games with 0 points.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            leg1Array.push(game.pts);
          });
          console.log("He got " + leg1Array + " points in his last 15 games.");
        }
        if ($("#leg1StatCategory").val() === "rebounds") {
          var games = data.data
            .filter((game) => game.reb !== null) // Filter out games with null rebounds.
            .filter((game) => game.reb !== 0) // Filter out games with 0 rebounds.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            leg1Array.push(game.reb);
          });
          console.log(
            "He got " + leg1Array + " rebounds in his last 15 games."
          );
        }
        if ($("#leg1StatCategory").val() === "assists") {
          var games = data.data
            .filter((game) => game.ast !== null) // Filter out games with null assists.
            .filter((game) => game.ast !== 0) // Filter out games with 0 assists.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            leg1Array.push(game.ast);
          });
          console.log("He got " + leg1Array + " assists in his last 15 games.");
        }
      })
  );
}

// Sets the value of compareValue to the user input in Stat Value.
function setCompareValue() {
  compareValue = $("#leg1StatValue").val();
  console.log(`The chosen spread value is set to ${compareValue}.`);
}

// Calculate the percentage of satisfying values
function calculatePercentTruthy() {
  // Calculate the number of values in leg1Array that satisfy the condition
  let satisfyingValues = leg1Array.filter((value) => {
    if ($("#leg1Comparison").val() == "over") {
      console.log("Let's check what percent is over.");
      return value > compareValue;
    } else {
      console.log("Let's check what percent is under.");
      return value < compareValue;
    }
  });
  const percentTruthy = (satisfyingValues.length / leg1Array.length) * 100;
  return percentTruthy;
}

// Display the result in legResult for the given leg
function displayPercent(percentTruthy, leg) {
  console.log(`It's ${percentTruthy}% for leg ${leg}.`);
  $(`#leg${leg}Result`).text(`${percentTruthy.toFixed(2)}%`);
}

// Event listener for Result Button for each leg
for (let i = 1; i <= 6; i++) {
  $(`#leg${i}ResultBtn`).on("click", async function () {
    await getPlayerId();
    checkPlayer();
    await getlast15games();
    setCompareValue();
    let percentTruthy = calculatePercentTruthy();
    displayPercent(percentTruthy, i);
  });
}

//! All of this was necessary due to time zone issues causing date to appear as 1 day previous. It was only needed for testing if getting the most recent games was working. Leaving in in case it needs to be tested again. This was in the getlast15games function.
/*
var parsedDate = Date.parse(game.game.date);
var date = new Date(parsedDate).toLocaleDateString(undefined, {
  year: "numeric",
  day: "2-digit",
  timeZone: "UTC",
});
console.log(`Game ${index + 1}: Date: ${date}, Points: ${game.pts}`);
*/
