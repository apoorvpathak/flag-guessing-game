const firstPage = document.querySelector('#first-page');
const startGameButton = document.querySelector('#start');
const mainContent = document.querySelector('#main-content');
const gamePage = document.querySelector('#game');

let isGameStarted = false;
let score = 0;

function removeFirstPageContent() {
    mainContent.classList.add("hidden");
}

function addFirstPageContentBack() {
    mainContent.classList.remove("hidden");
}

function fetchRandomFlag() {
    fetch('json/flagCodes.json')
        .then(response => response.json())
        .then(data => {
            const entries = Object.entries(data);
            const randomIndex = Math.floor(Math.random() * entries.length);
            const [key, value] = entries[randomIndex];
            addGameCode(key, value);
        })
        .catch(error => console.error('Error:', error));
}

async function loadCountryData() {
    const response = await fetch('json/flagCodes.json');
    const data = await response.json();
    return data;
}

async function getRandomCountries(excludeCountry) {
    const countryData = await loadCountryData();
    const countryNames = Object.values(countryData);
    const incorrectCountries = countryNames.filter(name => name !== excludeCountry);

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    shuffleArray(incorrectCountries);
    return incorrectCountries.slice(0, 3);
}

function addGameCode(countryCode, countryName) {
    console.log(countryName)
    getRandomCountries(countryName).then((result) => {
        let randomNumber = Math.floor(Math.random() * 4);
        result.splice(randomNumber, 0, countryName);
        gamePage.innerHTML = ''; // Clear previous content
        const gameCode = `
            <div class="flex flex-col items-center h-screen justify-center">
                <div id="score" class="font-Inter text-pink-500 text-2xl mb-6 font-semibold flex justify-center">
                    <p>Score: </p>
                    <p>${score}</p>
                </div>
                <p class="text-4xl text-pink-500 font-bold mb-5">Guess the flag ?</p>
                <img src="https://flagcdn.com/w320/${countryCode}.png" width="320" alt="${countryName}">
                <div id="options" class="flex flex-col">
                    <div>
                        <button id="option-1" class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[0]}</button>
                        <button id="option-2" class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[1]}</button>
                    </div>
                    <div>
                        <button id="option-3" class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[2]}</button>
                        <button id="option-4" class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[3]}</button>
                    </div>
                </div>
            </div>`;

        gamePage.innerHTML = gameCode;
        const option1 = document.querySelector("#option-1");
        const option2 = document.querySelector("#option-2");
        const option3 = document.querySelector("#option-3");
        const option4 = document.querySelector("#option-4");

        checkAnswer(option1, option2, option3, option4, countryName);
    });
}

function checkAnswer(o1, o2, o3, o4, countryName) {
    function handleClick(e) {
        if (e.target.textContent === countryName) {
            score++;
        } else {
            alert("Game Over! Incorrect answer.");
            isGameStarted = false; // End the game
            alert(`Final Score: ${score}, correct answer: ${countryName}`);
            document.querySelector("#score p:last-child").textContent = score;
            return;
        }
        document.querySelector("#score p:last-child").textContent = score;
        nextQuestion(); // Load the next question
    }

    o1.addEventListener('click', handleClick);
    o2.addEventListener('click', handleClick);
    o3.addEventListener('click', handleClick);
    o4.addEventListener('click', handleClick);
}

function nextQuestion() {
    if (isGameStarted) {
        fetchRandomFlag(); // Get the next flag
    } else {
        alert('Game Over!');
    }
}

function startGame() {
    if (isGameStarted) {
        removeFirstPageContent();
        fetchRandomFlag(); // Start fetching flags after game starts
    } else {
        alert('Game already ended');
    }
}

startGameButton.addEventListener('click', (e) => {
    isGameStarted = true;
    score = 0; // Reset score
    startGame();
});
