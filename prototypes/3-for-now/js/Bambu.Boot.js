var Bambu = function() {};
Bambu.Boot = function() {};

Bambu.Boot.prototype = {

    preload: function() {
        this.game.forceSingleUpdate = true;
        this.game.load.image('starfield', 'assets/starfield.jpg');
        this.game.load.image("player", "assets/player.png");
        this.game.load.image("enemy", "assets/enemy.png");
    },

    create: function() {
        var label1 = game.add.text(this.game.width/2 - 130, 120, 'Cargando...', {
            font: '50px Helvetica',
            'font-weight': '100',
            fill: '#fff'
        });

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.state.start('menu');
    }
};
