/**
 * AudioManager
 * Handles background music and sound effects
 */
export class AudioManager {
  /**
   * Create a new AudioManager
   * @param {Phaser.Scene} scene - The scene this manager belongs to
   */
  constructor(scene) {
    this.scene = scene;
    this.currentBGM = null;
    this.config = scene.registry.get("config");
    this.defaultSettings = this.config.gameSettings.defaultAudio || {
      bgm: null,
      volume: 0.7,
      fadeTime: 1000,
    };
  }

  /**
   * Play background music
   * @param {string} key - The asset key of the music to play
   * @param {Object} settings - Optional settings for the music
   * @param {number} settings.volume - Volume level (0.0 to 1.0)
   * @param {number} settings.fadeTime - Fade time in milliseconds
   */
  playBGM(key, settings = {}) {
    // If key is null or 'none', stop music
    if (!key || key === "none") {
      this.stopBGM(settings.fadeTime || this.defaultSettings.fadeTime);
      return;
    }

    // If already playing this track, just adjust volume if needed
    if (this.currentBGM && this.currentBGM.key === key) {
      if (settings.volume !== undefined) {
        this.currentBGM.setVolume(settings.volume);
      }
      return;
    }

    // Stop current BGM if playing
    this.stopBGM(settings.fadeTime || this.defaultSettings.fadeTime);

    // Set up volume and fade
    const volume =
      settings.volume !== undefined
        ? settings.volume
        : this.defaultSettings.volume;
    const fadeTime =
      settings.fadeTime !== undefined
        ? settings.fadeTime
        : this.defaultSettings.fadeTime;

    // Play new BGM
    this.currentBGM = this.scene.sound.add(key, {
      volume: 0,
      loop: true,
    });

    this.currentBGM.play();

    // Fade in
    if (fadeTime > 0) {
      this.scene.tweens.add({
        targets: this.currentBGM,
        volume: volume,
        duration: fadeTime,
      });
    } else {
      this.currentBGM.setVolume(volume);
    }
  }

  /**
   * Stop the currently playing background music
   * @param {number} fadeTime - Time to fade out in milliseconds
   */
  stopBGM(fadeTime = 1000) {
    if (!this.currentBGM) return;

    if (fadeTime > 0) {
      // Fade out
      this.scene.tweens.add({
        targets: this.currentBGM,
        volume: 0,
        duration: fadeTime,
        onComplete: () => {
          this.currentBGM.stop();
          this.currentBGM = null;
        },
      });
    } else {
      // Stop immediately
      this.currentBGM.stop();
      this.currentBGM = null;
    }
  }

  /**
   * Play a sound effect
   * @param {string} key - The asset key of the sound to play
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  playSFX(key, volume = 1) {
    if (!key) return;
    this.scene.sound.play(key, { volume });
  }

  /**
   * Get audio configuration from scene, page, or defaults
   * @param {Object} sceneAudio - The scene's audio configuration
   * @param {Object} pageAudio - The page's audio configuration
   * @returns {Object} - The merged audio configuration
   */
  getAudioConfig(sceneAudio, pageAudio) {
    // Start with default settings
    const audioConfig = { ...this.defaultSettings };

    // Apply scene-level settings if available
    if (sceneAudio) {
      if (sceneAudio.bgm) audioConfig.bgm = sceneAudio.bgm;
      if (sceneAudio.volume !== undefined)
        audioConfig.volume = sceneAudio.volume;
      if (sceneAudio.fadeTime !== undefined)
        audioConfig.fadeTime = sceneAudio.fadeTime;
    }

    // Apply page-level settings if available (overrides scene settings)
    if (pageAudio) {
      if (pageAudio.bgm) audioConfig.bgm = pageAudio.bgm;
      if (pageAudio.volume !== undefined) audioConfig.volume = pageAudio.volume;
      if (pageAudio.fadeTime !== undefined)
        audioConfig.fadeTime = pageAudio.fadeTime;
    }

    return audioConfig;
  }
}
