import { AudioManager } from "../utils/AudioManager.js";
import { TextManager } from "../utils/TextManager.js";
import { CharacterManager } from "../utils/CharacterManager.js";

/**
 * DialogueScene
 * The main storytelling scene with character displays and dialogue text
 */
export class DialogueScene extends Phaser.Scene {
  constructor() {
    super("DialogueScene");
    this.audioManager = null;
    this.textManager = null;
    this.characterManager = null;
    this.currentPageId = null;
    this.pages = null;
    this.topBackground = null;
    this.nextButton = null;
  }

  init(data) {
    // If coming from another scene, we might receive a specific page to start with
    this.currentPageId = data.pageId || null;
  }

  create() {
    // Get configuration
    const config = this.registry.get("config");
    const nextSceneKey = this.registry.get("nextSceneKey");
    const sceneConfig = config.scenes[nextSceneKey || this.scene.key];

    // Store pages for easy access
    this.pages = sceneConfig.pages || [];

    // Create global background
    this.createBackground(sceneConfig.globalBackground, config.gameSettings);

    // Create text box
    this.createTextBox(sceneConfig.textBox);

    // Initialize managers
    this.audioManager = new AudioManager(this);
    this.textManager = new TextManager(this, sceneConfig.textBox);
    this.characterManager = new CharacterManager(
      this,
      config.characters,
      sceneConfig.textBox.y
    );

    // Create next button
    this.nextButton = this.createButton(config, sceneConfig.button);

    // Set initial page if not specified
    if (!this.currentPageId && this.pages.length > 0) {
      this.currentPageId = this.pages[0].pageId;
    }

    // Play scene-level music if configured
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

    // Display the current page
    this.displayPage(this.currentPageId);
  }

  /**
   * Create the background image
   * @param {string} backgroundKey - The asset key for the background
   * @param {Object} gameSettings - The global game settings
   */
  createBackground(backgroundKey, gameSettings) {
    if (!backgroundKey) return null;

    const bg = this.add
      .image(0, 0, backgroundKey)
      .setOrigin(0)
      .setDisplaySize(
        gameSettings.width || this.cameras.main.width,
        gameSettings.height || this.cameras.main.height
      );

    return bg;
  }

  /**
   * Create the text box
   * @param {Object} textBoxConfig - The text box configuration
   */
  createTextBox(textBoxConfig) {
    if (!textBoxConfig) return null;

    // Create text box background
    const textBox = this.add
      .image(textBoxConfig.x, textBoxConfig.y, textBoxConfig.background)
      .setOrigin(0);

    // Scale to desired dimensions
    if (textBoxConfig.width && textBoxConfig.height) {
      textBox.setDisplaySize(textBoxConfig.width, textBoxConfig.height);
    }

    return textBox;
  }

  /**
   * Create the next button
   * @param {Object} buttonConfig - The button configuration
   */
  createButton(config, buttonConfig) {
    if (!buttonConfig) return null;

    // Create the button sprite
    const button = this.add
      .sprite(buttonConfig.x, buttonConfig.y, buttonConfig.image)
      .setInteractive({ useHandCursor: true });

    // Add button text if specified
    let buttonText = null;
    if (buttonConfig.text) {
      buttonText = this.add
        .text(buttonConfig.x, buttonConfig.y, buttonConfig.text, {
          fontFamily: "Arial",
          fontSize: 16,
          color: "#ffffff",
        })
        .setOrigin(0.5);
    }

    // Add button interactions
    button.on("pointerdown", () => {
      // Play sound effect if specified
      if (buttonConfig.sfx) {
        this.audioManager.playSFX(buttonConfig.sfx);
      }

      // Handle the next action
      this.handleNextAction(config);
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
   * Display the page with the given ID
   * @param {string} pageId - The ID of the page to display
   */
  displayPage(pageId) {
    // Find the page with matching ID
    const page = this.pages.find((p) => p.pageId === pageId);

    if (!page) {
      console.error(`Page with ID ${pageId} not found!`);
      return;
    }

    // Update the current page ID
    this.currentPageId = pageId;

    // Update top background if specified
    this.updateTopBackground(page.backgroundTop);

    // Update characters
    this.characterManager.displayCharacters(page.characters);

    // Update text
    this.textManager.displayText(page.text);

    // Update audio if specified for this page
    if (page.audio && page.audio.bgm) {
      this.audioManager.playBGM(page.audio.bgm, {
        volume: page.audio.volume,
        fadeTime: page.audio.fadeTime,
      });
    }
  }

  /**
   * Update the top background image
   * @param {string} backgroundKey - The asset key for the background
   */
  updateTopBackground(backgroundKey) {
    // If there's already a top background, remove it
    if (this.topBackground) {
      this.topBackground.destroy();
      this.topBackground = null;
    }

    // If no new background specified, we're done
    if (!backgroundKey) return;

    // Get game settings
    const gameSettings = this.registry.get("config").gameSettings;

    // Create new top background
    this.topBackground = this.createBackground(backgroundKey, gameSettings);

    // Ensure it's on top of the global background but below characters
    this.topBackground.depth = 1;
  }

  /**
   * Handle what happens when the next button is clicked
   */
  handleNextAction(config) {
    // Find the current page
    const page = this.pages.find((p) => p.pageId === this.currentPageId);

    if (!page || !page.nextAction) {
      return;
    }

    const action = page.nextAction;

    if (action.type === "update") {
      // Stay in same scene, just update to new page
      this.displayPage(action.nextPageId);
    } else if (action.type === "transition") {
      // Store the next scene key in registry
      this.registry.set("nextSceneKey", action.targetScene);
      this.scene.start(config?.scenes[action.targetScene].type);
    }
  }
}
