Bambu.Menu = function() {};

var lives;
Bambu.Menu.prototype = {

  create: function() {
    lives = 3;
    var instructions = game.add.text(0,0, 'h: left\nl: right\nk: up\nj: down', {
      font: '20px Helvetica',
      'font-weight': '100',
      fill: '#fff',
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    instructions.setTextBounds(0, 0, this.game.width, this.game.height);

    var iniciar = game.add.text(0, this.game.height - 100, 'Spacebar to start...', {
        fill: '#fff',
          boundsAlignH: "center",
    });
    iniciar.setTextBounds(0, 0, this.game.width, this.game.height);

    var title = game.add.text(0, 100, 'Catch the star using the following keys:', {
        fill: '#fff',
          boundsAlignH: "center",
    });
    title.setTextBounds(0, 0, this.game.width, this.game.height);

    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(function(){
        this.game.state.start('play');
    }.bind(this), this);
  }
};
