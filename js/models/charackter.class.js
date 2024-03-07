/**
 * Class representing a character that extends the MoveAbleObject class.
 */
class Character extends MoveAbleObject {
  /**
   * Default height of the character.
   * @type {number}
   */
  height = 200;

  /**
   * Default width of the character.
   * @type {number}
   */
  width = 100;

  /**
   * X-coordinate of the character.
   * @type {number}
   */
  x = 0;

  /**
   * Y-coordinate of the character.
   * @type {number}
   */
  y = 100;

  /**
   * Cache object for character.
   * @type {CharacterCache}
   */
  cache = new CharacterCache();

  /**
   * Level object for character.
   * @type {Level}
   */
  level_1 = level1;

  /**
   * Audio object for hurt sound.
   * @type {Audio}
   */
  hurtSound = new Audio("audio/hurt.mp3");

  /**
   * Audio object for running sound.
   * @type {Audio}
   */
  runningSound = new Audio("audio/running.mp3");

  /**
   * Audio object for landing sound.
   * @type {Audio}
   */
  landingSound = new Audio("audio/landing.mp3");

  /**
   * Current speed of character in Y-direction.
   * @type {number}
   */
  currentSpeedY;

  /**
   * Constructor method to initialize the character.
   */
  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.cache.IMAGES_WALKING);
    this.loadImages(this.cache.IMAGES_JUMPING);
    this.loadImages(this.cache.IMAGES_DEAD);
    this.loadImages(this.cache.IMAGES_INPAIN);
    this.applyGravity();
    this.animate();
    this.groundHeight = 250;
  }

  /**
   * Method to handle the animation and movement of the character.
   */
  animate() {
    setInterval(() => {
      this.runningSound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.level_1.level_end_x) {
        this.moveRight();
        this.playWalkingSound();
        this.otherDirection = false;
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.playWalkingSound();
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.Camera_x = -this.x + 100;
    }, 25);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.cache.IMAGES_DEAD);
        this.disApear();
      } else if (this.isHurt()) {
        this.playAnimation(this.cache.IMAGES_INPAIN);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.cache.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.cache.IMAGES_WALKING);
      } else {
        super.loadImg("img/2_character_pepe/1_idle/idle/I-1.png");
      }
    }, 60);
  }

  /**
   * Plays walking sound if character is not above ground.
   */
  playWalkingSound() {
    if (!this.isAboveGround()) {
      this.runningSound.play();
    }
  }
}
