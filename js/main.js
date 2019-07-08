$(function() {

  // --------------------------------------------------------------------------------------
  // Set up the game
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in
  gameCanvas.render(); // Add the background to the canvas

  // Create the game objects
  var ball = new Ball(gameCanvas.ctx, 6, "green", gameCanvas.width/2, gameCanvas.height/2, 6, 7); // Start ball in the middle
  var player1 = new Bat(gameCanvas.ctx, 10, 50, "black", 15, gameCanvas.height/2, 10);
  var player2 = new Bat(gameCanvas.ctx, 10, 50, "black", gameCanvas.width - 15, gameCanvas.height/2, 10);
  var collisionDetector = new CollisionDetector(gameCanvas, ball, player1, player2);

  // --------------------------------------------------------------------------------------
  // Define animation order (with the objects just created)
  // --------------------------------------------------------------------------------------

  function animationStep() {

    // Collisions: Check for collisions and update speeds
    collisionDetector.updateBallSpeed();

    // Moving: Update positions according to the speed
    ball.updatePos();
    // player1.updatePos();
    // player2.updatePos();

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

