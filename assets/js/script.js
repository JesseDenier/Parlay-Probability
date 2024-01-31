// Placeholder JS for the function to calculate percent of legs.
// TODO: Learn how the js knows which i value to use based on which leg you clicked. (This happens later as well.)
for (let i = 1; i <= 6; i++) {
  $(`#leg${i}ResultBtn`).on("click", function () {
    $(`#leg${i}Result`).text("100%");
  });
}

// Placeholder JS for the function to calculate total percent.
$("#totalResultBtn").on("click", function () {
  $("#totalResult").text("100%");
});

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

// Establishes playerID as a variable that can be affected and called later.
var playerId;

// Discovers player ID by name inputed by user.
$(`#leg1PlayerName`).on("blur", function () {
  console.log("Leg 1 Player Name Blurred");
  // Converts user input into first and last name.
  var fullName = $(this).val();
  var words = fullName.split(" ");
  if (words.length === 2) {
    var firstName = words[0];
    var lastName = words[1];
  } else {
    alert('Names must formatted as "FirstName LastName."');
    return;
  }
  // Fetches the BallDon'tLie ID Search API.
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
          `var playerId is set to ${playerId} for ${firstName} ${lastName}.`
        );
      } else {
        alert(`No player found for ${firstName} ${lastName}`);
        return;
      }
    });
});

// Discovers PPG for the last 15 games of a specific player.
// Note: The end_date= parameter did not work at all so seasons had to be used.
// TODO: Parameters seasons= and playerid= are static and need to be dynamic based on current/past year, and user inputs.
// TODO: Currently filtering out 0 point games but this may not be accurate. Chose to do so due to inaccurate 0 point games being returned by the API.
$("#leg1StatCategory").on("blur", function () {
  console.log("Leg 1 Stat Category Blurred");
  fetch(
    `https://www.balldontlie.io/api/v1/stats?per_page=100&seasons[]=2023&player_ids[]=${playerId}`
  )
    // Creates a JSON file of the data.
    .then(function (response) {
      return response.json();
    })
    // Logs the most recent 15 PPG for player to Console.
    .then(function (data) {
      var games = data.data
        .filter((game) => game.pts !== null) // Filter out games with null points.
        .filter((game) => game.pts !== 0) // Filter out games with 0 points.
        .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
        .slice(0, 15); // Takes the first 15 games after sorting.

      //TODO: Understand how .forEach works vs a for loop.
      games.forEach((game, index) => {
        // All of this was necessary due to time zone issues causing date to appear as 1 day previous.
        var parsedDate = Date.parse(game.game.date);
        var date = new Date(parsedDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        });
        var pointsScored = game.pts;
        console.log(
          `Game ${index + 1}: Date: ${date}, Points: ${pointsScored}`
        );
      });
    });
});
