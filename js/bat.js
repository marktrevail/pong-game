class Bat {
  constructor(gameCanvas, width, height, fillColor, xCenterInitial, yCenterInitial, healthInitial, ySpeedMax) {
    this.gameCanvas = gameCanvas;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
 
    this.xCenterInitial = xCenterInitial;
    this.yCenterInitial = yCenterInitial;
    this.xCenter = xCenterInitial;
    this.yCenter = yCenterInitial;
 
    this.healthInitial = healthInitial;
    this.health = healthInitial;
    this.ySpeedMax = ySpeedMax;
 
    this.score = 0;
    this.ySpeed = 0;

    this.xLeft = this.xCenter - this.width/2;
    this.xRight = this.xCenter + this.width/2;

    this.yTop = this.yCenter - this.height/2;
    this.yBottom = this.yCenter + this.height/2;
  }

  render() {
    this.gameCanvas.ctx.fillStyle = this.fillColor;
    this.gameCanvas.ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);  // Rectangle will be centered on the posX, posY
  }

  updatePos() {

    this.yCenter += this.ySpeed;

    // Update the edge values too
    this.xLeft = this.xCenter - this.width/2;
    this.xRight = this.xCenter + this.width/2;
    this.yTop = this.yCenter - this.height/2;
    this.yBottom = this.yCenter + this.height/2;
  };

  resetPos() {
    this.xCenter = this.xCenterInitial;
    this.yCenter = this.yCenterInitial;
    this.xCenter = this.xCenterInitial;
    this.yCenter = this.yCenterInitial;
  }

};