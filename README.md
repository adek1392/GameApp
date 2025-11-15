# Game Library

A simple React web app to browse and explore video games using the [RAWG API](https://rawg.io/apidocs).

**Live Demo:** [Game App on Vercel](https://game-app-roan.vercel.app)

**Features:**
- Search games by name
- View screenshots in a carousel
- Pagination support
- Responsive design for mobile, tablet, and desktop

**Tech Stack:** React, Vite, SCSS, RAWG API

**Setup Locally:**
```bash
git clone https://github.com/adek1392/GameApp.git
cd GameApp
npm install
# create a .env file with your RAWG API key
VITE_RAWG_API_KEY=your_api_key_here
npm run dev
