class Level {
  enemies;
  clouds;
  backgorundObjects;
  level_end_x = 2200;

  constructor(enemies, clouds, backgorundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgorundObjects = backgorundObjects;
  }
}
