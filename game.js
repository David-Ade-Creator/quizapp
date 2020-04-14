const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const playTime = document.getElementById('playTime');

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let gameTime = 4;

let questions = [
  {
    question: "Which player has won 6 baloon D'or?? ",
    choice1:"Ronaldinho",
    choice2:"Delima Ronaldo",
    choice3:"Messi",
    choice4:"Cristiano Ronaldo",
    answer:3
  },
  {
    question: "Which player has won UCL 5times in 2 different clubs and has 5 baloon D'or??",
    choice1:"Ronaldinho",
    choice2:"kaka",
    choice3:"Micheal Owen",
    choice4:"Cristiano Ronaldo",
    answer:4
  },
  {
    question: "which player wore NO7 shirt for united but scored only 4 goals??",
    choice1:"Anthonio Valencia",
    choice2:"Memphis Depay",
    choice3:"Alexis Sanchez",
    choice4:"Angel Dimaria",
    answer:3
  },
  {
    question: "Who has the highest assist and chances created?? ",
    choice1:"Kelvin Debruyne",
    choice2:"Mesut Ozil",
    choice3:"Paul Pogba",
    choice4:"Luka Modric",
    answer:1
  }
];


const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  gameCounter();
};

gameCounter = () => {
playTime.innerHTML = gameTime;
if(gameTime > 0){
  gameTime--;
}else{
  localStorage.setItem('mostRecentScore', score);
  return window.location.assign("./end.html");
  }
}

setInterval(() => {
  gameCounter();
}, 1000);

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("./end.html");
  }
  gameTime = 4;

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //update the progressBar
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerText = currentQuestion.question;

choices.forEach( choice => {
  const number = choice.dataset['number'];
  choice.innerText = currentQuestion['choice' + number];
});

availableQuestions.splice(questionIndex, 1);

acceptAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptAnswers) return;

    acceptAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToUse =
       selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

       if(classToUse === 'correct'){
         incrementScore(CORRECT_BONUS);
       }else{
         localStorage.setItem('mostRecentScore', score);
         return window.location.assign("./end.html");
       }

       selectedChoice.parentElement.classList.add(classToUse);

       setTimeout(() =>{
         selectedChoice.parentElement.classList.remove(classToUse);
         getNewQuestion();
       },1000);

  });
});

incrementScore = num =>{
  score += num;
  scoreText.innerText = score;
};


startGame();
