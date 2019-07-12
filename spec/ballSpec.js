let GameCanvas = require("./../js/game-canvas.js");
let Ball = require("./../js/ball.js");

describe("Ball class:", function() {   // This is a top-level suite, for the class

  var gameCanvas = new GameCanvas(550, 340, "black", "white"); // Create a new canvas
  var ball = new Ball(gameCanvas, 7, "green", gameCanvas.width/2, gameCanvas.height/2, 6, 0);

  it("Base properties should be defined", function() {
    expect(ball.xCenter).toBeDefined();
    expect(ball.yCenter).toBeDefined();
  });

});