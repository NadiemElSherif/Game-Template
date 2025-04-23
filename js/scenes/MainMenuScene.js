import { AudioManager } from "../utils/AudioManager.js";

/**
 * MainMenuScene
 * The main menu for the visual novel
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
    this.audioManager = null;
  }

  create() {
    // Get configuration for this scene
    const config = this.registry.get("config");
    const sceneConfig = config.scenes.mainMenu;

    // Initialize audio manager
    this.audioManager = new AudioManager(this);

    // Create background
    this.createBackground(sceneConfig, config.gameSettings);

    // Create title if configured
    if (sceneConfig.title) {
      this.createTitle(sceneConfig.title, config.gameSettings);
    }

    // Create start button
    this.createButton(sceneConfig.button, config.gameSettings);

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
   * Create the title text
   * @param {Object} titleConfig - The title configuration
   * @param {Object} gameSettings - The global game settings
   */
  createTitle(titleConfig, gameSettings) {
    if (!titleConfig.text) return;

    // Set default values if not specified
    const x =
      titleConfig.x || gameSettings.width / 2 || this.cameras.main.width / 2;
    const y = titleConfig.y || 150;
    const fontSize =
      titleConfig.fontSize || gameSettings.defaultFontSize * 2 || 32;
    const fontFamily =
      titleConfig.fontFamily || gameSettings.defaultFont || "Arial";
    const color =
      titleConfig.color || gameSettings.defaultTextColor || "#ffffff";

    // Create the title text
    const title = this.add
      .text(x, y, titleConfig.text, {
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: color,
        align: "center",
      })
      .setOrigin(0.5);

    // Add simple animation if not disabled
    if (titleConfig.animate !== false) {
      this.tweens.add({
        targets: title,
        y: y + 10,
        duration: 2000,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return title;
  }

  /**
   * Create the start button
   * @param {Object} buttonConfig - The button configuration
   * @param {Object} gameSettings - The global game settings
   */
  createButton(buttonConfig, gameSettings) {
    if (!buttonConfig) return;

    const x =
      buttonConfig.x || gameSettings.width / 2 || this.cameras.main.width / 2;
    const y = buttonConfig.y || 350;

    // Create the button sprite
    const button = this.add
      .sprite(x, y, buttonConfig.image)
      .setInteractive({ useHandCursor: true });

    // Add button text if specified
    let buttonText = null;
    if (buttonConfig.text) {
      buttonText = this.add
        .text(x, y, buttonConfig.text, {
          fontFamily: gameSettings.defaultFont || "Arial",
          fontSize: gameSettings.defaultFontSize || 16,
          color: gameSettings.defaultTextColor || "#ffffff",
        })
        .setOrigin(0.5);
    }

    // Add button interactions
    button.on("pointerdown", () => {
      // Play sound effect if specified
      if (buttonConfig.sfx) {
        this.audioManager.playSFX(buttonConfig.sfx);
      }

      // Start the next scene
      if (buttonConfig.nextScene) {
        this.scene.start(buttonConfig.nextScene);
      }
    });

    // Add hover effect
    button.on("pointerover", () => {
      button.setScale(1.1);
      if (buttonText) buttonText.setScale(1.1);
    });

    button.on("pointerout", () => {
      button.setScale(1);
      if (buttonText) buttonText.setScale(1);
    });

    return button;
  }
}
