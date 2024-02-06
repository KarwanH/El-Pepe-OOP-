class DrawableObject {
  img; // Will hold the Image object
  imageCache = {}; // Cache to store loaded images  currentImage = 0; // the index of the current image
  currentImage = 0; // the index of the current image
  x = 120;
  y = 250;
  height = 150;
  width = 100;

  // Method to load a single image from the specified path
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

  drawFrame(ctx) {
    if (this instanceof Chicken || this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
