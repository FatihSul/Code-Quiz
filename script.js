const header = document.getElementById("header")
const timer = document.getElementById("timer")
const startButton = document.getElementById("start-btn")
const highscoreButton = document.getElementById("highscores-btn")
const questionContainer = document.getElementById("question-container")
const quizQuestions = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const endScreen = document.getElementById("endScreen")
const submitButton = document.getElementById("submit-btn")


var timerInterval;
var secondsLeft = 80;
let currentQuestion = 0

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

function nextQuestion(currentQuestion){
    if(secondsLeft <= 0 || currentQuestion == 5){
        endQuiz()
        console.log("game over")
    } else {
        showQuestion(questions[currentQuestion])
    }
}

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

function setTime(){
    timerInterval = setInterval(
      function() {
        secondsLeft--;      //secondsLeft -= 1
        timer.textContent = "Timer: " + secondsLeft + " seconds left"
        
        if (secondsLeft === 0){
          clearInterval(timerInterval);
        }
      },
      1000
    )
  }

function endQuiz(){
    clearInterval(timerInterval)
    questionContainer.classList.add("hide")
    endScreen.classList.remove("hide")
    // JSON the submittion to save the initials for highscore
}


startButton.addEventListener("click", startGame)
answerButtons.addEventListener("click", checkAnswer)
// submitButton.addEventListener("click", )



