$(function() {

  // --------------------------------------------------------------------------------------
  // Set up the game
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in and create the context
  gameCanvas.render(); // Add the background to the canvas

  // Create the game objects
  var ball = new Ball(gameCanvas.ctx, 7, "green", gameCanvas.width/2, gameCanvas.height/2, 8, 5);
  var player1 = new Bat(gameCanvas.ctx, 10, 50, "black", 15, gameCanvas.height/2, 10, 7);
  var player2 = new Bat(gameCanvas.ctx, 10, 50, "black", gameCanvas.width - 15, gameCanvas.height/2, 10, 7);
  
  var gameManager = new GameManager(gameCanvas, ball, player1, player2);

  // Set up keystroke listening
  gameManager.addKeystrokeListeners();

  // --------------------------------------------------------------------------------------
  // Define animation order (with the objects just created)
  // --------------------------------------------------------------------------------------

  function animationStep() {

    // Game manager - check for collisions and keystrokes - update speeds, health, score
    gameManager.updateBallSpeed();  // Check for collisions and update ball speed
    gameManager.updateBatSpeed();   // Check for keystrokes and update bat speeds
    gameManager.updateHealthAndScore(); // Check for point scores and update health and score

    // Update positions (back end) - of game objects, according to their speeds
    ball.updatePos();
    player1.updatePos();
    player2.updatePos();

    // Render: Render all objects on the canvas in their new positions
    gameCanvas.clear();
    gameCanvas.render();
    ball.render();
    player1.render();
    player2.render();
    gameManager.renderHealthAndScore();

    // Loop
    window.requestAnimationFrame(animationStep);
  };

  // --------------------------------------------------------------------------------------
  // Start!
  // --------------------------------------------------------------------------------------

  window.requestAnimationFrame(animationStep);

});

