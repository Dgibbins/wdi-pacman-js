// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 1;
var dots = 2;
ghostEaten = 0;
var level = 0;
var fruit = "Stuff";


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var cherry = {
  name: 'Cherry',
  points: 100
};

var strawberry = {
  name: 'Strawberry',
  points: 300
};

var orange = {
  name: 'Orange',
  points: 500
};

var apple = {
  name: "Apple",
  points: 700
}

var pineapple = {
  name: "Pineapple",
  points: 1000
};

var ship = {
  name: "Galaxian Spaceship",
  points: 2000
};

var bell = {
  name: "Bell",
  points: 3000
};

var key = {
  name: "Key",
  points: 5000
};

  var ghosts = [inky, blinky, pinky, clyde];

  var bonus = [cherry,  strawberry, orange, apple, pineapple, ship, bell, key];

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log( '----------Level: '+ level + ' ----------\n\n'+'Score: ' + score + '     Lives: ' + lives + '\n\nPowerPellets: ' + powerPellets + '      Dots: ' + dots + '    Ghost Eaten: '+ ghostEaten);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if(dots>=10){
    console.log('(w) Eat 10 dots');
  };
  if(dots>=100){
    console.log('(e) Eat 100 dots');
  };
  if( dots> 0){
    console.log('(d) Eat Dot');
    console.log('(r) Eat remaining dots');
  }
  if(powerPellets>0){
    console.log('(t) Eat Power Pellet');
  };
  if(dots == Math.floor((Math.random() * 240) + 1) && level > 0){
    console.log('(z) Bonus!');
    dots--;
  };
  console.log('(1) Eat Inky - '+ nomnom(0));
  console.log('(2) Eat Blinky - ' + nomnom(1));
  console.log('(3) Eat Pinky - '+ nomnom(2));
  console.log('(4) Eat Clyde - '+ nomnom(3));
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots--;
}

function eatDots(key) {
  console.log('\n');
  switch(key){
    case 'w':
      if(dots>=10){
        dots -= 10;
        score += 10;
        break;
      } else {
        console.log('No can do!');
        break;
      };
    case 'e':
      if(dots>100){
        dots -= 100;
        score =+ 100;
        break;
      } else {
        console.log('No can do!');
        break;
      };
    case 'r':
      score += dots;
      dots = 0;
      break;
  };
};

function eatGhost(num) {
  console.log('\n');
  if (ghosts[num].edible) {
    switch (num){
    case 0:
      console.log("You ate Inky! It tasted like " + ghosts[num].character);
      ghosts[num].edible = false;
      break;
    case 1:
      console.log("You ate Blinky: Cyan");
      ghosts[num].edible = false;
      break;
    case 2:
      console.log("You ate Pinky: Pink");
      ghosts[num].edible = false;
      break;
    case 3:
      console.log("You ate Clyde: Orange");
      ghosts[num].edible = false;
      break;
    }
  } else{
    switch (num){
    case 0:
      console.log("You tried to eate Inky: Red");
      break;
    case 1:
      console.log("You tried to eat Blinky: Cyan");
      break;
    case 2:
      console.log("You tried to eat Pinky: Pink");
      break;
    case 3:
      console.log("You tried to eat Clyde: Orange");
      break;
    }
      lives -= 1;
      console.log("OUCH!");
    }
}

function check(){
  if(lives <= 0){
    process.exit();
    };
}

function eatPowerPellet(){
  if(powerPellets > 0){
  score += 50;
  ghosts.forEach(function(ghost){
    ghost.edible = true;
  });
  powerPellets-=1;
  }else {
    console.log("No More PP's!!!");
  }
};

function nomnom(id){
  if (ghosts[id].edible == true){
    return("Eat!");
  } else {
    return("Don't Eat!");
  }
};

function ghostsEaten(){
  if(ghostEaten>=0 && ghostEaten <=4){
    score+= 200*Math.pow(2,(ghostEaten));
    ghostEaten++;3
  } else {
    ghostEaten = 0;
  };
};

function fruitForePlay(){
  if(powerPellets == 0 && dots == 0 && level <= 256) {
    level++;
    dots = 240;
    powerPellets = 4;
    ghosts.forEach(function(ghost){ghost.edible = false });
  } else {
    console.log('You are Pac-Man Master. *bow*');
  };
};

function bonusExtra(){
  if(level==1){
    score+= bonus[0].points;
    console.log("You just got a bonus " + bonus[0].name +"!!!");
  } else if(level == 2 ){
    score+= bonus[1].points;
    console.log("You just got a bonus" + bonus[1].name +"!!!");
  } else if(level== 3 || level == 4) {
    score+= bonus[2].points;
    console.log("You just got a bonus" + bonus[2].name +"!!!");
  } else if(level== 5 || level == 6) {
    score+= bonus[3].points;
    console.log("You just got a bonus" + bonus[3].name +"!!!");
  } else if(level== 7 || level == 8) {
    score+= bonus[4].points;
    console.log("You just got a bonus" + bonus[4].name +"!!!");
  } else if(level== 9 || level == 10) {
    score+= bonus[5].points;
    console.log("You just got a bonus" + bonus[5].name +"!!!");
  } else if(level== 11 || level == 12) {
    score+= bonus[6].points;
    console.log("You just got a bonus" + bonus[6].name +"!!!");
  } else if(level>= 13) {
    score+= bonus[7].points;
    console.log("You just got a bonus" + bonus[7].name +"!!!");
  };
};

// function eatInky() {
//   console.log('\nChomp!');
//   lives -= 1;
// };
// function eatBlinky() {
//   console.log('\nChomp!');
//   lives -= 1;
// };
// function eatPinky() {
//   console.log('\nChomp!');
//   lives -= 1;
// };
// function eatClyde() {
//   console.log('\nChomp!');
//   lives -= 1;
// };


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      fruitForePlay();
      break;
    case 'w':
      eatDots(key);
      fruitForePlay();
      break;
    case 'e':
      eatDots(key);
      fruitForePlay();
      break;
    case 'r':
      eatDots(key);
      fruitForePlay();
      break;
    case 't':
      eatPowerPellet();
      fruitForePlay();
      break;
    case '1':
      eatGhost(0);
      ghostsEaten();
      check();
      break;
    case '2':
      eatGhost(1);
      ghostsEaten();
      check();
      break
    case '3':
      eatGhost(2);
      ghostsEaten();
      check();
      break;
    case '4':
      eatGhost(3);
      ghostsEaten();
      check();
      break;
    case 'z':
      bonusExtra();
      break;
    default:
      console.log('\nInvalid Command!');
      fruitForePlay();
  }

}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 400); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
