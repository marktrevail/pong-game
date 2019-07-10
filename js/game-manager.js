class GameManager{
  constructor(canvas, ball, player1, player2) {
    this.canvas = canvas;
    this.ball = ball;
    this.player1 = player1;
    this.player2 = player2;
    this.keys = {};
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
    let ySpeedAdjuster = ( (this.ball.yCenter - bat.yCenter) / bat.height ) * 0.8 * this.ball.xSpeed  // The scalar factor can just make the effect more or less extreme
    if(this.ball.xSpeed < 0) {
      return -ySpeedAdjuster;
    } else {
      return ySpeedAdjuster;
    };
  };

  updateBallSpeed() {

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
    if (81 in this.keys && this.player1.yTop > 0) {   // Not hitting boundary
      this.player1.ySpeed = -this.player1.ySpeedMax;
    } else
    // a (down)
    if (65 in this.keys && this.player1.yBottom < this.canvas.height) {
      this.player1.ySpeed = this.player1.ySpeedMax;
    } else
    // No speed
    {this.player1.ySpeed = 0;};
  
    // Player 2 ---------------------

    // up
    if (38 in this.keys && this.player2.yTop > 0) {
      this.player2.ySpeed = -this.player2.ySpeedMax;
    } else
    // down
    if (40 in this.keys && this.player2.yBottom < this.canvas.height) {
      this.player2.ySpeed = this.player2.ySpeedMax;
    } else
    // No speed
    {this.player2.ySpeed = 0;}
  }

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

  renderHealthAndScore() {
    document.getElementById("health-player-1").max = this.player1.healthInitial;  // QU! How to do this in jquery? $("#health-player-1").max = number   // doesn't seem to work   
    document.getElementById("health-player-2").max = this.player2.healthInitial;
    $("#health-player-1").val(this.player1.health);
    $("#health-player-2").val(this.player2.health);
    $("#score-player-1").html(this.player1.score);
    $("#score-player-2").html(this.player2.score);
  };

  // Winning  -------------------------------------------------------------------------------------

  checkForWin() {
    if(this.player1.health === 0) {
      this.renderWinScreen("Player 2");
      $("#game-canvas").on("click", this.startNextGame);  // Set up START event listener (click on canvas) TODO! This doesn't really belong here, need to refactor
    }
    if(this.player2.health === 0) {
      this.renderWinScreen("Player 1");
      $("#game-canvas").on("click", this.startNextGame);  // Set up START event listener (click on canvas) TODO! This doesn't really belong here, need to refactor
    }
  };

  renderWinScreen(winner) {
    this.canvas.doGameAnimation = false;
    this.canvas.clear();
    this.canvas.ctx.fillStyle = "green";
    this.canvas.ctx.textBaseline = "middle";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.font = "32px Audiowide";
    this.canvas.ctx.fillText(`${winner} won!`, (this.canvas.width / 2), (this.canvas.height / 2)- 25); 
    this.canvas.ctx.fillText(`Click for the next game`, (this.canvas.width / 2), (this.canvas.height / 2) + 25); 
  };

  // Starting / resetting game  -----------------------------------------------------------------------

  renderStartScreen() {
    this.canvas.clear();
    this.canvas.renderGameBackground(); // Add the background to the canvas
    this.canvas.ctx.fillStyle = "green";
    this.canvas.ctx.textBaseline = "middle";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.font = "32px Audiowide";
    this.canvas.ctx.fillText("Click to start", (this.canvas.width / 2), (this.canvas.height / 2));
    $("#game-canvas").on("click", this.startNextGame)  // Set up START event listener (click on canvas)
  };

  renderCountdown() {
    this.canvas.clear();
    this.canvas.ctx.fillStyle = "green";
    this.canvas.ctx.textBaseline = "middle";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.font = "32px Audiowide";
    this.canvas.ctx.fillText("3", (this.canvas.width / 2), (this.canvas.height / 2)); 

    setTimeout(()=> {
      this.canvas.clear();
      this.canvas.ctx.fillText("2", (this.canvas.width / 2), (this.canvas.height / 2)); 
    }, 500);

    setTimeout(()=> {
      this.canvas.clear();
      this.canvas.ctx.fillText("1", (this.canvas.width / 2), (this.canvas.height / 2)); 
    }, 1000);
  };

  resetForNextGame() {
    this.canvas.doGameAnimation = false;
    this.resetHealths();
    this.ball.resetSpeed();
    this.ball.resetPos();
    this.player1.resetPos();
    this.player2.resetPos();

    this.renderHealthAndScore();    
  }

  resetForNewGame = () => {
    this.canvas.doGameAnimation = false;
    this.soundGame.stop();
    this.soundIntro.play();

    this.resetHealths();
    this.resetScores();
    this.ball.resetSpeed();
    this.ball.resetPos();
    this.player1.resetPos();
    this.player2.resetPos();

    this.renderHealthAndScore();    
    this.renderStartScreen();
  };

  startNextGame = () => {
    $("#game-canvas").off("click");  // Turn off start click listener

    this.resetForNextGame();
    this.canvas.doGameAnimation = true;

    this.soundIntro.stop();
    this.soundGame.play();

    this.renderCountdown();    
    setTimeout(()=>{window.requestAnimationFrame(this.gameAnimationStep)}, 1500);  // TODO! Fix this to use Promises or callbacks from countdown
  };

  // Animation order --------------------------------------------------------------------------------------

  gameAnimationStep = () => {
    if(!this.canvas.doGameAnimation){
      return;
    }   // Breaks out of the animation if doGameAnimation is false

    // Game manager - check for collisions and keystrokes - update speeds, health, score
    this.updateBallSpeed();  // Check for collisions and update ball speed
    this.updateBatSpeed();   // Check for keystrokes and update bat speeds
    this.updateHealthAndScore(); // Check for point scores and update health and score

    // Update ball speed as game goes on
    this.ball.xSpeed *=  1.0002 ;

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
    this.renderHealthAndScore();
    this.checkForWin();

    // Loop
    window.requestAnimationFrame(this.gameAnimationStep);
  };

};