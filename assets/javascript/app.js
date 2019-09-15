//Intial Values 
let counter = 5;
let curretQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//when the timer is down, tirgger to take the user to the next question 
function nextQuestion() {

    const ifQuestionOver = (quizQuestions.length - 1) === curretQuestion;
    if (ifQuestionOver) {
        displayResult();
        console.log("Game is over!")
    } else {
        curretQuestion++;
        loadQuestion();
    };

};


//Create the timer for each question 
function timeUp() {
    clearInterval(timer);

    lost++;
    preLoadImages('lost'); 
    setTimeout(nextQuestion, 3 * 1000);
};


function countDown() {
    counter--;

    $("#time").html("Time remaining:  " + counter);

    if (counter == 0) {
        timeUp();
    };
};


//Display the questions and selections together 
function loadQuestion() {
    counter = 5;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[curretQuestion].question;
    const chocies = quizQuestions[curretQuestion].chocies;

    $("#time").html("Time remaining:  " + counter);

    $("#game").html(`
    <h4>${question}</h4>
    ${loadChoices(chocies)}
    ${loadRemaingQuestion()}
    `);
}

function loadChoices(chocies) {
    let result = "";

    for (let i = 0; i < chocies.length; i++) {

        result += `<p class="chocie" data-answer="${chocies[i]}">${chocies[i]}</p>`
    };
    return result;
};


//even if the user selects the right/wrong question, still take the user to the next question & check the answer selected
$(document).on("click", '.chocie', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[curretQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        preLoadImages('wins');
        setTimeout(nextQuestion, 3 * 1000);
        console.log("wins!");
    } else {
        lost++;
        preLoadImages('lost');
        setTimeout(nextQuestion, 3 * 1000);
        console.log("lost!");
    };
})


function displayResult() {
    const result = `
    <p>Your Score is: ${score}</p>
    <p>You missed ${lost} question(s)</p>
    <p>Total questions: ${quizQuestions.length} </p>
    <button class="btn btn-primary" id="reset">Play Again!</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function () {
    counter = 5;
    curretQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    loadQuestion();

});;

function loadRemaingQuestion() {
    const remainingQuestion = quizQuestions.length - (curretQuestion + 1); 
    const totalQuestion = quizQuestions.length; 

    return `Remaining Questions: ${remainingQuestion}/${totalQuestion}`; 

};

function randomImage(images) {
    const random = Math.floor(Math.random() * images.length); 
    const randomImage = images[random]; 
    return randomImage; 
};


//display images for correct and wrong answers 
function preLoadImages(status) {
    const correctAnswer = quizQuestions[curretQuestion].correctAnswer; 


    if (status === 'wins') {

        $('#game').html(`
        <p class="preload-image"> Cograts! You picked the correct answer!</p>
       <img src="${randomImage(congratsImages)}"/>
        `); 
    } else { 
    
        $('#game').html(`
        <p class="preload-image"> Nope. You picked the wrong answer.</p>
        <img src="${randomImage(oopsImages)}"/>
        `);
    };
};


$(`#startGameButton`).click(function() {
    $(`#startGameButton`).remove(); 
    $(`#time`).html(counter); 
    loadQuestion(); 
}); 