// Object orientation
let canvas;
let world;
let keyboard = new Keyboard();
let keyPress = false;
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
  } else if (e.key === "ArrowUp") {
    keyboard.UP = true;
  } else if (e.key === " ") {
    keyboard.SPACE = true;
  } else if (e.code === "KeyD" && !keyPress) {
    keyboard.D = true;
    keyPress = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (e.key === "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (e.key === "ArrowDown") {
    keyboard.DOWN = false;
  } else if (e.key === "ArrowUp") {
    keyboard.UP = false;
  } else if (e.key === " ") {
    keyboard.SPACE = false;
  } else if (e.code === "KeyD") {
    keyboard.D = false;
    keyPress = false;
  }
});

