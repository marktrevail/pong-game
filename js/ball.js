class Ball {
  constructor(gameCanvas, radius, fillColor, xCenterInitial, yCenterInitial, xSpeedInitial, ySpeedInitial) {
    this.gameCanvas = gameCanvas;
    this.radius = radius;
    this.fillColor = fillColor; 

    this.xCenterInitial = xCenterInitial;
    this.yCenterInitial = yCenterInitial;
    this.xSpeedInitial = xSpeedInitial;
    this.ySpeedInitial = ySpeedInitial;

    this.xCenter = xCenterInitial;
    this.yCenter = yCenterInitial;
    this.xSpeed = xSpeedInitial;
    this.ySpeed = ySpeedInitial;

    this.xLeft = this.xCenter - this.radius;
    this.xRight = this.xCenter + this.radius;
    this.yTop = this.yCenter - this.radius;
    this.yBottom = this.yCenter + this.radius;
  };

  render() {
    this.gameCanvas.ctx.beginPath();
    this.gameCanvas.ctx.arc(this.xCenter, this.yCenter, this.radius, 2 * Math.PI, false);
    this.gameCanvas.ctx.fillStyle = this.fillColor;
    this.gameCanvas.ctx.fill();
  };

  updatePos() {
    this.xCenter += this.xSpeed;

    // Y-speed - need to make sure it doesn't take it off the canvas
    if(this.yTop + this.ySpeed < 0) {  // Moves off the top 
      this.yCenter -= this.yTop;
    } else if (this.yBottom + this.ySpeed > this.gameCanvas.height){  // Moving off the bottom
      this.yCenter += ( this.gameCanvas.height - this.yBottom )
    } else {
      this.yCenter += this.ySpeed;
    }

    // Update the edge values too
    this.xLeft = this.xCenter - this.radius;
    this.xRight = this.xCenter + this.radius;
    this.yTop = this.yCenter - this.radius;
    this.yBottom = this.yCenter + this.radius;
  }

  resetSpeed() {
    this.xSpeed = this.xSpeedInitial;
    this.ySpeed = this.ySpeedInitial;
  };

  resetPos() {
    this.xCenter = this.xCenterInitial;
    this.yCenter = this.yCenterInitial;
  }

};