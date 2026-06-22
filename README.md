# ⚡ Multiplication Trainer

A responsive single-page web application for practicing 2-digit × 2-digit mental multiplication. Features speed tracking, learning materials, and advanced statistics with speedcubing-style rolling averages.

**Live Demo:** https://d1ovoo.github.io/multiplication-trainer/

---

## 🎯 Features

### 📌 Practice Tab
- **Random Problems**: Generates random 2-digit × 2-digit multiplication problems (10-99)
- **Automatic Timer**: Starts instantly when a problem appears
- **Instant Feedback**: Shows if answer is correct or displays the correct answer
- **Smart Recording**: Only records solve times for correct answers
- **Session Stats**: Tracks problems solved, best time, and average for current session
- **Auto-Advance**: Automatically moves to next problem after correct answer

### 📚 Learn Tab
Three proven mental multiplication techniques with detailed examples:
1. **Vedic Cross Multiplication (Urdhva-Tiryagbhyam)** - Ancient Indian method breaking down multiplication into simple criss-cross steps
2. **Breakdown Method** - Split one number and multiply parts separately
3. **Number Close to Base** - Efficient for numbers near 100

Includes practical tips for improving speed and accuracy.

### 📊 Statistics Tab
- **Summary Cards**: Total attempts, success rate, personal best, all-time average
- **Speedcubing-Style Averages**:
  - **AO5**: Average of last 5 (drops best and worst)
  - **AO12**: Average of last 12 (drops best and worst)
  - **AO50**: Average of last 50
  - **AO100**: Average of last 100
- **Charts**:
  - Timeline chart showing solve times progression
  - Distribution histogram showing time frequency
- **History Table**: Detailed log of last 50 solves with timestamps
- **Data Management**: One-click clear for all data

### 🎨 Settings Tab
- **10 Beautiful Color Themes**:
  - cafe - Warm, earthy browns
  - strawberry - Soft pink palette
  - creamsicle - Warm orange tones
  - iv_clover - Cool gray with tan accents
  - alpine - Blue-gray mountain theme
  - striker - Electric blue
  - serika_dark - Warm beige on black
  - repose_dark - Refined gray palette
  - sonokai - Vibrant green on dark
  - viridescent - Cool green tones

Each theme uses solid accent colors for clean, modern aesthetics.

---

## 🛠️ Technical Stack

- **HTML5**: Semantic markup, mobile-first structure
- **CSS3**: Theme system with 10 curated color palettes, responsive grid layouts, smooth animations
- **Vanilla JavaScript**: No frameworks, ~700 lines of pure JS
- **Chart.js**: Data visualization for performance charts
- **localStorage**: Persistent data storage (all data stays on your device)

---

## 📱 Responsive Design

- **Mobile-first** approach
- Optimized for screens from 320px and up
- Touch-friendly interface
- Scales perfectly on tablets and desktops

### Breakpoints:
- 📱 **Mobile**: < 480px (single column, compact)
- 📱 **Tablet**: 480px - 768px (2 columns)
- 🖥️ **Desktop**: > 768px (full multi-column layout)

---

## 🎨 Design

### Customizable Color Themes
- **10 Hand-Picked Palettes**: From warm cafes to electric blues
- **Solid Colors**: No gradients on text, clean and modern look
- **Subtle Backgrounds**: Minimal color variation in background colors for depth
- **Consistent UI**: All themes maintain readability and accessibility
- **Animations**: Smooth transitions and micro-interactions across all themes
- **Accessibility**: High contrast ratios, semantic HTML

### Key UI Elements
- Large, readable problem display with visual hierarchy
- Real-time timer with visual feedback
- Color-coded feedback (green for correct, red for incorrect)
- Intuitive tab navigation with icons
- Responsive data visualizations
- Settings panel for theme selection

---

## 💾 Local Storage

All data is stored locally in your browser's localStorage. No data is ever sent to a server.

