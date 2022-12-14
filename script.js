const header = document.getElementById("header")
const timer = document.getElementById("timer")
const startButton = document.getElementById("start-btn")
const highscoreButton = document.getElementById("highscores-btn")
const questionContainer = document.getElementById("question-container")
const quizQuestions = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const endScreen = document.getElementById("endScreen")

var timerInterval;
var secondsLeft = 80;
let currentQuestion = 0



// quiz questions in order
const questions = [
    {   question: "What does HTML stand for?",
        answers: [
        {text: "Hidden Text Mini Language", correct: false},
        {text: "Hardtack Tortilla Michetta Lagana", correct: false},
        {text: "Hidden Technology Mother Language", correct: false},
        {text: "Hyper Text Markup Language", correct: true}
    ]},
    {   question: "Which of the following displays bullet points?",
        answers: [
        {text: "<ul>", correct: false},
        {text: "<a>", correct: false},
        {text: "<li>", correct: true},
        {text: "<button>", correct: false}
    ]},
    {   question: "In CSS, which symbol refers to the id?",
        answers: [
        {text: "#", correct: true},
        {text: "!", correct: false},
        {text: ".", correct: false},
        {text: ";", correct: false}
    ]},
    {   question: "What color does #fff refer to?",
        answers: [
        {text: "black", correct: false},
        {text: "white", correct: true},
        {text: "blue", correct: false},
        {text: "red", correct: false}
    ]},
    {   question: "What command will define a variable in Js?",
        answers: [
        {text: "const", correct: true},
        {text: "function", correct: false},
        {text: "console.log", correct: false},
        {text: "addEventListener", correct: false}
    ]}
]

// beginning of the quiz
function startGame(){
    questionContainer.classList.remove("hide")
    header.classList.add("hide")
    timer.classList.remove("hide")
    startButton.classList.add("hide")
    highscoreButton.classList.add("hide")
    nextQuestion(currentQuestion)
    setTime()
    console.log("here")
}


// reads if youve got to 0 seconds or the end to then end the game & if not then continue to the next
function nextQuestion(currentQuestion){
    if(secondsLeft <= 0 || currentQuestion == 5){
        endQuiz()
        timer.textContent = "Your score: " + secondsLeft
        console.log("game over")
    } else {
        showQuestion(questions[currentQuestion])
    }
}


// loads the next question and answers after removing the previous answer buttons
function showQuestion(question){
    answerButtons.innerHTML = ""
    quizQuestions.innerText = question.question
    console.log(question.question)
    for (let index = 0; index < question.answers.length; index++) {
        console.log(question.answers[index])
        var buttonEl = document.createElement("button")
        buttonEl.textContent = question.answers[index].text
        buttonEl.dataset.correct = question.answers[index].correct
        buttonEl.setAttribute("class", "btn")
        answerButtons.append(buttonEl)
    }
}


// checks to see if the chosen answer is correct and if not then deduct seconds/points from your total
function checkAnswer(event){
    console.log(event.target.dataset.correct)
    if (event.target.dataset.correct == "true"){
        // if correct move on to the next question
        console.log("correct")
        currentQuestion ++
        nextQuestion(currentQuestion)
    } else {
        secondsLeft -= 15;
        timer.textContent = "Timer: " + secondsLeft + " seconds left"
        console.log("incorrect")
        currentQuestion ++
        nextQuestion(currentQuestion)
    }
}

// sets the timer on start
function setTime(){
    timerInterval = setInterval(
      function() {
        secondsLeft--; 
        timer.textContent = "Timer: " + secondsLeft + " seconds left"
        
        if (secondsLeft === 0){
          clearInterval(timerInterval);
        }
      },
      1000
    )
  }

// pulls up the ending screen
function endQuiz(){
    clearInterval(timerInterval)
    questionContainer.classList.add("hide")
    endScreen.classList.remove("hide")
}


startButton.addEventListener("click", startGame)
answerButtons.addEventListener("click", checkAnswer)
// submitButton.addEventListener("click", saveScore)

function saveScore(){
    const initials = document.querySelector(".form-control").value
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const score = {
        score: secondsLeft,
        initials
    };
    console.log(highScores)
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores))
    console.log(initials)
}
