class Chicken extends MoveAbleObject {
  width = 70;
  height = 70;
  y = 380;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  constructor() {
    super().loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 250 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation();
      this.moveCharacter();
    }, 1000);
  }

  moveCharacter() {
    this.x -= 5;
  }
}
