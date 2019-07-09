class GameManager{
  constructor(canvas, ball, player1, player2) {
    this.canvas = canvas;
    this.ball = ball;
    this.player1 = player1;
    this.player2 = player2;
    this.keys = {};
  };

  soundPing = new Sound("./aud/ping.mp3", false);
  soundHit = new Sound("./aud/hit.mp3", false);

  addKeystrokeListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.keyCode] = true;
      e.preventDefault();
    });
    window.addEventListener("keyup", (e) => {
      delete this.keys[e.keyCode];
    });
  };

  calcBallYSpeedAdjuster(bat) {  // When hitting a bat, the ball's Y speed gets adjusted depending on WHERE it hits on the bat
    let ySpeedAdjuster = ( (this.ball.yCenter - bat.yCenter) / bat.height ) * 1.2 * this.ball.xSpeed  // The 1.2 just makes the effect more extreme
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
  }

  resetHealths() {
    this.player1.health = this.player1.healthInitial;
    this.player2.health = this.player2.healthInitial;
  }

  resetScores() {
    this.player1.score = 0;
    this.player2.score = 0;
  }

  renderHealthAndScore() {
    $("#health-player-1").html(this.player1.health);
    $("#health-player-2").html(this.player2.health);
    $("#score-player-1").html(this.player1.score);
    $("#score-player-2").html(this.player2.score);
  }

  checkForWin() {
    if(this.player1.health === 0) {
      this.canvas.renderWinScreen("Player 2");
    }
    if(this.player2.health === 0) {
      this.canvas.renderWinScreen("Player 1");
    }
  }

};