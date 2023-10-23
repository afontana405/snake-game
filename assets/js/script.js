var playerDirection = '';
var yAxis = 6;
var xAxis = 6; 
var tailLength = 5;
var tailArray = [];
var autoMoveInt = setInterval(autoMove, 500);

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
    document.getElementById(yAxis).getElementsByClassName(xAxis)[0].id = 'player-location'; 
}

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
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
        checkTailLength();
    } else {
        endgame();
    }
}

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