var startBttn= document.getElementById("start");
var timeProgress= document.getElementById("countdown");
var displayDiv= document.getElementById("display");
var gameScores= document.getElementsByClassName("score-container");
var showScores= document.getElementById("show-scores");
var highScoresUl=document.getElementById("high-scores-list");

//global variables
var highScores = [];
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
      {
        question: "What is DOM?",
        answers: {
          a: 'DOM stands for Document Object Model',
          b: 'OM is a programming interface for HTML and XML documents',
          c: 'All of the above'
        },
        correctAnswer: 'c'
      },
];

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
          highScores = JSON.parse(localStorage.getItem("highScores"));
          if (highScores == null) {
            localStorage.setItem("highScores", JSON.stringify([{"Name": nameScore, "Score": timeLeft}]));
          } else {
            highScores.push({"Name": nameScore, "Score": timeLeft});
            localStorage.setItem("highScores", JSON.stringify(highScores));
          }
          showHighScores();
          startBttn.disabled = false;
        } 
        if(timeLeft === 0){
            gameOver();
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
      };
      gameOver()
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

//when timeLeft =<14 end game and show a "GameOver" message
function gameOver(){
  if (timeLeft <= 0){
    window.alert("Game Over! try again");
  }
}

//funtion that starts quiz, reset values to default
function startQuiz() {
  timeLeft = 76;
  quizCompleted = false;
  q = 0;
  countdown();
  // for (let index = 0; index < myQuestions.length; index++) {
  displayQuestion(myQuestions[q], null) 
}

showScores.onclick = function() {
  if (highScoresUl.style.display == 'none') {
    showHighScores()
    highScoresUl.style.display = 'block';
  } else {
    highScoresUl.style.display = 'none';
  }
};

function showHighScores() {
  highScoresUl.innerHTML = "";
  //bring user input from localStorage
  highScores = JSON.parse(localStorage.getItem("highScores"));
  if(highScores === null || highScores.length === 0){
    highScoresUl.textContent = "There are no high scores";
  } else{
    //show high to low
    highScores.sort( function ( a, b ) { return b.Score - a.Score; } );
    for(index in highScores.slice(0, 10)){
      highScore = highScores[index];
      var li = document.createElement("li"); //creates an li
      li.textContent = "Name: " + highScore["Name"] + ", " + " Score: " + highScore["Score"];
      highScoresUl.appendChild(li);
    }
  }
}