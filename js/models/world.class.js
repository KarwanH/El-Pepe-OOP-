class World {
  character = new Character();
  level_1 = level1;
  canvas;
  ctx;
  keyboard;
  Camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoins = new StatusBarCoins();
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level_1.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy)
        }
      });
    }, 1000);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.Camera_x, 0);
    this.addObjectsToMap(this.level_1.backgorundObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.Camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.Camera_x, 0);
    this.addObjectsToMap(this.level_1.clouds);
    this.addObjectsToMap(this.level_1.enemies);
    this.ctx.translate(-this.Camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

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
