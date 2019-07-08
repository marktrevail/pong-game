class GameCanvas {

  constructor(width, height, lineColour, backgroundColour) {
    this.width = width;
    this.height = height;
    this.lineColour = lineColour;
    this.backgroundColour = backgroundColour;  
    this.ctx = "";
  }

  // Adds the canvas into the page
  create() {
    let canvas = document.createElement("canvas");
    this.ctx = canvas.getContext("2d");

    let container = $("#game-area")[0]   // [0] returns html element, not a jquery obj;
    
    canvas.id = "game-canvas";
    canvas.width  = this.width;
    canvas.height = this.height;
    
    container.appendChild(canvas);
  };

  // Draws the background
  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColour;

    // Draw vertical line
    this.ctx.moveTo(this.width/2, 0);
    this.ctx.lineTo(this.width/2, this.height);
    this.ctx.stroke();

    // Draw bigger circle in the middle
    this.ctx.beginPath();
    this.ctx.arc(this.width/2, this.height/2, this.height/8, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.backgroundColour;
    this.ctx.fill();
    this.ctx.strokeStyle = this.lineColour;
    this.ctx.stroke();

    // Draw smaller circle in the middle
    this.ctx.beginPath();
    this.ctx.arc(this.width/2, this.height/2, this.height/25, 0, 2 * Math.PI);
    this.ctx.strokeStyle = this.lineColour;
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

};