class GameCanvas {

  constructor(width, height, lineColour, backgroundColour) {
    this.width = width;
    this.height = height;
    this.lineColour = lineColour;
    this.backgroundColour = backgroundColour;  
    this.canvas = "";
    this.ctx = "";
  }

  // Adds the canvas into the page
  create() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    let container = $("#game-area")[0]   // [0] returns html element, not a jquery obj;
    
    this.canvas.id = "game-canvas";
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
    
    container.prepend(this.canvas);
  };

  // Draws the game background
  renderGameBackground() {
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

  renderStartScreen() {
    this.clear();
    this.renderGameBackground(); // Add the background to the canvas
    this.ctx.fillStyle = "green";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "32px Audiowide";
    this.ctx.fillText("Click to start", (this.width / 2), (this.height / 2));
  };


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  renderCountdown() {

    this.clear();
    this.ctx.fillStyle = "green";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "32px Audiowide";
    this.ctx.fillText("3", (this.width / 2), (this.height / 2)); 

    setTimeout(()=> {
      this.clear();
      this.ctx.fillText("2", (this.width / 2), (this.height / 2)); 
    }, 500);

    setTimeout(()=> {
      this.clear();
      this.ctx.fillText("1", (this.width / 2), (this.height / 2)); 
    }, 1000);
  };

  renderWinScreen(winner) {
    doGameAnimation = false;
    this.clear();
    this.ctx.fillStyle = "green";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "32px Audiowide";
    this.ctx.fillText(`${winner} won!`, (this.width / 2), (this.height / 2)- 25); 
    this.ctx.fillText(`Click for the next game`, (this.width / 2), (this.height / 2) + 25); 
  };

};