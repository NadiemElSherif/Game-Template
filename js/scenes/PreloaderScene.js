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

    this.registry.set("nextSceneKey", config?.gameSettings?.initialScene);
    // Start the initial scene
    this.scene.start(config?.scenes[config?.gameSettings?.initialScene].type);
  }

  createLoadingBar() {
    // Loading background
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const gameSettings = this.registry.get("config")?.gameSettings;
    if (!gameSettings) {
      console.error("Game settings not found in registry.");
      return;
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

    const loadingBg = this.add.image(width / 2, height / 2, "loading-bar-bg");

    loadingBg.setDisplaySize(400, 30);

    // Create progress bar using graphics
    const loadingBar = this.add.graphics();
    loadingBar.x = width / 2 - 190;
    loadingBar.y = height / 2 - 10; // Center vertically

    // Initially draw empty bar
    loadingBar.fillStyle(0x000000, 0);
    loadingBar.fillRect(0, 0, 380, 20);

    // Listen to the progress event
    this.load.on("progress", (value) => {
      // Clear previous drawing
      loadingBar.clear();

      // Draw the progress bar
      loadingBar.fillStyle(0x8b4513); // Dark brown color
      loadingBar.fillRect(0, 0, 380 * value, 20);
    });

    // Clean up when loading completes
    this.load.on("complete", () => {
      loadingBar.destroy();
      loadingBg.destroy();
    });
  }
}
