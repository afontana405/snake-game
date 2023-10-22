var playerDirection = 'up';
var yAxis = 6;
var xAxis = 5;

$(window).ready(function() {
    createBoard();
});

document.onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode === 38) {
        moveUp();
    } else if (e.keyCode === 40) {
        moveDown();
    } else if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 39) {
        moveRight();
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
    document.getElementById(yAxis).getElementsByClassName(xAxis)[0].id = 'player-location'; 
}

function moveUp() {
    var currentLocation = $('#player-location')[0];
    var currentYAxis = currentLocation.parentElement.id;
    var currentXAxis = currentLocation.className
    if (currentYAxis > 0) {
        currentLocation.id = '';
        currentYAxis--;
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
    }
}

function moveDown() {
    var currentLocation = $('#player-location')[0];
    var currentYAxis = currentLocation.parentElement.id;
    var currentXAxis = currentLocation.className
    if (currentYAxis < 9) {
        currentLocation.id = '';
        currentYAxis++;
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
    }
}

function moveLeft() {
    var currentLocation = $('#player-location')[0];
    var currentXAxis = currentLocation.className;
    var currentYAxis = currentLocation.parentElement.id;
    if (currentXAxis > 1) {
        currentLocation.id = '';
        currentXAxis--;
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
    }
}

function moveRight() {
    var currentLocation = $('#player-location')[0];
    var currentXAxis = currentLocation.className;
    var currentYAxis = currentLocation.parentElement.id;
    if (currentXAxis < 10) {
        currentLocation.id = '';
        currentXAxis++;
        document.getElementById(currentYAxis).getElementsByClassName(currentXAxis)[0].id = 'player-location';
    }
}
