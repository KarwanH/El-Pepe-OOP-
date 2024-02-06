class StatusBarCoins extends StatusBarHealth {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  coin = 41;
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 60;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }
  setPercentage(coin) {
    this.coin = coin; // => 0 ... 5
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    if (this.coin == 100) {
      return 5;
    } else if (this.coin > 80) {
      return 4;
    } else if (this.coin > 60) {
      return 3;
    } else if (this.coin > 40) {
      return 2;
    } else if (this.coin > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
