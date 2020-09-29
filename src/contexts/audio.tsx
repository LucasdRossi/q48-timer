import React, { createContext, useRef } from "react";

const sounds = [
  require("../assets/sounds/ajudaomlk.mp3"),
  require("../assets/sounds/biir.mp3"),
  require("../assets/sounds/boora.mp3"),
];

interface AudioContextData {
  play(): void;
}

const AudioContext = createContext<AudioContextData>({} as AudioContextData);

export const AudioProvider: React.FC = ({ children }) => {
  const audioRef = useRef<{ input: HTMLAudioElement | null }>({ input: null });

  const play = () => {
    if (audioRef.current.input) {
      audioRef.current.input.src =
        sounds[Math.floor(Math.random() * sounds.length)];

      audioRef.current.input.play();
    }
  };

  return (
    <AudioContext.Provider value={{ play }}>
      {children}
      <audio ref={(ref) => (audioRef.current.input = ref)} />
    </AudioContext.Provider>
  );
};

export default AudioContext;
