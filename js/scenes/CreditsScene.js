import { AudioManager } from "../utils/AudioManager.js";

/**
 * CreditsScene
 * A scene for displaying scrolling credits
 */
export class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
    this.audioManager = null;
    this.creditsText = null;
    this.isScrollComplete = false;
  }

  create() {
    // Get configuration for this scene
    const config = this.registry.get("config");
    const nextSceneKey = this.registry.get("nextSceneKey");
    const sceneConfig = config.scenes[nextSceneKey || this.scene.key];

    // Initialize audio manager
    this.audioManager = new AudioManager(this);

    // Create background
    this.createBackground(sceneConfig, config.gameSettings);

    // Create credits text
    this.createCreditsText(config, sceneConfig, config.gameSettings);

    // Play background music if configured
    if (sceneConfig.audio && sceneConfig.audio.bgm) {
      this.audioManager.playBGM(sceneConfig.audio.bgm, {
        volume: sceneConfig.audio.volume,
        fadeTime: sceneConfig.audio.fadeTime,
      });
    } else if (
      config.gameSettings.defaultAudio &&
      config.gameSettings.defaultAudio.bgm
    ) {
      // Otherwise use default background music
      this.audioManager.playBGM(
        config.gameSettings.defaultAudio.bgm,
        config.gameSettings.defaultAudio
      );
    }
  }

  /**
   * Create the background image
   * @param {Object} sceneConfig - The scene configuration
   * @param {Object} gameSettings - The global game settings
   */
  createBackground(sceneConfig, gameSettings) {
    if (!sceneConfig.background) return;

    const bg = this.add
      .image(0, 0, sceneConfig.background)
      .setOrigin(0)
      .setDisplaySize(
        gameSettings.width || this.cameras.main.width,
        gameSettings.height || this.cameras.main.height
      );

    return bg;
  }

  /**
   * Create the scrolling credits text
   * @param {Object} sceneConfig - The scene configuration
   * @param {Object} gameSettings - The global game settings
   */
  createCreditsText(config, sceneConfig, gameSettings) {
    if (!sceneConfig.content) return;

    // Get display dimensions
    const width = gameSettings.width || this.cameras.main.width;
    const height = gameSettings.height || this.cameras.main.height;

    // Configure text style
    const textStyle = {
      fontFamily:
        sceneConfig.textStyle?.fontFamily ||
        gameSettings.defaultFont ||
        "Arial",
      fontSize:
        sceneConfig.textStyle?.fontSize || gameSettings.defaultFontSize || 16,
      color:
        sceneConfig.textStyle?.color ||
        gameSettings.defaultTextColor ||
        "#ffffff",
      align: sceneConfig.textStyle?.align || "center",
      lineSpacing: 10,
    };

    // Create the text
    this.creditsText = this.add
      .text(
        width / 2,
        height + 5, // Start below the screen
        sceneConfig.content,
        textStyle
      )
      .setOrigin(0.5, 0);

    // Configure scroll speed
    const scrollSpeed = sceneConfig.scrollSpeed || 1;

    // Start scrolling animation
    this.tweens.add({
      targets: this.creditsText,
      y: -this.creditsText.height, // Scroll until text is completely off the top
      duration: ((height + this.creditsText.height) / scrollSpeed) * 1000, // Convert to milliseconds
      ease: "Linear",
      onComplete: () => {
        this.isScrollComplete = true;
        this.handleExitBehavior(config, sceneConfig.exitBehavior);
      },
    });
  }

  /**
   * Handle what happens when the credits finish scrolling
   * @param {Object} exitBehavior - The exit behavior configuration
   */
  handleExitBehavior(config, exitBehavior) {
    if (!exitBehavior) return;

    // Wait for the specified delay
    const delay = exitBehavior.delay || 0;

    this.time.delayedCall(delay, () => {
      if (exitBehavior.action === "transition" && exitBehavior.targetScene) {
        // Store the next scene key in registry
        this.registry.set("nextSceneKey", exitBehavior.targetScene);
        this.scene.start(config?.scenes[exitBehavior.targetScene].type);
        // Transition to the target scene
      } else if (exitBehavior.action === "exit") {
        // Exit the game (restart at main menu)

        this.registry.set("nextSceneKey", "MainMenuScene");
        this.scene.start("MainMenuScene");
      }
    });
  }

  update() {
    // Skip credits if space or enter is pressed
    const keyboard = this.input.keyboard;
    if (keyboard && !this.isScrollComplete) {
      if (keyboard.addKey("SPACE").isDown || keyboard.addKey("ENTER").isDown) {
        // Stop current tween
        this.tweens.killTweensOf(this.creditsText);

        // Set as complete
        this.isScrollComplete = true;

        // Get configuration
        const config = this.registry.get("config");
        const sceneConfig = config.scenes[this.scene.key];

        // Handle exit
        this.handleExitBehavior(config, sceneConfig.exitBehavior);
      }
    }
  }
}
