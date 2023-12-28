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
  acceleration = 0.1;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.speedY -= this.acceleration;
        this.y -= this.speedY;
      }
    }, 1000 / 25);
  }

  isAboveGround(){
    return this.y < 250;
  }

  // Method to load a single image from the specified path
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
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

  playAnimation() {
    let path =
      this.IMAGES_WALKING[this.currentImage % this.IMAGES_WALKING.length];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  // Placeholder method for moving the object to the right
  moveRight() {
    // To be implemented
  }

  // Placeholder method for moving the object to the left
  moveLeft() {
    // To be implemented
  }
}
