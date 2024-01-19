// Definition of the Character class, extending the MoveAbleObject class
class Character extends MoveAbleObject {
  // Default height and width values for the character
  height = 200;
  width = 100;
  speed = 10; // Speed of the character's movement
  x = 0;
  y = 100;
  level_1 = level1;
  runningSound = new Audio("audio/running.mp3");
  landingSound = new Audio("audio/landing.mp3");
  currentSpeedY;
  // Array of image paths for walking animation
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  // Constructor method to initialize the character
  constructor() {
    // Call the constructor of the parent class and load the initial image
    super().loadImg("img/2_character_pepe/2_walk/W-21.png");
    // Load the walking animation images
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    // Start the animation loop
    this.animate();
  }

  // Method to handle the animation and movement of the character
  animate() {
    // Set up an interval for the animation loop
    setInterval(() => {
      this.runningSound.pause();
      // Check if the right arrow key is pressed
      if (this.world.keyboard.RIGHT && this.x < this.level_1.level_end_x) {
        // Move the character to the right
        this.moveRight();
        this.runningSound.play();
        this.otherDirection = false;
      }
      // Check if the left arrow key is pressed
      else if (this.world.keyboard.LEFT && this.x > 0) {
        // Move the character to the left
        this.moveLeft();
        this.runningSound.play();
        this.otherDirection = true;
      }

      if (
        (this.world.keyboard.SPACE && !this.isAboveGround())
      ) {
        this.jump();
      }
      this.world.Camera_x = -this.x + 100;
    }, 25);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.currentSpeedY = this.speedY;
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 60);
  }

  // Placeholder method for jumping (not implemented yet)
}
