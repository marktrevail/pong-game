$(function() {

  // --------------------------------------------------------------------------------------
  // Create the game area
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in and create the context

  // --------------------------------------------------------------------------------------
  // Set up a new game
  // --------------------------------------------------------------------------------------

  // Create the game objects and initial positions & speeds
  var ball = new Ball(gameCanvas.ctx, 7, "green", gameCanvas.width/2, gameCanvas.height/2, 6, 0);
  var player1 = new Bat(gameCanvas.ctx, 10, 60, "black", 15, gameCanvas.height/2, 5, 5);
  var player2 = new Bat(gameCanvas.ctx, 10, 60, "black", gameCanvas.width - 15, gameCanvas.height/2, 5, 5);
  
  var gameManager = new GameManager(gameCanvas, ball, player1, player2);

  // Set up keystroke listening
  gameManager.addKeystrokeListeners();

  // Set up music
  var soundIntro = new Sound("./aud/intro-screen.mp3", true);
  var soundGame = new Sound("./aud/defense-line.mp3", true);
  soundIntro.sound.volume = 0.3;
  soundGame.sound.volume = 0.3;

  // --------------------------------------------------------------------------------------
  // Define animation order (with the objects just created)
  // --------------------------------------------------------------------------------------

  function gameAnimationStep() {

    if(!doGameAnimation){context=null; return;}   // Breaks out of the animation if doGameAnimation is false

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
    gameCanvas.renderGameBackground();
    ball.render();
    player1.render();
    player2.render();
    gameManager.renderHealthAndScore();
    gameManager.checkForWin();

    // Loop
    window.requestAnimationFrame(gameAnimationStep);
  };

  // --------------------------------------------------------------------------------------
  // Create functions for Start next game, and Reset game
  // --------------------------------------------------------------------------------------

  function resetForNextGame() {
    gameManager.resetHealths();
    ball.resetSpeed();
    ball.resetPos();
    player1.resetPos();
    player2.resetPos();

    gameManager.renderHealthAndScore();    
  }

  function resetForNewGame() {
    doGameAnimation = false;

    soundGame.stop();
    soundIntro.play();

    gameManager.resetHealths();
    gameManager.resetScores();
    ball.resetSpeed();
    ball.resetPos();
    player1.resetPos();
    player2.resetPos();

    gameManager.renderHealthAndScore();    
    gameCanvas.renderStartScreen();
  };

  function startNextGame() {
    resetForNextGame();
    doGameAnimation = true;

   soundIntro.stop();
   soundGame.play();

    gameCanvas.renderCountdown();    
    setTimeout(()=>{window.requestAnimationFrame(gameAnimationStep)}, 1500);  // TODO! Fix this to use Promises or callbacks from countdown
  };

  // --------------------------------------------------------------------------------------
  // Load the start screen, and allow starting the game on click!
  // --------------------------------------------------------------------------------------

  gameCanvas.renderStartScreen();

  $("#game-canvas").on("click", startNextGame);  // Set up START event listener (click on canvas)
  $("#button-reset").on("click", resetForNewGame);  // Set up RESET event listener (click on reset button)


});

