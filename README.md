# Phaser 3 Visual Storytelling Engine

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A configurable template for creating visual novel experiences with Phaser 3. Designed for beginners with minimal programming experience who want to create interactive stories primarily through configuration rather than coding.

## 📚 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Configuration Guide](#configuration-guide)
  - [Game Settings](#game-settings)
  - [Characters](#characters)
  - [Scenes](#scenes)
  - [Assets](#assets)
- [Scene Types](#scene-types)
  - [Main Menu Scene](#main-menu-scene)
  - [Info Scene](#info-scene)
  - [Dialogue Scene](#dialogue-scene)
  - [Credits Scene](#credits-scene)
- [Audio System](#audio-system)
- [Adding Your Own Content](#adding-your-own-content)
  - [Adding Images](#adding-images)
  - [Adding Audio](#adding-audio)
  - [Creating Your Story](#creating-your-story)
- [Text Formatting](#text-formatting)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🌟 Introduction

The Phaser 3 Visual Storytelling Engine is a template designed to help beginners create interactive visual novel experiences without writing code. The engine uses Phaser 3, a powerful HTML5 game framework, but abstracts away the programming complexity through a JSON configuration system.

By editing a single JSON file and adding your own images and sounds, you can create a complete visual novel with:

- Character dialogues with expressions
- Scene transitions
- Background music and sound effects
- Text formatting
- Multiple scene types for different storytelling needs

This template is particularly suitable for educational environments where students want to focus on storytelling rather than programming.

## ✨ Features

- **No-code storytelling**: Create visual novels by editing JSON configuration
- **Multiple scene types**: Main menu, information screens, dialogue scenes, and credits
- **Character system**: Display character sprites with different expressions and positions
- **Audio system**: Background music and sound effects with smooth transitions
- **Text formatting**: Support for bold text in dialogues
- **Branching narrative**: Create branched stories through page navigation
- **Responsive design**: Scales to fit different screen sizes

## 🚀 Getting Started

### Prerequisites

- Basic understanding of JSON syntax
- A text editor (VS Code, Sublime Text, Notepad++, etc.)
- A local web server (see installation for options)

### Installation

1. **Download the template**

   Download or clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/phaser-visual-storytelling.git
   cd phaser-visual-storytelling
   ```

2. **Set up a local web server**

   The simplest way is to use Python's built-in HTTP server:

   ```bash
   # If you have Python installed
   python -m http.server
   ```

   Alternatively, you can use:

   - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code
   - [XAMPP](https://www.apachefriends.org/index.html)
   - [Node.js http-server](https://www.npmjs.com/package/http-server)

### Running Locally

1. Start your local web server in the project directory
2. Open your browser and navigate to `http://localhost:8000` (or the port your server is using)
3. You should see the demo visual novel running with the example story

## 📁 Project Structure

```
phaser-visual-novel/
│
├── index.html                 # Main HTML entry point
├── assets/                    # All game assets
│   ├── images/
│   │   ├── backgrounds/       # Background images for scenes
│   │   ├── characters/        # Character sprites
│   │   └── ui/                # UI elements like buttons and text boxes
│   ├── audio/
│   │   ├── music/             # Background music tracks
│   │   └── sfx/               # Sound effects
│   └── config/
│       └── story.json         # Main story configuration
│
├── js/                        # JavaScript source files
│   ├── main.js                # Game initialization
│   ├── config.js              # Phaser configuration
│   ├── loader.js              # Configuration and JSON loader
│   │
│   ├── scenes/                # Scene classes
│   │   ├── BootScene.js       # Initial loading screen
│   │   ├── PreloaderScene.js  # Asset loading scene
│   │   ├── MainMenuScene.js   # Main menu implementation
│   │   ├── InfoScene.js       # Information scene implementation
│   │   ├── DialogueScene.js   # Dialogue scene implementation
│   │   └── CreditsScene.js    # Credits scene implementation
│   │
│   └── utils/                 # Helper utilities
│       ├── AudioManager.js    # Handles music and sound effects
│       ├── TextManager.js     # Handles text formatting and display
│       └── CharacterManager.js # Manages character positioning
│
└── lib/                       # Third-party libraries
    └── phaser.min.js          # Phaser library
```

## 📝 Configuration Guide

The entire visual novel is driven by the configuration in `assets/config/story.json`. This section explains how to customize each part of the configuration.

### Game Settings

The `gameSettings` object defines global parameters for your visual novel.

```json
"gameSettings": {
  "width": 800,
  "height": 600,
  "defaultFont": "Arial",
  "defaultFontSize": 18,
  "defaultTextColor": "#ffffff",
  "initialScene": "mainMenu",
  "defaultAudio": {
    "bgm": "main_theme",
    "volume": 0.7,
    "fadeTime": 1000
  }
}
```

| Property                | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `width`                 | Game canvas width in pixels                            |
| `height`                | Game canvas height in pixels                           |
| `defaultFont`           | Default font family for text                           |
| `defaultFontSize`       | Default font size in pixels                            |
| `defaultTextColor`      | Default text color (CSS color string)                  |
| `initialScene`          | Key of the first scene to load when the game starts    |
| `defaultAudio.bgm`      | Default background music track key                     |
| `defaultAudio.volume`   | Default music volume (0.0 to 1.0)                      |
| `defaultAudio.fadeTime` | Default fade time in milliseconds when changing tracks |

### Characters

The `characters` object defines layout parameters for characters in dialogue scenes.

```json
"characters": {
  "positions": {
    "left": 200,
    "right": 600
  },
  "yOffset": 50,
  "maxHeight": 350
}
```

| Property          | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `positions.left`  | X-coordinate for characters positioned on the left     |
| `positions.right` | X-coordinate for characters positioned on the right    |
| `yOffset`         | Vertical offset in pixels from the top of the text box |
| `maxHeight`       | Maximum height for character images in pixels          |

### Scenes

The `scenes` object contains all the scene definitions for your visual novel. Each key in this object represents a unique scene that can be referenced in transitions.

```json
"scenes": {
  "mainMenu": {
    // Main menu scene configuration
  },
  "intro": {
    // Info scene configuration
  },
  "chapter1": {
    // Dialogue scene configuration
  }
}
```

The specific configuration for each scene type is described in the [Scene Types](#scene-types) section.

### Assets

The `assets` object defines all the assets that will be preloaded before the game starts.

```json
"assets": {
  "backgrounds": [
    {"key": "menu_bg", "path": "assets/images/backgrounds/menu.png"}
  ],
  "characters": [
    {"key": "hero_neutral", "path": "assets/images/characters/hero_neutral.png"}
  ],
  "ui": [
    {"key": "start_button", "path": "assets/images/ui/start_button.png"}
  ],
  "audio": {
    "bgm": [
      {"key": "main_theme", "path": "assets/audio/music/main_theme.mp3", "loop": true}
    ],
    "sfx": [
      {"key": "button_click", "path": "assets/audio/sfx/button_click.mp3"}
    ]
  }
}
```

| Asset Type    | Description             |
| ------------- | ----------------------- |
| `backgrounds` | Background image assets |
| `characters`  | Character image assets  |
| `ui`          | UI element image assets |
| `audio.bgm`   | Background music tracks |
| `audio.sfx`   | Sound effect assets     |

Each asset must have:

- `key`: A unique identifier used to reference the asset in scene configurations
- `path`: The file path to the asset, relative to the project root

## 🎭 Scene Types

The engine supports four scene types, each with its own configuration format:

### Main Menu Scene

The starting menu for your visual novel.

```json
"mainMenu": {
  "type": "MainMenuScene",
  "background": "menu_bg",
  "audio": {
    "bgm": "menu_theme",
    "volume": 0.6
  },
  "button": {
    "x": 400,
    "y": 350,
    "image": "start_button",
    "text": "Start Story",
    "sfx": "button_click",
    "nextScene": "intro"
  },
  "title": {
    "text": "Forest Adventures",
    "x": 400,
    "y": 200,
    "fontSize": 48,
    "fontFamily": "Georgia",
    "color": "#ffff00"
  }
}
```

Key properties:

- `background`: Asset key for the full-screen background image
- `audio`: Background music configuration
- `button`: Configuration for the start button (position, image, text, sound effect, and target scene)
- `title`: Configuration for the title text (text content, position, font, and color)

### Info Scene

An information display scene with text content.

```json
"intro": {
  "type": "InfoScene",
  "background": "intro_bg",
  "audio": {
    "bgm": "intro_theme",
    "volume": 0.5,
    "fadeTime": 2000
  },
  "textArea": {
    "x": 100,
    "y": 150,
    "width": 600,
    "height": 300,
    "padding": 20,
    "backgroundColor": "rgba(0, 0, 0, 0.7)",
    "content": [
      "Page 1 text here...",
      "Page 2 text here..."
    ]
  },
  "button": {
    "x": 650,
    "y": 500,
    "image": "next_button",
    "text": "Next",
    "sfx": "button_click",
    "nextScene": "chapter1"
  }
}
```

Key properties:

- `background`: Asset key for the full-screen background image
- `audio`: Background music configuration
- `textArea`: Configuration for the text display area (position, size, style, and content)
- `button`: Configuration for the next button

The `textArea.content` array contains multiple strings, each representing a separate page of content. The user can navigate through these pages using the next button.

### Dialogue Scene

The main storytelling scene with character displays and dialogue text.

```json
"chapter1": {
  "type": "DialogueScene",
  "globalBackground": "forest_edge_bg",
  "audio": {
    "bgm": "forest_ambient",
    "volume": 0.4
  },
  "textBox": {
    "background": "textbox_bg",
    "x": 50,
    "y": 400,
    "width": 700,
    "height": 150,
    "padding": 20
  },
  "button": {
    "x": 700,
    "y": 530,
    "image": "next_arrow",
    "sfx": "page_turn"
  },
  "pages": [
    {
      "pageId": "ch1_1",
      "backgroundTop": null,
      "audio": {
        "bgm": "mysterious_encounter",
        "volume": 0.6,
        "fadeTime": 3000
      },
      "characters": [
        {
          "image": "hero_neutral",
          "position": "left"
        }
      ],
      "text": "Dialogue text here. Use **asterisks** for bold text.",
      "nextAction": {
        "type": "update",
        "nextPageId": "ch1_2"
      }
    }
    // More pages...
  ]
}
```

Key properties:

- `globalBackground`: Asset key for the main background image
- `audio`: Default background music configuration for the scene
- `textBox`: Configuration for the dialogue text box (background, position, size, and padding)
- `button`: Configuration for the next button
- `pages`: Array of page objects, each representing a step in the story

Each page object contains:

- `pageId`: Unique identifier for this page
- `backgroundTop`: Asset key for an optional overlay background image
- `audio`: Page-specific background music (overrides scene-level music)
- `characters`: Array of character objects to display
- `text`: The dialogue or narrative text to display
- `nextAction`: Defines what happens when the user clicks "Next"

Character objects specify:

- `image`: Asset key for the character image
- `position`: "left" or "right" position

Next actions can be:

- `update` type: Navigate to another page within the same scene
- `transition` type: Navigate to a different scene

### Credits Scene

A scrolling credits display scene.

```json
"credits": {
  "type": "CreditsScene",
  "background": "credits_bg",
  "audio": {
    "bgm": "ending_theme",
    "volume": 0.7,
    "fadeTime": 3000
  },
  "content": "Credits text here...\n\nUse \\n for line breaks",
  "scrollSpeed": 1.2,
  "textStyle": {
    "fontFamily": "Georgia",
    "fontSize": 24,
    "color": "#ffffff",
    "align": "center"
  },
  "exitBehavior": {
    "action": "transition",
    "targetScene": "mainMenu",
    "delay": 2000
  }
}
```

Key properties:

- `background`: Asset key for the full-screen background image
- `audio`: Background music configuration
- `content`: Text content to display in the credits (use \n for line breaks)
- `scrollSpeed`: Speed at which the credits scroll upward (pixels per frame)
- `textStyle`: Text styling options
- `exitBehavior`: Defines what happens when the credits finish scrolling

## 🎵 Audio System

The audio system supports both background music and sound effects, with configuration options at multiple levels:

1. **Global level** in `gameSettings.defaultAudio`
2. **Scene level** in each scene's `audio` object
3. **Page level** within DialogueScene pages

The most specific level overrides more general settings. For example, page-level audio settings override scene-level settings.

Audio configuration:

```json
"audio": {
  "bgm": "track_name",    // Asset key of the music track
  "volume": 0.5,          // Volume level from 0.0 to 1.0
  "fadeTime": 2000        // Transition time in milliseconds
}
```

To include a sound effect when clicking a button, add the `sfx` property to the button configuration:

```json
"button": {
  "x": 400,
  "y": 300,
  "image": "button_image",
  "text": "Button Text",
  "sfx": "button_click",
  "nextScene": "next_scene"
}
```

## 🖼️ Adding Your Own Content

### Adding Images

1. **Prepare your images**

   - Recommended formats: PNG or JPEG
   - Background images should match or exceed your game's dimensions (e.g., 800x600)
   - Character images should have transparent backgrounds (PNG)
   - UI elements (buttons, text boxes) should also have transparency where needed

2. **Add image files**

   - Place background images in `assets/images/backgrounds/`
   - Place character images in `assets/images/characters/`
   - Place UI elements in `assets/images/ui/`

3. **Update the assets section** in `story.json`

   ```json
   "assets": {
     "backgrounds": [
       {"key": "my_background", "path": "assets/images/backgrounds/my_background.png"}
     ],
     "characters": [
       {"key": "my_character", "path": "assets/images/characters/my_character.png"}
     ],
     "ui": [
       {"key": "my_button", "path": "assets/images/ui/my_button.png"}
     ]
   }
   ```

4. **Reference your images** in scene configurations using the keys you defined

### Adding Audio

1. **Prepare your audio files**

   - Recommended format: MP3
   - Background music tracks should be suitable for looping
   - Sound effects should be short and clear

2. **Add audio files**

   - Place background music in `assets/audio/music/`
   - Place sound effects in `assets/audio/sfx/`

3. **Update the assets section** in `story.json`

   ```json
   "assets": {
     "audio": {
       "bgm": [
         {"key": "my_music", "path": "assets/audio/music/my_music.mp3", "loop": true}
       ],
       "sfx": [
         {"key": "my_sound", "path": "assets/audio/sfx/my_sound.mp3"}
       ]
     }
   }
   ```

4. **Reference your audio** in scene and button configurations using the keys you defined

### Creating Your Story

1. **Plan your story structure**

   - Sketch out the scenes and flow of your story
   - Plan character interactions and branching points

2. **Create the necessary assets**

   - Background images for each scene
   - Character sprites with different expressions
   - UI elements like buttons and text boxes

3. **Build your story in the JSON configuration**

   - Define each scene with appropriate type and content
   - Create dialogue pages with character interactions
   - Set up transitions between scenes

4. **Test frequently**
   - Run your visual novel often during development
   - Check transitions, audio, and text display

## 📝 Text Formatting

The engine supports simple text formatting in dialogue and info scenes:

- **Bold text**: Surround text with double asterisks: `**bold text**`
- **Line breaks**: Use "\n" in strings to create a line break, particularly useful in the Credits scene

Example:

```json
"text": "The **ancient forest** seems to whisper secrets.\nYou feel a chill in the air."
```

## 📚 Examples

The template includes a complete example story about a forest adventure. Use this as a reference for building your own visual novel.

Key scenes in the example:

- `mainMenu`: Title screen with start button
- `intro`: Text-based introduction to the story
- `chapter1`: Character dialogue scene with the hero and a mysterious guide
- `forest_info`: Information about the setting
- `chapter1_continued`: Continuation of the dialogue scene
- `credits`: Scrolling credits with attributions

## ❓ Troubleshooting

### Common Issues

**Images not displaying**

- Check that file paths in `story.json` match the actual location of your image files
- Ensure image keys are referenced correctly in scene configurations
- Verify file formats are supported (PNG, JPEG)

**Audio not playing**

- Check that audio file paths are correct
- Ensure audio keys are referenced correctly
- Some browsers require user interaction before playing audio; add a "click to start" button if needed

**Text formatting issues**

- Verify bold syntax: `**bold text**`
- Check for mismatched asterisks
- Ensure line breaks use the correct syntax: `\n`

**Scene transitions not working**

- Check that scene keys in `nextScene` properties match the actual scene keys in your configuration
- Verify that button configurations include the correct `nextScene` property
- Check that page `nextAction` objects have the correct `type` and target properties

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Phaser 3](https://phaser.io/) - HTML5 game framework
- All the asset creators (if using third-party assets, list them here)
