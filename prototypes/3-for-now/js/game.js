var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

game.state.add('boot', Bambu.Boot);
game.state.add('menu', Bambu.Menu);
game.state.add('play', Bambu.Play);

game.state.start('boot');
