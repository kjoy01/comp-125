/**
 * LABS 12-17 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash"; // lab 12
var player1; // lab 13
var timer; // lab  14
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"


function setup() {

  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5)
  console.log(player1);

  timer = new Timer(20000); // 5 second timer
  console.log(timer)

  dropTimer = new Timer(1000);

  testBox = new Box(width / 2, height / 3);
}

function draw() {
  background(200);
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
}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0);
  fill(0, 0, 200);
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
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

  for (let i = 0; i < presents.length; i++) {
    // for each element of the array, represented by 'i', do the following:
    presents[i].display(); // draw it on the canvas
    presents[i].move(); // make it drop
    presents[i].spin() // make it rotate

    if (presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1); // remove from array
    }
    // find distance between presents[i] and player1:
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if (d < 50) { // less than 50 pixels?
      presents.splice(i, 1); // remove from array
    }
  }


  textAlign(LEFT);
  text("elapsed time: " + timer.elapsedTime, 10, 20);
  // show elapsed time in top left corner


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
}


function mousePressed() {
  console.log("click!");
  if (gameState == "splash") {
    gameState = "play";
    timer.start();
    dropTimer.start(); // start the drop timer for present
  } else if (gameState == "play") {
    //gameState = "gameOver"
  } if (gameState == "gameOver") {
    gameState = "splash"; // go to the play() screen
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      player1.y -= 30
      player1.angle = 0;
      if (player1.y < 0) player1.y = height; // wrap to bottom
      break;
    case DOWN_ARROW:
      player1.y += 30
      player1.angle = PI
      if (player1.y > height) player1.y = 0; // wrap to top
      break;
    case LEFT_ARROW:
      player1.x -= 30
      player1.angle = -PI / 2
      if (player1.x < 0) player1.x = width; // wrap to top
      break;
    case RIGHT_ARROW:
      player1.x += 30
      player1.angle = PI / 2
      if (player1.x > width) player1.x = 0; // wrap to top
      break;
    default:
      console.log("use the arrow keys to move");
  }
}