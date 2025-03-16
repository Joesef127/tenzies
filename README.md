# 🎲 Tenzies Game

Tenzies is a fun and engaging dice game where players roll dice until all values match while strategically holding some dice in place. The game includes difficulty levels, scoring mechanics, and local storage to keep track of high scores and best times.

---

## 🚀 Features
- 🎮 **Three Difficulty Levels**: Easy (10 dice), Medium (20 dice), Hard (50 dice)
- ⏱️ **Time Tracking**: Measures how long it takes to win a round
- 🏆 **High Score System**: Stores high scores and best times for each difficulty
- 🎲 **Dice Holding Mechanism**: Players can hold dice to preserve values
- 🔁 **Rolling Counter**: Tracks the number of times the player rolls the dice
- 🏅 **Scoring Formula**: `Score = 100 + (clicks * 50) / (rolls * 10) + bonus`
- 🌟 **Bonus Points**: Earn bonus points if you win within 10 rolls
- 🛠 **Local Storage Support**: Persists best scores and times between sessions
- 🎨 **Responsive UI**: Optimized for various screen sizes

---

## Live Previe
link: https://hive-tenzies.vercel.app

---

## 🛠 Tech Stack
- **Frontend**: React (useState, useEffect)
- **Styling**: CSS, Tailwind (if applicable)
- **State Management**: React Hooks
- **Data Persistence**: Local Storage

---

## 🎮 How to Play
1. Click the **Roll** button to roll all dice.
2. Click on individual dice to **hold** them in place.
3. Continue rolling until **all dice show the same number**.
4. Your score is calculated based on the number of rolls and clicks.
5. Check the **high score table** to see your best scores!
6. Check the **best time table** to see your best completion time!

---

## ⚙️ Installation & Setup

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/joesef127/tenzies.git
   cd tenzies-game
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Start the Development Server**:
   ```sh
   npm run dev
   ```

4. Open the game in your browser at `http://localhost:5173` if using vite(recommended) (or the port shown in your terminal).

---

## 🏆 Scoring System
The game calculates the score based on the following formula:
```js
Score = 100 + (clicks * 50) / (rolls * 10) + bonus;
```
- **Bonus**: +200 points if completed within 10 rolls
- **Stored in Local Storage** per difficulty level

---

## 📂 Project Structure
```
📂 tenzies-game
├── 📂 src
│   ├── 📂 components
│   │   ├── Dice.js
│   │   ├── Header.js
│   │   ├── Win.js
│   ├── App.js
│   ├── index.js
│   ├── styles.css
├── 📄 package.json
├── 📄 README.md
```

---

## 🐛 Known Issues & Fixes
1. **Dice reset when switching difficulty?** ✅ Fixed by preserving held dice while adjusting dice count.
2. **Best time only saves for easy mode?** ✅ Fixed by updating local storage per difficulty.

---

## 🤝 Contributing
Have an idea to improve the game? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📞 Contact
- **Developer**: Adegbola Adedayo
- **Email**: [Adegboladayor@gmail.com](mailto:Adegboladayor@gmail.com)
