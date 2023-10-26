var gameboard = $('#game-board')[0];
var playerDirection = 'up';
var tailLength = 0;
var tailArray = [];
var autoMoveInt;
var foodSpawnerInt;
var playerSpeed = 250;
var foodSpawnRate = 5000;
var pauseStatus = 0;

// loads gameboard so there isnt so damn much html
$(window).ready(function() {
    createBoard();
    document.getElementById('play-again-btn').style.display = 'none';
});

// starts the game with users preferred settings
$('#start-btn').click(function() {
    playerSettings();
    autoMoveInt = setInterval(autoMove, playerSpeed);
    foodSpawnerInt = setInterval(foodSpawner, foodSpawnRate);
    document.getElementById('start-btn').style.display = 'none';
});

// restarts the game with users preferred settings
$('#play-again-btn').click(function() {
    document.getElementById('start-btn').style.display = 'none';
    playerSettings();
    document.getElementById(6).getElementsByClassName(6)[0].id = 'player-location';
    playerDirection = 'up';
    autoMoveInt = setInterval(autoMove, playerSpeed);
    foodSpawnerInt = setInterval(foodSpawner, foodSpawnRate);
});

// listens for arrow key or WASD clicks
document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 38 || e.keyCode === 87) {
        playerDirection = 'up';
    } else if (e.keyCode === 40 || e.keyCode === 83) {
        playerDirection = 'down';
    } else if (e.keyCode === 37 || e.keyCode === 65) {
        playerDirection = 'left';
    } else if (e.keyCode === 39 || e.keyCode === 68) {
        playerDirection = 'right';
    } else if (e.keyCode === 80) {
        if (pauseStatus === 0){ //pauses game if currently unpaused
            pauseStatus++;
            clearInterval(autoMoveInt);
            clearInterval(foodSpawnerInt);
        } else if (pauseStatus === 1) { //unpauses game if currently paused
            pauseStatus--;
            autoMoveInt = setInterval(autoMove, playerSpeed);
            foodSpawnerInt = setInterval(foodSpawner, foodSpawnRate);
        }
    }
};

function createBoard() {
    // creates 10 rows and columns
    for (var i = 0; i < 10; i++) {
        var section = document.createElement('section');
        section.setAttribute('id', [i]);
        section.className = 'col-10 d-flex';
        section.innerHTML = '<div class="1"></div><div class="2"></div><div class="3"></div><div class="4"></div><div class="5"></div><div class="6"></div><div class="7"></div><div class="8"></div><div class="9"></div><div class="10"></div>';
        gameboard.append(section);
    }
    // creates the player in default position
    document.getElementById(6).getElementsByClassName(6)[0].id = 'player-location'; 
}

// checks users last input to decide which direction to move
function autoMove() {
    var currentLocation = $('#player-location')[0];
    var currentYAxis = currentLocation.parentElement.id;
    var currentXAxis = currentLocation.className
    checkTailLength();
    if (playerDirection === 'up') { // moves player up 1
        if (currentYAxis > 0) {
            tailArray.push(currentLocation);
            currentLocation.id = 'player-tail';
            currentYAxis--;
            var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0]
            checkSquare(locationMovedTo);
            locationMovedTo.id = 'player-location';
        } else { // ends game if player hits wall
            endgame();
        }
    } else if (playerDirection === 'down') { // moves player down 1
        if (currentYAxis < 9) {
            tailArray.push(currentLocation);
            currentLocation.id = 'player-tail';
            currentYAxis++;
            var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0]
            checkSquare(locationMovedTo);
            locationMovedTo.id = 'player-location';
        } else { // ends game if player hits wall
            endgame();
        }
    } else if (playerDirection === 'left') { // moves player left 1
        if (currentXAxis > 1) {
            tailArray.push(currentLocation);
            currentLocation.id = 'player-tail';
            currentXAxis--;
            var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0]
            checkSquare(locationMovedTo);
            locationMovedTo.id = 'player-location';
        } else { // ends game if player hits wall
            endgame();
        }
    } else if (playerDirection === 'right') { // moves player right 1
        if (currentXAxis < 10) {
            tailArray.push(currentLocation);
            currentLocation.id = 'player-tail';
            currentXAxis++;
            var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0]
            checkSquare(locationMovedTo);
            locationMovedTo.id = 'player-location';
        } else { // ends game if player hits wall
            endgame();
        }
    };
};

// spawns food randomly on game board
function foodSpawner() {
    var xAxis = Math.floor(Math.random() * 10)+1;
    var yAxis = Math.floor(Math.random() * 10);
    var foodLocation = document.getElementById(yAxis).getElementsByClassName(xAxis)[0];
    // makes sure food doesnt spawn on player
    if (foodLocation.id !== 'player-location' && foodLocation.id !== 'player-tail') {
        foodLocation.id = 'food'
    }
}

// if location player moves to has food, they grow. if they touch themself, they die
function checkSquare(locationMovedTo) {
    tailArray[0].id = 'tail-caboose';
    if (locationMovedTo.id === 'food') {
        tailLength++;
    } else if (locationMovedTo.id === 'player-tail') {
        endgame();
    }
}

// deletes end of players tail when they move
function checkTailLength() {
    if (tailArray.length > tailLength) {
        tailArray[0].id = '';
        tailArray.shift();
    }
};


// removes player from board, stops intervals
function endgame() {
    clearInterval(autoMoveInt);
    clearInterval(foodSpawnerInt);
    for (var i = 0; i < tailArray.length; i++) {
        tailArray[i].id = '';
    }
    tailArray = [];
    var currentLocation = $('#player-location')[0];
    currentLocation.id = '';
    document.getElementById('play-again-btn').style.display = 'initial';
}

// uses user input to set the rules for the game
function playerSettings() {
    // sets tail length to user input if it is a number
    var tailLengthInput = $('#tail-length').val();
    if (!isNaN(tailLengthInput)) {
        tailLength = tailLengthInput
    }
    // sets speed to user input
    var speedInput = $('#speed-input').val();
    if (speedInput === 'slow') {
        playerSpeed = 1000;
    } else if (speedInput === 'fast') {
        playerSpeed = 100;
    } else if (speedInput === 'unplayable') {
        playerSpeed = 1;
    } else {
        playerSpeed = 250;
    }
    // sets food spawn rate to user input
    var foodInput = $('#food-spawn-rate').val();
    if (foodInput === 'slow') {
        foodSpawnRate = 10000;
    } else if (foodInput === 'fast') {
        foodSpawnRate = 2500;
    } else if (foodInput === 'insane') {
        foodSpawnRate = 1;
    } else {
        foodSpawnRate = 5000;
    }
}