class GameManager{
  constructor(canvas, ball, player1, player2, numHumanPlayers) {
    this.canvas = canvas;
    this.ball = ball;
    this.player1 = player1;
    this.player2 = player2;
    this.numHumanPlayers = numHumanPlayers;
    this.keys = {};
    this.ballSpeedUpPerFrame = 1.00025 ;
    this.ballAngleOffBatMultiplier = 0.8;
  };

  // Sounds -------------------------------------------------------------------------------------------
  
  soundPing = new Sound("./aud/ping.mp3", false);
  soundHit = new Sound("./aud/hit.mp3", false);
  soundIntro = new Sound("./aud/intro-screen.mp3", true);
  soundGame = new Sound("./aud/defense-line.mp3", true);

  // Keystroke listeners ------------------------------------------------------------------------------
  
  addKeystrokeListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.keyCode] = true;
      e.preventDefault();
    });
    window.addEventListener("keyup", (e) => {
      delete this.keys[e.keyCode];
    });
  };

  // Collision detection ------------------------------------------------------------------------------

  calcBallYSpeedAdjuster(bat) {  // When hitting a bat, the ball's Y speed gets adjusted depending on WHERE it hits on the bat
    let ySpeedAdjuster = ( (this.ball.yCenter - bat.yCenter) / bat.height ) * this.ballAngleOffBatMultiplier * this.ball.xSpeed  // The scalar factor can just make the effect more or less extreme
    if(this.ball.xSpeed < 0) {
      return -ySpeedAdjuster;
    } else {
      return ySpeedAdjuster;
    };
  };

  detectCollisionAndUpdateBallSpeed() {

    // Check vs boundaries
    if(this.ball.xLeft <= 0 || this.ball.xRight >= this.canvas.width) {
      this.ball.xSpeed *= -1;
      this.soundHit.play();
    };
    if(this.ball.yTop <= 0 || this.ball.yBottom >= this.canvas.height) {
      this.ball.ySpeed *= -1;
    };

    // Check vs Player 1
    if(     (this.ball.xLeft <= this.player1.xRight && this.ball.xRight >= this.player1.xLeft)
         && (this.ball.yBottom >= this.player1.yTop && this.ball.yTop <= this.player1.yBottom)
         && this.ball.xSpeed < 0 )   // Travelling left (as don't want ball to get stuck between wall and bat)
         {
      this.ball.xSpeed *= -1;  // Reverse direction of ball
      this.ball.ySpeed += this.calcBallYSpeedAdjuster(this.player1); // Adjust y speed
      this.soundPing.play(); // Play sound
    };

    // Check vs Player 2
    if(     (this.ball.xRight >= this.player2.xLeft && this.ball.xLeft <= this.player2.xRight)
         && (this.ball.yBottom >= this.player2.yTop && this.ball.yTop <= this.player2.yBottom) 
         && this.ball.xSpeed >= 0 )   // Travelling right         
         {
      this.ball.xSpeed *= -1;
      this.ball.ySpeed += this.calcBallYSpeedAdjuster(this.player2);
      this.soundPing.play();
    };
  };

  updateBatSpeed() {

    // Player 1 ---------------------

    // q (up)
    if (81 in this.keys && this.player1.yTop > 0) {   // Not already at boundary
      this.player1.ySpeed = -Math.min(this.player1.ySpeedMax, this.player1.yTop)   // Take either the normal speed OR the speed required to get the player to the boundary (if very close)
    } else
    // a (down)
    if (65 in this.keys && this.player1.yBottom < this.canvas.height) {  // Not already at boundary
      this.player1.ySpeed = Math.min(this.player1.ySpeedMax, this.canvas.height - this.player1.yBottom)   // Take either the normal speed OR the speed required to get the player to the boundary (if very close)
    } else
    // No speed
    {this.player1.ySpeed = 0;};
  
    // Player 2 ---------------------

    // Check for human or AI
    if(this.numHumanPlayers === 2) {
      // up
      if (38 in this.keys && this.player2.yTop > 0) {
        this.player2.ySpeed = -Math.min(this.player2.ySpeedMax, this.player2.yTop)   // Take either the normal speed OR the speed required to get the player to the boundary (if very close)
      } else
      // down
      if (40 in this.keys && this.player2.yBottom < this.canvas.height) {
        this.player2.ySpeed = Math.min(this.player2.ySpeedMax, this.canvas.height - this.player2.yBottom)   // Take either the normal speed OR the speed required to get the player to the boundary (if very close)
      } else
      // No speed
      {this.player2.ySpeed = 0;}
    };

    if(this.numHumanPlayers === 1) {
      // up
      if (this.ball.yCenter < this.player2.yCenter && this.player2.yTop > 0) {
        this.player2.ySpeed = -Math.min(this.player2.ySpeedMax, this.player2.yTop)   // Take either the normal speed OR the speed required to get the player to the boundary (if very close)
      } else
      // down
      if (this.ball.yCenter > this.player2.yCenter && this.player2.yBottom < this.canvas.height) {
        this.player2.ySpeed = Math.min(this.player2.ySpeedMax, this.canvas.height - this.player2.yBottom)   // Take either the normal speed OR the speed required to get the player to the boundary (if very close)
      } else
      // No speed
      {this.player2.ySpeed = 0;}      
    };

  };

  // Health and Score  -------------------------------------------------------------------------------------

  updateHealthAndScore() {
    // Health
    if(this.ball.xLeft <= 0) {
      this.player1.health -= 1;
    }
    if(this.ball.xRight >= this.canvas.width) {
      this.player2.health -= 1;
    }

    // Score
    if(this.player1.health === 0) {
      this.player2.score += 1;
    }
    if(this.player2.health === 0) {
      this.player1.score += 1;
    }
  };

  resetHealths() {
    this.player1.health = this.player1.healthInitial;
    this.player2.health = this.player2.healthInitial;
  };

  resetScores() {
    this.player1.score = 0;
    this.player2.score = 0;
  };

  // Winning  -------------------------------------------------------------------------------------

  checkForWin() {
    if(this.player1.health === 0) {
      this.canvas.renderWinScreen("Player 2");
      $("#game-canvas").on("click", this.startNextGame);  // Set up START event listener (click on canvas)
    }
    if(this.player2.health === 0) {
      this.canvas.renderWinScreen("Player 1");
      $("#game-canvas").on("click", this.startNextGame);  // Set up START event listener (click on canvas)
    }
  };

  // Resetting / Starting game  -----------------------------------------------------------------------

  resetForNextGame() {
    this.canvas.doGameAnimation = false;
    this.resetHealths();
    this.ball.resetSpeed();
    this.ball.resetPos();
    this.player1.resetPos();
    this.player2.resetPos();

    this.canvas.renderHealthAndScore(this.player1, this.player2);    
  }

  resetForNewGame = () => {
    this.canvas.doGameAnimation = false;
    $("#game-canvas").off("click")

    this.soundGame.stop();
    this.soundIntro.play();

    this.resetHealths();
    this.resetScores();
    this.ball.resetSpeed();
    this.ball.resetPos();
    this.player1.resetPos();
    this.player2.resetPos();

    this.canvas.renderHealthAndScore(this.player1, this.player2);    
  };

  startNextGame = () => {
    $("#game-canvas").off("click");  // Turn off start click listener

    this.resetForNextGame();
    this.canvas.doGameAnimation = true;

    this.soundIntro.stop();
    this.soundGame.play();

    this.canvas.renderCountdown();    
    setTimeout(()=>{window.requestAnimationFrame(this.gameAnimationStep)}, 1500);  // TODO! Fix this to use Promises or callbacks from countdown
  };

  // Animation order --------------------------------------------------------------------------------------

  gameAnimationStep = () => {
    if(!this.canvas.doGameAnimation){
      return;
    }   // Breaks out of the animation if doGameAnimation is false

    // Check for collisions and keystrokes - update speeds, health, score
    this.detectCollisionAndUpdateBallSpeed();  // Check for collisions and update ball speed
    this.updateBatSpeed();   // Check for keystrokes and update bat speeds
    this.updateHealthAndScore(); // Check for point scores and update health and score

    // Update ball speed as game goes on
    this.ball.xSpeed *=  this.ballSpeedUpPerFrame ;

    // Update positions (back end) - of game objects, according to their speeds
    this.ball.updatePos();
    this.player1.updatePos();
    this.player2.updatePos();

    // Render: Render all objects on the canvas in their new positions
    this.canvas.clear();
    this.canvas.renderGameBackground();
    this.ball.render();
    this.player1.render();
    this.player2.render();
    this.canvas.renderHealthAndScore(this.player1, this.player2);    
    this.checkForWin();

    // Loop
    window.requestAnimationFrame(this.gameAnimationStep);
  };

};