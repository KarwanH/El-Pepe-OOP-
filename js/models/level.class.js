class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgorundObjects;
  level_end_x = 2200;

  constructor(enemies, clouds, backgorundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgorundObjects = backgorundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
