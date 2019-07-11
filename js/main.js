$(function() {

  // --------------------------------------------------------------------------------------
  // Create the game area
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in and create the context  

  // --------------------------------------------------------------------------------------
  // Set up 1-player game (second bat is a bit slower)
  // --------------------------------------------------------------------------------------

  // Create the game objects and initial positions & speeds
  var ball = new Ball(gameCanvas.ctx, 7, "green", gameCanvas.width/2, gameCanvas.height/2, 6, 0);
  var player1 = new Bat(gameCanvas.ctx, 10, 60, "black", 15, gameCanvas.height/2, 5, 5);
  var player2 = new Bat(gameCanvas.ctx, 10, 60, "black", gameCanvas.width - 15, gameCanvas.height/2, 5, 3); // Slower
  
  var gameManager = new GameManager(gameCanvas, ball, player1, player2, 1);  // 1 Player game


  // --------------------------------------------------------------------------------------
  // Add settings to any game
  // --------------------------------------------------------------------------------------

  // Set up keystroke listening
  gameManager.addKeystrokeListeners();

  // Make music a bit quieter
  gameManager.soundIntro.sound.volume = 0.3;
  gameManager.soundGame.sound.volume = 0.3;

  // --------------------------------------------------------------------------------------
  // Navigate the menu screen!
  // --------------------------------------------------------------------------------------

  $("#menu-start-2-player").on("click", start2PlayerGame);
  $("#button-reset").on("click", resetForNewGameAndBackToMenu);

  function start2PlayerGame() {
    gameManager.renderStartScreen();
    $("#menu-area").toggle();
    $("#game-area").toggle();
  };

  function resetForNewGameAndBackToMenu() {
    gameManager.resetForNewGame();
    $("#menu-area").toggle();
    $("#game-area").toggle();    
  };






});

