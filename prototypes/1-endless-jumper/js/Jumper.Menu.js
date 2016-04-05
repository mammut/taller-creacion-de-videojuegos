Jumper.Menu = function() {};

Jumper.Menu.prototype = {

  create: function() {
    var instructions = game.add.text(0,0, 'Yellow Star: Jump   +10 pts\nBlue Star: Double Jump  +20 pts\nRed Star: Super Jump  +50 pts, +1 Air Jump\nUP: Air Jump', {
      font: '20px Helvetica',
      'font-weight': '100',
      fill: '#fff',
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    instructions.setTextBounds(0, 0, this.game.width, this.game.height);

    var iniciar = game.add.text(0, this.game.height - 100, 'Press [Spacebar] to start...', {
        fill: '#fff',
          boundsAlignH: "center",
    });
    iniciar.setTextBounds(0, 0, this.game.width, this.game.height);

    var title = game.add.text(0, 100, 'Catch the stars and reach the sky:', {
        fill: '#fff',
          boundsAlignH: "center",
    });
    title.setTextBounds(0, 0, this.game.width, this.game.height);

    var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(function(){
        this.game.state.start('Play');
    }.bind(this), this);
  }
};
