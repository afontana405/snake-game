var playerDirection = '';
var tailLength = 0;
var tailArray = [];
var autoMoveInt = setInterval(autoMove, 500);
var foodSpawner = setInterval(foodSpawner, 5000);

$(window).ready(function() {
    createBoard();
});

// listens for arrow key clicks
document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 38) {
        playerDirection = 'up';
    } else if (e.keyCode === 40) {
        playerDirection = 'down';
    } else if (e.keyCode === 37) {
        playerDirection = 'left';
    } else if (e.keyCode === 39) {
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
    if (playerDirection === 'up') {
        moveUp();
    } else if (playerDirection === 'down') {
        moveDown();
    } else if (playerDirection === 'left') {
        moveLeft();
    } else if (playerDirection === 'right') {
        moveRight();
    };
};

// moves player up 1
function moveUp() {
    var currentLocation = $('#player-location')[0];
    var currentYAxis = currentLocation.parentElement.id;
    var currentXAxis = currentLocation.className
    if (currentYAxis > 0) {
        tailArray.push(currentLocation);
        currentLocation.id = 'player-tail';
        currentYAxis--;
        var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id
        checkSquare(locationMovedTo);
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
        checkTailLength();
    } else {
        endgame();
    }
}

// moves player down 1
function moveDown() {
    var currentLocation = $('#player-location')[0];
    var currentYAxis = currentLocation.parentElement.id;
    var currentXAxis = currentLocation.className
    if (currentYAxis < 9) {
        tailArray.push(currentLocation);
        currentLocation.id = 'player-tail';
        currentYAxis++;
        var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id
        checkSquare(locationMovedTo);
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
        checkTailLength();
    } else {
        endgame();
    }
}

// moves player left 1
function moveLeft() {
    var currentLocation = $('#player-location')[0];
    var currentXAxis = currentLocation.className;
    var currentYAxis = currentLocation.parentElement.id;
    if (currentXAxis > 1) {
        tailArray.push(currentLocation);
        currentLocation.id = 'player-tail';
        currentXAxis--;
        var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id
        checkSquare(locationMovedTo);
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
        checkTailLength();
    } else {
        endgame();
    }
}

// moves player right 1
function moveRight() {
    var currentLocation = $('#player-location')[0];
    var currentXAxis = currentLocation.className;
    var currentYAxis = currentLocation.parentElement.id;
    if (currentXAxis < 10) {
        tailArray.push(currentLocation);
        currentLocation.id = 'player-tail';
        currentXAxis++;
        var locationMovedTo = document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id
        checkSquare(locationMovedTo);
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
        checkTailLength();
    } else {
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

// removes player from board, stops interval
function endgame() {
    for (var i = 0; i < tailArray.length; i++) {
        tailArray[i].id = '';
    }
    var currentLocation = $('#player-location')[0];
    currentLocation.id = '';
    clearInterval(autoMoveInt);
}

// if location player moves to has food, they grow. if they touch themself, they die
function checkSquare(locationMovedTo) {
    if (locationMovedTo === 'food') {
        tailLength++;
    } else if (locationMovedTo === 'player-tail') {
        endgame();
    }
}

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