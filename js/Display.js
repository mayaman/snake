/**
 * @file
 * Class to represent the grid, page backgorund, and text.
 * Handles adding and removing elements on the grid.
 */
class Display {

  constructor(numCells, canvas) {
    this.ctx = canvas.getContext("2d");
    this.numCells = numCells;
    this.squareSize = 30;
    this.gridSize = this.numCells * this.squareSize;
    this.score = 0;
    this.gameActive = true;
    this.width = canvas.width;
    this.height = canvas.height;

    // Declare font size relative to window height
    this.fontSize = this.height / 25;

    // Calculate values for grid origin
    this.startingWidth = canvas.width/2 - this.gridSize/2;
    this.startingHeight = canvas.height/2 - this.gridSize/2;

    // Set up empty grid
    this.grid = new Array();
    for (var x = 0; x < this.numCells; x++) {
      this.grid[x] = new Array();
      for (var y = 0; y < this.numCells; y++) {
        this.grid[x][y] = {};
      }
    }

    this.redrawLayout();
    this.addFoodItem();
  }

  gameIsActive() {
    return this.gameActive;
  }

  addSnakeItem(aPosition) {
    if (!this.outOfBounds(aPosition)) {
      this.grid[aPosition.getX()][aPosition.getY()].filling = "snake";
    }
  }

  drawSnake(aPosition) {
    this.ctx.fillStyle = "rgb(242, 38, 160)"; // pink
    this.ctx.stroke();
    this.grid[aPosition.getX()][aPosition.getY()].rect = this.ctx.fillRect(this.mapXPos(aPosition.getX()),this.mapYPos(aPosition.getY()),this.squareSize,this.squareSize);
  }

  addFoodItem() {
    // Function to caluclate random integer value for new food position
    var randomInt = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // Regenerate new postion until at an empty cell
    var newPosition = new Position (randomInt(0, this.numCells), randomInt(0, this.numCells));
    while(this.isOccupied(newPosition)) {
      newPosition = new Position (randomInt(0, this.numCells), randomInt(0, this.numCells));
    }
    this.grid[newPosition.getX()][newPosition.getY()].filling = "food";
  }

  drawFood(foodPosition) {
    this.ctx.fillStyle = "rgb(34, 247, 247)"; // light blue
    this.ctx.stroke();
    this.grid[foodPosition.getX()][foodPosition.getY()].rect = this.ctx.fillRect(this.mapXPos(foodPosition.getX()),this.mapYPos(foodPosition.getY()),this.squareSize,this.squareSize);
  }

  consumeFood(aPosition) {
    this.score++;
    this.removeItem(aPosition);
    this.addSnakeItem(aPosition);
    this.addFoodItem();
  }

  removeItem(aPosition) {
    this.grid[aPosition.getX()][aPosition.getY()].filling = "none";
  }

  outOfBounds(aPosition) {
    return aPosition.getX() < 0 || aPosition.getX() >= this.numCells || aPosition.getY() < 0 || aPosition.getY() >= this.numCells;
  }

  containsSnake(aPosition) {
    return this.grid[aPosition.getX()][aPosition.getY()].filling == "snake";
  }

  containsFood(aPosition) {
    return this.grid[aPosition.getX()][aPosition.getY()].filling == "food";
  }

  isOccupied(aPosition) {
    return this.containsFood(aPosition) || this.containsSnake(aPosition);
  }

  getNumCells() {
    return this.numCells;
  }

  // Map X value between 0 and number of cells to location on grid
  mapXPos(num) {
    return this.startingWidth + (num * this.squareSize);
  }

  // Map Y value between 0 and number of cells to location on grid
  mapYPos(num) {
    return this.startingHeight + (num * this.squareSize);
  }

  gameOver() {
    // Draw background
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(242, 38, 160)"; // pink
    this.ctx.fillRect(0, 0, this.width, this.height);

    // GAME OVER text
    this.ctx.font = "100px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("GAME OVER", this.width/2, this.height/2 - 100);
    this.ctx.font = "50px Arial";
    this.ctx.fillText("press space to play again!", this.width/2, this.height/2 + 100);

    // Game is no longer active
    this.gameActive = false;
  }

  redrawLayout() {
    if (this.gameIsActive()) {
      // Draw background
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Draw game field
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.mapXPos(0), this.mapYPos(0), this.gridSize, this.gridSize);

      // Draw title and instructions
      this.ctx.font = this.fontSize*1.5 + "px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "rgb(242, 38, 160)"; // pink
      this.ctx.fillText("SNAKE", canvas.width/2, this.startingHeight - this.fontSize*2);
      this.ctx.font = this.fontSize*0.75 + "px Arial";
      this.ctx.fillText("press the arrow keys to move", this.width/2, this.startingHeight - this.fontSize);

      // Draw score count
      this.ctx.font = this.fontSize + "px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "rgb(242, 38, 160)"; // pink
      this.ctx.fillText("score: " + this.score,this.width/2, this.startingHeight + this.gridSize + this.fontSize);

      // Draw grid with snake and food where necessary
      for (var x = 0; x < this.numCells; x++) {
        for (var y = 0; y < this.numCells; y++) {
          if (this.grid[x][y].filling == "snake") {
            this.drawSnake(new Position(x, y));
          } else if (this.grid[x][y].filling == "food") {
            this.drawFood(new Position(x, y))
          }
        }
      }
    }
  }
}
