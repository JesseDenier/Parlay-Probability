// Placeholder JS for the function to calculate percent of leg 1.
$("#leg1ResultBtn").on("click", function () {
  $("#leg1Result").text("100%");
});

// Placeholder JS for the function to calculate percent of leg 2.
$("#leg2ResultBtn").on("click", function () {
  $("#leg2Result").text("100%");
});

// Placeholder JS for the function to calculate percent of leg 3.
$("#leg3ResultBtn").on("click", function () {
  $("#leg3Result").text("100%");
});

// Placeholder JS for the function to calculate percent of leg 4.
$("#leg4ResultBtn").on("click", function () {
  $("#leg4Result").text("100%");
});

// Placeholder JS for the function to calculate percent of leg 5.
$("#leg5ResultBtn").on("click", function () {
  $("#leg5Result").text("100%");
});

// Placeholder JS for the function to calculate percent of leg 6.
$("#leg6ResultBtn").on("click", function () {
  $("#leg6Result").text("100%");
});

// Placeholder HS for the function to calculate total percent.
$("#totalResultBtn").on("click", function () {
  $("#totalResult").text("100%");
});

// Function to toggle visibility based on the "In Use" selection for a leg.
// TODO: Learn what exactly legID is doing in this function.
function toggleLegVisibility(legId) {
  $(`#leg${legId}Use`).on("change", function () {
    if ($(`#leg${legId}Use`).val() === "noUse") {
      $(`#leg${legId}FormAfterUse`).hide();
      $(`#leg${legId}ResultBtn`).hide();
      $(`#leg${legId}Result`).hide();
    } else {
      $(`#leg${legId}FormAfterUse`).show();
      $(`#leg${legId}ResultBtn`).show();
      $(`#leg${legId}Result`).show();
    }
  });
}

// Loop through legs 1 through 6 and apply the toggleLegVisibility function to each leg.
// TODO: Learn how the js knows which i value to use based on which leg you clicked.
for (let i = 1; i <= 6; i++) {
  toggleLegVisibility(i);
}
