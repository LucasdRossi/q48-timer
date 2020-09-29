import React, { useState, useContext, useRef, useEffect } from "react";
import AudioContext from "./contexts/audio";
import "./App.css";

const App: React.FC = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [passedTime, setPassedTime] = useState(0);

  const { play } = useContext(AudioContext);

  const actionRef = useRef<{
    isExercise: boolean;
  }>({
    isExercise: true, // true -> exercise | false -> running
  });

  const intervalRef = useRef<{ interval: NodeJS.Timeout | null }>({
    interval: null,
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current.interval) {
        clearInterval(intervalRef.current.interval);
      }
    };
  }, []);

  useEffect(() => {
    if (totalTime === 240) {
      reset();
    }
    if (actionRef.current.isExercise && passedTime === 19) {
      actionRef.current.isExercise = !actionRef.current.isExercise;
      setPassedTime(0);
      play();
    } else if (!actionRef.current.isExercise && passedTime === 9) {
      actionRef.current.isExercise = !actionRef.current.isExercise;
      setPassedTime(0);
      play();
    }
  }, [totalTime]);

  const start = () => {
    play();
    const interval = setInterval(() => {
      setTotalTime((time) => time + 1);
      setPassedTime((time) => time + 1);
    }, 1000);

    intervalRef.current.interval = interval;
  };

  const stop = () => {
    if (intervalRef.current.interval) {
      clearInterval(intervalRef.current.interval);
    }
  };

  const reset = () => {
    stop();
    setPassedTime(0);
    setTotalTime(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-title">{totalTime}</p>
        <div className="App-content">
          <a className="App-link link-primary" onClick={start}>
            Start
          </a>
          <a
            className={
              totalTime > 0 ? "App-link link-danger" : "App-link link-disabled"
            }
            onClick={stop}
          >
            Stop
          </a>
        </div>
        <a className="App-link" onClick={reset}>
          Reset
        </a>
      </header>
    </div>
  );
};

export default App;
