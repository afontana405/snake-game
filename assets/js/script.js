var playerDirection = 'up';
var tailLength = 0;
var tailArray = [];
var autoMoveInt;
var foodSpawnerInt;
var playerSpeed = 250;
var foodSpawnRate = 5000;

$(window).ready(function() {
    createBoard();
});

$('#submit-btn').click(function() {
    playerSettings();
});

$('#start-btn').click(function() {
    var autoMoveInt = setInterval(autoMove, playerSpeed);
    var foodSpawnerInt = setInterval(foodSpawner, foodSpawnRate);
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
    }
};

function createBoard() {
    // creates 10 rows and columns
    for (var i = 0; i < 10; i++) {
        var gameboard = $('#game-board')[0];
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
    if (playerDirection === 'up') { // moves player up 1
        if (currentYAxis > 0) {
            tailArray.push(currentLocation);
            currentLocation.id = 'player-tail';
            currentYAxis--;
            var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0]
            checkSquare(locationMovedTo);
            locationMovedTo.id = 'player-location';
            checkTailLength();
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
            checkTailLength();
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
            checkTailLength();
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
            checkTailLength();
        } else { // ends game if player hits wall
            endgame();
        }
    };
};

// if location player moves to has food, they grow. if they touch themself, they die
function checkSquare(locationMovedTo) {
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

// removes player from board, stops intervals
function endgame() {
    clearInterval(autoMoveInt);
    clearInterval(foodSpawnerInt);
    for (var i = 0; i < tailArray.length; i++) {
        tailArray[i].id = '';
    }
    var currentLocation = $('#player-location')[0];
    currentLocation.id = '';
}

function playerSettings() {
    // console.log($('#speed-input').val());
    // console.log($('#food-spawn-rate').val());
    // console.log($('#tail-length').val());
    tailLength = $('#tail-length').val();
    speedInput = $('#speed-input').val();
    if (speedInput === 'slow') {
        playerSpeed = 1000;
    } else if (speedInput === 'fast') {
        playerSpeed = 100;
    } else if (speedInput === 'impossible') {
        playerSpeed = 1;
    } else {
        playerSpeed = 250;
    }
    foodInput = $('#food-spawn-rate').val();
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
