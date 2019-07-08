$(function() {

  // --------------------------------------------------------------------------------------
  // Set up the game
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in
  gameCanvas.render(); // Add the background to the canvas

  // Create the game objects
  var ball = new Ball(gameCanvas.ctx, 7, "green", gameCanvas.width/2, gameCanvas.height/2, 8, 7); // Start ball in the middle
  var player1 = new Bat(gameCanvas.ctx, 10, 50, "black", 15, gameCanvas.height/2, 10);
  var player2 = new Bat(gameCanvas.ctx, 10, 50, "black", gameCanvas.width - 15, gameCanvas.height/2, 10);
  var gameManager = new GameManager(gameCanvas, ball, player1, player2);

  // Set up the listeners for keystrokes
  window.addEventListener("keydown", function (e) {
    gameManager.keys[e.keyCode] = true;
    e.preventDefault();
  })
  window.addEventListener("keyup", function (e) {
    delete gameManager.keys[e.keyCode];
  })

  // --------------------------------------------------------------------------------------
  // Define animation order (with the objects just created)
  // --------------------------------------------------------------------------------------

  function animationStep() {

    // Collisions: Check for collisions and update speeds
    gameManager.updateBallSpeed();

    // Keystrokes: Check for keystrokes and update speeds
    gameManager.updateBatSpeed();

    // Moving (back end): Update object positions (back end) according to their speeds
    ball.updatePos();
    player1.updatePos();
    player2.updatePos();

    // Render: Render all objects on the canvas
    gameCanvas.clear();
    gameCanvas.render();
    ball.render();
    player1.render();
    player2.render();
    // player1.render();
    // player2.render();

    // Loop
    window.requestAnimationFrame(animationStep);
  };

  // --------------------------------------------------------------------------------------
  // Start!
  // --------------------------------------------------------------------------------------

  window.requestAnimationFrame(animationStep);

});

