class CollisionDetector{
  constructor(canvas, ball, player1, player2) {
    this.canvas = canvas;
    this.ball = ball;
    this.player1 = player1;
    this.player2 = player2;
  };

  updateBallSpeed() {
    if(this.ball.posX <= 0 || this.ball.posX >= this.canvas.width) {
      this.ball.speedX *= -1;
    }
    if(this.ball.posY <= 0 || this.ball.posY >= this.canvas.height) {
      this.ball.speedY *= -1;
    }
  }

};