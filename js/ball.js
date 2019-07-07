class Ball {
  constructor(context, radius, fillColor, posX, posY, speedX, speedY) {
    this.ctx = context;
    this.radius = radius;
    this.fillColor = fillColor; 
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;    
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 2 * Math.PI, false);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
  };

  updatePos() {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }

};