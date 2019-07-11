$(function() {

  // --------------------------------------------------------------------------------------
  // Create the game area
  // --------------------------------------------------------------------------------------

  // Set up the canvas
  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  gameCanvas.create(); // Add the canvas in and create the context  

  // --------------------------------------------------------------------------------------
  // Set up 1 and 2 player games
  // --------------------------------------------------------------------------------------

  // Create universal game objects
  var ball = new Ball(gameCanvas.ctx, 7, "green", gameCanvas.width/2, gameCanvas.height/2, 6, 0);
  var player1 = new Bat(gameCanvas.ctx, 10, 60, "black", 15, gameCanvas.height/2, 5, 5);

  // 1-player game
  var player2Machine = new Bat(gameCanvas.ctx, 10, 60, "black", gameCanvas.width - 15, gameCanvas.height/2, 5, 4); // Slower
  var gameManager1Player = new GameManager(gameCanvas, ball, player1, player2Machine, 1);  // 1 Player game

  // 2-player game
  var player2Human = new Bat(gameCanvas.ctx, 10, 60, "black", gameCanvas.width - 15, gameCanvas.height/2, 5, 5);
  var gameManager2Player = new GameManager(gameCanvas, ball, player1, player2Human, 2); 

  // --------------------------------------------------------------------------------------
  // Add settings to both games
  // --------------------------------------------------------------------------------------

  // Set up keystroke listening
  gameManager1Player.addKeystrokeListeners();
  gameManager2Player.addKeystrokeListeners();

  // Make music a bit quieter
  gameManager1Player.soundIntro.sound.volume = 0.3;
  gameManager1Player.soundGame.sound.volume = 0.3;
  gameManager2Player.soundIntro.sound.volume = 0.3;
  gameManager2Player.soundGame.sound.volume = 0.3;

  // --------------------------------------------------------------------------------------
  // Navigate the menu screen!
  // --------------------------------------------------------------------------------------

  $("#menu-start-1-player").on("click", start1PlayerGame);
  $("#menu-start-2-player").on("click", start2PlayerGame);

  function start1PlayerGame() {
    gameManager1Player.renderStartScreen();
    gameManager2Player.soundIntro.stop();
    $("#menu-area").toggle();
    $("#game-area").toggle();
    $("#button-reset").off("click");
    $("#button-reset").on("click", reset1PlayerGameAndBackToMenu);
  };

  function start2PlayerGame() {
    gameManager2Player.renderStartScreen();
    gameManager1Player.soundIntro.stop();
    $("#menu-area").toggle();
    $("#game-area").toggle();
    $("#button-reset").off("click");
    $("#button-reset").on("click", reset2PlayerGameAndBackToMenu);
  };

  function reset1PlayerGameAndBackToMenu() {
    gameManager1Player.resetForNewGame();  
    $("#menu-area").toggle();
    $("#game-area").toggle();    
  };

  function reset2PlayerGameAndBackToMenu() {
    gameManager2Player.resetForNewGame();  
    $("#menu-area").toggle();
    $("#game-area").toggle();    
  };


  // Debugging
  // setInterval(()=> {console.log(player2Machine.yTop)} , 500)


});

