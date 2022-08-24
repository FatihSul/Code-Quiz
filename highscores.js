const highScores = JSON.parse(localStorage.getItem('highScores'))
const topHighScores = document.getElementById("topHighScores")
const clearButton = document.getElementById("clear-button")


topHighScores.innerHTML = highScores 

for (let i = 0; i < highScores.length; i++) {
    var scores = document.createElement("li")
    scores.textContent = highScores
    scores.setAttribute("class", "list")
}

clearButton.addEventListener("click", clearData)

function clearData(){
localStorage.clear();
}