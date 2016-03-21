SnailUp.Play = function() {};

SnailUp.Play.prototype = {

  create: function() {
    this.maxScore = parseInt(localStorage.getItem('maxscore'), 10) || 0;
    this.background = this.add.tileSprite(0, 0, 640, 480, "background");
    this.background.fixedToCamera = true;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.cameraYMin = 99999;
    this.platformYMin = 99999;

    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.groundCreate();
    this.leafsCreate();
    this.playerCreate();

    this.cursor = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.scoreBonus = 0;
    this.scoreText = game.add.text(10, 10, 'Height: 0', { fontSize: '18px', fill: '#fff' });
    this.scoreText.fixedToCamera = true;
    this.maxScoreText = game.add.text(10, 40, 'Max Height: ' + this.maxScore, { fontSize: '14px', fill: '#fff' });
    this.maxScoreText.fixedToCamera = true;
    this.timeCheck = this.time.now;
    this.game.input.onDown.add(this.click, this);
  },

  click: function() {
    var delta = this.time.now - this.timeCheck;
    if (delta < 500) {
      if (this.player.body.acceleration.y > 0) {
        this.player.body.acceleration.y *= -1;
        this.player.body.velocity.y = -1;
      }
      this.player.body.acceleration.y -= Math.sqrt((600 - delta) / 10);
    }
    this.timeCheck = this.time.now;
  },

  update: function() {
    this.world.setBounds(0, -this.player.yChange, this.world.width, this.game.height + this.player.yChange);

    this.cameraYMin = Math.min(this.cameraYMin, this.player.y - this.game.height + 230);
    this.camera.y = this.cameraYMin;

    this.physics.arcade.collide(this.player, this.grounds);
    this.physics.arcade.collide(this.player, this.leafs);
    this.playerMove();

    this.leafs.forEachAlive(function(elem) {
      this.platformYMin = Math.min(this.platformYMin, elem.y);
      if (elem.y > this.camera.y + this.game.height) {
        elem.kill();
        this.leafsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.camera.y - 50);
      }
    }.bind(this));
    this.scoreText.text = 'Height: ' + Math.round(this.camera.y / -1000 + this.scoreBonus, 2);
  },

  shutdown: function() {
    this.world.setBounds(0, 0, this.game.width, this.game.height);
    this.cursor = null;
    this.player.destroy();
    this.player = null;
    this.grounds.destroy();
    this.grounds = null;
    this.leafs.destroy();
    this.leafs = null;
  },

  groundCreate: function() {
    this.grounds = this.add.group();
    this.grounds.enableBody = true;
    this.ground = this.grounds.create(-16, this.world.height - 16, 'pixel');
    this.ground.body.immovable = true;
    this.ground.scale.x = this.world.width + 16;
    this.ground.scale.y = 16;
  },

  leafsCreate: function() {
    this.leafs = this.add.group();
    this.leafs.enableBody = true;
    this.leafs.createMultiple(6, 'leaf');

    for (var i = 0; i < 5; i++) {
      this.leafsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.world.height - 1000 - 1000 * i);
    }
  },

  leafsCreateOne: function(x, y) {
    var leaf = this.leafs.getFirstDead();
    leaf.reset(x, y);
    leaf.body.immovable = true;
    leaf.body.checkCollision.up = false;
    return leaf;
  },

  playerCreate: function() {
    this.player = game.add.sprite(this.world.centerX, this.world.height - 36, 'player');
    this.player.anchor.set(0.5);

    this.player.yOrig = this.player.y;
    this.player.yChange = 0;

    this.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 50;
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.player.body.maxVelocity.y = 600;
    this.player.body.drag.y = 30;

    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  },

  playerMove: function() {
    var delta = this.time.now - this.timeCheck;
    if (delta > 500) {
      if (this.player.body.velocity.y > 0) {
        this.player.body.acceleration.y = 50;
        this.player.body.velocity.y = 100;
      } else {
        this.player.body.acceleration.y = 300;
      }
    }

    if (this.leftKey.isDown) {
      this.player.body.velocity.x = -350;
    } else if (this.rightKey.isDown) {
      this.player.body.velocity.x = 350;
    } else {
      this.player.body.velocity.x = 0;
    }

    this.world.wrap(this.player, this.player.width / 2, false);
    this.player.yChange = Math.max(this.player.yChange, Math.abs(this.player.y - this.player.yOrig));

    this.physics.arcade.overlap(this.player, this.leafs, this.collectLeaf, null, this);

    if (this.player.y > this.cameraYMin + this.game.height && this.player.alive) {
      this.score = this.camera.y / -1000 + this.scoreBonus;
      this.maxScore = this.maxScore < this.score ? this.score : this.maxScore;
      localStorage.setItem('maxscore', this.maxScore);
      this.state.start('menu');
    }
  },

  collectLeaf: function(player, leaf) {
    leaf.kill();
    this.leafsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.game.rnd.between(this.camera.y - 2000, this.camera.y - 4000));
    this.scoreBonus += 0.1;
  }
};
