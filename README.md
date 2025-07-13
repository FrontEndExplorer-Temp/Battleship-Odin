# Battleship Game (Vanilla JS)

## Project Structure

```
/src
  /core         # Core game logic (gameController, gameboard, player, ship)
  /ui           # UI logic and entry point
  /assets       # Static files (CSS, HTML, modern styles)
/tests
  /core         # Tests for core logic
  /ui           # (Reserved for UI tests)
webpack.config.js
babel.config.js
package.json
.gitignore
README.md
```

## Visual Style
- **Modern, muted blue/teal theme** for a comfortable, board-game feel
- **Responsive, clean layout** using CSS Grid and Flexbox
- **Subtle highlights** for ships, hits, and misses
- **Refined buttons and status messages**

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm start
   ```
3. **Run tests:**
   ```sh
   npm test
   ```

## Development Workflow
- Source code is organized for clarity and maintainability.
- Core game logic is decoupled from UI logic.
- Tests are organized to mirror the source structure.
- No frameworks are used; everything is vanilla JS.
- The project is visually refreshed for comfort and clarity.

## Contribution
Feel free to open issues or submit pull requests! 