/**
 * @file
 * Position class. Keeps track of an x, y location on the grid.
 */
class Position {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  translate(newDirection) {
    return new Position(this.x + newDirection.getXChange(), this.y + newDirection.getYChange());
  }

}
