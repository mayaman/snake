# Snake

This is a javascript implementation of the classic arcade game Snake. The user controls the snake on the screen by pressing the arrow keys, guiding it toward the food and away from the walls or itself. When the snake eats one piece of food, it grows by one cell. The game ends when the snake either eats itself or hits one of the walls.

## How to run locally
**To run via terminal:**

First, navigate to where the snake directory is located and then cd into the snake directory.
```
  cd snake
```
Then open the index.html file.
```
  open index.html
```
**Alternatively:**

Double clicking on the index.html file in the snake folder should also open the game in your browser.

## Future Features

Given the suggested time, I did not implement all of the features I would have considered adding to the game. Below I have listed a few next steps that would be completed without the current constraints:

- Leaderboard: The ability for users to save their personal high scores and work to beat other users' high scores as well.
- Speed: The ability for users to choose how fast the snake moves (basically setting a different interval between calls to the run method).
- A more detailed UI/Design: Visually the game could be enhanced with javascript graphic libraries, nicer font styles, and a larger color palette. Design could also be more responsive to various window/browser sizes, but some responsiveness is embedded in the code currently.
- Splash page: an initial landing page to brief users on the game and allow them to select the speed.
