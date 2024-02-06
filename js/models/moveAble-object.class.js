// Define a class named MoveAbleObject
class MoveAbleObject extends DrawableObject {
  // Initialize default values for position and dimensions

  speed = 0.15;
  otherDirection = false; // Default direction
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  coins = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }
  isAboveGround() {
    return this.y < 250;
  }

  // character.isColliding(chicken)
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; //Difference in s;
    return timePassed < 0.5;
  }

  isDead() {
    return this.energy == 0;
  }

  drawObject(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();
  }

  playAnimation(images) {
    let path = images[this.currentImage % images.length];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 15;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }
}
