function createLeg(legNumber) {
  // Create section element
  const section = document.createElement("section");
  section.classList.add(
    "col-6",
    "col-lg-2",
    "col-md-4",
    "card",
    "px-3",
    "pt-2"
  );

  // Create heading element
  const heading = document.createElement("h2");
  heading.classList.add("text-center");
  heading.textContent = `Leg ${legNumber}`;

  // Create form element
  const form = document.createElement("form");
  form.id = `leg${legNumber}Form`;

  // Create "In Use" label and select element
  const inUseLabel = document.createElement("label");
  inUseLabel.setAttribute("for", `leg${legNumber}Use`);
  inUseLabel.textContent = "In Use:";

  const inUseSelect = document.createElement("select");
  inUseSelect.classList.add("form-control");
  inUseSelect.id = `leg${legNumber}Use`;
  inUseSelect.setAttribute("required", "");

  // Create options for the select element
  const yesOption = document.createElement("option");
  yesOption.value = `yesUse${legNumber}`;
  yesOption.textContent = "Yes";

  const noOption = document.createElement("option");
  noOption.value = `noUse${legNumber}`;
  noOption.textContent = "No";

  inUseSelect.appendChild(yesOption);
  inUseSelect.appendChild(noOption);

  // Append "In Use" label and select element to form
  form.appendChild(inUseLabel);
  form.appendChild(inUseSelect);

  // Create div element for form elements after "In Use"
  const formAfterUseDiv = document.createElement("div");
  formAfterUseDiv.id = `leg${legNumber}FormAfterUse`;

  // Create Player Name label and input element
  const playerNameLabel = document.createElement("label");
  playerNameLabel.setAttribute("for", `leg${legNumber}PlayerName`);
  playerNameLabel.classList.add("pt-3");
  playerNameLabel.textContent = "Player Name:";

  const playerNameInput = document.createElement("input");
  playerNameInput.type = "text";
  playerNameInput.classList.add("form-control");
  playerNameInput.id = `leg${legNumber}PlayerName`;
  playerNameInput.placeholder = "First Last";
  playerNameInput.setAttribute("required", "");

  // Append Player Name label and input element to form after "In Use"
  formAfterUseDiv.appendChild(playerNameLabel);
  formAfterUseDiv.appendChild(playerNameInput);

  // Create Stat Category label and select element
  const statCategoryLabel = document.createElement("label");
  statCategoryLabel.setAttribute("for", `leg${legNumber}StatCategory`);
  statCategoryLabel.classList.add("pt-3");
  statCategoryLabel.textContent = "Stat:";

  const statCategorySelect = document.createElement("select");
  statCategorySelect.classList.add("form-control");
  statCategorySelect.id = `leg${legNumber}StatCategory`;
  statCategorySelect.setAttribute("required", "");

  // Create options for the select element
  const pointsOption = document.createElement("option");
  pointsOption.value = "points";
  pointsOption.textContent = "Points";

  const reboundsOption = document.createElement("option");
  reboundsOption.value = "rebounds";
  reboundsOption.textContent = "Rebounds";

  const assistsOption = document.createElement("option");
  assistsOption.value = "assists";
  assistsOption.textContent = "Assists";

  const pointsReboundsOption = document.createElement("option");
  pointsReboundsOption.value = "pointsrebounds";
  pointsReboundsOption.textContent = "Points + Rebounds";

  const pointsAssistsOption = document.createElement("option");
  pointsAssistsOption.value = "pointsassists";
  pointsAssistsOption.textContent = "Points + Assists";

  const reboundsAssistsOption = document.createElement("option");
  reboundsAssistsOption.value = "reboundsassists";
  reboundsAssistsOption.textContent = "Rebounds + Assists";

  const pointsReboundsAssistsOption = document.createElement("option");
  pointsReboundsAssistsOption.value = "pointsreboundsassists";
  pointsReboundsAssistsOption.textContent = "Points + Rebounds + Assists";

  statCategorySelect.appendChild(pointsOption);
  statCategorySelect.appendChild(reboundsOption);
  statCategorySelect.appendChild(assistsOption);
  statCategorySelect.appendChild(pointsReboundsOption);
  statCategorySelect.appendChild(pointsAssistsOption);
  statCategorySelect.appendChild(reboundsAssistsOption);
  statCategorySelect.appendChild(pointsReboundsAssistsOption);

  // Append Stat Category label and select element to formAfterUseDiv
  formAfterUseDiv.appendChild(statCategoryLabel);
  formAfterUseDiv.appendChild(statCategorySelect);

  // Create Stat Value label and input element
  const statValueLabel = document.createElement("label");
  statValueLabel.setAttribute("for", `leg${legNumber}StatValue`);
  statValueLabel.classList.add("pt-3");
  statValueLabel.textContent = "Stat Value:";

  const statValueInput = document.createElement("input");
  statValueInput.type = "number";
  statValueInput.classList.add("form-control");
  statValueInput.id = `leg${legNumber}StatValue`;
  statValueInput.value = "0";
  statValueInput.setAttribute("required", "");

  // Append Stat Value label and input element to formAfterUseDiv
  formAfterUseDiv.appendChild(statValueLabel);
  formAfterUseDiv.appendChild(statValueInput);

  // Create Comparison label and select element
  const comparisonLabel = document.createElement("label");
  comparisonLabel.setAttribute("for", `leg${legNumber}Comparison`);
  comparisonLabel.classList.add("pt-3");
  comparisonLabel.textContent = "Over/Under:";

  const comparisonSelect = document.createElement("select");
  comparisonSelect.classList.add("form-control");
  comparisonSelect.id = `leg${legNumber}Comparison`;
  comparisonSelect.setAttribute("required", "");

  // Create options for the select element
  const overOption = document.createElement("option");
  overOption.value = "over";
  overOption.textContent = "Over";

  const underOption = document.createElement("option");
  underOption.value = "under";
  underOption.textContent = "Under";

  comparisonSelect.appendChild(overOption);
  comparisonSelect.appendChild(underOption);

  // Append Comparison label and select element to formAfterUseDiv
  formAfterUseDiv.appendChild(comparisonLabel);
  formAfterUseDiv.appendChild(comparisonSelect);

  // Append formAfterUseDiv to form
  form.appendChild(formAfterUseDiv);

  // Create "Calculate Percentage" button
  const resultButton = document.createElement("button");
  resultButton.type = "button";
  resultButton.classList.add("mt-3", "btn", "btn-primary");
  resultButton.id = `leg${legNumber}ResultBtn`;
  resultButton.textContent = "Calculate Percentage";

  // Create result div
  const resultDiv = document.createElement("div");
  resultDiv.classList.add("text-center", "card", "my-3", "text-bg-light");
  resultDiv.id = `leg${legNumber}Result`;
  resultDiv.textContent = "Result";

  // Append all elements to the section
  section.appendChild(heading);
  section.appendChild(form);
  section.appendChild(resultButton);
  section.appendChild(resultDiv);

  return section;
}

// Append multiple legs
const legs = document.getElementById("legs"); // Replace 'parentElementId' with the actual ID of the parent element

for (let i = 1; i <= 6; i++) {
  const leg = createLeg(i);
  legs.appendChild(leg);
}
