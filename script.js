const questions = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        correct: "Полдеревни, зараз",
        description: "Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
        options: [
            "Пол-деревни, за раз",
            "Пол деревни, за раз"
        ]
    },
    {
        question: "А эти слова как пишутся?",
        correct: "Капучино и эспрессо",
        description: "По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».",
        options: [
            "Капуччино и эспрессо",
            "Каппуччино и экспресо"
        ]
    },
    {
        question: "Как нужно писать?",
        correct: "Чересчур",
        description: "Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
        options: [
            "Черезчур",
            "Черес-чур"
        ]
    },
    {
        question: "Где допущена ошибка?",
        correct: "Эпелепсия",
        description: "Ошибка в слове Эпелепсия. Слово пишется так: «эпИлепсия». Радостно, если это слово касается вас только в формате 'Как писать правильно'.",
        options: [
            "Аккордеон",
            "Белиберда"
        ]
    }
]

const iconCorrect = `
<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#1eff00" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
`

const iconWrong = `
<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#ff0000" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
`

const main = document.querySelector('.main');
const askBlock = document.querySelector('.askBlock');
const questionBlock = document.querySelector('.questionBlock');
const templateQuestion = document.querySelector('#questionTemplate');
let currQInd = 0;
let T = 0;
let F = 0;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const questionsShuffled = shuffleArray(questions);

function renderQuestion(n) {
    const q = questionsShuffled[n];
    const questionTemplate = templateQuestion.content.cloneNode(true);
    const questionText = questionTemplate.querySelector('.question');
    const answersBlock = questionTemplate.querySelector('.answers');
    const descriptionBlock = questionTemplate.querySelector('.description');
    
    descriptionBlock.textContent = q.description;
    questionText.textContent = n + 1 + ". " + q.question;

    function createAnswer(text) {
        const answer = document.createElement('div');
        answer.classList.add('answer');
        answer.textContent = text;
        return answer;
    }

    const answers = shuffleArray(q.options.concat(q.correct)); 

    for (let i = 0; i < answers.length; i++) {
        const ans = createAnswer(answers[i]);
        ans.addEventListener('click', (e) => onAnswerClick(e, q));
        
        answersBlock.appendChild(ans); 
    }
    currentQuestionBlock = questionTemplate;
    console.log(currentQuestionBlock)
    askBlock.appendChild(questionTemplate); 
}


function onAnswerClick(e, q) {
    const currentQuestionBlock = askBlock.lastElementChild;

    const userAnswer = e.target.textContent;
    const correctAnswer = q.correct;

    const answers = askBlock.lastElementChild.querySelector(".answers");
    startTransition(answers); 

    if(userAnswer === correctAnswer) {
        const desc = currentQuestionBlock.querySelector(".description");
        desc.classList.remove("hidden"); 

        currentQuestionBlock.querySelector(".question").innerHTML += iconCorrect;

        setTimeout(function () {
            desc.classList.add("hidden");
        }, 3000);

        T++;
    } else {
        currentQuestionBlock.querySelector(".question").innerHTML += iconWrong;
        F++;
    }

    setTimeout(function () {
        if (currQInd >= questions.length  - 1) {
            renderResult();
            return;
        }
        renderQuestion(++currQInd);
    }, 3000);
 

}

function renderResult() {
    main.innerHTML += "\n <p>" + "Вопросы закончились!" +"</p>";
  
    main.innerHTML += "\n <p>Правильных ответов " + T + " из " + questions.length + "</p>";
    

    const allQ = document.querySelectorAll(".questionBlock");

    allQ.forEach((q) => {
        q.onclick = showDescriptionAfterAllDone;
    });
}

function showDescriptionAfterAllDone() {
    const allQ = document.querySelectorAll(".questionBlock");

    allQ.forEach((q) => {
        const desc = q.querySelector(".description");
        desc.classList.add("hidden");
    });

    const desc = this.querySelector(".description");
    desc.classList.toggle("hidden");
}


function startTransition(element) {
    element.style.height = "0px";
    element.style.transition = "3s";
    element.style.transform = "translateY(100vh)";
    element.style.opacity = 0;
    setTimeout(function () {
        element.remove();
    }, 3000);
}

renderQuestion(currQInd);