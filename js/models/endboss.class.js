class Endboss extends MoveAbleObject {
  width = 250;
  height = 200;
  y = 260;
  cache = new EndbossCache();


  constructor() {
    super();
    this.loadImg(this.cache.IMAGES_ALERT[1]);
    this.loadImages(this.cache.IMAGES_ALERT);
    this.x = 1900;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.cache.IMAGES_ALERT);
    }, 300);
  }
}
