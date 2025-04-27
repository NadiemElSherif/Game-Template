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
    this.load.image("loading-bg", "assets/images/ui/loading-bg.png");
    this.load.image("loading-bar-bg", "assets/images/ui/loading-bar-bg.png");

    // Load the configuration file
    this.load.json("story-config", "assets/config/story.json");
  }

  create() {
    // Get the configuration from the cache
    const config = this.cache.json.get("story-config");

    // Log the configuration
    console.log("Story Configuration:", config);

    // Store the loaded configuration in the game's registry for access by all scenes
    this.registry.set("config", config);

    // Apply game settings from config
    if (config && config.gameSettings) {
      const gameSettings = config.gameSettings;

      // Update the game size based on config
      if (gameSettings.width && gameSettings.height) {
        this.scale.resize(gameSettings.width, gameSettings.height);
      }

      // Add background if specified in config
      if (gameSettings.bootScene && gameSettings.bootScene.background) {
        const bg = this.add.image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          gameSettings.bootScene.background
        );
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
      }
    }

    // Move to the preloader scene
    this.scene.start("PreloaderScene");
  }
}
