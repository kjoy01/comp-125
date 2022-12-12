/**
 * LABS 12-17 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
// create Snow object
function Snow(x, y, size) {
  // position and size of snowflake
  this.x = x;
  this.y = y;
  this.size = size;

  // display snowflake on canvas
  this.display = function() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  // update snowflake's position
  this.update = function() {
    this.y += 1; // move down by 1 pixel
  }
}

var gameState = "splash"; // lab 12
var player1; // lab 13
var timer; // lab  14
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"
var score = 0; // keep track of points (starting at 0)
var snowflakes = new Array(0);
var snowTimer; // timer for generating new snowflakes
var speedTimer; // timer for controlling snowfall speed


function setup() {

  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5)
  console.log(player1);

  timer = new Timer(30000); // 5 second timer
  console.log(timer)

  dropTimer = new Timer(1000);

  testBox = new Box(width / 2, height / 3);
  
  for (let i = 0; i < 100; i++) {
    // random x and y position and random size
    let x = random(width);
    let y = random(height);
    let size = random(1, 6);
    let snowflake = new Snow(x, y, size);
    snowflakes.push(snowflake); // add to array
  }
  
}

function draw() {
  background(50);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch (gameState) {
    case "splash":
      splash(); // go to the "splash" screen
      break;
    case "play":
      play(); // go to the "play" screen
      break;
    case "gameOver":
      gameOver(); // go to the "game over" screen
      break;
    default:
      console.log("no match found - check your mousePressed() function!");
  }

  for (let i = 0; i < snowflakes.length; i++) {
    // for each snowflake, update position and display
    snowflakes[i].update();
    snowflakes[i].display();
    // if snowflake goes off the bottom of the canvas,
    // move it to a random position on the top
    if (snowflakes[i].y > height) {
      snowflakes[i].x = random(width);
      snowflakes[i].y = 0;
    }
  }

  
}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Santa's Sleigh Run!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(60);
  player1.display();
  player1.move();
  

  if (timer.isFinished()) {
    gameState = "gameOver";
  }
  if (dropTimer.isFinished()) {
    let p = new Box(random(width), -40);
    // new box, anywhere across the width of the canvas, but 40px above the canvas
    presents.push(p); // add object 'p' to the 'presents' Array
    dropTimer.start(); // restart timer for next drop
  }

  textAlign(LEFT);
  fill(220)
  text("elapsed time: " + timer.elapsedTime, 10, 20);
  // show elapsed time in top left corner
  textAlign(LEFT);
  fill(220)
  text("Score: " + score, 20, 40);


  for (let i = 0; i < presents.length; i++) {
    // for each element of the array, represented by 'i', do the following:
    presents[i].display(); // draw it on the canvas
    presents[i].move(); // make it drop
    presents[i].spin() // make it rotate

    if (presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1); // remove from array
      score--; // decrement score by 1
    }
    // find distance between presents[i] and player1:
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if (d < 50) { // less than 50 pixels?
      presents.splice(i, 1); // remove from array
      score++; // add 1 point!
    }
  }

  if (keyIsPressed) {
    switch (keyCode) {
      case UP_ARROW:
        player1.thrust(); // accelerate
        break;
      case DOWN_ARROW:
        player1.brake();
        break;
      case LEFT_ARROW:
        player1.angle -= .02; //turn left
        break;
      case RIGHT_ARROW:
        player1.angle += .02; //turn right
        break;
      default:
        console.log("use the arrow keys to move");
    }
  }
}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Your final score: " + score, width / 2, height * 2 / 3);

}

function mousePressed() {
  console.log("click!");
  if (gameState == "splash") {
    gameState = "play";
    timer.start();
    dropTimer.start(); // start the drop timer for present
    score = 0; // reset score to 0 at start of game
  } else if (gameState == "play") {
    //gameState = "gameOver"
  } if (gameState == "gameOver") {
    gameState = "splash"; // go to the play() screen
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      player1.y -= 20
      player1.angle = 0;
      if (player1.y < 0) player1.y = height; // wrap to bottom
      break;
    case DOWN_ARROW:
      player1.y += 20
      player1.angle = PI
      if (player1.y > height) player1.y = 0; // wrap to top
      break;
    case LEFT_ARROW:
      player1.x -= 20
      player1.angle = -PI / 2
      if (player1.x < 0) player1.x = width; // wrap to top
      break;
    case RIGHT_ARROW:
      player1.x += 20
      player1.angle = PI / 2
      if (player1.x > width) player1.x = 0; // wrap to top
      break;
    default:
      console.log("use the arrow keys to move");
  }
}

