class ThrowableObject extends MoveAbleObject {
  break_sound = new Audio("audio/breaking.mp3");
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, direction) {
    super();
    this.loadImg("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.x = x;
    this.y = y;
    this.height = 65;
    this.width = 65;
    this.throw(direction);
    this.loadImages(this.BOTTLE_ROTATION);
    this.loadImages(this.BOTTLE_SPLASH);
  }
  throw(direction) {
    this.speedY = 10;
    this.applyGravity();

    let throwInterval = setInterval(() => {
      if (direction === "right") {
        this.x += 10;
      } else {
        this.x -= 10;
      }
      this.playAnimation(this.BOTTLE_ROTATION);
    }, 25);

    let splashInterval = setInterval(() => {
      if (this.y > 390) {
        this.break_sound.play();
        clearInterval(throwInterval);
        this.playAnimation(this.BOTTLE_SPLASH);
        setTimeout(() => {
          this.img.src = "";

          clearInterval(splashInterval);
        }, 1000 / 50);
      }
    }, 1000 / 25);
  }
}
