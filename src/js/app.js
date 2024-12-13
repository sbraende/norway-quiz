// MAIN QUESTION ARRAY
const questionsArray = [
  {
    question: "What peculiar law was introduced in Longyearbyen, Norway?",
    answers: [
      "It's illegal to own a cat.",
      "You are not allowed to die there.",
      "No whistling after midnight.",
      "Dogs must wear shoes.",
    ],
    rightAnswer: 1,
    selectedAnswer: null,
  },
  {
    question:
      "What was the name of the Norwegian penguin knighted by King Harald V?",
    answers: ["Nils Olav", "Olaf the Great", "King Flappy", "Sir Waddles"],
    rightAnswer: 0,
    selectedAnswer: null,
  },
  {
    question:
      "What do Norwegians traditionally say when taking a shot of aquavit?",
    answers: [
      "Skål!",
      "To the fjords!",
      "Down the hatch!",
      "May the trolls spare us!",
    ],
    rightAnswer: 0,
    selectedAnswer: null,
  },
  {
    question: "Which of these is a real Norwegian tradition?",
    answers: [
      "Hiding brooms on Christmas Eve to ward off witches",
      "Wearing fish-shaped hats during the summer solstice",
      "Ringing church bells at midnight for good fortune",
      "Throwing coins into fjords to honor the trolls",
    ],
    rightAnswer: 0,
    selectedAnswer: null,
  },
  {
    question: "What is unique about the cheese known as brunost?",
    answers: [
      "It is made entirely from goat milk.",
      "It is boiled until caramelized, giving it a sweet taste.",
      "It is aged underwater in barrels.",
      "It is coated in ash and left to cure for months.",
    ],
    rightAnswer: 1,
    selectedAnswer: null,
  },
  {
    question:
      "What natural phenomenon is visible in Norway’s sky during winter?",
    answers: [
      "Aurora Australis",
      "Rainbow fog",
      "Northern Lights",
      "Midnight Sun",
    ],
    rightAnswer: 2,
    selectedAnswer: null,
  },
  {
    question: "What is the Norwegian krone coin uniquely known for?",
    answers: [
      "It is shaped like a triangle.",
      "It has a hole in the center.",
      "It contains a Viking rune engraving.",
      "It is magnetic due to iron content.",
    ],
    rightAnswer: 1,
    selectedAnswer: null,
  },
  {
    question: "What unusual event happens annually in Norway's Hell village?",
    answers: [
      "The water in its river turns red.",
      "It freezes over, living up to its name.",
      "It experiences 24 hours of daylight.",
      "Birds migrate to the Arctic from there.",
    ],
    rightAnswer: 1,
    selectedAnswer: null,
  },
];

// GLOBAL SELECTORS
const progressBar = document.querySelector(".header__progressbar");
const quizSection = document.querySelector(".quiz");

// GLOBAL VARIABLES
let round = 0;
let score = 0;

// GENERAL FUNCTIONS
const createElement = (elementType, className, text, parent) => {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = text;
  parent.append(element);
  return element;
};

const clearElementContent = (element) => (element.textContent = "");

// CORE LOGIC
const renderProgressbar = (round, questionsArray) => {
  progressBar.value = (round / questionsArray.length) * 100;
};

const renderQuestion = (questionObject, parent) =>
  createElement("h1", "quiz__question-title", questionObject.question, parent);

const createAnswerContainer = (parent) =>
  createElement("div", "quiz__answers-container", "", parent);

const createAnswers = (questionObject) => {
  const answersContainer = document.querySelector(".quiz__answers-container");

  questionObject.answers.forEach((answer, i) => {
    const answerButton = createElement(
      "button",
      "quiz__answer",
      answer,
      answersContainer
    );
    answerButton.dataset.answerIndex = i;

    answerButton.addEventListener("click", (answer) => {
      const allAnswerButtons = document.querySelectorAll(".quiz__answer");
      allAnswerButtons.forEach((answer) => {
        answer.classList.remove("quiz__answer--active");
      });
      answer.target.classList.add("quiz__answer--active");
    });
  });
};

const createSummery = (questionObject, answersContainer) => {
  // FUNCTION VARIABLES
  let isCorrect = false;

  // RENDER QUESTIONS
  questionObject.answers.forEach((answer, i) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("quiz__answer");
    answerButton.dataset.answerIndex = i;
    answerButton.textContent = answer;
    answersContainer.append(answerButton);

    // Helper variables for logic
    const currentButton = i;
    const selectedAnswer = parseInt(questionObject.selectedAnswer);
    const rightAnswer = questionObject.rightAnswer;

    // If current Button, selectedAnswer and correctAnswer is the same
    if (currentButton === selectedAnswer && selectedAnswer === rightAnswer) {
      // answer is correct
      answerButton.classList.add("quiz__answer--correct");
      isCorrect = true;
    } else {
      // else, highlight selectedAnswer and the correctAnswer
      if (currentButton === selectedAnswer) {
        answerButton.classList.add("quiz__answer--wrong");
      }
      if (currentButton === rightAnswer) {
        answerButton.classList.add("quiz__answer--correctIndicator");
      }
    }
  });

  // RENDER FEEDBACK
  const answerFeedbackText = createElement(
    "p",
    "quiz__answer-feedback-text",
    "",
    answersContainer
  );

  if (isCorrect) {
    answerFeedbackText.textContent = "Correct 🎉";
    answerFeedbackText.classList.add("quiz__answer-feedback-text--correct");
  } else {
    answerFeedbackText.textContent = "That's incorrect";
    answerFeedbackText.classList.add("quiz__answer-feedback-text--wrong");
  }
};

