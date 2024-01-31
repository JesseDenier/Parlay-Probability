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
          `playerId is set to ${playerId} for ${firstName} ${lastName}.`
        );
      } else {
        alert(`No player found for ${firstName} ${lastName}`);
        return;
      }
    });
});

// Establises an empty array assigned to variable leg1PointsArray which can be filled with values.
var leg1PointsArray = new Array();

// Discovers PPG for the last 15 games of a specific player.
// Note: The end_date= parameter did not work at all so seasons had to be used.
// TODO: Parameters seasons= and playerid= are static and need to be dynamic based on current/past year, and user inputs.
// TODO: Currently filtering out 0 point games but this may not be accurate. Chose to do so due to inaccurate 0 point games being returned by the API.
$("#leg1StatCategory").on("blur", function () {
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
      leg1PointsArray = [];
      var games = data.data
        .filter((game) => game.pts !== null) // Filter out games with null points.
        .filter((game) => game.pts !== 0) // Filter out games with 0 points.
        .sort((a, b) => new Date(b.game.date) - new Date(a.game.date)) // Sorts games by date
        .slice(0, 15); // Takes the first 15 games after sorting.
      //TODO: Understand how .forEach works vs a for loop.
      games.forEach(function (game, index) {
        leg1PointsArray.push(game.pts);
        //! All of this was necessary due to time zone issues causing date to appear as 1 day previous. It was only needed for testing if getting the most recent games was working. Leaving in in case it needs to be tested again.
        /*
        var parsedDate = Date.parse(game.game.date);
        var date = new Date(parsedDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        });
        console.log(`Game ${index + 1}: Date: ${date}, Points: ${game.pts}`);
        */
      });
      console.log(leg1PointsArray);
    });
});

// Establishes compareValue as a variable that can be affected and called later. Sets it's default based on the default option of the HTML.
var compareValue = $("#leg1StatValue").val();

// Sets the value of compareValue to the user input in Stat Value.
$("#leg1StatValue").on("blur", function () {
  compareValue = $("#leg1StatValue").val();
  console.log(`compareValue is set to ${compareValue}.`);
});

// Establises comparison as a variable that can be affected and called later. Sets it's default based on the default option of the HTML.
var comparison = ">";

$("#leg1Comparison").on("blur", function () {
  if ($("#leg1Comparison").val() == "over") {
    comparison = ">";
  } else {
    comparison = "<";
  }
  console.log(`comparison is set to ${comparison}`);
});

// TODO: Currently the user is required to click in and out of stat: to make the array to compare to. This should be changed in case the user leaves it at default "points."
// In the future should compare the leg1PointsArray to the compareValue based on comparison. The result of percent truthy should appear in leg1Result.
$("#leg1ResultBtn").on("click", function () {
  // Alerts the user if they haven't entered a player name.
  if (playerId === undefined) {
    alert("A player must be entered into Player Name.");
    return;
  }
  leg1PointsArray.forEach(function () {
    console.log(
      "This is where each value in leg1PointsArray should be compared using comparison to compareValue, and the result of percent truthy should appear in leg1Result."
    );
  });
});

/*
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
*/
