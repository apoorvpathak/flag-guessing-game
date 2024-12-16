const firstPage = document.querySelector('#first-page');
const startGameButton = document.querySelector('#start');
const mainContent = document.querySelector('#main-content');
const gamePage = document.querySelector('#game')

let isGameStarted = 0;


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
            // console.log([key, value, entries.length])

            // return key, value;
            addGameCode(key, value)
            return key, value;
        })
        .catch(error => console.error('Error:', error));
}

// function getRandomValues(count = 3) {
//     return fetch('json/flagCodes.json')
//         .then(response => response.json())
//         .then(data => {
//             const entries = Object.entries(data);
//             const randomValues = new Set();

//             while (randomValues.size < count && randomValues.size < entries.length) {
//                 const randomIndex = Math.floor(Math.random() * entries.length);
//                 const [, value] = entries[randomIndex];
//                 randomValues.add(value);
//             }

//             return Array.from(randomValues);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             return [];
//         });
// }
// function create4options(countryName){
//     let threeOptions = getRandomValues();
//     let fouroptions = threeOptions.splice(randomNumber, 0, countryName);
//     console.log(fouroptions)
// }

async function loadCountryData() {
    const response = await fetch('json/flagCodes.json'); // Fetch data from your data.json file
    const data = await response.json(); // Parse the JSON response
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
    getRandomCountries(countryName).then((result) => {
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        result.splice(randomNumber, 0, countryName);
        
        const gameCode = `<div class="flex flex-col items-center h-screen justify-center">
    <p class="text-4xl text-pink-500 font-bold mb-5">Guess the flag ?</p>
    <img src="https://flagcdn.com/w320/${countryCode}.png" width="320" alt="${countryName}">
    <div id="options" class="flex flex-col">
        <div>
            <button id="option-1"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[0]}</button>
            <button id="option-2"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[1]}</button>
        </div>
        <div>
            <button id="option-3"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[2]}</button>
            <button id="option-4"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">${result[3]}</button>
        </div>
    </div>
</div>`;
        gamePage.innerHTML += gameCode;


    })


}

function startGame() {
    isGameStarted = 1;
    removeFirstPageContent();
    fetchRandomFlag();
}


startGameButton.addEventListener('click', (e) => {
    startGame();
})
