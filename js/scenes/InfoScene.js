import { AudioManager } from "../utils/AudioManager.js";
import { TextManager } from "../utils/TextManager.js";

/**
 * InfoScene
 * A scene for displaying information with a text area and a next button
 */
export class InfoScene extends Phaser.Scene {
  constructor() {
    super("InfoScene");
    this.audioManager = null;
    this.textManager = null;
    this.currentPage = 0;
    this.textContent = [];
  }

  init(data) {
    // Reset current page when scene starts
    this.currentPage = 0;

    // If starting page is specified in data, use it
    if (data && data.startPage !== undefined) {
      this.currentPage = data.startPage;
    }
  }

  create() {
    // Get configuration for this scene
    const config = this.registry.get("config");
    const nextSceneKey = this.registry.get("nextSceneKey");
    const sceneConfig = config.scenes[nextSceneKey || this.scene.key];

    // Initialize managers
    this.audioManager = new AudioManager(this);

    // Create background
    this.createBackground(sceneConfig, config.gameSettings);

    // Create text area
    this.createTextArea(sceneConfig.textArea, config.gameSettings);

    // Store content array for paging
    this.textContent = sceneConfig.textArea.content || [];

    // Create text manager for the text area
    this.textManager = new TextManager(this, {
      x: sceneConfig.textArea.x,
      y: sceneConfig.textArea.y,
      width: sceneConfig.textArea.width,
      height: sceneConfig.textArea.height,
      padding: sceneConfig.textArea.padding || 20,
    });

    // Display the first page of text
    this.displayCurrentPage();

    // Create next button
    this.createButton(config, sceneConfig.button, config.gameSettings);

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
    if (!sceneConfig?.background) return;

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
   * Create the text area
   * @param {Object} textAreaConfig - The text area configuration
   * @param {Object} gameSettings - The global game settings
   */
  createTextArea(textAreaConfig, gameSettings) {
    if (!textAreaConfig) return;

    // Create a background rectangle for the text area
    const textBg = this.add
      .rectangle(
        textAreaConfig.x,
        textAreaConfig.y,
        textAreaConfig.width,
        textAreaConfig.height,
        Phaser.Display.Color.ValueToColor(
          textAreaConfig.backgroundColor || "rgba(0, 0, 0, 0.7)"
        ).color
      )
      .setOrigin(0);

    return textBg;
  }

  /**
   * Display the current page of text
   */
  displayCurrentPage() {
    this.textManager.displayPage(this.textContent, this.currentPage);
  }

  /**
   * Create the next button
   * @param {Object} buttonConfig - The button configuration
   * @param {Object} gameSettings - The global game settings
   */
  createButton(config, buttonConfig, gameSettings) {
    if (!buttonConfig) return;

    const x =
      buttonConfig.x ||
      gameSettings.width - 100 ||
      this.cameras.main.width - 100;
    const y =
      buttonConfig.y ||
      gameSettings.height - 50 ||
      this.cameras.main.height - 50;

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

      // Handle next page or scene transition
      this.handleNextAction(config, buttonConfig);
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

  /**
   * Handle what happens when the next button is clicked
   * @param {Object} buttonConfig - The button configuration
   */
  handleNextAction(config, buttonConfig) {
    // Check if there are more pages to display
    if (this.currentPage < this.textContent.length - 1) {
      // Go to next page
      this.currentPage++;
      this.displayCurrentPage();
    } else {
      // No more pages, transition to next scene
      if (buttonConfig.nextScene) {
        // Store the next scene key in registry
        this.registry.set("nextSceneKey", buttonConfig.nextScene);
        this.scene.start(config?.scenes[buttonConfig.nextScene].type);
      }
    }
  }
}
