export function insertButton(formId, label = 'Auswerten', onClick) {
  const form = document.getElementById(formId);
  if (!form) return null;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;

  // Wrapper für Zentrierung
  const wrapper = document.createElement('div');
  wrapper.classList.add('button-wrapper');
  wrapper.appendChild(button);

  form.appendChild(wrapper);

  button.addEventListener('click', onClick);
  return button;
}



export function collectAnswers(formId) {
  const form = document.getElementById(formId);
  const answers = {};
  if (!form) return answers;
  const elements = Array.from(form.elements);
  elements.forEach(el => {
    if (!el.name) return;
    if (el.type === 'radio') {
      if (el.checked) answers[el.name] = el.value;
    } else if (el.type === 'text') {
      answers[el.name] = el.value.trim().toLowerCase();
    }
  });
  return answers;
}

export function evaluateAnswers(answers, correctAnswers) {
  let score = 0;
  const wrongQuestions = [];
  const keys = Object.keys(correctAnswers);
  keys.forEach(key => {
    const correct = correctAnswers[key];
    let isCorrect = false;
    if (Array.isArray(correct)) {
      const normalized = correct.map(val => val.toLowerCase());
      isCorrect = normalized.includes(answers[key]);
    } else {
      isCorrect = answers[key] === correct;
    }

    if (isCorrect) {
      score++;
    } else {
      wrongQuestions.push(key);
    }
  });
  return { score, total: keys.length, wrongQuestions };
}

export function initQuiz(formId, correctAnswers) {
  let attempts = 0;
  insertButton(formId, 'Auswerten', () => {
    attempts++;
    const answers = collectAnswers(formId);
    const result = evaluateAnswers(answers, correctAnswers);
    if (result.score < result.total) {
      showResultPopup(result.score, result.total, result.wrongQuestions);
    } else {
      const pageName = window.location.pathname
        .split('/')
        .pop()
        .replace('.html', '');
      window.location.href = `Geschafft.html?attempts=${attempts}&origin=${encodeURIComponent(pageName)}`;
    }
  });
}

function formatWrongQuestions(wrongQuestions) {
  if (!wrongQuestions.length) return '';

  const numbers = wrongQuestions
    .map(questionKey => {
      const match = questionKey.match(/\d+/);
      return match ? parseInt(match[0], 10) : questionKey;
    })
    .filter(Boolean);

  if (!numbers.length) return '';

  const [first, ...rest] = numbers;
  if (!rest.length) return `Frage ${first}`;
  if (rest.length === 1) return `Frage ${first} und ${rest[0]}`;

  const middle = rest.slice(0, -1).join(', ');
  const last = rest[rest.length - 1];
  const middlePart = middle ? `, ${middle}` : '';
  return `Frage ${first}${middlePart} und ${last}`;
}

function showResultPopup(score, total, wrongQuestions = []) {
  const overlay = document.createElement('div');
  overlay.className = 'quiz-modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'quiz-modal';

  const close = document.createElement('span');
  close.className = 'quiz-modal-close';
  close.innerHTML = '&times;';
  close.addEventListener('click', () => document.body.removeChild(overlay));

  const message = document.createElement('p');
  message.textContent = `Du hast ${score} / ${total} Fragen richtig beantwortet. Versuche es noch einmal!`;

  const wrongInfoText = formatWrongQuestions(wrongQuestions);
  let wrongInfo = null;
  if (wrongInfoText) {
    wrongInfo = document.createElement('p');
    wrongInfo.textContent = `Falsche Antworten bei: ${wrongInfoText}`;
  }

  modal.appendChild(close);
  modal.appendChild(message);
  if (wrongInfo) modal.appendChild(wrongInfo);
  overlay.appendChild(modal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });

  document.body.appendChild(overlay);
}