const createNextButton = (parent) => {
  // Create next button. Create submit button if last round.
  if (round < questionsArray.length - 1) {
    createElement("button", "quiz__next-button", "Next", parent);
  } else {
    createElement("button", "quiz__next-button", "Submit", parent);
  }
};

const nextButtonEvent = () => {
  nextButton = document.querySelector(".quiz__next-button");

  nextButton.addEventListener("click", () => {
    // Get active button
    const activeAnswerButton = document.querySelector(".quiz__answer--active");

    // Check if selection is empty. If empty user can't move forwards in quiz.
    if (activeAnswerButton === null) {
      return;
    }

    // Store active selection
    questionsArray[round].selectedAnswer =
      activeAnswerButton.dataset.answerIndex;

    // Add score if right answer
    if (
      parseInt(activeAnswerButton.dataset.answerIndex) ===
      questionsArray[round].rightAnswer
    ) {
      // Right answer!
      score++;
    } else {
      // Wrong answer"
    }

    // Add round
    round++;

    // Move to next round, if not go to summery
    if (round < questionsArray.length) {
      renderInterface(questionsArray[round]);
    } else {
      renderSummmary();
    }
  });
};

const renderFinalScore = () => {
  const scoreTitle = createElement(
    "h1",
    "quiz__summery-title",
    "",
    document.querySelector("main")
  );
  // Score result
  createElement(
    "h2",
    "quiz__summery-description",
    `You got ${score} out of ${questionsArray.length}.`,
    document.querySelector("main")
  );
  const scoreMessage = createElement(
    "h2",
    "quiz__summery-description",
    "",
    document.querySelector("main")
  );

  if (score === 0) {
    scoreTitle.textContent = '"You have been banished from Valhalla!"';
    scoreMessage.textContent =
      "It seems the Norns have not woven knowledge into your fate this time. Fear not, young warrior—return and try again to earn your place among the legends.";
  } else if (score < 3) {
    scoreTitle.textContent = '"A humble thrall´s effort."';
    scoreMessage.textContent =
      "You've earned the right to tend the fjords, but true Viking glory eludes you. Sharpen your mind like a sword, and set sail once more.";
  } else if (score < 6) {
    scoreTitle.textContent = '"A bold raider in the making!"';
    scoreMessage.textContent =
      "You've shown courage and wisdom, worthy of leading a small crew. With a bit more lore in your horn, you'll soon claim your seat at the feast in Valhalla.";
  } else {
    scoreTitle.textContent = '"Jarl of Knowledge!"';
    scoreMessage.textContent =
      "Your wisdom rivals that of Odin himself! The sagas will sing of your name, and the gods shall toast your intellect for eternity.";
  }
};

const createReviewButton = () =>
  createElement(
    "button",
    "quiz__review-button",
    "Review",
    document.querySelector("main")
  );

const renderQuestionsSummary = () => {
  questionsArray.forEach((questionObject) => {
    // Create new quiz section for summery
    const summerySection = createElement(
      "section",
      "quiz",
      "",
      document.querySelector("main")
    );

    renderQuestion(questionObject, summerySection);
    const answerContainer = createAnswerContainer(summerySection);
    createSummery(questionObject, answerContainer);
  });
};

// RENDER QUESTIONS
const renderInterface = (questionObject) => {
  clearElementContent(quizSection);
  renderProgressbar(round, questionsArray);
  renderQuestion(questionObject, quizSection);
  createAnswerContainer(quizSection);
  createAnswers(questionObject);
  createNextButton(quizSection);
  nextButtonEvent();
};

// RENDER SUMMARY - Event from Submit button
const renderSummmary = () => {
  clearElementContent(quizSection);
  quizSection.remove(); // Removes quiz section/container.
  renderProgressbar(questionsArray.length, questionsArray);
  renderFinalScore();

  const reviewButton = createReviewButton();
  reviewButton.addEventListener("click", () => {
    renderQuestionsSummary();
    reviewButton.remove();
  });
};

// MAIN LOGIC
document.addEventListener(
  "DOMContentLoaded",
  renderInterface(questionsArray[round])
);
