var table = document.querySelector("tbody");
var resetBtn = document.querySelector("#reset");
var row;
var data;

var scoresList = JSON.parse(localStorage.getItem("scores"));
if (scoresList && scoresList.length > 1) {
  scoresList.sort(compare);
}

renderTable();

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

resetBtn.addEventListener("click", function() {
  localStorage.removeItem("scores");
  renderTable();
  location.reload();
});

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
