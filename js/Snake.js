/**
 * @file
 * Snake class. Updates the positions of the snake on the screen.
 * Redraws the display at set interval.
 */
class Snake {

  constructor(theDisplay) {
    this.display = theDisplay;
    this.growing = false;

    // Initialize snake as single cell at the center of the grid
    // Start with no direction
    this.snake = new Array();
    this.snake[0] = new Position(Math.floor(this.display.getNumCells()/2), Math.floor(this.display.getNumCells()/2));
    this.display.addSnakeItem(this.snake[0]);
    this.currentDirection;

    // Loop the run function every 200 milliseconds
    this.runInterval = 200;
    var self = this;
    setInterval(function(){self.run();}, this.runInterval);
  }

  setDirection(newDirection) {
    if (!this.currentDirection) {
      this.currentDirection = newDirection;
    } else if (!this.currentDirection.isOpposite(newDirection)) {
      this.currentDirection = newDirection;
    }
  }

  grow() {
    if (this.currentDirection) {
      var nextPosition = this.snake[0].translate(this.currentDirection);
      // If out of bounds or snake is eating itself, end game
      if (this.display.outOfBounds(nextPosition) || this.display.containsSnake(nextPosition)) {
        this.display.gameOver();
      } else {
        this.snake.splice(0, 0, nextPosition);
        // If next cell contains food, eat food and grow extra cell
        if (this.display.containsFood(nextPosition)) {
          this.display.consumeFood(nextPosition);
          this.growing = true;
        } else {
          this.display.addSnakeItem(nextPosition);
        }
      }
    }
  }

  shrink() {
    if (this.currentDirection) {
      var posToRemove = this.snake[this.snake.length - 1];
      this.snake.pop();
      this.display.removeItem(posToRemove);
    }
  }

  run() {
    if (this.display.gameIsActive()) {
        this.grow();
        if (this.growing) {
          this.growing = false;
        } else {
          this.shrink();
        }
        this.display.redrawLayout();
    }
  }
}
