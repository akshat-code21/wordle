# Wordle Game

A modern implementation of the popular word-guessing game Wordle, built with React, TypeScript, and Vite.

## 🎮 Features

- Classic Wordle gameplay - guess the 5-letter word in 6 tries
- Color-coded feedback on your guesses
- Word definitions for learning
- Statistics tracking
- Word history
- User profiles
- Mobile-responsive design

## 🚀 Demo

[Play Wordle Game](https://wordle-1.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: TailwindCSS 4
- **Routing**: React Router DOM 7
- **Animation**: Framer Motion
- **Development**: Vite 6
- **UI Components**: Custom components with Radix UI primitives

## 📥 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/wordle.git
   cd wordle
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
# or
yarn build
# or
bun build
```

## 🔍 How to Play

1. You have six attempts to guess a five-letter word.
2. Type a word and press Enter.
3. After each guess, the color of the tiles will change:
   - 🟩 Green: The letter is correct and in the correct position.
   - 🟨 Yellow: The letter is in the word but in the wrong position.
   - ⬛ Gray: The letter is not in the word.
4. Keep guessing until you find the word or run out of attempts!

## 🧩 Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # Reusable UI components
│   ├── lib/         # Utility functions and helpers
│   ├── pages/       # Page components
│   ├── store/       # Context providers and state management
│   ├── App.tsx      # Main application component
│   ├── main.tsx     # Application entry point
│   └── ...
└── ...
```
