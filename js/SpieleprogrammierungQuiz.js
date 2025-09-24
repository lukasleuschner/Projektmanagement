import { initQuiz } from './quizBase.js';

const correctAnswers = {
  question1: 'd',
  question2: 'c',
  question3: 'd',
  question4: ['x, y, z', 'x y z', 'xyz'],
  question5: 'a'
};

document.addEventListener('DOMContentLoaded', () => {
  initQuiz('quiz-form', correctAnswers);
});
