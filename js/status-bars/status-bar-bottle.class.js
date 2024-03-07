class StatusBarBottles extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

   constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 105;
    this.width = 200;
    this.height = 50;
    this.setPercentage(this.amounfOfBottles);
  }

  // setPercentage(50)
  setPercentage(bottle) {
    this. amounfOfBottles = bottle; // => 0 ... 5
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }
  resolveImageIndex() {
    if (this.amounfOfBottles >= 6) {
      return 6;
    } else if (this.amounfOfBottles == 5) {
      return 5;
    } else if (this.amounfOfBottles == 4) {
      return 4;
    } else if (this.amounfOfBottles == 3) {
      return 3;
    } else if (this.amounfOfBottles == 2) {
      return 2;
    } else if (this.amounfOfBottles == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
