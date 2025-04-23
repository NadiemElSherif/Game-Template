/**
 * CharacterManager
 * Manages character positioning and display
 */
export class CharacterManager {
  /**
   * Create a new CharacterManager
   * @param {Phaser.Scene} scene - The scene this manager belongs to
   * @param {Object} characterSettings - Global character settings
   * @param {number} textBoxY - The Y position of the text box
   */
  constructor(scene, characterSettings, textBoxY) {
    this.scene = scene;
    this.settings = characterSettings;
    this.textBoxY = textBoxY;
    this.characterSprites = []; // Keep track of currently displayed characters

    // Default positions if not specified in settings
    this.positions = {
      left: this.settings?.positions?.left || 200,
      right: this.settings?.positions?.right || 600,
    };

    // Default offset and max height
    this.yOffset = this.settings?.yOffset || 50;
    this.maxHeight = this.settings?.maxHeight || 350;
  }

  /**
   * Display characters based on the configuration
   * @param {Array} characters - Array of character objects to display
   */
  displayCharacters(characters) {
    // Clear existing characters
    this.clearCharacters();

    // If no characters to display, return
    if (!characters || !characters.length) return;

    // Calculate Y position for characters
    const characterY = this.textBoxY - this.yOffset;

    // Create sprites for each character
    characters.forEach((character) => {
      // Skip if no image key
      if (!character.image) return;

      // Get X position based on left/right setting
      let x =
        character.position === "right"
          ? this.positions.right
          : this.positions.left;

      // Create the character sprite
      const sprite = this.scene.add.image(x, characterY, character.image);

      // Set origin to bottom center for better positioning
      sprite.setOrigin(0.5, 1);

      // Scale to fit max height while maintaining aspect ratio
      this.scaleToMaxHeight(sprite, this.maxHeight);

      // Add to tracking array
      this.characterSprites.push(sprite);
    });
  }

  /**
   * Clear all displayed characters
   */
  clearCharacters() {
    // Destroy all character sprites
    this.characterSprites.forEach((sprite) => {
      sprite.destroy();
    });

    // Reset the tracking array
    this.characterSprites = [];
  }

  /**
   * Scale a sprite to fit the maximum height while maintaining aspect ratio
   * @param {Phaser.GameObjects.Image} sprite - The sprite to scale
   * @param {number} maxHeight - The maximum height
   */
  scaleToMaxHeight(sprite, maxHeight) {
    // Skip if sprite isn't valid
    if (!sprite || !sprite.height) return;

    // If sprite is already shorter than max height, no scaling needed
    if (sprite.height <= maxHeight) return;

    // Calculate scale factor
    const scale = maxHeight / sprite.height;

    // Apply the scale
    sprite.setScale(scale);
  }
}
