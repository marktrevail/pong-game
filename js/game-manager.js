class GameManager{
  constructor(canvas, ball, player1, player2) {
    this.canvas = canvas;
    this.ball = ball;
    this.player1 = player1;
    this.player2 = player2;
    this.keys = {};
  };

  addKeystrokeListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.keyCode] = true;
      e.preventDefault();
    });
    window.addEventListener("keyup", (e) => {
      delete this.keys[e.keyCode];
    });
  };

  updateBallSpeed() {

    // Check vs boundaries
    if(this.ball.xLeft <= 0 || this.ball.xRight >= this.canvas.width) {
      this.ball.xSpeed *= -1;
    };
    if(this.ball.yTop <= 0 || this.ball.yBottom >= this.canvas.height) {
      this.ball.ySpeed *= -1;
    };

    // Check vs Player 1
    if(     (this.ball.xLeft <= this.player1.xRight && this.ball.xRight >= this.player1.xLeft)
         && (this.ball.yBottom >= this.player1.yTop && this.ball.yTop <= this.player1.yBottom)
         && this.ball.xSpeed < 0 )   // Travelling left (as don't want ball to get stuck between wall and bat)
         {
      this.ball.xSpeed *= -1;
    };

    // Check vs Player 2
    if(     (this.ball.xRight >= this.player2.xLeft && this.ball.xLeft <= this.player2.xRight)
         && (this.ball.yBottom >= this.player2.yTop && this.ball.yTop <= this.player2.yBottom) 
         && this.ball.xSpeed >= 0 )   // Travelling right         
         {
      this.ball.xSpeed *= -1;
    };
  };

  updateBatSpeed() {

    // Player 1 ---------------------
  
    // q (up)
    if (81 in this.keys) {
      this.player1.ySpeed = -this.player1.ySpeedMax;
    } else
    // a (down)
    if (65 in this.keys) {
      this.player1.ySpeed = this.player1.ySpeedMax;
    } else
    // No speed
    {this.player1.ySpeed = 0;};
  
    // Player 2 ---------------------

    // up
    if (38 in this.keys) {
      this.player2.ySpeed = -this.player2.ySpeedMax;
    } else
    // down
    if (40 in this.keys) {
      this.player2.ySpeed = this.player2.ySpeedMax;
    } else
    // No speed
    {this.player2.ySpeed = 0;}
  }
};