**Data Keys**:
- `multiplicationHistory` - Array of all solve attempts
- `selectedTheme` - Current active theme (defaults to cafe)

**Solve Data Structure**:
```javascript
{
  num1: 23,              // First number
  num2: 17,              // Second number
  answer: 391,           // Correct answer
  userAnswer: 391,       // User's answer
  time: 3.45,            // Solve time in seconds
  timestamp: "ISO-8601", // When it was solved
  correct: true          // Whether answer was correct
}
```

---

## 🚀 Getting Started

### Online (Recommended)
1. Visit: https://bholdvilnius.github.io/multiplication-trainer
2. Click "Practice" and start solving problems
3. Check "Statistics" to see your progress
4. Read "Learn" for multiplication techniques
5. Customize your experience in "Settings" with 10 color themes

### Local Setup
1. Clone the repository:
```bash
git clone https://github.com/bholdvilnius/multiplication-trainer.git
cd multiplication-trainer
```

2. Open in your browser:
```bash
# Option 1: Using Python
python -m http.server 8000
# Then visit http://localhost:8000

# Option 2: Using Node.js
npx http-server
# Then visit http://localhost:8080

# Option 3: Direct (Some features may not work due to CORS)
Open index.html directly in your browser
```

---

## 📈 How Statistics Are Calculated

### Speedcubing Methodology
This app uses the same averaging system as competitive speedcubing to fairly represent improvement:

**AO5 & AO12** (Trim Means):
- Takes the last N solves
- Removes the fastest and slowest
- Averages the remaining times
- **Why?** Eliminates anomalies (lucky fast times, distracted slow times)

**AO50 & AO100** (Simple Averages):
- Takes the last N solves
- Calculates simple average
- **Why?** Shows long-term trend with larger sample size

### Success Rate
- Total correct attempts ÷ total attempts × 100
- Displayed as percentage

---

## ⌨️ Keyboard Shortcuts

- **Enter**: Submit answer (same as clicking Submit)
- **Tab**: Navigate between tabs

---

## 💡 Tips for Improvement

1. **Start Slow**: Focus on accuracy before speed
2. **Practice Regularly**: 5-10 minutes daily is better than long sessions
3. **Watch Your Progress**: Use AO5 and AO12 to see immediate improvement
4. **Learn Techniques**: Study the Learn tab to understand mental methods
5. **Visualize**: Picture the numbers in your mind as you calculate
6. **Memorize Squares**: Knowing 2-digit squares helps significantly
7. **Customize Your Theme**: Choose a color theme that keeps you focused

---

## 🔐 Privacy

✅ **100% Private** - All data stays on your device
- No server communication
- No tracking
- No analytics
- No cookies (except localStorage for data persistence)
- Works completely offline after first load

---

## 🎓 Learning Resources

The Learn tab includes:
- Vedic mathematics principles
- Step-by-step examples
- Practical tips
- Reference techniques

For deeper learning:
- [Vedic Mathematics](https://www.vedicmathematics.org/)
- [Mental Arithmetic](https://www.guinnessworldrecords.com/world-records/fastest-time-to-multiply-two-8-digit-numbers)
- [Speedcubing Statistics](https://www.cubingworldcup.com/)

---

## 📝 Recent Updates

### Version 1.1.0 - Theme System
- Added 10 hand-curated color themes inspired by popular keyboard color schemes
- Implemented theme persistence with localStorage
- Removed gradient effects for cleaner, modern aesthetic
- Enhanced Settings tab with visual theme previews
- Improved accessibility across all themes

### Themes Added:
- cafe, strawberry, creamsicle, iv_clover, alpine, striker, serika_dark, repose_dark, sonokai, viridescent

---

## 📄 License

MIT License - Feel free to use, modify, and distribute this project.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 🎉 Have Fun!

Remember: The goal is improvement, not perfection. Enjoy the process of mastering mental multiplication! 🚀

---

**Made with ❤️ for math enthusiasts**
