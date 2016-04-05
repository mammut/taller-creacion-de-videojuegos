var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

game.state.add('Boot', Jumper.Boot);
game.state.add('Menu', Jumper.Menu);
game.state.add('Play', Jumper.Play);

game.state.start('Boot');

