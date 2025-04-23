/**
 * PreloaderScene
 * Loads all assets defined in the configuration
 */
export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("PreloaderScene");
  }

  preload() {
    // Create loading bar
    this.createLoadingBar();

    // Get configuration from registry
    const config = this.registry.get("config");

    // Load all assets defined in the configuration
    if (config && config.assets) {
      // Load backgrounds
      if (config.assets.backgrounds) {
        config.assets.backgrounds.forEach((bg) => {
          this.load.image(bg.key, bg.path);
        });
      }

      // Load characters
      if (config.assets.characters) {
        config.assets.characters.forEach((char) => {
          this.load.image(char.key, char.path);
        });
      }

      // Load UI elements
      if (config.assets.ui) {
        config.assets.ui.forEach((ui) => {
          this.load.image(ui.key, ui.path);
        });
      }

      // Load audio
      if (config.assets.audio) {
        // Load background music
        if (config.assets.audio.bgm) {
          config.assets.audio.bgm.forEach((bgm) => {
            this.load.audio(bgm.key, bgm.path);
          });
        }

        // Load sound effects
        if (config.assets.audio.sfx) {
          config.assets.audio.sfx.forEach((sfx) => {
            this.load.audio(sfx.key, sfx.path);
          });
        }
      }
    }
  }

  create() {
    // Get the initial scene from configuration
    const config = this.registry.get("config");
    const initialScene = config?.gameSettings?.initialScene || "MainMenuScene";

    // Start the initial scene
    this.scene.start(initialScene);
  }

  createLoadingBar() {
    // Loading background
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingBg = this.add.image(width / 2, height / 2, "loading-bg");

    // Adjust size if needed
    loadingBg.setDisplaySize(400, 30);

    // Create progress bar
    const loadingBar = this.add.sprite(
      width / 2 - 190, // Left edge of the loading bg
      height / 2,
      "loading-bar"
    );

    // Set origin to left
    loadingBar.setOrigin(0, 0.5);

    // Initially scale to 0
    loadingBar.setScale(0, 1);

    // Set display width to match loading background
    loadingBar.setDisplaySize(380, 20);

    // Listen to the progress event
    this.load.on("progress", (value) => {
      // Scale the loading bar based on the progress value (0 to 1)
      loadingBar.setScale(value, 1);
    });

    // Clean up when loading completes
    this.load.on("complete", () => {
      loadingBar.destroy();
      loadingBg.destroy();
    });
  }
}
