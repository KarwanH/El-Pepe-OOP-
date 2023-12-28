// Definition of the Sky class, extending MoveAbleObject
class Sky extends MoveAbleObject {
  y = 50; // Initial y-coordinate
  height = 300; // Height of the sky
  width = 500; // Width of the sky

  // Constructor for creating instances of the Sky class
  constructor() {
    super(); // Call the constructor of the parent class (MoveAbleObject)
    this.loadImg("img/5_background/layers/4_clouds/1.png"); // Load the image for the sky
    this.x = 250 + Math.random() * 500; // Set the initial x-coordinate randomly within a range
    this.animate(); // Start the animation
  }

  // Method to initiate the cloud movement animation
  animate() {
    this.moveCloud(); // Call the method to move the cloud
  }

  // Method to update the cloud's x-coordinate and continue the animation using requestAnimationFrame
  moveCloud() {
    this.x -= 0.3; // Move the cloud to the left
    if (this.x < -600) {
      this.x = 600; // If the cloud goes off the left side, reset its position to the right
    }
    requestAnimationFrame(this.moveCloud.bind(this)); // Use requestAnimationFrame for smooth animation and bind 'this' to maintain the correct context
  }
}
