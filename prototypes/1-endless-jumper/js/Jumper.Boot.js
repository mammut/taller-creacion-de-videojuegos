var Jumper = function() {};
Jumper.Boot = function() {};

Jumper.Boot.prototype = {

    preload: function() {
        this.game.load.image("background", "assets/bg.jpg");
        this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
        this.game.load.image('pixel', 'assets/pixel.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('star-blue', 'assets/star-blue.png');
        this.game.load.image('star-red', 'assets/star-red.png');

        game.load.audio('music', ['assets/music.mp3', 'assets/music.ogg']);
        game.load.audio('star', ['assets/star.mp3', 'assets/star.ogg']);
    },

    create: function() {
        var label1 = game.add.text(this.game.width/2 - 130, 120, 'Cargando...', {
            font: '50px Helvetica',
            'font-weight': '100',
            fill: '#fff'
        });

        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.state.start('Menu');
    }
};
