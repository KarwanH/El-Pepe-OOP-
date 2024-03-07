class Coins extends MoveAbleObject {
  width = 90;
  height = 90;
  IMAGES_MOVING = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  constructor(x, y) {
    super().loadImg("img/8_coin/coin_1.png");
    this.x = x; 
    this.y = y;
    this.loadImages(this.IMAGES_MOVING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_MOVING);
    }, 1000);
  }
}
