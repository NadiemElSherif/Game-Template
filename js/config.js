import { BootScene } from "./scenes/BootScene.js";
import { PreloaderScene } from "./scenes/PreloaderScene.js";
import { MainMenuScene } from "./scenes/MainMenuScene.js";
import { InfoScene } from "./scenes/InfoScene.js";
import { DialogueScene } from "./scenes/DialogueScene.js";
import { CreditsScene } from "./scenes/CreditsScene.js";

// Default game configuration
// This will be overridden by the configuration loaded from JSON
export const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  scene: [
    BootScene,
    PreloaderScene,
    MainMenuScene,
    InfoScene,
    DialogueScene,
    CreditsScene,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  audio: {
    disableWebAudio: true,
  },
};
