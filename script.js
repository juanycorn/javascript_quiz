// Quiz questions data
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
    },
];

// Other global variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Initial time in seconds
let timerInterval;

// DOM elements
const startButton = document.getElementById('start-btn');
const submitButton = document.getElementById('submit-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score-btn');
const highScoresList = document.getElementById('high-scores-list');

// Function to start the quiz
function startQuiz() {
    startButton.style.display = 'none';
    displayQuestion();
    startTimer();
}

// Function to display current question
function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
}

// Function to handle option selection
function selectOption(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score += 10;
    } else {
        timeLeft -= 10; // Deduct 10 seconds for wrong answer
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    resultContainer.style.display = 'block';
    scoreElement.textContent = score;
}

// Event listeners
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', endQuiz);
saveScoreButton.addEventListener('click', saveScore);

// Function to save the score
function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    const listItem = document.createElement('li');
    listItem.textContent = `${initials}: ${score}`;
    highScoresList.appendChild(listItem);
    initialsInput.value = '';
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        document.getElementById('time-left').textContent = timeLeft;
    }, 1000);
}