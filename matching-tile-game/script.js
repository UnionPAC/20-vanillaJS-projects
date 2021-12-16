const lifeContainer = document.getElementById('lifeContainer');
const livesCount = document.getElementById('lives');
let lives = 6;

livesCount.innerText = lives
livesCount.style.color = '#9cff94';

const tileContainer = document.getElementById('tileContainer');
const resultsContainer = document.getElementById('resultsContainer')
const playAgainBtn = document.getElementById('playAgain');

// Tile Data
const data = [
    {imgSrc: './img/banjokazooie.png', imgAlt: 'Banjo & Kazooie', name: 'banjokazooie'},
    {imgSrc: './img/cubone.png', imgAlt: 'Cubone', name: 'cubone'},
    {imgSrc: './img/dk.png', imgAlt: 'Donkey Kong', name: 'donkeykong'},
    {imgSrc: './img/fox.png', imgAlt: 'Fox McCloud', name: 'starfox'},
    {imgSrc: './img/link.png', imgAlt: 'Link (Zelda)', name: 'link'},
    {imgSrc: './img/sonic.png', imgAlt: 'Sonic the Hedgehog', name: 'sonic'},
    {imgSrc: './img/wario.png', imgAlt: 'Wario', name: 'wario'},
    {imgSrc: './img/yoshi.png', imgAlt: 'Yoshi', name: 'yoshi'},
    {imgSrc: './img/banjokazooie.png', imgAlt: 'Banjo & Kazooie', name: 'banjokazooie'},
    {imgSrc: './img/cubone.png', imgAlt: 'Cubone', name: 'cubone'},
    {imgSrc: './img/dk.png', imgAlt: 'Donkey Kong', name: 'donkeykong'},
    {imgSrc: './img/fox.png', imgAlt: 'Fox McCloud', name: 'starfox'},
    {imgSrc: './img/link.png', imgAlt: 'Link (Zelda)', name: 'link'},
    {imgSrc: './img/sonic.png', imgAlt: 'Sonic the Hedgehog', name: 'sonic'},
    {imgSrc: './img/wario.png', imgAlt: 'Wario', name: 'wario'},
    {imgSrc: './img/yoshi.png', imgAlt: 'Yoshi', name: 'yoshi'}
];
    

// Randomize the tiles
const randomize = () => {
    const tileData = data;
    
    return tileData.sort(() => Math.random() - 0.5);
}

// Display tile in DOM
const showTiles = () => {
    const tileData = randomize();
    
    // Generate HTML
    tileData.forEach((item) => {

    const tile = document.createElement('div');
    tile.classList = 'tile';

    const front = document.createElement('img');
    front.classList = 'front';

    const back = document.createElement('div');
    back.classList = 'back';

    // Attach data to tiles
    front.src= item.imgSrc;
    front.alt= item.imgAlt;
    tile.setAttribute('name', item.name)

    // Append tiles to tile container
    tileContainer.appendChild(tile);
    tile.appendChild(front);
    tile.appendChild(back);

    tile.addEventListener('click', (e) => {
        tile.classList.toggle('toggleTile');
        checkTileMatch(e);
    });

    });
    
};

// Check if tiles match
const checkTileMatch = (e) => {
    const clickedTile = e.target;
    clickedTile.classList.add('flipped');
    const flippedTiles = document.querySelectorAll('.flipped')
    const toggleTiles = document.querySelectorAll('.toggleTile')

    // Check Logic
    if (flippedTiles.length === 2) {
        // Correct Match
        if (flippedTiles[0].getAttribute('name') === flippedTiles[1].getAttribute('name')) {
            flippedTiles.forEach(tile => {
                tile.classList.remove('flipped');
                tile.style.pointerEvents = 'none';
            });
        // Not a match
        } else {
            flippedTiles.forEach(tile => {
                tile.classList.remove('flipped');
                setTimeout(() => {
                    tile.classList.remove('toggleTile');
                }, 800);
            });
            lives--;
            livesCount.innerText = lives;
        }

        if (lives > 4) {
            livesCount.style.color = '#9cff94';
        } else if (lives > 2) {
            livesCount.style.color = '#ff9800';
        } else if (lives > 0) {
            livesCount.style.color = '#f10000';
        } else if (lives === 0) {
            setTimeout(() => {
                restart('🙁 You lost, try again!');
            }, 200);
        }
    }
    // Run a check to see if the player won the game
    if(toggleTiles.length === 16) {
        restart('😃 🤟 Congrats, you won!')
    }
};




// Restart game
const restart = (text) => {
    let tileData = randomize();
    let fronts = document.querySelectorAll('.front');
    let tiles = document.querySelectorAll('.tile');
    tileContainer.style.pointerEvents = 'none';

    tileData.forEach((item, index) => {
        tiles[index].classList.remove('toggleTile');
        // randomize
        setTimeout(() => {
            fronts[index].src = item.imgSrc;
            tiles[index].setAttribute('name', item.name);
            tiles[index].style.pointerEvents = 'all';
        }, 1000);
    });

    lives = 6;
    livesCount.innerText = lives;
    livesCount.style.color = '#9cff94'
    setTimeout(() => {
        window.alert(text);
    }, 100);
}


showTiles();

