import { useEffect, useState, useRef } from "react";
import alertSound from "../assets/sounds/alert.mp3";

const PomodoroTimer = () => {
  const defaultTime = 25;
  const [minutes, setMinutes] = useState(defaultTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const audioRef = useRef(new Audio(alertSound));
  const alertTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (alertTimeout.current) clearTimeout(alertTimeout.current);
      audioRef.current.pause();
    };
  }, []);

  //console.log(isActive);
  //color mapping
  const modeColors = {
    focus: "text-red-500",
    short: "text-green-500",
    long: "text-purple-500",
  };

  // Calculate total time in seconds for current mode
  const getTotalTime = () => {
    switch (mode) {
      case "focus":
        return defaultTime * 60;
      case "short":
        return 5 * 60;
      case "long":
        return 20 * 60;
      default:
        return defaultTime * 60;
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) return seconds - 1;
          if (minutes > 0) {
            setMinutes((min) => min - 1);
            return 59;
          }
          handleTimerCompletion();
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes]);

  const handleTimerCompletion = () => {
    audioRef.current.play().catch((error) => {
      console.log("Audio playback error:", error);
    });

    // Show visual alert
    setShowAlert(true);
    alertTimeout.current = setTimeout(() => setShowAlert(false), 5000);

    setIsActive(false);

    if (mode == "focus") {
      const newSession = sessionsCompleted + 1;
      setSessionsCompleted(newSession);

      if (newSession % 4 == 0) {
        setMode("long");
        setMinutes(20);
      } else {
        setMode("short");
        setMinutes(5);
      }
    } else {
      setMode("focus");
      setMinutes(defaultTime);
    }
    setSeconds(0);
  };

  const resetTimer = () => {
    setIsActive(false);
    switch (mode) {
      case "focus":
        setMinutes(defaultTime);
        break;
      case "short":
        setMinutes(5);
        break;
      case "long":
        setMinutes(15);
        break;
    }
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Alert Notification */}
      {showAlert && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed top-4 right-4 p-4 bg-white rounded-lg shadow-lg border-l-4 border-green-500 animate-slide-in"
        >
          <div className="flex items-center">
            <span className="text-lg font-semibold">
              {mode === "focus"
                ? "⏰ Time to take a break!"
                : "🎯 Time to focus!"}
            </span>
            <button
              onClick={() => setShowAlert(false)}
              className="ml-4 text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Close alert"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-5xl font-mono font-bold text-gray-100 bg-gray-900 p-8 rounded-lg shadow-lg space-y-6">
          POMODORO TIMER
        </h2>
        {/* Timer Display */}
        <div className="text-6xl font-bold text-center font-mono">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/* Progress Circle */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className={`${modeColors[mode]} transition-all duration-300`}
              strokeWidth="6"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: 283,
                strokeDashoffset:
                  283 * (1 - (minutes * 60 + seconds) / getTotalTime()),
              }}
            />
          </svg>
        </div>

        {/* Mode Display */}
        <div className="text-center text-xl font-semibold">
          {mode === "focus" && "Focus Time 🎯"}
          {mode === "short" && "Short Break ☕"}
          {mode === "long" && "Long Break 🌴"}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>

        {/* Session Counter */}
        <div className="text-center text-gray-600">
          Completed sessions: {sessionsCompleted}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
