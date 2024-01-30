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
