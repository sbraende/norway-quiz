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
  // {
  //   question:
  //     "What do Norwegians traditionally say when taking a shot of aquavit?",
  //   answers: [
  //     "Skål!",
  //     "To the fjords!",
  //     "Down the hatch!",
  //     "May the trolls spare us!",
  //   ],
  //   rightAnswer: 0,
  //   selectedAnswer: null,
  // },
];

// FUNCTIONS
const createElement = (elementType, className, text, parent) => {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = text;
  parent.append(element);
  return element;
};

const clearInterface = (quizSection) => {
  while (quizSection.firstChild) {
    quizSection.removeChild(quizSection.firstChild);
  }
};

const renderProgressbar = (round) => {
  const progressBar = document.querySelector(".header__progressbar");
  progressBar.value = (round / questionsArray.length) * 100;
};

const renderQuestion = (questionObject, quizSection) =>
  createElement(
    "h1",
    "quiz__question-title",
    questionObject.question,
    quizSection
  );

const createAnswerContainer = (quizSection) =>
  createElement("div", "quiz__answers-container", "", quizSection);

const createAnswers = (questionObject) => {
  const answersContainer = document.querySelector(".quiz__answers-container");

  questionObject.answers.forEach((answer, i) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("quiz__answer");
    answerButton.dataset.answerIndex = i;
    answerButton.textContent = answer;
    answersContainer.append(answerButton);

    answerButton.addEventListener("click", (answer) => {
      const allAnswerButtons = document.querySelectorAll(".quiz__answer");
      allAnswerButtons.forEach((answer) => {
        answer.classList.remove("quiz__answer--active");
      });
      answer.target.classList.add("quiz__answer--active");
    });
  });
};

const createSummeryAnswers = (questionObject, answersContainer) => {
  questionObject.answers.forEach((answer, i) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("quiz__answer");
    answerButton.dataset.answerIndex = i;
    answerButton.textContent = answer;
    answersContainer.append(answerButton);

    // Player selected right answer
    if (i === parseInt(questionObject.selectedAnswer)) {
      answerButton.classList.add("quiz__answer--correct");
    } else {
      // WHERE I GOT UP TO...
    }
  });

  // else, highlight user selection in red for wrong choice (.quiz__answer--wrong)
  // And color highlight corret answer with yellow
};

const createNextButton = (quizSection) =>
  createElement("button", "quiz__next-button", "Next", quizSection);

const nextButtonEvent = () => {
  nextButton = document.querySelector(".quiz__next-button");

  nextButton.addEventListener("click", () => {
    // Get active selection
    const activeAnswerButton = document.querySelector(".quiz__answer--active");

    // Check if selection is empty
    if (activeAnswerButton === null) {
      // TODO: Create visable error
      console.log("No selection!");
      round++;
      return;
    }

    // Store active selection
    questionsArray[round].selectedAnswer =
      activeAnswerButton.dataset.answerIndex;

    // Add score,
    if (
      parseInt(activeAnswerButton.dataset.answerIndex) ==
      questionsArray[round].rightAnswer
    ) {
      console.log("You have selected the right answer!");
      score++;
    } else {
      console.log("Wrong answer");
    }

    // Add round
    round++;

    // Move to next round
    if (round < questionsArray.length) {
      renderInterface(questionsArray[round]);
      console.log(`Round: ${round}`);
      console.log(`Score: ${score}`);
    } else {
      console.log("Render summary");
      renderSummmary();
    }
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
  // For each question render whole HTML
  questionsArray.forEach((questionObject) => {
    // Create a new quiz section?
    const summerySection = createElement(
      "section",
      "quiz",
      "",
      document.querySelector("main")
    );

    renderQuestion(questionObject, summerySection);
    const answerContainer = createAnswerContainer(summerySection);
    createSummeryAnswers(questionObject, answerContainer);
  });
};

// MAIN LOGIC
const main = () => {
  renderInterface(questionsArray[round]);
};

main();
