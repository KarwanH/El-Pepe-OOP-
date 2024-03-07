class Chicken extends MoveAbleObject {
  width = 60;
  height = 60;
  numOfX;
  y = 380;
  sounds = new Sounds();
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  constructor() {
    super().loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 1000; // chicks werden an verschiedenen Positionen erstellt
    this.speed = 1 + Math.random() * 2; // chicks laufen verschieden schnell
    this.animate();
  }

  animate() {
    this.interval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.moveChicken();
    }, 100); // Change the interval time to control the speed of animation
  }

  moveChicken() {
    this.x -= this.speed; // Change the amount to move in each step
  }

  stopAnimation() {
    clearInterval(this.interval);
  }
}
