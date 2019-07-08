class Bat {
  constructor(context, width, height, fillColor, xCenter, yCenter, health) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
 
    this.xCenter = xCenter;
    this.yCenter = yCenter;
 
    this.health = health;
 
    this.score = 0;
    this.ySpeed = 0;

    this.xLeft = this.xCenter - this.width/2;
    this.xRight = this.xCenter + this.width/2;

    this.yTop = this.yCenter - this.height/2;
    this.yBottom = this.yCenter + this.height/2;
  }

  render() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);  // Rectangle will be centered on the posX, posY
  }


  updatePos() {

    this.yCenter += this.ySpeed;

    this.xLeft = this.xCenter - this.width/2;
    this.xRight = this.xCenter + this.width/2;

    this.yTop = this.yCenter - this.height/2;
    this.yBottom = this.yCenter + this.height/2;
  }

}