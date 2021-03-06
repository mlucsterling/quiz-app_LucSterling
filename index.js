"use strict";

//global variables
let currentQuestionNum = 0
let questionObject = myQUIZ[currentQuestionNum]
let currentScore = 0
let quizLength = myQUIZ.length

//this function generates the title screen
function buildTitle() {
    const titlePage = `
    <img class="titleImage" src="QuizImages/titlePage.jpg" alt="an epic mural of the Greek pantheon">
    <header>
    <h1>Epic Greek Myth Quiz</h1>
    <p class="quizDescription">Test your knowledge of the Greek gods, quest for a perfect score!</p>
    </header>
    <button id="startQuiz">Begin Quest</button>
    `
    $(".title-container").append(titlePage);
};

//empties question tracker and score
function emptyQuestionAndScore() {
  $(".question-score-container").empty();
}

//keeps track of the score and question Number
function handleQuestionAndScore() {
    const QuesScoreHTML = `<section><ul>
    <li><h5>Question: <span class="js-questionNum">${currentQuestionNum + 1}/${myQUIZ.length}</h5></li>
    <li><h5>Score: <span class="js-score">${currentScore}</span></h5></li>
    </ul></section>`
    emptyQuestionAndScore();
    $(QuesScoreHTML).appendTo(".question-score-container");
};

//displays a question
function createQuestion() {
    const questionHTML = `<section>
        <form id="js-questions" class="question-form">
      
            <fieldset>
                <legend>${questionObject.question}</legend>

                <div class="options"></div>
    
                <button type="submit" id="submit-answer">Submit</button>
             </fieldset>

         </form>
     </section>`;
    $(questionHTML).appendTo(".quiz-container");
    createAnswers();
};

//create a selection of possible answers tied to each question
function createAnswers() {
 for (let i=0; i < questionObject.answerOptions.length; i++ ) {
      $(".options").append(`<input type="radio" name="answers" id="answer${i+1}" value="${questionObject.answerOptions[i]}">
      <label for="answer${i+1}"> ${questionObject.answerOptions[i]} </label>`);
  };
};

//what happens if the answer is correct
function correctAnswerFunction() {
  let correctAnswerHTML = `<h2>Correct!</h2>
    <p>The goddess of knowledge smiles upon you</p>
    <img class="css-rightAnswer" src="QuizImages/rightAnswer.jpg" alt="a triumphant hero holding the head of a monster">
    <br>
    <button type="button" class="nextQuestionButton" name="nextQuestion">Next Question</button>`
  $(".results-container").append(correctAnswerHTML);
  ++currentScore;
  handleQuestionAndScore();
};

//what happens if the answer is incorrect
function wrongAnswerFunction() {
  let wrongAnswerHTML = `<h2>Incorrect!</h2>
      <p>Fear not: true legends always press on</p>
      <img src="QuizImages/wrongAnswer.jpg" class="wrongAnswerImage" alt="an injured hero">
      <br>
      <button type="button" class="nextQuestionButton" name="nextQuestion">Next Question</button>`
  $(".results-container").append(wrongAnswerHTML);
  handleQuestionAndScore();
};

function adjudicateAnswer() {
  let selectedAnswer = $("input[name=answers]:checked").val();
    if (selectedAnswer === questionObject.correctAnswer) {
      correctAnswerFunction();
    } else { 
      wrongAnswerFunction();
    };
  };

//handles everything that happens when a user submits an answer for a question
function clickSubmitAnswer() {
  $('.main-container').on('submit', '#js-questions', function (event) {
    event.preventDefault(); 
    let selectedAnswer = $("input[name=answers]:checked").val();
    if (!selectedAnswer) {
      alert('THE GODS DEMAND AN ANSWER, MORTAL');
    } else {
    adjudicateAnswer();
    $('.quiz-container').empty();
    }});
};

//finishes the quiz after the final question
function finishQuiz() {
  $('.question-score-container').empty();
  $('.results-container').append(`<section class="finalResults-container">
  <h2>The Results of Your Quest:</h2>
  <h1 class="finalScore">${currentScore}/10 Points</h1>
  <p>The gods are pleased by your quest.</p>
  <p>You may undertake these trials again, if you wish...</p>
  <button type="button" class="resetQuizButton" name="resetQuiz">Retry Quest</button>
  </section>`);
};

//handles everything that happens when a user clicks on the "Next Question" button
function clickNextQuestion() {
  $('.results-container').on('click','.nextQuestionButton', function (event) {
    currentQuestionNum++;
    questionObject = myQUIZ[currentQuestionNum];
    $('.results-container').empty()
    if (currentQuestionNum < myQUIZ.length) {
      handleQuestionAndScore();
      createQuestion();
      } else {
      finishQuiz();
    };
  });
};

//handles resetting the quiz
function resetQuiz() {
  $('.results-container').on('click', '.resetQuizButton', function (event) {
    currentQuestionNum = 0
    currentScore = 0
    questionObject = myQUIZ[currentQuestionNum]
    $('.results-container').empty();
    handleQuestionAndScore();
    createQuestion();
  });
};

//generates quiz HTML and displays the first question
function clickBeginQuiz() {
    $("#startQuiz").on('click', function (event) {
    console.log('beginQuiz activated');
    $(".title-container").empty();
    handleQuestionAndScore();
    createQuestion();
    //clickNextQuestion();
    });
};

function handleQuiz() {
  buildTitle();  
  clickBeginQuiz();
  clickSubmitAnswer();
  clickNextQuestion();
  resetQuiz();
};

$(handleQuiz);