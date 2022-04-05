//global selectors
var startBttn= document.getElementById("start");
var timeProgress= document.getElementById("countdown");
var displayDiv= document.getElementById("display");
var gameScores= document.getElementsByClassName("score-container");

//global variables
var timeLeft = 76;
var quizCompleted = false;
var q = 0;
var myQuestions = [
    {
        question: "_____ is a block of code designed to perform a particular task",
        answers: {
          a: 'Method',
          b: 'Function',
          c: 'Array'
        },
        correctAnswer: 'b'
      },
      {
        question: "Which method extracts a part of a string and returns the extracted part in a new string?",
        answers: {
          a: 'Slice()',
          b: 'Remove()',
          c: 'Concat()'
        },
        correctAnswer: 'a'
      },
      {
        question: "What is the correct operator for not equal value or not equal type?",
        answers: {
          a: '!=',
          b: '!==',
          c: '!'
        },
        correctAnswer: 'b'
      },
      {
        question: "What is the correct operator for equal value?",
        answers: {
          a: '=',
          b: '===',
          c: '=='
        },
        correctAnswer: 'c'
      },
];


//score will be based on timer, if question is wrong, time (15 seconds) substracted from timer
//game is over when all myQuestions are answered or timer reaches 
//when game is over, user enters initials
//Store high scores - localStorage
//listener on start button, when click it starts the myQuestions
startBttn.addEventListener("click", startQuiz);

//timer starts
function countdown() {
    startBttn.disabled = true;
    var timeInterval = setInterval(function(){
        timeLeft--;
        timeProgress.textContent = timeLeft;
        //hide or prevent clock to start again
        if (quizCompleted === true){
          clearInterval(timeInterval);
          //ask for name to store score
          var nameScore = window.prompt("Your score is " + timeLeft + "." + " Enter your name:" );
          //store highScore
          var highScores = JSON.parse(localStorage.getItem("highScores"));
          if (highScores == null) {
            localStorage.setItem("highScores", JSON.stringify([{"Name": nameScore, "Score": timeLeft}]));
          } else {
            highScores.push({"Name": nameScore, "Score": timeLeft});
            localStorage.setItem("highScores", JSON.stringify(highScores));
          }
          startBttn.disabled = false;
        } 
        if(timeLeft === 0){
            clearInterval(timeInterval);
            startBttn.disabled = false;
        }
},
1000);
}
//myQuestions start to pop
function displayQuestion(questionObject, selectedAns) {
    var answers = questionObject["answers"];
    var question = questionObject["question"];
    displayDiv.innerHTML = "<p>"+ question +"</p> <ul id='answers-list'></ul> <span id='question-result'></span>";
    for(answer in answers){
        var li = document.createElement("li"); //creates an li
        li.setAttribute("data-answer", answer); 
        li.setAttribute("data-question", myQuestions.indexOf(question));
        var button = document.createElement("button");
        button.textContent = answers[answer];
        li.appendChild(button);
        document.getElementById("answers-list").appendChild(li);
    }
    //questions wrong or correct message
    if (selectedAns !== null){
      if (myQuestions[q-1]["correctAnswer"] === selectedAns) {
          document.getElementById("question-result").textContent= "Correct!";
      } else {
          document.getElementById("question-result").textContent= "Wrong!";
           //substract timeInterval by 15 seconds
          timeLeft = timeLeft - 15;
      }
     
    }
  }
//confirm correct/incorrect
displayDiv.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        q++;
        var selectedAns = element.parentElement.getAttribute("data-answer");
        if (myQuestions[q] == null) {
          quizCompleted = true;
        } else {
          displayQuestion(myQuestions[q], selectedAns); 
        }
    }
  });

//function displayScore & stops counter
function gameOver(){

//show score
//ask for name
//store score & namee
//show high scores
  }

//funtion that starts quiz, reset values to default
function startQuiz() {
  timeLeft = 76;
  quizCompleted = false;
  q = 0;
  countdown();
  // for (let index = 0; index < myQuestions.length; index++) {
  displayQuestion(myQuestions[q], null)
  //   } 
}