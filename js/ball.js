class Ball {
  constructor(context, radius, fillColor, xCenterInitial, yCenterInitial, xSpeedInitial, ySpeedInitial) {
    this.ctx = context;
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
    this.ctx.beginPath();
    this.ctx.arc(this.xCenter, this.yCenter, this.radius, 2 * Math.PI, false);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
  };

  updatePos() {
    this.xCenter += this.xSpeed;
    this.yCenter += this.ySpeed;

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