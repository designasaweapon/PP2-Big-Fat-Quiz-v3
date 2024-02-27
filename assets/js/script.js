document.addEventListener('DOMContentLoaded', function() {

    // this event listener starts the quiz, loading quiz area (question and answers) and the score display

    // this event listener also checks if player has entered a name before letting them proceed

    document.getElementById('start-btn').addEventListener('click', verifyUser);

    // this event listener brings player back to start of quiz screen once they have completed the quiz

    document.getElementById('play-btn').addEventListener('click', playAgain);

    // this event listener brings player to home screen once they complete the quiz

    document.getElementById('home').addEventListener('click', goHome);

    // this event listener loads tje next question, unless there are no questions left then player will go to results screen

    document.getElementById('next-btn').addEventListener('click', moveToNextQuestion);

    function verifyUser(){
    if(document.getElementById('name').value === ''){
    alert('Please enter a name');
    } else {
    startGame();
    captureUserName();
    }
    }

});

// this function captures player name entered on home screen and displays it on results screen

function captureUserName() {
    document.getElementById('username').innerText = document.getElementById('name').value;
}

// this function starts the quiz when player chooses start button

function startGame() {
    resetState();
    document.getElementById('login-rules').classList.add('hide');
    document.getElementById('game-results').classList.add('hide');
    document.getElementById('game-play').classList.remove('hide');
    displayNumberOfQuestions ();
    currentQuestionIndex = 0;
    oldScore = 0;
    finalScore = 0;
    setNextQuestion();
    document.getElementById('next-btn').innerText = 'NEXT';
}

let currentQuestionIndex = '';

// this function moves player on to next question

function moveToNextQuestion() {
    if (questions.length > currentQuestionIndex +1) {
        currentQuestionIndex++;
        showCurrentQuestionNumber();
        setNextQuestion(); 
    } else {
        document.getElementById('next-btn').innerText = 'END';
        setTimeout (() => {
        document.getElementById('game-play').classList.add('hide');
        document.getElementById('game-results').classList.remove('hide');
        displayFinalScore();
        }, 1000);
    }
}

// this function calculates and displays total number of questions, total will increase if more questions are added.

function displayNumberOfQuestions() {
    document.getElementById('number-of-qs').innerText = questions.length;
}

// this function displays question plus builds and displays answer buttons from questions array
// how to create, populate and assign class to buttons researched using youtube video (See Readme Attribution)

function showQuestion(question) {
    document.getElementById('question-box').innerText = question.question;

    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answers');
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        document.getElementById('button-box').appendChild(button);
        });

    document.getElementById('next-btn').classList.remove('jiggle');
    
}

// this function to show fact/or link relevant to the question

function showFact(question) {
    document.getElementById('question-box').innerText = question.fact;
    document.getElementById('question-box').classList.add('fact');
}

//this function shows current question number above score indicating player progress

function showCurrentQuestionNumber() {
    document.getElementById('q-number').innerText = currentQuestionIndex + 1;
}

// this function is to display the questions 

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    document.getElementById('next-btn').classList.remove('jiggle');
    document.getElementById('question-box').classList.remove('fact');
}

// this function removes previous answers when user moves to NEXT question

function resetState() {
    const buttonBox = document.getElementById('button-box');
    while (buttonBox.firstChild) {
        buttonBox.removeChild(buttonBox.firstChild);
    }
    clearTimeout(timeoutId); 
}

// this function determines selected answer and functon added to assign correct or incorrect class (setStatusClass)
// this function adds an increment to the players score if correct
// this function displays a fact or link relevant to the question (function showFact)
// this function also makes Next button jiggle for a few seconds after player selects an answer to encourage NEXT question selection
// this function was researched for how to identify selected button and apply correct or incorrect status on youtube video (Please See Readme attribution)

let timeoutId = '';

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    showFact(questions[currentQuestionIndex]);

    Array.from(document.getElementById('button-box').children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
        });
    timeoutId = setTimeout (() => {
            document.getElementById('next-btn').classList.add('jiggle');
            }, 4000);  
    if(correct) {
        let oldScore = parseInt(document.getElementById('score').innerText);
        document.getElementById('score').innerText = ++oldScore;
        document.getElementById('final-score').innerText = ++finalScore;
        document.getElementById('final-number-of-qs').innerText = questions.length;
        }
}

// this function to adds a class to buttons showing correct answer for each question

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct'); 
    } else {
        element.classList.add('incorrect');
    } 
}

// this function hides class added to identify correct answer for each question

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// this function displays player final score and final message on results screen

function displayFinalScore() {
    let finalScore = parseInt(document.getElementById('final-score').innerText);
    document.getElementById('final-score').innerText = finalScore;
    if (finalScore < 3) {
        document.getElementById('message').innerText = "OK, so you know the year just gone, you need to review!";
    } else if (finalScore <= 5) {
        document.getElementById('message').innerText = "Like most of my school reports - Could Do Better!";
    } else if (finalScore <= 9) {
        document.getElementById('message').innerText = "Well done, you rememembered quite a bit about last year!";
    } else if (finalScore == questions.length) {
        document.getElementById('message').innerText = "We think you should get out more, this is a bit much";
    } else {
        document.getElementById('message').innerText = "There seems to be a problem with the score";
    }
}

// this function resets the score when player finishes quiz and wants to replay

function resetScore() {
    document.getElementById('score').innerText = 0;
    document.getElementById('final-score').innerText = 0;
    document.getElementById('q-number').innerText = 1;
}

// this function brings player back to home: login and rules screen

function goHome() {
    document.getElementById('login-rules').classList.remove('hide');
    document.getElementById('game-play').classList.add('hide');
    document.getElementById('game-results').classList.add('hide');
    resetScore();
}

// this function returns player to start of the quiz to play again

function playAgain() {
    resetScore();
    startGame();
}
