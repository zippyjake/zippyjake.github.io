//State: DogeDodge

'use strict'

var DogeDodge = {};

DogeDodge.Play = function () {};

DogeDodge.Play.prototype = {
  init: function () {
    console.log("%c~~~ Booting the Game ~~~\n Made by Jake S","color:#00ff00;");
  },

  preload: function () {
    this.load.image('background','assets/background.jpg');
    this.load.image('player','assets/player.png');  
    this.load.spritesheet('falling','assets/enemy.png',44,38,2);
    this.load.spritesheet('falling2','assets/enemy.png',44,38,2);
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // background
    this.background = this.add.tileSprite(0,0,320,568,'background');
    this.background.autoScroll(50,-50);
    this.background.scale.set(1);

    // player
    this.player = this.add.sprite(160,500,'player',5);
    this.player.anchor.setTo(0.5, 0.5);
    this.player.smoothed = false;
    this.player.collideWorldBounds = true;
    game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.setTo(0.3);
    this.player.body.drag.setTo(3000);

    // movement keys
    this.cursors = game.input.keyboard.createCursorKeys();
    
    // falling
    this.falling = this.add.sprite(100,100,'falling',2);
    this.falling.anchor.set(0.5,0.5);
    this.falling.smoothed = false;
    this.falling.animations.add('tail');
    this.falling.animations.play('tail',2,true);
    this.falling.x = game.rnd.integerInRange(10, 350);
    game.physics.arcade.enable(this.falling)
    this.falling.body.velocity.y = 200

    // falling
    this.falling2 = this.add.sprite(200,100,'falling',2);
    this.falling2.anchor.set(0.5,0.5);
    this.falling2.smoothed = false;
    this.falling2.animations.add('tail');
    this.falling2.animations.play('tail',2,true); 
    this.falling2.x = game.rnd.integerInRange(10, 350);
    game.physics.arcade.enable(this.falling2)
    this.falling2.body.velocity.y = 100
  },

  update: function () {
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x -= 100;
    }
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x += 100; 
    }
    this.falling.y += 10;
    if (this.falling.y > 568) {
      this.falling.y = game.rnd.integerInRange(1, 20);;
      this.falling.x = game.rnd.integerInRange(10, 340);
    }
    this.falling2.y += 7;
    if (this.falling2.y > 568) {
      this.falling2.y = game.rnd.integerInRange(10, 20);
      this.falling2.x = game.rnd.integerInRange(10, 340);
    }
    game.physics.arcade.collide(this.falling,this.player,this.handleCollision);
    game.physics.arcade.collide(this.falling2,this.player,this.handleCollision);
  },
  
  handleCollision: function() {
    game.state.start('Play')
  }
};
