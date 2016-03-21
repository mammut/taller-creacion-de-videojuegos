var SnailUp = function() {};
SnailUp.Boot = function() {};


SnailUp.Boot.prototype = {
  preload: function() {
    this.load.image("background", "assets/bg.jpg");
    this.load.image('player', 'assets/dude.png');
    this.load.image('pixel', 'assets/pixel.png');
    this.load.image('leaf', 'assets/leaf.png');
    this.load.image('leaf2', 'assets/leaf2.png');
  },

  create: function() {
    var label1 = game.add.text(this.game.width / 2 - 130, 120, 'Cargando...', {
      font: '50px Helvetica',
      'font-weight': '100',
      fill: '#fff'
    });

    this.state.start('menu');
  }
};
