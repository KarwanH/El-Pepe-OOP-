/**
 * Represents the game world.
 */
class World {
  /** @type {Character} */
  character = new Character(); // The main character of the game

  /** @type {Level} */
  level_1 = level1; // The current level of the game

  /** @type {HTMLCanvasElement} */
  canvas; // The canvas element where the game is rendered

  /** @type {CanvasRenderingContext2D} */
  ctx; // The rendering context of the canvas

  /** @type {KeyboardEvent} */
  keyboard; // The keyboard input for controlling the game

  /** @type {number} */
  Camera_x = 0; // The camera position on the x-axis

  /** @type {StatusBarHealth} */
  statusBarHealth = new StatusBarHealth(); // The health status bar

  /** @type {StatusBarCoins} */
  statusBarCoins = new StatusBarCoins(); // The coins status bar

  /** @type {StatusBarBottles} */
  statusBarBottles = new StatusBarBottles(); // The bottles status bar

  /** @type {ThrowableObject[]} */
  throwableObject = []; // Array to hold throwable objects

  deadEnemies = [];

  /** @type {Audio} */
  backgorunMusic = new Audio("audio/background_sound.mp3"); // The background music audio

  /**
   * Creates a new instance of World.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   * @param {KeyboardEvent} keyboard - The keyboard input for controlling the game.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.setWorld();
    this.run();
    this.playBackground();
  }

  /**
   * Plays background music.
   */
  playBackground() {
    setInterval(() => {
      this.backgorunMusic.play();
    }, 1000);
  }

  /**
   * Sets the world for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the game loop.
   */
  run() {
    setInterval(() => {
      this.checkCollisionsWithEnemies();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithBottles();
      this.checkThrowObject();
      this.checkCollisionsWithThrowableObject();
      this.characterJumpOnEnemy();
    }, 100);
  }

  /**
   * Checks for collisions with enemies.
   */
  checkCollisionsWithEnemies() {
    // Enemies
    this.level_1.enemies.forEach((enemy, i) => {
      if (this.characterCollideWithEnemy(enemy)) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        this.character.hurtSound.play();
      }
    });
  }

  /**
   * Checks for collisions with throwable objects.
   */
  checkCollisionsWithThrowableObject() {
    this.throwableObject.forEach((element) => {
      this.level_1.enemies.forEach((enemy, i) => {
        if (element.isColliding(enemy)) {
          console.log(1);
          this.enemyIsHit(enemy, i);
        }
      });
    });
  }

  /**
   * Checks for collisions with bottles.
   */
  checkCollisionsWithBottles() {
    this.level_1.bottles.forEach((bottle, i) => {
      if (
        this.character.isColliding(bottle) &&
        this.character.amountOfBottles < 5
      ) {
        this.character.hitBottle();
        this.statusBarBottles.setPercentage(this.character.amountOfBottles);
        this.level_1.bottles.splice(i, 1);
      } else {
        false;
      }
    });
  }

  /**
   * Checks for collisions with coins.
   */
  checkCollisionsWithCoins() {
    this.level_1.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin) && this.character.coins < 5) {
        this.character.collideCoin();
        this.statusBarCoins.setPercentage(this.character.coins);
        this.level_1.coins.splice(i, 1);
      }
    });
  }

  /**
   * Handles the situation when an enemy is dead.
   * @param {Enemy} enemy - The enemy that is dead.
   * @param {number} i - The index of the enemy in the enemies array.
   */

  chickDies(enemy, position) {
    let deadChick = new ChickDies(enemy.x, enemy.y + 20);
    this.level_1.enemies.splice(position, 1);
    this.deadEnemies.push(deadChick);
    setTimeout(() => {
      this.deadEnemies.splice(0, 1);
    }, 2000);
  }

  /**
   * Checks if the character is jumping on an enemy.
   * @param {Enemy} enemy - The enemy being jumped on.
   * @returns {boolean} - True if the character is jumping on the enemy, false otherwise.
   */
  characterJumpOnEnemy() {
    this.level_1.enemies.forEach((e, i) => {
      if (
        this.character.isColliding(e) &&
        this.character.y + this.height < e.height &&
        e.constructor == Chicken
      ) {
        this.character.speedY = 10;
        e.sounds.hit_sound.play();
        this.chickDies(e, i);
      }
    });
  }

  /**
   * Checks if the character is colliding with an enemy.
   * @param {Enemy} enemy - The enemy being collided with.
   * @returns {boolean} - True if the character is colliding with the enemy, false otherwise.
   */
  characterCollideWithEnemy(enemy) {
    return this.character.isColliding(enemy) && this.character.y >= 250;
  }

  /**
   * Checks if the character can throw an object.
   */
  checkThrowObject() {
    if (this.keyboard.D && !this.character.throwCooldown) { 
      if (this.character.amountOfBottles > 0) {
        this.character.trowBottle();
        this.statusBarBottles.setPercentage(this.character.amountOfBottles);
        let direction = this.character.otherDirection ? "left" : "right";
        let bottle = new ThrowableObject(
          100,
          this.character.y + 100,
          direction
        );
        this.throwableObject.push(bottle);
        this.character.throwCooldown = true;

        setTimeout(() => {
          this.character.throwCooldown = false;
        }, 450);
      }
    }
  }
  /**
   * Draws the game world.
   */
  draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Translate the canvas context
    this.ctx.translate(this.Camera_x, 0);

    // Draw background objects
    this.addObjectsToMap(this.level_1.backgorundObjects);

    // Draw the main character
    this.addToMap(this.character);

    // Reset the translation
    this.ctx.translate(-this.Camera_x, 0);

    // Draw status bars
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);

    // Draw throwable objects
    this.addObjectsToMap(this.throwableObject);

    // Translate again
    this.ctx.translate(this.Camera_x, 0);
    this.addObjectsToMap(this.deadEnemies);

    // Draw clouds, enemies, bottles, and coins
    this.addObjectsToMap(this.level_1.clouds);
    this.addObjectsToMap(this.level_1.enemies);
    this.addObjectsToMap(this.level_1.bottles);
    this.addObjectsToMap(this.level_1.coins);

    // Reset translation
    this.ctx.translate(-this.Camera_x, 0);

    // Draw() is called repeatedly
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Adds objects to the map for drawing.
   * @param {Object[]} object - The objects to be added to the map.
   */
  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws an object on the canvas.
   * @param {Object} mo - The object to be drawn.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      mo.drawObject(this.ctx);
      mo.drawFrame(this.ctx);
    } else {
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
    }
  }
}
