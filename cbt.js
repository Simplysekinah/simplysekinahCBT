let questions = [
    {
        questions: "How many states do we have in Nigeria?",
        options: ["Thirty", "Thirty-five", "Thirty-six", "Thirty-seven"],
        correctAnswer: "Thirty-six"
    },
    {
        questions: "What did you do at SQI?",
        options: ["play", "eat", "work", "laugh"],
        correctAnswer: "work"
    },
    {
        questions: "How many states do we have in Nigeria?",
        options: ["Thirty", "Thirty-five", "Thirty-six", "Thirty-seven"],
        correctAnswer: "Thirty-six"
    },
    {
        questions: "How many states do we have in Nigeria?",
        options: ["Thirty", "Thirty-five", "Thirty-six", "Thirty-seven"],
        correctAnswer: "Thirty-six"
    },
];

let questionContainer = document.getElementById("questions-container")
let timer = document.getElementById("timer")
let container = document.getElementById("container")
let container1 = document.getElementById("container1")
let main = document.getElementById("main")
let ans = document.getElementsByName("ans")
currentQuestionIndex = 0;
let test = document.getElementById("test")
container.style.display = "none"
container1.style.display = "none"
let userAnswers = []

let timerValue = 0;
let timerInterval;

function startTest() {
    currentQuestionIndex = 0;
    container.style.display = "block"
    main.style.display = "none"
    test.style.display = "none"
    displayQuestion()
    startTimer()
}

function displayQuestion() {
    questionContainer.innerHTML = `
        <p>Question: ${questions[currentQuestionIndex].questions}</p>
        ${questions[currentQuestionIndex].options.map((option, index) => `
            <p>
                <input type="radio" name="ans" value="${option}" id="option${index}">
                <label for="option${index}">${option}</label>
            </p>
        `).join('')}
    `;
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
}

function next() {
    let selectedOption = document.querySelector('input[name="ans"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    } else {
        userAnswers[currentQuestionIndex] = null;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        calculateScore();
    } else {
        displayQuestion();
    }
}

function previous() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correctAnswer) {
            score++;
        }
    }
    container1.style.display = "block";
    main.style.display = "none";
    container.style.display = "none";
    container1.innerHTML = `
        <p>Your total score is: ${score} / ${questions.length}</p>
    `;
    clearInterval(timerInterval)
}
function startTimer() {
    timerValue = 0;
    timerInterval = setInterval(() => {
        timerValue++;
        timer.innerHTML = `<p>Timer: ${Math.floor(timerValue / 60)}:${timerValue % 60 < 10 ? '0' : ''}${timerValue % 60}</p>`;
        if (timerValue >= 120) { 
            calculateScore();
        }
    }, 1000);
}