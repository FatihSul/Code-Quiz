const clearButton = document.getElementById("clear-button")

clearButton.addEventListener("click", clearData)

function clearData(){
localStorage.clear();
}