/**
 * @file
 * Controller that initializes the display, snake, and directions.
 * Handles user key presses.
 */
var main = function() {

  // Define number of cells in each row/column
  // Set up four directions
  var NUMBER_OF_CELLS = 15;
  var UP = new Direction(0, -1, "UP");
  var DOWN = new Direction(0, 1, "DOWN");
  var LEFT = new Direction(-1, 0, "LEFT");
  var RIGHT = new Direction(1, 0, "RIGHT");

  // Create canvas and append to DOM
  var canvas = document.createElement('canvas');
  canvas.id = "canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

  // Create grid layout and snake
  var theGrid = new Display(NUMBER_OF_CELLS, canvas);
  var snake = new Snake(theGrid);

  // Handle key presses
  document.onkeydown = function(e) {
      e = e || window.event;

      if (e.keyCode == '38') {
        snake.setDirection(UP);
        e.preventDefault();
      }
      else if (e.keyCode == '40') {
        snake.setDirection(DOWN);
        e.preventDefault();
      }
      else if (e.keyCode == '37') {
        snake.setDirection(LEFT);
        e.preventDefault();
      }
      else if (e.keyCode == '39') {
        snake.setDirection(RIGHT);
        e.preventDefault();
      } else if (e.keyCode == '32') {
        // Space pressed, reload page
        location.reload();
        e.preventDefault();
      }
  };
}
main();
