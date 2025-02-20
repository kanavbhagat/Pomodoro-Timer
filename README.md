# 🍅 React Pomodoro Timer

[![React Version](https://img.shields.io/badge/react-18+-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.3.2-06B6D4.svg)](https://tailwindcss.com/)

A productivity-enhancing timer implementing the Pomodoro Technique with visual/audio alerts.

## Features
🎯 Focus mode (25 mins)  
☕ Short break (5 mins)  
🌴 Long break (20 mins)  
🔔 Audio/visual notifications  
📊 Session counter (4 focus ➔ long break)

## Installation

git clone https://github.com/YOURUSERNAME/pomodoro-timer.git
cd pomodoro-timer
npm install
npm start

## Usage
1. Press ▶️ to start timer
2. Switch modes with ↻ button
3. 🔕 Click alert to dismiss

## Customization
Modify `PomodoroTimer.jsx` to adjust timings:
const getTotalTime = () => {
case "focus": return defaultTime * 60; // Edit 25
case "short": return 5 * 60; // Short break
case "long": return 20 * 60; // Long break
};

## Future Roadmap
- [ ] Custom time presets
- [ ] Theme selector
- [ ] Progress visualization
- [ ] Pause functionality
