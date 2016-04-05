Jumper.Play = function() {};

var maxScore = parseInt(localStorage.getItem('maxscore'), 10) || 0;
Jumper.Play.prototype = {

  create: function() {
    this.background = this.add.tileSprite(0, 0, 800, 600, "background");
    this.background.fixedToCamera = true;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.cameraYMin = 99999;
    this.platformYMin = 99999;

    this.groundCreate();
    this.starsCreate();
    this.playerCreate();

    this.cursor = this.input.keyboard.createCursorKeys();

    this.starSound = game.add.audio('star');
    this.music = game.add.audio('music');
    this.music.loop = true;
    this.music.play();

    this.score = 0;
    this.scoreText = game.add.text(10, 10, 'Puntaje: 0', { fontSize: '18px', fill: '#fff' });
    this.scoreText.fixedToCamera = true;
    this.maxScoreText = game.add.text(10, 40, 'Puntaje Max: ' + maxScore, { fontSize: '14px', fill: '#fff' });
    this.maxScoreText.fixedToCamera = true;
    this.airJumpsText = game.add.text(10, 65, 'Air Jumps: ' + this.airJumps, { fontSize: '14px', fill: '#fff' });
    this.airJumpsText.fixedToCamera = true;
  },

  update: function() {
    this.world.setBounds(0, -this.player.yChange, this.world.width, this.game.height + this.player.yChange);

    this.cameraYMin = Math.min(this.cameraYMin, this.player.y - this.game.height + 230);
    this.camera.y = this.cameraYMin;

    this.physics.arcade.collide(this.player, this.grounds);
    this.physics.arcade.collide(this.player, this.stars);
    this.playerMove();

    this.stars.forEachAlive(function(elem) {
      this.platformYMin = Math.min(this.platformYMin, elem.y);
      if (elem.y > this.camera.y + this.game.height) {
        elem.kill();
        this.starsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.camera.y - 50);
      }
    }.bind(this));
  },

  shutdown: function() {
    this.world.setBounds(0, 0, this.game.width, this.game.height);
    this.cursor = null;
    this.player.destroy();
    this.player = null;
    this.grounds.destroy();
    this.grounds = null;
    this.stars.destroy();
    this.stars = null;
    this.music.stop();
    game.state.start('Menu');
  },

  groundCreate: function() {
    this.grounds = this.add.group();
    this.grounds.enableBody = true;
    this.ground = this.grounds.create(-16, this.world.height - 16, 'pixel');
    this.ground.body.immovable = true;
    this.ground.scale.x = this.world.width + 16;
    this.ground.scale.y = 16;
  },

  starsCreate: function() {
    this.stars = this.add.group();
    this.stars.enableBody = true;
    this.stars.createMultiple(6, 'star');

    for (var i = 0; i < 6; i++) {
      this.starsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.world.height - 150 - 150 * i);
    }
  },

  starsCreateOne: function(x, y) {
    var star = this.stars.getFirstDead();
    star.reset(x, y);
    star.body.immovable = true;
    star.body.checkCollision.up = false;
    star.loadTexture('star', 0);
    if (this.rnd.integerInRange(0, 6) == 1) {
      star.loadTexture('star-blue', 0);
    }
    if (this.rnd.integerInRange(0, 20) == 1) {
      star.loadTexture('star-red', 0);
    }
    return star;
  },

  playerCreate: function() {
    this.player = game.add.sprite(this.world.centerX, this.world.height - 36, 'player');
    this.player.anchor.set(0.5);

    this.player.yOrig = this.player.y;
    this.player.yChange = 0;

    this.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 600;
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);


    this.airJumps = 5;
    var space = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    space.onDown.add(function(){
      if (this.airJumps > 0 && !this.player.body.touching.down) {
        this.player.body.velocity.y = -550;
        this.airJumps--;
        this.airJumpsText.text = 'Air Jumps: ' + this.airJumps;
      }
    }.bind(this), this);
  },

  playerMove: function() {
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -350;
      this.player.animations.play('left');
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 350;
      this.player.animations.play('right');
    } else {
      this.player.body.velocity.x = 0;
      this.player.animations.stop();
    }

    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350;
    }

    this.world.wrap(this.player, this.player.width / 2, false);
    this.player.yChange = Math.max(this.player.yChange, Math.abs(this.player.y - this.player.yOrig));


    this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    if (this.player.y > this.cameraYMin + this.game.height && this.player.alive) {
      maxScore = maxScore < this.score ? this.score : maxScore;
      localStorage.setItem('maxscore', maxScore);
      this.state.start('Play');
    }
  },

  collectStar: function(player, star){
    star.kill();
    this.starSound.play();
    if (star.key == 'star-blue') {
      player.body.velocity.y = -750;
      this.score += 20;
    }else if(star.key === 'star-red') {
      player.body.velocity.y = -2000;
      this.score += 50;
      this.airJumps += 1;
      this.airJumpsText.text = 'Air Jumps: ' + this.airJumps;
    }else {
      player.body.velocity.y = -550;
      this.score += 10;
    }
    this.starsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.camera.y - this.rnd.integerInRange(100, 300));
    this.scoreText.text = 'Puntaje: ' + this.score;
  }
};
