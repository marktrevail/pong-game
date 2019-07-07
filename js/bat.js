class Bat {
  constructor(context, width, height, fillColor, posX, posY) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor; 

    this.posX = posX;
    this.posY = posY;
    this.speedY = 0;    
  }
}