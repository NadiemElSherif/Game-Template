/**
 * BootScene
 * The initial loading scene that loads the configuration and minimal assets
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Load minimal assets needed for the preloader scene
    this.load.image("loading-bar", "assets/images/ui/loading-bar.png");
    this.load.image("loading-bg", "assets/images/ui/loading-bg.png");

    // Load the configuration file
    this.load.json("story-config", "assets/config/story.json");
  }

  create() {
    // Get the configuration from the cache
    const config = this.cache.json.get("story-config");

    // Store the loaded configuration in the game's registry for access by all scenes
    this.registry.set("config", config);

    // Apply game settings from config
    if (config && config.gameSettings) {
      const gameSettings = config.gameSettings;

      // Update the game size based on config
      if (gameSettings.width && gameSettings.height) {
        this.scale.resize(gameSettings.width, gameSettings.height);
      }
    }

    // Move to the preloader scene
    this.scene.start("PreloaderScene");
  }
}
