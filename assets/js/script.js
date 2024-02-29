const apiKey = "c3f07d6f-281b-424a-9b17-3446652e7cc4";

// Establishes empty default variables.
let playerID;
let compareValue;
let legArray = [];

// Toggles visibility based on the "In Use" selection for each leg.
for (let legNumber = 1; legNumber <= 6; legNumber++) {
  $(`#leg${legNumber}Use`).on("change", function () {
    if ($(`#leg${legNumber}Use`).val() === "noUse") {
      $(`#leg${legNumber}FormAfterUse`).hide();
      $(`#leg${legNumber}ResultBtn`).hide();
      $(`#leg${legNumber}Result`).hide();
    } else {
      $(`#leg${legNumber}FormAfterUse`).show();
      $(`#leg${legNumber}ResultBtn`).show();
      $(`#leg${legNumber}Result`).show();
    }
  });
}

// Discovers playerID by name inputed by user.
function getPlayerID(legNumber) {
  // Converts user input into first and last name strings ready for parameter insertion.
  var fullName = $("#leg" + legNumber + "PlayerName").val();
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
      `https://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    )
      // Creates a JSON file of the data.
      .then(function (response) {
        return response.json();
      })
      // Assigns player ID to var playerID and logs it to the console.
      .then(function (data) {
        if (data.data.length > 0) {
          playerID = data.data[0].id;
          console.log(
            `Leg ${legNumber}'s playerID is set to ${playerID} for ${firstName} ${lastName}.`
          );
        } else {
          alert(
            `Sorry no player was found with player found for ${firstName} ${lastName}`
          );
          return;
        }
      })
  );
}

// Checks if the user entered a player name and stat value.
function checkSelections(legNumber) {
  if ($("#leg" + legNumber + "PlayerName").val() === "") {
    alert("Leg " + legNumber + " has no player selected.");
    location.reload();
  }
  if ($("#leg" + legNumber + "StatValue").val() === 0) {
    alert("Leg " + legNumber + " has no stat value selected.");
    location.reload();
  }
}

