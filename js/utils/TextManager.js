/**
 * TextManager
 * Handles text formatting and display
 */
export class TextManager {
  /**
   * Create a new TextManager
   * @param {Phaser.Scene} scene - The scene this manager belongs to
   * @param {Object} textBoxConfig - Configuration for the text box
   */
  constructor(scene, textBoxConfig) {
    this.scene = scene;
    this.config = textBoxConfig;
    this.textObject = null;

    // Get global settings from the registry
    const gameConfig = scene.registry.get("config").gameSettings;

    // Configure text style based on game settings
    this.textStyle = {
      fontFamily: gameConfig.defaultFont || "Arial",
      fontSize: gameConfig.defaultFontSize || 16,
      fill: gameConfig.defaultTextColor || "#ffffff",
      wordWrap: {
        width: textBoxConfig.width - textBoxConfig.padding * 2,
      },
      lineSpacing: 6,
    };
  }

  /**
   * Display text in the text box
   * @param {string} text - The text to display
   */
  displayText(text) {
    // Remove existing text if any
    if (this.textObject) {
      this.textObject.destroy();
    }

    // Process text for formatting (bold, etc.)
    const formattedText = this.formatText(text);

    // Create new text object
    this.textObject = this.scene.add.text(
      this.config.x + this.config.padding,
      this.config.y + this.config.padding,
      formattedText,
      this.textStyle
    );

    return this.textObject;
  }

  /**
   * Format text with bold styling
   * @param {string} text - The text to format
   * @returns {string} - The formatted text
   */
  formatText(text) {
    if (!text) return "";

    // Replace markdown-style bold with HTML-style bold for Phaser Text
    // This is a simplified approach - in a real implementation you'd use
    // Phaser's built-in text formatting with setTextStyle

    // First, escape any existing HTML tags
    let processedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Then convert **text** to <b>text</b>
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    return processedText;
  }

  /**
   * Display multiple pages of text
   * @param {Array} contentArray - Array of text strings, one per page
   * @param {number} currentPage - The current page index
   */
  displayPage(contentArray, currentPage) {
    if (
      !contentArray ||
      !contentArray.length ||
      currentPage >= contentArray.length
    ) {
      return null;
    }

    return this.displayText(contentArray[currentPage]);
  }
}
