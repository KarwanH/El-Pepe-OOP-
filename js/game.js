// Object orientation
let canvas;
let world;
let keyboard = new Keyboard();
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (e.key === "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (e.key === "ArrowDown") {
    keyboard.DOWN = true;
  } else if (e.key === "ArrowUP") {
    keyboard.UP = true;
  } else if (e.key === " ") {
    keyboard.SPACE = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (e.key === "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (e.key === "ArrowDown") {
    keyboard.DOWN = false;
  } else if (e.key === "ArrowUP") {
    keyboard.UP = false;
  } else if (e.key === " ") {
    keyboard.SPACE = false;
  }
});