// Discovers stats for the last 15 games of a specific player.
// Note: The end_date= parameter did not work at all so seasons had to be used.
// TODO: Parameters seasons= and playerID= are static and need to be dynamic based on current/past year, and user inputs.
// TODO: Currently filtering out 0 point games but this may not be accurate. Chose to do so due to inaccurate 0 point games being returned by the API.
function getlast15games(legNumber) {
  return (
    fetch(
      `https://api.balldontlie.io/v1/stats?per_page=100&seasons[]=2023&player_ids[]=${playerID}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    )
      // Creates a JSON file of the data.
      .then(function (response) {
        return response.json();
      })
      // Logs the most recent 15 PPG for player to Console.
      .then(function (data) {
        // Deletes any previous array held within.
        legArray = [];
        if ($("#leg" + legNumber + "StatCategory").val() === "points") {
          var games = data.data
            .filter((game) => game.pts !== null) // Filter out games with null points.
            .filter((game) => game.pts !== 0) // Filter out games with 0 points.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.pts);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " points in his last 15 games."
          );
        }
        if ($("#leg" + legNumber + "StatCategory").val() === "rebounds") {
          var games = data.data
            .filter((game) => game.reb !== null) // Filter out games with null rebounds.
            .filter((game) => game.reb !== 0) // Filter out games with 0 rebounds.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.reb);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " rebounds in his last 15 games."
          );
        }
        if ($("#leg" + legNumber + "StatCategory").val() === "assists") {
          var games = data.data
            .filter((game) => game.ast !== null) // Filter out games with null assists.
            .filter((game) => game.ast !== 0) // Filter out games with 0 assists.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.ast);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " assists in his last 15 games."
          );
        }
        if (
          $("#leg" + legNumber + "StatCategory").val() === "reboundsassists"
        ) {
          var games = data.data
            .filter((game) => game.reb !== null) // Filter out games with null rebounds.
            .filter((game) => game.reb !== 0) // Filter out games with 0 rebounds.
            .filter((game) => game.ast !== null) // Filter out games with null assists.
            .filter((game) => game.ast !== 0) // Filter out games with 0 assists.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.reb + game.ast);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " rebounds and assists in his last 15 games."
          );
        }
        if ($("#leg" + legNumber + "StatCategory").val() === "pointsrebounds") {
          var games = data.data
            .filter((game) => game.pts !== null) // Filter out games with null points.
            .filter((game) => game.pts !== 0) // Filter out games with 0 points.
            .filter((game) => game.reb !== null) // Filter out games with null rebounds.
            .filter((game) => game.reb !== 0) // Filter out games with 0 rebounds.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.pts + game.reb);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " points and rebounds in his last 15 games."
          );
        }
        if ($("#leg" + legNumber + "StatCategory").val() === "pointsassists") {
          var games = data.data
            .filter((game) => game.pts !== null) // Filter out games with null points.
            .filter((game) => game.pts !== 0) // Filter out games with 0 points.
            .filter((game) => game.ast !== null) // Filter out games with null assists.
            .filter((game) => game.ast !== 0) // Filter out games with 0 assists.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.pts + game.ast);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " points and assists in his last 15 games."
          );
        }
        if (
          $("#leg" + legNumber + "StatCategory").val() ===
          "pointsreboundsassists"
        ) {
          var games = data.data
            .filter((game) => game.pts !== null) // Filter out games with null points.
            .filter((game) => game.pts !== 0) // Filter out games with 0 points.
            .filter((game) => game.reb !== null) // Filter out games with null rebounds.
            .filter((game) => game.reb !== 0) // Filter out games with 0 rebounds.
            .filter((game) => game.ast !== null) // Filter out games with null assists.
            .filter((game) => game.ast !== 0) // Filter out games with 0 assists.
            .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
            .slice(0, 15); // Takes the first 15 games after sorting.
          games.forEach(function (game, index) {
            legArray.push(game.pts + game.reb + game.ast);
          });
          console.log(
            "Player " +
              playerID +
              " got " +
              legArray.slice(0, 14) +
              " and " +
              legArray[14] +
              " points rebounds and assists in his last 15 games."
          );
        }
      })
  );
}

// Sets the value of compareValue to the user input in Stat Value.
function setCompareValue(legNumber) {
  compareValue = $("#leg" + legNumber + "StatValue").val();
}

// Calculate the percentage of satisfying values
function calculatePercentTruthy(legNumber) {
  // Calculate the number of values in the legArray that satisfy the condition
  let satisfyingValues = legArray.filter((value) => {
    if ($("#leg" + legNumber + "Comparison").val() == "over") {
      return value > compareValue;
    } else {
      return value < compareValue;
    }
  });
  const percentTruthy = (satisfyingValues.length / legArray.length) * 100;
  return percentTruthy;
}

// Display the result in legResult for the given leg
function displayPercent(percentTruthy, legNumber) {
  $(`#leg${legNumber}Result`).text(`${percentTruthy.toFixed(2)}%`);
}

// Event listener for Result Button for each leg
for (let legNumber = 1; legNumber <= 6; legNumber++) {
  $(`#leg${legNumber}ResultBtn`).on("click", async function () {
    checkSelections(legNumber);
    await getPlayerID(legNumber);
    await getlast15games(legNumber);
    setCompareValue(legNumber);
    let percentTruthy = calculatePercentTruthy(legNumber);
    displayPercent(percentTruthy, legNumber);
  });
}

// Function to calculate the total percentage
function calculateTotalPercentage() {
  // Initialize total percentage
  let totalPercentage = 1;
  // Iterate through all the visible legs
  for (let legNumber = 1; legNumber <= 6; legNumber++) {
    // Check if the leg is visible
    if ($(`#leg${legNumber}FormAfterUse`).is(":visible")) {
      // Get the percentage for the current leg
      let legPercentage = parseFloat($(`#leg${legNumber}Result`).text());
      // Multiply the total percentage by the current leg's percentage
      totalPercentage *= legPercentage / 100;
    }
  }
  // Convert total percentage to percentage format and display it
  let formattedTotalPercentage = (totalPercentage * 100).toFixed(2);
  $("#totalResult").text(`${formattedTotalPercentage}%`);

  $("#finalThought").empty();
  let formattedMinimumPayout = (100 / formattedTotalPercentage).toFixed(2);
  const finalThought = $("<h2>")
    .addClass("text-center")
    .text(
      "That's a good bet if the payout is more than " +
        formattedMinimumPayout +
        "X."
    );
  $("#finalThought").append(finalThought);
}

// Attach click event to totalResultBtn
$("#totalResultBtn").on("click", async function () {
  for (let legNumber = 1; legNumber <= 6; legNumber++) {
    // Check if the leg is visible
    if ($(`#leg${legNumber}FormAfterUse`).is(":visible")) {
      checkSelections(legNumber);
      await getPlayerID(legNumber);
      await getlast15games(legNumber);
      setCompareValue(legNumber);
      let percentTruthy = calculatePercentTruthy(legNumber);
      displayPercent(percentTruthy, legNumber);
    }
  }
  calculateTotalPercentage();
});

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
