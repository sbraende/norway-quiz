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

// FUNCTIONS
const createElement = (elementType, className, text, parent) => {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = text;
  parent.append(element);
  return element;
};

const clearInterface = (element) => {
  // Check with Reza
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const renderProgressbar = (round) => {
  const progressBar = document.querySelector(".header__progressbar");
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
  questionObject.answers.forEach((answer, i) => {
    // TODO: Why does createElement not work? ...
    // const answerButton = createElement(
    //   "button",
    //   "quiz__answer",
    //   test,
    //   answersContainer
    // );
    // answerButton.dataset.answerIndex = i;

    const answerButton = document.createElement("button");
    answerButton.classList.add("quiz__answer");
    answerButton.dataset.answerIndex = i;
    answerButton.textContent = answer;
    answersContainer.append(answerButton);

    const currentButton = i;
    const selectedAnswer = parseInt(questionObject.selectedAnswer);
    const rightAnswer = questionObject.rightAnswer;

    // if current Button (i), selectedAnswer and correctAnswer is the same
    if (currentButton === selectedAnswer && selectedAnswer === rightAnswer) {
      answerButton.classList.add("quiz__answer--correct");
    } else {
      // highlight selectedAnswer and the correctAnswer
      if (currentButton === selectedAnswer) {
        answerButton.classList.add("quiz__answer--wrong");
      }
      if (currentButton === rightAnswer) {
        answerButton.classList.add("quiz__answer--correctIndicator");
      }
    }
  });
};

const createNextButton = (parent) => {
  // Create next button, create submit button if last round.
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

    // Check if selection is empty
    if (activeAnswerButton === null) {
      // TODO: Create visable error. Tmp fix, move
      // console.log("No selection!");
      round++;
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
      // console.log("You have selected the right answer!");
      score++;
    } else {
      // console.log("Wrong answer");
    }

    // Add round
    round++;

    // Move to next round, if not go to summery
    if (round < questionsArray.length) {
      renderInterface(questionsArray[round]);
      // console.log(`Round: ${round}`);
      // console.log(`Score: ${score}`);
    } else {
      // console.log("Render summary");
      renderSummmary();
    }
  });
};

const renderFinalScore = () =>
  createElement(
    "h1",
    "quiz__summery-title",
    `Congratulations! You got ${score} out of ${questionsArray.length} 🍾`,
    document.querySelector("main")
  );

const createReviewButton = () =>
  createElement(
    "button",
    "quiz__review-button",
    "Review",
    document.querySelector("main")
  );

const renderQuestionsSummary = () => {
  questionsArray.forEach((questionObject) => {
    // Create new quiz section
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

// GLOBAL VARIABLES
const quizSection = document.querySelector(".quiz");
let round = 0;
let score = 0;

// RENDER QUESTIONS
const renderInterface = (questionObject) => {
  clearInterface(quizSection);

  renderProgressbar(round);
  renderQuestion(questionObject, quizSection);
  createAnswerContainer(quizSection);
  createAnswers(questionObject);
  createNextButton(quizSection);
  nextButtonEvent();
};

// RENDER SUMMARY
const renderSummmary = () => {
  clearInterface(quizSection);
  quizSection.remove();

  renderProgressbar(questionsArray.length);
  renderFinalScore();

  const reviewButton = createReviewButton();
  reviewButton.addEventListener("click", () => {
    renderQuestionsSummary();
    reviewButton.remove();
  });
};

// MAIN LOGIC
const main = () => {
  renderInterface(questionsArray[round]);
};

main();
