Bambu.Play = function() {};

Bambu.Play.prototype = {
  create: function() {
    this.score = 0;
    this.game.add.image(0, 0, 'starfield');
    this.topScore = !localStorage.getItem("topboomdots") ? 0 : localStorage.getItem("topboomdots");
    this.scoreText = this.game.add.text(10, 10, "-", {
      font: "bold 16px Arial",
      fill: "#acacac"
    });
    this.cursor = this.input.keyboard.createCursorKeys();
    this.updateScore();
    this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 5 * 4, "player");
    this.player.anchor.setTo(0.5);
    this.player.scale.x *= 0.5;
    this.player.scale.y *= 0.5;
    this.enemy = this.game.add.sprite(this.game.width, 0, "enemy");
    this.enemy.anchor.set(0.5);
    this.placePlayer();
    this.placeEnemy();
  },

  update: function() {
    if (Phaser.Math.distance(this.player.x, this.player.y, this.enemy.x, this.enemy.y) < this.player.width*0.75 + this.enemy.width*0.75) {
      this.enemyTween.stop();
      this.playerTween.stop();
      this.score++;
      if (Math.abs(this.player.x - this.enemy.x) < 10) {
        this.score += 2;
      }
      this.placeEnemy();
      this.placePlayer();
      this.updateScore();
    }
  },

  die: function die() {
    localStorage.setItem("topboomdots", Math.max(this.score, this.topScore));
    lives--;
    if (lives <= 0){
      game.state.start('menu');
    }else {
      game.state.start("play");
    }
  },

  updateScore: function updateScore() {
    this.scoreText.text = "Score: " + this.score + " - Best: " + this.topScore + "\n" + "Lives: " + lives;
  },

  placePlayer: function placePlayer() {
    this.player.x = this.game.width / 2;
    this.player.y = this.game.height /2;
    // this.playerTween = this.game.add.tween(this.player).to({
    //   y: this.game.height
    // }, 10000 - this.score * 10, "Linear", true);
    // this.playerTween.onComplete.add(this.die, this);

    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);

    this.upKey.onDown.add(this.fire.bind(this, 'up'), this);
    this.downKey.onDown.add(this.fire.bind(this, 'down'), this);
    this.leftKey.onDown.add(this.fire.bind(this, 'left'), this);
    this.rightKey.onDown.add(this.fire.bind(this, 'right'), this);
  },

  placeEnemy: function placeEnemy() {
    var shift;
    direction = this.game.rnd.between(1,2);
    if (direction === 1) {
      this.enemy.x = this.game.width - this.enemy.width / 2;
      shift = this.game.rnd.between(1,2) == 1 ? this.game.height/2 + this.player.height*0.75 : 0;
      this.enemy.y = shift + this.game.rnd.between(this.enemy.width * 2, this.game.height/2 - this.player.height);
    }else {
      this.enemy.y = this.game.height - this.enemy.width/2;
      shift = this.game.rnd.between(1,2) == 1 ? this.game.width/2 + this.player.width*0.75 : 0;
      this.enemy.x = shift + this.game.rnd.between(this.enemy.width * 2, this.game.width/2 - this.player.width);
    }

    this.moveEnemy(direction);
  },

  moveEnemy: function moveEnemy(direction) {
    var dir;
    if (direction == 1) {
      dir = {x: this.enemy.width / 2 };
    }else if (direction) {
      dir = {y: this.enemy.height / 2 };
    }
    this.enemyTween = this.game.add.tween(this.enemy).to(dir, 500 + this.game.rnd.between(600, 2500), Phaser.Easing.Cubic.InOut, true);
    this.enemyTween.yoyo(true, 0);
    this.enemyTween.repeat(50, 0);
  },

  fire: function fire(direction) {
    this.upKey.onDown.remove(this.fire, this);
    this.downKey.onDown.remove(this.fire, this);
    this.leftKey.onDown.remove(this.fire, this);
    this.rightKey.onDown.remove(this.fire, this);
    var dir;
    if (direction === "up") {
      dir = { y: ''+-this.game.width };
    }else if (direction === 'down') {
      dir = { y: ''+this.game.width };
    }else if (direction === 'left') {
      dir = { x: ''+-this.game.width };
    }else if (direction === 'right') {
      dir = { x: ''+this.game.width };
    }
    this.playerTween = this.game.add.tween(this.player).to(dir, 750, "Linear", true);
    this.playerTween.onComplete.add(this.die, this);
  }
};
