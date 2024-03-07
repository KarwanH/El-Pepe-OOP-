/**
 * Define a class named MoveAbleObject.
 * @extends DrawableObject
 */
class MoveAbleObject extends DrawableObject {
  /**
   * Initialize default values for position and dimensions.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Flag to indicate if the object is moving in the other direction.
   * @type {boolean}
   */
  otherDirection = false; // Default direction

  /**
   * Speed of the object in the Y-direction.
   * @type {number}
   */
  speedY = 0;

  /**
   * Acceleration of the object.
   * @type {number}
   */
  acceleration = 0.8;

  /**
   * A parameter of the object.
   * @type {number}
   */
  a = 0.8;

  /**
   * Energy of the object.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last hit on the object.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Timestamp of the last thrown bottle on the object.
   * @type {number}
   */
  throwCooldown = false;

  /**
   * Number of coins collected by the object.
   * @type {number}
   */
  coins = 0;

  /**
   * Amount of bottles held by the object.
   * @type {number}
   */
  amountOfBottles = 0;

  /**
   * Apply gravity effect on the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.speedY -= this.acceleration;
        this.y -= this.speedY;
        if (this.y > 250 && this instanceof Character) {
          this.landingSound.play();
        } else if (this.y > 390 && this instanceof ThrowableObject) {
          return true;
        }
      }
    }, 1000 / 25);
  }

  /**
   * Check if the object is above the ground.
   * @returns {boolean} - True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y <= 390;
    } else {
      return this.y <= 250;
    }
  }

  /**
   * Check if the object is colliding with another object.
   * @param {object} object - The object to check collision with.
   * @returns {boolean} - True if colliding, otherwise false.
   */
  isColliding(object) {
    return (
      this.x + this.width - 30 >= object.x &&
      this.x <= object.x + object.width &&
      this.y + this.height >= object.y &&
      this.y + 150 <= object.y + object.height
    );
  }

  /**
   * Decrease energy when the object is hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increase the amount of bottles held by the object.
   */
  hitBottle() {
    this.amountOfBottles++;
    if (this.amountOfBottles >= 5) this.amountOfBottles = 5;
  }

  /**
   * Decrease the amount of bottles held by the object.
   */
  trowBottle() {
    this.amountOfBottles--;
    if (this.amountOfBottles <= 0) {
      this.amountOfBottles = 0;
    } else {
      this.lastBottle = new Date().getTime() / 1000;
    }
  }

  /**
   * Increase the number of coins collected by the object.
   */
  collideCoin() {
    this.coins++;
    if (this.coins >= 5) this.coins = 5;
  }

  /**
   * Check if the object is hurt within a certain time frame.
   * @returns {boolean} - True if hurt, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s;
    return timePassed < 0.5;
  }

  /**
   * Check if the object is dead.
   * @returns {boolean} - True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Draw the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawObject(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();
  }

  /**
   * Method to handle the disappearance of the object.
   */
  disApear() {
  }

  /**
   * Play animation for the object.
   * @param {Array} images - Array of images for animation.
   */
  playAnimation(images) {
    let path = images[this.currentImage % images.length];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Make the object jump.
   */
  jump() {
    this.speedY = 15;
    this.previousY = this.y;
    this.play; // This seems incomplete, not sure what it's supposed to do
  }

  /**
   * Move the object to the left.
   */
  moveLeft() {
    this.x -= 7.5;
  }

  /**
   * Move the object to the right.
   */
  moveRight() {
    this.x += 7.5;
  }
}
