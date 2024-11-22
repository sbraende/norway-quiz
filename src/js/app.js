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
];

// GLOBAL SELECTORS

// FUNCTIONS

const createElement = (elementType, className, text, parent) => {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = text;
  parent.append(element);
  return element;
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

const createNextButton = (quizSection) =>
  createElement("button", "quiz__next-button", "Next", quizSection);

const nextButtonAction = () => {
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
    }
  });
};

// GLOBAL VARIABLES
const quizSection = document.querySelector(".quiz");

// RENDER QUESTIONS
const renderInterface = (questionObject) => {
  // TODO renderProgressbar(round)
  renderQuestion(questionObject, quizSection);
  createAnswerContainer(quizSection);
  createAnswers(questionObject);
  createNextButton(quizSection);
};

// MAIN LOGIC

let round = 0;
let score = 0;

const main = () => {
  renderInterface(questionsArray[round]);
  nextButtonAction();
};

main();
