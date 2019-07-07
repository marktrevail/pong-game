$(function() {

  // --------------------------------------------------------------------------------------
  // Set up the game
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in
  gameCanvas.render(); // Add the background to the canvas

  // Create the game objects
  var ball = new Ball(gameCanvas.ctx, 6, "green", gameCanvas.width/2, gameCanvas.height/2, 2, 2); // Start ball in the middle

  // --------------------------------------------------------------------------------------
  // Define animation order (with the objects just created)
  // --------------------------------------------------------------------------------------

  function animationStep() {

    ball.updatePos();
    // player1.updatePos();
    // player2.updatePos();

    gameCanvas.clear();
    gameCanvas.render();
    ball.render();
    // player1.render();
    // player2.render();

    window.requestAnimationFrame(animationStep);
  };

  // --------------------------------------------------------------------------------------
  // Start!
  // --------------------------------------------------------------------------------------

  window.requestAnimationFrame(animationStep);

});