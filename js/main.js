import { config } from "./config.js";

// Wait for the DOM to load before creating the game
window.addEventListener("load", () => {
  // Create a new Phaser game with the configuration
  const game = new Phaser.Game(config);

  // Make the game instance available globally if needed for debugging
  window.game = game;
});
