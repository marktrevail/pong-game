class GameCanvas {

  constructor(width, height, lineColour, backgroundColour) {
    this.width = width;
    this.height = height;
    this.lineColour = lineColour;
    this.backgroundColour = backgroundColour;  
    this.canvas = "";
    this.ctx = "";
    this.doGameAnimation = false;
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

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

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

  renderHealthAndScore(player1, player2) {
    document.getElementById("health-player-1").max = player1.healthInitial;  // QU! How to do this in jquery? $("#health-player-1").max = number   // doesn't seem to work   
    document.getElementById("health-player-2").max = player2.healthInitial;
    $("#health-player-1").val(player1.health);
    $("#health-player-2").val(player2.health);
    $("#score-player-1").html(player1.score);
    $("#score-player-2").html(player2.score);
  };

  renderStartScreen() {
    this.clear();
    this.renderGameBackground(); // Add the background to the canvas
    this.ctx.fillStyle = "green";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "32px Audiowide";
    this.ctx.fillText("Click to start", (this.width / 2), (this.height / 2));
  };
  
  renderWinScreen(winner) {
    this.doGameAnimation = false;
    this.clear();
    this.ctx.fillStyle = "green";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = "32px Audiowide";
    this.ctx.fillText(`${winner} won!`, (this.width / 2), (this.height / 2)- 25); 
    this.ctx.fillText(`Click for the next game`, (this.width / 2), (this.height / 2) + 25); 
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

};


module.exports = GameCanvas;