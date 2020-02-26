// Elements selection and variables declarations

var table = document.querySelector("tbody");
var resetBtn = document.querySelector("#reset");
var row;
var data;

// Get scores object from local storage and sort in case of more than one record

var scoresList = JSON.parse(localStorage.getItem("scores"));
if (scoresList && scoresList.length > 1) {
  scoresList.sort(compare);
}

// Render table function invocation

renderTable();

// Render table function by creating rows and data cells wiith values
// from local storage and appending to table. If no stored scores, the function will create
//  a an element and display message.

function renderTable() {
  table.innerHTML = "";
  if (scoresList) {
    for (let i = 0; i < scoresList.length; i++) {
      row = document.createElement("tr");
      table.appendChild(row);
      data = document.createElement("td");
      data.textContent = i + 1;
      row.appendChild(data);
      for (let key in scoresList[i]) {
        data = document.createElement("td");
        data.textContent = scoresList[i][key];
        row.appendChild(data);
      }
    }
  } else {
    row = document.createElement("tr");
    table.appendChild(row);
    data = document.createElement("td");
    data.textContent = "No scores saved";
    row.appendChild(data);
  }
}

// Adding event listener to reset button and clear local storage.

resetBtn.addEventListener("click", function() {
  localStorage.removeItem("scores");
  renderTable();
  location.reload();
});

// compare function to pass to sort function to sort the scores according to score.

function compare(a, b) {
  const A = a.score;
  const B = b.score;
  let comparison = 0;
  if (A < B) {
    comparison = 1;
  } else if (A > B) {
    comparison = -1;
  }
  return comparison;
}
