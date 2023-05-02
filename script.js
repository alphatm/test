
const quizData = {}; // store the fetched data here

const quizContainer = document.getElementById('quiz');
const questionSlide = document.getElementById('question-slide');
const answerSlide = document.getElementById('answer-slide');
const resultSlide = document.getElementById('result-slide');
const questionTitle = document.getElementById('question-title');
const questionImage = document.getElementById('question-image');
const answerOptions = document.getElementById('answer-options');
const answerOption1 = document.getElementById('answer-option-1');
const answerOption2 = document.getElementById('answer-option-2');
const answerOption3 = document.getElementById('answer-option-3');
const submitAnswerButton = document.getElementById('submit-answer');
const answerTitle = document.getElementById('answer-title');
const answerTitle1 = document.getElementById('answer-title1');
const answerText = document.getElementById('answer-text');
const answerImage = document.getElementById('answer-image');
const nextQuestionButton = document.getElementById('next-question');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const resultImage = document.getElementById('result-image');
const resultAuthor = document.getElementById('result-image-author');
const questionImageAuthor = document.getElementById('question-image-author');
const answerCheck1 = document.getElementById('answer-check-1');
const answerCheck2 = document.getElementById('answer-check-2');
const answerCheck3 = document.getElementById('answer-check-3');
const restartButton = document.getElementById('restart');
const answerImageAuthor = document.getElementById('answer-image-author');



let currentQuestionIndex = 0;
let currentScore = 0;


function resetHints() {
  const answerCheckElements = document.querySelectorAll('.answer-check');
  answerCheckElements.forEach((answerCheck) => {
    answerCheck.textContent = '';
    answerCheck.style.color = '';
  });
}



function showQuestionSlide() {
  const questionCounter = document.getElementById('question-counter');
  const questionCounterMob = document.getElementById('question-counter-mob');
  const answerCounterMob = document.getElementById('answer-counter-mob');
  answerCounterMob.textContent = `${currentQuestionIndex + 1}/${quizData.questions.length}`;
  questionCounter.textContent = `${currentQuestionIndex + 1}/${quizData.questions.length}`;
  questionCounterMob.textContent = `${currentQuestionIndex + 1}/${quizData.questions.length}`;
  questionTitle.textContent = quizData.questions[currentQuestionIndex].title;
  questionImageAuthor.textContent =  `Фото: ${quizData.questions[currentQuestionIndex].imageAuthor}`;
  questionImage.srcset = quizData.questions[currentQuestionIndex].imageSrcset['1650w'];
  answerOption1.textContent = quizData.answers[currentQuestionIndex * 3].title;
  answerOption2.textContent = quizData.answers[currentQuestionIndex * 3 + 1].title;
  answerOption3.textContent = quizData.answers[currentQuestionIndex * 3 + 2].title;
  resetHints();
  questionSlide.style.display = 'block';
  answerSlide.style.display = 'none';
  resultSlide.style.display = 'none';
  const answerOptions = [answerOption1, answerOption2, answerOption3];
  answerOptions.forEach((answerOption, index) => {
    answerOption.addEventListener('click', () => {
      const selectedAnswer = quizData.answers[currentQuestionIndex * 3 + index];
      const answerChecks = [answerCheck1, answerCheck2, answerCheck3];
      const answerCheckElements = document.querySelectorAll('.answer-check');
      answerCheckElements.forEach((answerCheck) => {
        answerCheck.textContent = '';
        answerCheck.style.color = '';
      });

      if (selectedAnswer.isCorrect) {
        answerChecks[index].style.color = '#37B3CC';
        answerChecks[index].textContent = 'Верно!';
      } else {
        answerChecks[index].style.color = '#D71A21';
        answerChecks[index].textContent = 'Неверно!';
      }
    });
  });
  const radioButtons = document.querySelectorAll('input[name="answer"]');
  radioButtons.forEach((radio) => {
    radio.checked = false;
  });
  if (currentQuestionIndex === quizData.questions.length - 1) {
    nextQuestionButton.textContent = 'Показать результат';
  } else {
    nextQuestionButton.textContent = 'Далее';
  }
}

function showAnswerSlide(isCorrect) {
  if (isCorrect) {
    answerTitle.textContent = 'Верно!';
    answerTitle.style.color = '#37B3CC';
    currentScore += 30;
    console.log(currentScore)
  } else {
    answerTitle.textContent = 'Неверно!';
    answerTitle.style.color = '#D71A21';
  }

  answerTitle1.textContent = quizData.questions[currentQuestionIndex].title;
  answerText.textContent = quizData.questions[currentQuestionIndex].answerText;
  answerImageAuthor.textContent =  `Фото: ${quizData.questions[currentQuestionIndex].imageAuthor}`;
  answerImage.srcset = quizData.questions[currentQuestionIndex].imageSrcset['1650w'];
  questionSlide.style.display = 'none';
  answerSlide.style.display = 'block';
  resultSlide.style.display = 'none';

}

submitAnswerButton.addEventListener('click', () => {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const isCorrect = quizData.answers[(currentQuestionIndex * 3) + parseInt(selectedAnswer.value) - 1].isCorrect;
    showAnswerSlide(isCorrect);
  }
});


nextQuestionButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.questions.length) {
    showQuestionSlide();
  } else {
    showResultSlide();
  }
});
function resetQuiz() {
  quizData.answers.forEach((answer) => {
    answer.isSelected = false;
  });
  currentQuestionIndex = 0;
  currentScore = 0;

  showQuestionSlide();
}
function showResultSlide() {
  const totalQuestions = quizData.questions.length;
  let correctAnswers = 0;
  for (let i = 0; i < totalQuestions; i++) {
    const selectedAnswer = quizData.answers.find(answer => answer.id === i + 1 && answer.isSelected);
    if (selectedAnswer && selectedAnswer.isCorrect) {
      correctAnswers++;
    }
  }


  let result;
  if (currentScore == quizData.results[0].minScore) {
    result = quizData.results[0];
  } else if (currentScore == quizData.results[1].minScore) {
    result = quizData.results[1];
  } else {
    result = quizData.results[2];
  }

  resultTitle.textContent = result.title;
  resultText.textContent = result.text;
  resultImage.srcset = result.imageSrcset['1650w'];
  resultAuthor.textContent = `Фото: ${result.imageAuthor}`;

  questionSlide.style.display = 'none';
  answerSlide.style.display = 'none';
  resultSlide.style.display = 'block';

  restartButton.addEventListener('click', () => {
    resetQuiz();
  });
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    quizData.questions = data.questions;
    quizData.answers = data.answers;
    quizData.results = data.results;
    showQuestionSlide();
  });

