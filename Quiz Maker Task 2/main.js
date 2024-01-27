// Sample data to store quizzes
let quizDataList = [];
let userQuizScore = 0;

// Function to display quizzes
function display() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizDataList.forEach((quiz, index) => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
            <h2>Question ${index + 1}</h2>
            <p>${quiz.question}</p>
            <form id="quiz-form-${index}">
                <ul>
                    ${quiz.choices.map((choice, i) => `
                        <li>
                            <input type="radio" name="quiz-${index}" value="${choice}" id="q${index}-option${i}">
                            <label for="q${index}-option${i}">${choice}</label>
                        </li>
                    `).join('')}
                </ul>
                <button type="button" onclick="checkUserQuiz(${index})">Submit</button>
                <h2>Score : ${userQuizScore}</h2>
            </form>
        `;
        quizContainer.appendChild(quizCard);
        
    });
}

// Function to create a new quiz
function createQuiz(question, choices, correctAnswer) {
    const quiz = {
        question,
        choices,
        correctAnswer
    };
    quizDataList.push(quiz);
    display();
}

// Function to check a quiz
function checkUserQuiz(index) {
    const form = document.getElementById(`quiz-form-${index}`);
    const selectedOption = form.querySelector('input[type="radio"]:checked');

    if (!selectedOption) {
        alert('Please choose an option');
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = quizDataList[index].correctAnswer;

    if (userAnswer === correctAnswer) {
        alert('Correct!');
        userQuizScore++;
    } else {
        alert('Incorrect! Try again.');
    }

    // Reset the form after checking
    form.reset();
}

// Function to render the quiz creation form
function renderUserQuizForm() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = `
        <h2>Quiz Maker</h2>
        <label for="question">Question:</label>
        <input type="text" id="question" required>
        <label for="choices">Options (separated by semicolon):</label>
        <input type="text" id="choices" required>
        <label for="correct-answer">Enter the Right Answer:</label>
        <input type="text" id="correct-answer" required>
        <h3>Note : Score will be updated on next Question</h3>
        <button onclick="submitUserQuiz()">Create Quiz</button>
    `;
}

// Function to submit the quiz creation form
function submitUserQuiz() {
    const questionInput = document.getElementById('question');
    const choicesInput = document.getElementById('choices');
    const correctAnswerInput = document.getElementById('correct-answer');

    const question = questionInput.value;
    const choices = choicesInput.value.split(';').map(choice => choice.trim());
    const correctAnswer = correctAnswerInput.value;

    createQuiz(question, choices, correctAnswer);

    // Clear the form inputs
    questionInput.value = '';
    choicesInput.value = '';
    correctAnswerInput.value = '';
}

// Initial setup
renderUserQuizForm();
display();
