// Define a class named MoveAbleObject
class MoveAbleObject {
  // Initialize default values for position and dimensions
  x = 120;
  y = 250;
  speed = 0.15;
  img; // Will hold the Image object
  height = 150;
  width = 100;
  imageCache = {}; // Cache to store loaded images
  currentImage = 0; // the index of the current image
  otherDirection = false; // Default direction
  speedY = 0;
  acceleration = 1;

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

  // Method to load a single image from the specified path
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  drawObject(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();
  }

  // Method to load multiple images from an array of paths
  loadImages(arr) {
    arr.forEach((path) => {
      // Create a new Image object for each path
      let img = new Image();
      img.src = path;
      // Store the Image object in the image cache using the path as the key
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let path = images[this.currentImage % this.IMAGES_WALKING.length];
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
