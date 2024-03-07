class Bottle extends MoveAbleObject {
  width = 70;
  height = 70;
  y = 380;
  IMAGES_MOVING = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  constructor(x, y) {
    super().loadImg("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = x;
    this.y = this.y ? this.y : y;
    this.loadImages(this.IMAGES_MOVING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_MOVING);
    }, 600);
  }
}
