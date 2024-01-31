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

// Fetches the BallDon'tLie Stats API.
fetch("https://www.balldontlie.io/api/v1/stats")
  // Creates a JSON file of the data.
  .then(function (response) {
    return response.json();
  })
  // Logs the data to the console.
  .then(function (data) {
    console.log(data);
  });

// Discovers player ID by Name inputed by user.
$(`#leg1PlayerName`).on("blur", function () {
  // Converts user input into first and last name.
  var fullName = $(this).val();
  var words = fullName.split(" ");
  if (words.length === 2) {
    var firstName = words[0];
    console.log("First Name = " + firstName);
    var lastName = words[1];
    console.log("Last Name = " + lastName);
  } else alert("Names must formatted as 'FirstName LastName'");
  // Fetches the BallDon'tLie ID API.
  fetch(
    `https://www.balldontlie.io/api/v1/players?search=${firstName} ${lastName}`
  )
    // Creates a JSON file of the data.
    .then(function (response) {
      return response.json();
    })
    // Logs the player ID to the console.
    // TODO: Make it so it assigned the player ID to a value which can be referenced later.
    .then(function (data) {
      if (data.data.length > 0) {
        const playerId = data.data[0].id;
        console.log(`Player ID for ${firstName} ${lastName}: ${playerId}`);
      } else {
        console.log(`No player found for ${firstName} ${lastName}`);
      }
    });
});
