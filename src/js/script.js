const firstPage = document.querySelector('#first-page');
const startGameButton = document.querySelector('#start');
const mainContent = document.querySelector('#main-content');
const gamePage = document.querySelector('#game')

let isGameStarted = 0;

function removeFirstPageContent(){
    mainContent.classList.add("hidden");
}

function addFirstPageContentBack(){
    mainContent.classList.remove("hidden");
}


function fetchRandomFlag(){
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



function addGameCode(countryCode, countryName){
    const gameCode = `<div class="flex flex-col items-center h-screen justify-center">
    <p class="text-4xl text-pink-500 font-bold mb-5">Guess the flag ?</p>
    <img src="https://flagcdn.com/w320/${countryCode}.png" width="320" alt="${countryName}">
    <div id="options" class="flex flex-col">
        <div>
            <button id="option-1"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">Option
                1</button>
            <button id="option-2"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">Option
                2</button>
        </div>
        <div>
            <button id="option-3"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">Option
                3</button>
            <button id="option-4"
                class="my-8 bg-pink-500 py-3 px-14 rounded-md hover:drop-shadow-2xl text-white">Option
                4</button>
        </div>
    </div>
</div>`;
    gamePage.innerHTML += gameCode;
}

function startGame(){
    isGameStarted = 1;
    removeFirstPageContent();
    fetchRandomFlag();
}


startGameButton.addEventListener('click', (e)=>{
    startGame();
})
