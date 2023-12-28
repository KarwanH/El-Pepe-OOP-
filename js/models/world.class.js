class World {
  character = new Character();
  level_1 = level1;
  canvas;
  ctx;
  keyboard;
  Camera_x = 0;
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.Camera_x, 0);
    this.addObjectsToMap(this.level_1.backgorundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level_1.clouds);
    this.addObjectsToMap(this.level_1.enemies);
    this.ctx.translate(-this.Camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.x + mo.width, mo.y);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
  }
}
