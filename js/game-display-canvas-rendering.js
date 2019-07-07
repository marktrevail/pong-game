// ---------------------------------------------------------------------------------------------
// Add render() methods for the game objects
// ---------------------------------------------------------------------------------------------

Ball.prototype.render = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.posX, this.posY, this.radius, 2 * Math.PI, false);
  this.ctx.fillStyle = this.fillColor;
  this.ctx.fill();
};