class CollisionDetector{
  constructor(canvas, ball, player1, player2) {
    this.canvas = canvas;
    this.ball = ball;
    this.player1 = player1;
    this.player2 = player2;
  };

  updateBallSpeed() {

    // Update edge values
    this.ball.xLeft = this.ball.xCenter - this.ball.radius;
    this.ball.xRight = this.ball.xCenter + this.ball.radius;

    this.ball.yTop = this.ball.yCenter - this.ball.radius;
    this.ball.yBottom = this.ball.yCenter + this.ball.radius;

    // Check vs boundaries
    if(this.ball.xLeft <= 0 || this.ball.xRight >= this.canvas.width) {
      this.ball.xSpeed *= -1;
    }
    if(this.ball.yTop <= 0 || this.ball.yBottom >= this.canvas.height) {
      this.ball.ySpeed *= -1;
    }

    // Check vs bats
    

  }

};