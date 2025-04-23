/**
 * ConfigLoader class
 * Handles loading and accessing the JSON configuration
 */
export class ConfigLoader {
  constructor() {
    this.config = null;
  }

  /**
   * Load the configuration file from the specified path
   * @param {string} path - Path to the configuration file
   * @returns {Promise<Object>} - The loaded configuration
   */
  async loadConfig(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error("Error loading configuration:", error);
      return null;
    }
  }

  /**
   * Get the configuration for a specific scene
   * @param {string} sceneKey - The scene key to get configuration for
   * @returns {Object|null} - The scene configuration or null if not found
   */
  getSceneConfig(sceneKey) {
    if (!this.config || !this.config.scenes || !this.config.scenes[sceneKey]) {
      return null;
    }
    return this.config.scenes[sceneKey];
  }

  /**
   * Get the global game settings
   * @returns {Object} - The game settings
   */
  getGlobalSettings() {
    return this.config?.gameSettings || {};
  }

  /**
   * Get the character settings
   * @returns {Object} - The character settings
   */
  getCharacterSettings() {
    return this.config?.characters || {};
  }

  /**
   * Get the asset definitions
   * @returns {Object} - The asset definitions
   */
  getAssets() {
    return this.config?.assets || {};
  }

  /**
   * Get the global audio settings
   * @returns {Object} - The global audio settings
   */
  getDefaultAudio() {
    return (
      this.config?.gameSettings?.defaultAudio || {
        bgm: null,
        volume: 0.7,
        fadeTime: 1000,
      }
    );
  }
}
