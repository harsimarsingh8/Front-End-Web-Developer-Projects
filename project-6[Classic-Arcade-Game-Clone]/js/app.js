var counter = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.speed = speed;
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/Rock.png';
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

    if (this.x < 500) {
        this.x += this.speed * dt;

    } else {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x, y) {


    this.x = x;
    this.sprite = 'images/char-horn-girl.png';
    this.y = y;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {
    for (var i = 0; i < 3; i++) {
        if ((this.x > allEnemies[i].x - 65) && (this.x - 65 < allEnemies[i].x) && (this.y > allEnemies[i].y - 65) && (this.y - 65 < allEnemies[i].y)) {
            this.reset();
            counter = 0;
            document.getElementById("score").innerHTML = counter;
        }
    }
};


Player.prototype.handleInput = function(key) {
    if (key == 'up') {
        if (this.y > 40)
            this.y -= 100;
        else {
            this.reset();
            counter++;
            document.getElementById("score").innerHTML = counter;
        }
    } else if (key == 'down') {
        if (this.y < 430) {
            this.y += 100;
        } else {
            this.reset();
        }
    } else if (key == 'left') {
        if (this.x > 0)
            this.x -= 30;
    } else if (key == 'right') {
        if (this.x < 400)
            this.x += 30;
    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.reset = function() {
    this.x = 210;
    this.y = 430;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var allEnemies = [
    new Enemy(0, 60, 350),
    new Enemy(0, 145, 320),
    new Enemy(0, 225, 390),

];
var player = new Player(210, 430);
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
