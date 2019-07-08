class Ball {
  constructor(context, radius, fillColor, xCenter, yCenter, xSpeed, ySpeed) {
    this.ctx = context;
    this.radius = radius;
    this.fillColor = fillColor; 
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    this.xLeft = this.xCenter - this.radius;
    this.xRight = this.xCenter + this.radius;

    this.yTop = this.yCenter - this.radius;
    this.yBottom = this.yCenter + this.radius;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.xCenter, this.yCenter, this.radius, 2 * Math.PI, false);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
  };

  updatePos() {
    this.xCenter += this.xSpeed;
    this.yCenter += this.ySpeed;
  }

};