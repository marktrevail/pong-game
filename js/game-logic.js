class Ball {
  constructor(ctx, radius, fillColor, posX, posY, speedX, speedY) {
    this.ctx = ctx;
    this.radius = radius;
    this.fillColor = fillColor; 
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;    
  }
}

class Bat {
  constructor(ctx, width, height, fillColor) {
    this.ctx = ctx;
    this.width = 0;
    this.height = 0;
    this.fillColor = fillColor; 

    this.posX = 0;
    this.posY = 0;
    this.speedY = 0;    
  }
}