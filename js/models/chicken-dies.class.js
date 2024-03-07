class ChickDies extends MoveAbleObject {
  IMAGES_CHICK_DIES = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x, y) {
    super().loadImg(this.IMAGES_CHICK_DIES[0]);
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;
    this.loadImages(this.IMAGES_CHICK_DIES);
  }
}
