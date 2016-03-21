var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

game.state.add('boot', SnailUp.Boot);
game.state.add('menu', SnailUp.Menu);
game.state.add('play', SnailUp.Play);

game.state.start('boot');
