const questionsArray = [
  {
    question: "What peculiar law was introduced in Longyearbyen, Norway?",
    answers: [
      "It's illegal to own a cat.",
      "You allowed to die there.",
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
];

// GLOBAL SELECTORS

const quizSection = document.querySelector(".quiz");

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

const renderAnswerContainer = (quizSection) =>
  createElement("div", "quiz__answers-container", "", quizSection);

const createAnswers = (questionObject, answersContainer) => {
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

// function createAnswers(questionObject, answersContainer) {
//   questionObject.answers.forEach((answer, i) => {
//     const answerButton = document.createElement("button");
//     answerButton.classList.add("quiz__answer");
//     answerButton.dataset.answerIndex = i;
//     answerButton.textContent = answer;
//     answersContainer.append(answerButton);

//     answerButton.addEventListener("click", (answer) => {
//       const allAnswerButtons = document.querySelectorAll(".quiz__answer");
//       allAnswerButtons.forEach((answer) => {
//         answer.classList.remove("quiz__answer--active");
//       });
//       answer.target.classList.add("quiz__answer--active");
//     });
//   });
// }

function createNextButton(quizSection) {
  const nextButton = createElement(
    "button",
    "quiz__next-button",
    "Next",
    quizSection
  );

  nextButton.addEventListener("click", () => {
    const getActive = document.querySelector(".quiz__answer--active");

    if (
      parseInt(getActive.dataset.answerIndex) ==
      questionsArray[round].rightAnswer
    ) {
      console.log("You have selected the right answer!");
      score++;
    } else {
      console.log("Wrong answer");
    }

    round++;
    console.log(round);
  });
}

// RENDER

const renderInterface = (questionObject) => {
  renderQuestion(questionObject, quizSection);
  const answersContainer = renderAnswerContainer(quizSection);
  createAnswers(questionObject, answersContainer);
  createNextButton(quizSection);
};

// MAIN LOGIC

let round = 0;
let score = 0;

const main = () => {
  renderInterface(questionsArray[round]);
};

main();

// TODO: Create logic for checking if active is the right button, when the next button is clicked.
// check which question has active
// see if active has the index (quiz__answer1) class?
