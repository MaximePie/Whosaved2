ig.module(
  'game.entities.character'
).requires(
  'impact.entity',
)
  .defines(function () {
    EntityCharacter = ig.Entity.extend({
      size: {x: 64, y: 128},
      collides: ig.Entity.COLLIDES.ACTIVE,

      animSheet: new ig.AnimationSheet('media/mapCharacter.png', 64, 128),

      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.frameTime = 0.15;
        this.defaultVelocity = 250;
        this.sprintingVelocity = 500;
        this.hasNoKeyPressed = true;

        this.addAnim('idleRight', 1, [3]);
        this.addAnim('idleLeft', 1, [0]);
        this.addAnim('moveRight', this.frameTime, [3,4,5]);
        this.addAnim('moveLeft', this.frameTime, [0,1,2]);
        this.maxVel.x = 500;
        this.maxVel.y = 500;
        this.name = 'character';
      },

      update: function() {

        if (ig.input.state('right')) {
          if (this.lastPressedKey === 'right' && this.hasNoKeyPressed) {
            this.vel.x = this.sprintingVelocity;
          }
          else {
            this.hasNoKeyPressed = false;
            this.vel.x = this.defaultVelocity;
          }

          this.vel.y = 0;
          this.currentAnim = this.anims.moveRight;
          this.lastPressedKey = 'right';
        }
        else if (ig.input.state('left')) {
          this.vel.x = - this.defaultVelocity;
          this.vel.y = 0;
          this.currentAnim = this.anims.moveLeft;
          this.lastPressedKey = 'left';
          this.hasNoKeyPressed = false;
        }
        else {
          this.vel.y = 0;
          this.vel.x = 0;
          this.currentAnim = this.lastPressedKey === 'right' ? this.anims.idleRight : this.anims.idleLeft;
          this.hasNoKeyPressed = true;
        }
        this.parent();
      },
    })
  });