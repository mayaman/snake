/**
 * @file
 * Direction class. Used to represent UP, DOWN, LEFT, or RIGHT.
 */
class Direction {

  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
  }

  getXChange() {
    return this.x;
  }

  getYChange() {
    return this.y;
  }

  isOpposite(anotherDirection) {
    return (this.label == "UP" && anotherDirection.label == "DOWN") ||
           (this.label == "DOWN" && anotherDirection.label == "UP") ||
           (this.label == "LEFT" && anotherDirection.label == "RIGHT") ||
           (this.label == "RIGHT" && anotherDirection.label == "LEFT");
  }

}
