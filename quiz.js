const partsOfSpeech = {
    "名詞": "noun",
    "冠詞": "article",
    "動詞": "verb",
    "助動詞": "auxiliary verb",
    "形容詞": "adjective",
    "副詞": "adverb",
    "前置詞": "preposition",
    "接続詞": "conjunction",
    "間投詞": "interjection",
    "代名詞": "pronoun"
};

let mistakes = [];
let currentPartOfSpeech = '';
let currentCategory = '';
let correctAnswers = 0;
let totalQuestions = 0;
let askedQuestions = [];

function getRandomPartOfSpeech() {
    const categories = Object.keys(partsOfSpeech).filter(category => !askedQuestions.includes(category));
    const category = categories[Math.floor(Math.random() * categories.length)];
    const partOfSpeech = partsOfSpeech[category];
    return { category, partOfSpeech };
}

function startQuiz() {
    if (totalQuestions < 10) {
        const { category, partOfSpeech } = getRandomPartOfSpeech();
        currentPartOfSpeech = partOfSpeech;
        currentCategory = category;
        askedQuestions.push(category);
        document.getElementById('part-of-speech-display').innerText = `品詞: '${category}'`;
        totalQuestions++;
    } else {
        showFinalResults();
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('category-input').value.toLowerCase().trim();
    if (userAnswer !== currentPartOfSpeech) {
        alert(`Wrong! The correct answer is '${currentPartOfSpeech}'.`);
        mistakes.push({ category: currentCategory, partOfSpeech: currentPartOfSpeech });
    } else {
        alert('Correct!');
        correctAnswers++;
    }
    document.getElementById('category-input').value = '';
    startQuiz();
}

function retryMistakes() {
    if (mistakes.length === 0) {
        alert("No mistakes to retry.");
        return;
    }
    const { category, partOfSpeech } = mistakes.shift();
    currentPartOfSpeech = partOfSpeech;
    currentCategory = category;
    document.getElementById('part-of-speech-display').innerText = `Retry: 品詞: '${category}'`;
}

function showFinalResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('final-result-container').classList.remove('hidden');
    document.getElementById('show-results-button').classList.add('hidden');

    const resultList = document.getElementById('final-result-list');
    resultList.innerHTML = `<li>Correct Answers: ${correctAnswers}</li><li>Total Questions: ${totalQuestions}</li>`;

    if (mistakes.length > 0) {
        const mistakesList = document.createElement('ul');
        mistakesList.innerHTML = "<li>Mistakes:</li>";
        mistakes.forEach(mistake => {
            const listItem = document.createElement('li');
            listItem.innerText = `${mistake.category} (${mistake.partOfSpeech})`;
            mistakesList.appendChild(listItem);
        });
        resultList.appendChild(mistakesList);
    }
}

window.onload = function() {
    startQuiz();
};
